import k from './kaboom';
import ball from './ball';

export default function Game () {
  k.add([
    // top wall
    k.rect(
      k.width(), 
      10, 
      k.body({ isStatic: true }),
      k.pos(0, -10)
    ),
    // bottom wall
    k.rect(
      k.width(), 
      10, 
      k.body({ isStatic: true }),
      k.pos(0, k.height())
    ),
    // left wall
    k.rect(
      10, 
      k.height(), 
      k.body({ isStatic: true }),
      k.pos(-10, 0)
    ),
    // right wall
    k.rect(
      10, 
      k.height(), 
      k.body({ isStatic: true }),
      k.pos(k.width(), 0)
    ),
  ]);

  const playerBall = ball();
  console.log(playerBall);
  playerBall.drag = 1;
  console.log(playerBall);
  // k.move(k.mousePos());
  // k.on('') 

  let angle = 0;
  k.onMousePress(() => {
    angle = playerBall.pos.angle(k.mousePos());
    console.log(angle, k.mousePos())
    playerBall.rotateTo(angle);
    // playerBall.isMoving = true;
    // playerBall.add(rotate(angle));
    // playerBall.vel = 10000;
    // playerBall.speed(1000)
    // playerBall.jump(1000)
    // playerBall.move(90, 1200);
    // playerBall.follow(k.mousePos())
    // playerBall.pos = playerBall.pos.add(k.Vec2.fromAngle(angle).scale(10))
    playerBall.boost(10);
  });

  // k.onUpdate(() => {
  //   if (playerBall.isMoving) {
  //     playerBall.pos = playerBall.pos.add(k.Vec2.fromAngle(angle).scale(10))
  //   }
  // })
}