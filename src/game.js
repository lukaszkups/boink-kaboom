import k from './kaboom';
import { default as ball, bouncy } from './ball';

export default function Game () {
  k.setBackground('#1177ff');
  // top wall
  k.add([
    k.rect(
      k.width(), 
      10
    ),
    k.body({ isStatic: true }),
    k.pos(0, 10),
    k.area(),
    k.anchor('topleft'),
    k.color(k.RED),
    'top-wall',
    'wall',
  ]);

  // bottom wall
  k.add([
    k.rect(
      k.width(), 
      10
    ),
    k.body({ isStatic: true }),
    k.pos(0, k.height()-20),
    k.area(),
    k.anchor('topleft'),
    k.color(k.RED),
    'bottom-wall',
    'wall',
  ]);

  // left wall
  k.add([
    k.rect( 
      10,
      k.height(),
    ),
    k.body({ isStatic: true }),
    k.pos(k.width()-20, 0),
    k.area(),
    k.anchor('topleft'),
    k.color(k.RED),
    'left-wall',
    'wall',
  ]);

  // right wall
  k.add([
    k.rect( 
      10,
      k.height(),
    ),
    k.body({ isStatic: true }),
    k.pos(10, 0),
    k.area(),
    k.anchor('topleft'),
    k.color(k.RED),
    'right-wall',
    'wall',
  ]);

  const playerBall = ball();
  playerBall.drag = 0.25;
  // playerBall.add([bouncy('wall')])

  const atanRadDegHelper = 360/Math.PI;

  k.onMousePress(() => {
    const mousePos = k.mousePos();
    // Rotate player's ball towards mouse pointer
    playerBall.rotateTo(0);
    const rotation = Math.atan2(mousePos.y - playerBall.pos.y, mousePos.x - playerBall.pos.x);
    // const rotation = playerBall.pos.angle(mousePos);
    console.log('rotation: ', playerBall.pos.angle(mousePos));
    playerBall.rotateTo(rotation);
    // trigger player's ball movement towards mouse pointer
    playerBall.boost(10);
  });

  k.onCollide('player-ball', 'wall', () => {
    console.log('collision!', playerBall.angle);
    playerBall.rotateTo(180-playerBall.angle);
  });
}