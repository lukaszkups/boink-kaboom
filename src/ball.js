import k from './kaboom';

export const angleToVec2 = (angle) => {
  const x = Math.cos(-angle);
  const y = Math.sin(-angle);
  return k.vec2(x, y);
}

export function boost() {
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
          this.trigger('stopped');
        }
      }
    }
  }
}

export default function Ball () {
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
    },
    boost(),
    'ball'
  ]);
};
