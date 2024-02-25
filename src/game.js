import k from './kaboom';
import Ball from './ball';

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

  const playerBall = k.add(ball());
  // k.move(k.mousePos());
  // k.on('')
}
