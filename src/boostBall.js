import k from './kaboom';
import Ball from './ball';

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
    spawnParticles (spawnInterval = 0.5, amount = 1, lifetime = 1, speed = 1) {
      _loop = k.loop(spawnInterval, () => {
        for(let counter = 0; counter < amount; counter++) {
          const particle = k.add([
            k.circle(1),
            k.opacity(1),
            k.pos(this.pos),
            k.move(k.rand(360), speed),
            k.color('#000000'),
            `particle-${this.id}`,
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

export default function BoostBall (optsArr = []) {
  const boostBall = Ball([
    k.color('#000000'),
    shakeEntity(),
    spawnParticles(),
    'boost-ball',
    ...optsArr,
  ]);

  boostBall.shakeEntity();
  boostBall.spawnParticles(0.25, 4, 1, 50);

  k.onCollide('player-ball', 'boost-ball', (pb, bb) => {
    bb.destroy();
    pb.speed = 40;
    k.play('boost');
    k.shake(5);
  })
}
