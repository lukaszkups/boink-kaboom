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
        }
      }
    }
  }
}

export function bouncy(collisionTag) {
  const handleBounce = () => {
    this.rotate = -this.rotate
  }
  k.onCollide(this, collisionTag, () => {
    console.log('collide!!!');
    handleBounce();
  });
  return {
    id: 'bouncy',
    handleBounce(collisionDirection) {
      // if (collisionDirection === '')
      // this.rotate = -this.rotate;
      handleBounce();
    },
    // update () {
    //   // // bounce off screen edges
    //   // if (this.worldArea().p1.x < 0 || this.worldArea().p2.x > width() || this.worldArea().p1.y < 0 || this.worldArea().p2.y > height()) {
    //   //   this.rotation = -this.rotation;
    //   // }

    //   // // if (ball.worldArea().p1.y < 0 || ball.worldArea().p2.y > height()) {
    //   // //   ball.vspeed = -ball.vspeed;
    //   // // }
      
    // }
  }
}


export default function Ball () {
  return k.add([
    k.circle(16),
    k.rotate(0),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor('center'),
    k.color('#f1f100'),
    k.pos(
      k.width()/2,
      k.height()/2,
    ),
    {
      angleInDeg: 0,
    },
    boost(),
    'player-ball'
  ]);
};
