import k from './kaboom';

export const angleToVec2 = (angle) => {
  const x = Math.cos(-angle);
  const y = Math.sin(-angle);
  return k.vec2(x, y);
}

export function boost() {
  let velocity = k.vec2(0, 0);
  let isMoving = false;

  return {
    id: 'boost',
    require: ['body'],
    boost(boostSpeed = 0) {
      if (boostSpeed >= 0) {
        const dir = angleToVec2(this.angle);
        // set initial velocity (boost 100%)
        velocity.x = dir.x * boostSpeed;
        velocity.y = dir.y * boostSpeed;
        isMoving = true;
      }
    },
    update () {
      // update (decrease) velocity over time
      if (isMoving && (velocity.x > 0 || velocity.y > 0)) {
        const dir = angleToVec2(Math.abs(this.angle));
        velocity.x -= Math.abs(dir.x * this.drag);
        velocity.y -= Math.abs(dir.y * this.drag);
        console.log(velocity, isMoving)
        // update object position
        if (velocity.x > 0) {
          this.pos.x += velocity.x;
        }
        if (velocity.y > 0) {
          this.pos.y += velocity.y;
        }

        // if velocity reaches 0, stop tracking boost movement
        if (velocity.x <= 0 && velocity.y <= 0) {
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
