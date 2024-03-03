import { rgbToHex } from './helpers';
import k from './kaboom';

export const flash = () => {
  let flashInterval = 0.15;
  let _loop = null;

  return {
    id: 'flash',
    get isFlashing() {
      return _loop !== null;
    },
    flash (duration = 0, flashIntervalMod = 0.15) {
      const end = k.time() + duration;
      flashInterval = flashIntervalMod;

      this.trigger('flashStart');
      _loop = k.loop(flashInterval, () => {
        if (k.time() >= end) {
          this.cancelFlash();
          return;
        }
        this.hidden = !this.hidden;
      });
    },
    cancelFlash () {
      if (!_loop) {
        this.hidden = false;
        return;
      }
      this.trigger('flashEnd');
      _loop.cancel();
      _loop = null;
    }
  }
}

export const shakeEntity = () => {
  let originX = 0;
  let originY = 0;
  return {
    id: 'shake-entity',
    shakeEntity (sizeX = 1, sizeY = 1, speed = 0.05) {
      originX = this.pos.x;
      originY = this.pos.y;

      k.loop(speed, () => {
        if (this.pos.x !== originX && this.pos.y !== originY) {
          this.pos.x = originX;
          this.pos.y = originY;
        } else {
          this.pos.x += k.rand(sizeX);
          this.pos.y += k.rand(sizeY);
        }
      });
    }
  }
}


export const spawnParticles = () => {
  let _loop = null;
  return {
    id: 'spawnParticles',
    add () {
      this.onDestroy(() => {
        // stop spawning particles
        this.stopSpawn();
        // destroy remaining particles
        k.destroyAll(`particle-${this.id}`);
      });
    },
    spawnParticles (spawnInterval = 0.5, amount = 1, lifetime = 1, speed = 1, args = []) {
      _loop = k.loop(spawnInterval, () => {
        for(let counter = 0; counter < amount; counter++) {
          const particle = k.add([
            k.circle(1),
            k.opacity(1),
            k.pos(this.pos),
            k.move(k.rand(360), speed),
            k.color('#000000'),
            `particle-${this.id}`,
            ...args,
          ]);
          particle.fadeOut(lifetime).onEnd(() => particle.destroy());
        }
      });
    },
    stopSpawn() {
      _loop?.cancel();
      _loop = null;
    }
  }
}

export const flashColor = () => {
  let flashInterval = 0.15;
  let _loop = null;
  let initialColor = '';

  return {
    id: 'flash',
    require: ['color'],
    get isFlashingColor() {
      return _loop !== null;
    },
    flashColor (duration = 0, flashIntervalMod = 0.15, color = '#ff0000') {
      initialColor = this.color;
      const end = k.time() + duration;
      flashInterval = flashIntervalMod;

      this.trigger('flashColorStart');
      _loop = k.loop(flashInterval, () => {
        if (k.time() >= end) {
          this.cancelFlashColor();
          return;
        }
        this.use(k.color(rgbToHex(this.color) === color.toUpperCase() ? initialColor : color));
      });
    },
    cancelFlashColor () {
      if (!_loop) {
        this.use(k.color(initialColor));
        return;
      }
      this.trigger('flashColorEnd');
      _loop.cancel();
      _loop = null;
    }
  }
}

export const checkIfGameOver = (ui, playerball) => {
  return ui.clicksLeft <= 0 && !playerball.isMoving;
}
