import k from './kaboom';
import { default as Ball } from './ball';
import { getOverHere, radToDeg } from './helpers';

export default function PlayerBall () {
  // Create

  const playerBall = Ball([
    {
      isMoving: false,
    },
    'player-ball',
    k.color('#f1f100'),
    k.offscreen({ distance: 1 }),
  ]);
  playerBall.drag = 0.1;

  // Events

  k.onMousePress(() => {
    const mousePos = k.mousePos();
    playerBall.isMoving = true;
    playerBall.rotateTo(0);
    // Rotate player's ball towards mouse pointer
    const angle = Math.atan2(mousePos.y - playerBall.pos.y, mousePos.x - playerBall.pos.x);
    const angleInDeg = radToDeg(angle);
    // save human-readable angle (in degs)
    playerBall.angleInDeg = angleInDeg;
    playerBall.rotateTo(angle);
    // trigger player's ball movement towards mouse pointer
    playerBall.boost(20);
  });

  // Wall Collision

  k.onCollide('player-ball', 'wall', (pb, wall) => {
    // determine bounce angle
    if (wall.wallId === 'top-wall' || wall.wallId === 'bottom-wall') {
      const angle = -playerBall.angle;
      const angleInDeg = radToDeg(angle);
      playerBall.angleInDeg = angleInDeg;
      playerBall.rotateTo(angle);
    } else if (wall.wallId === 'left-wall') {
      const angle = Math.PI - playerBall.angle;
      const angleInDeg = radToDeg(angle);
      playerBall.angleInDeg = angleInDeg;
      playerBall.rotateTo(angle);
    } else if (wall.wallId === 'right-wall') {
      const angle = Math.PI - playerBall.angle;
      const angleInDeg = radToDeg(angle);
      playerBall.angleInDeg = angleInDeg;
      playerBall.rotateTo(angle);
    }
    // play sound
    k.play('click');
  });

  k.on('stopped', 'player-ball', () => {
    playerBall.isMoving = false;
  });

  k.onUpdate(() => {
    getOverHere(playerBall);
  });

  return playerBall;
}
