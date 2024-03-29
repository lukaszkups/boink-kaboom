import { ballSize } from './helpers';
import k from './kaboom';

export const angleToVec2 = (angle) => {
  const x = Math.cos(-angle);
  const y = Math.sin(-angle);
  return k.vec2(x, y);
}

export function boost() {
  let isMoving = false;

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

export default function Ball (optsArr = []) {
  return k.add([
    k.circle(ballSize),
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
    'ball',
    ...optsArr
  ]);
};
