import k from './kaboom';

export const angleToVec2 = (angle) => {
  const x = Math.cos(-angle);
  const y = Math.sin(-angle);
  return k.vec2(x, y);
}

// export function boost() {
//   let isMoving = false;
//   let speed = 0;

//   return {
//     id: 'boost',
//     require: ['body'],
//     boost(boostSpeed = 0) {
//       if (boostSpeed >= 0) {
//         speed = boostSpeed;
//         isMoving = true;
//       }
//     },
//     update () {
//       if (isMoving) {
//         if (speed > 0) {
//           // move ball by given angle
//           // source: https://gamedev.stackexchange.com/a/50984/40704
//           this.pos.x += Math.cos(this.angle) * speed;
//           this.pos.y += Math.sin(this.angle) * speed;
//           // reduce speed by Kaboom's built-in "drag" property over time
//           speed -= this.drag;
//         } else {
//           speed = 0;
//           isMoving = false;
//           this.trigger('stopped');
//         }
//       }
//     }
//   }
// }

export function boost() {
  let isMoving = false;
  let speed = 0;

  return {
    id: 'boost',
    require: ['body'],
    boost(boostSpeed = 0, angle = 0) {
      console.warn(this)
      k.matter.Body.setAngle(this.body, angle);
      k.matter.Body.setSpeed(this.body, boostSpeed);
      console.warn(this)
      // k.matter.Body.applyForce(this.body, { x: this.pos.x, y: this.pos.y }, {
      //   x: Math.cos(this.angleInDeg) * boostSpeed,
      //   y: Math.sin(this.angleInDeg) * boostSpeed
      // });
      // k.matter.Body.setVelocity(this.body, {
      //   x: Math.cos(this.angle) * boostSpeed,
      //   y: Math.sin(this.angle) * boostSpeed
      // });
      // k.matter.Body.moveBy(this.body, boostSpeed);
      if (boostSpeed >= 0) {
        isMoving = true;
      }
    },
    update () {
      if (isMoving) {
        if (speed > 0) {
          // move ball by given angle
          // source: https://gamedev.stackexchange.com/a/50984/40704
          // this.pos.x += Math.cos(this.angle) * speed;
          // this.pos.y += Math.sin(this.angle) * speed;
          // reduce speed by Kaboom's built-in "drag" property over time
          // speed -= this.drag;
        } else {
          speed = 0;
          isMoving = false;
          this.trigger('stopped');
        }
      }
    }
  }
}

export function MatterBall () {
  k.onUpdate(() => {
    k.matter.Engine.update(k.matter.engine, k.dt());
  })
  return {
    add () {
      const { x, y } = this.pos;
      this.body = k.matter.Bodies.circle(x, y, this.radius);
      k.matter.Composite.add(k.matter.world, this.body);
    },

    update () {      
      if (!this.body) {
        return;
      }

      this.pos.x = this.body.position.x;
      this.pos.y = this.body.position.y;
    },
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
    },
    boost(),
    MatterBall(),
    'ball',
    ...optsArr
  ]);
};
