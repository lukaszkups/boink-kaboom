import k from './kaboom';

export const angleToVec2 = (angle) => {
  const x = Math.cos(-angle);
  const y = Math.sin(-angle);
  return k.vec2(x, y);
}

export function boost() {
  // let velocity = k.vec2(0, 0);
  let isMoving = false;
  let speed = 0;

  return {
    id: 'boost',
    require: ['body'],
    boost(boostSpeed = 0) {
      if (boostSpeed >= 0) {
        speed = boostSpeed;
        isMoving = true;
      }
    },
    update () {
      if (isMoving) {
        if (speed > 0) {
          // move ball by given angle
          // source: https://gamedev.stackexchange.com/a/50984/40704
          this.pos.x += Math.cos(this.angle) * speed;
          this.pos.y += Math.sin(this.angle) * speed;
          // reduce speed by Kaboom's built-in "drag" property over time
          speed -= this.drag;
        } else {
          speed = 0;
          isMoving = false;
        }
      }
    }
  }
}

export default function Ball () {
  return k.add([
    k.circle(16),
    k.rotate(),
    k.body(),
    k.area(),
    k.pos(
      k.width()/2,
      k.height()/2,
    ),
    {
      isMoving: false,
      speed: 0,
      velocity: {
        x: 0,
        y: 0,
      },
    },
    boost(0),
  ]);
};
