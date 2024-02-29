import k from './kaboom';

export const angleToVec2 = (angle) => {
  const x = Math.cos(-angle);
  const y = Math.sin(-angle);
  return k.vec2(x, y);
}

export function boost() {
  let isMoving = false;
  // let speed = 0;

  return {
    id: 'boost',
    require: ['body'],
    boost(boostSpeed = 0) {
      if (boostSpeed >= 0) {
        this.speed = boostSpeed;
        isMoving = true;
      }
    },
    update () {
      if (isMoving) {
        if (this.speed > 0) {
          // move ball by given angle
          // source: https://gamedev.stackexchange.com/a/50984/40704
          this.pos.x += Math.cos(this.angle) * this.speed;
          this.pos.y += Math.sin(this.angle) * this.speed;
          // reduce speed by Kaboom's built-in "drag" property over time
          this.speed -= this.drag;
        } else {
          this.speed = 0;
          isMoving = false;
          this.trigger('stopped');
        }
      }
    }
  }
}

export const flash = () => {
  const flashInterval = 0.15;
  let flashStart = 0;
  let _loop = null;

  return {
    id: 'flash',
    get isFlashing() {
      return _loop !== null;
    },
    flash (duration = 0) {
      const end = k.time() + duration;

      this.trigger('flashStart');
      _loop = k.loop(flashInterval, () => {
        if (k.time() >= end) {
          this.cancelFlash();
        }
        this.hidden = !this.hidden;
      })
    },
    cancelFlash () {
      if (!_loop) {
        return;
      }
      this.trigger('flashEnd');
      _loop.cancel();
      _loop = null;
    }
  }
}

export default function Ball (optsArr = []) {
  return k.add([
    k.circle(8),
    k.rotate(0),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor('center'),
    k.color('#ff0000'),
    k.pos(
      k.width()/2,
      k.height()/2,
    ),
    {
      angleInDeg: 0,
      speed: 0,
      toBeDestroyed: false,
    },
    boost(),
    flash(),
    'ball',
    ...optsArr
  ]);
};
