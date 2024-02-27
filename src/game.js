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
  playerBall.drag = 0.25;

  k.onMousePress(() => {
    const mousePos = k.mousePos();
    // Rotate player's ball towards mouse pointer
    const rotation = Math.atan2(mousePos.y - playerBall.pos.y, mousePos.x - playerBall.pos.x);
    playerBall.rotateTo(rotation);
    // trigger player's ball movement towards mouse pointer
    playerBall.boost(10);
  });
}