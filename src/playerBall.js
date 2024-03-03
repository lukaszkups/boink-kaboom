import k from './kaboom';
import { default as Ball } from './ball';
import { getOverHere, radToDeg } from './helpers';
import { checkIfGameOver, flash, flashColor } from './utils';
import Score from './score';

export default function PlayerBall () {
  const highScoreObj = new Score();
  highScoreObj.loadScore();

  // Create
  const playerBall = Ball([
    {
      isMoving: false,
    },
    k.color('#f1f100'),
    k.offscreen({ distance: 1 }),
    flash(),
    flashColor(),
    'player-ball',
  ]);
  playerBall.drag = 0.1;

  // Events

  k.onMousePress(() => {
    // check if user can still click
    const ui = k.get('game-ui');
    if (!ui?.length || !ui[0] || ui[0]?.clicksLeft <= 0) {
      return;
    }
    playerBall.trigger('reduce-clicks-left', 1);
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

  k.onCollide('player-ball', 'blade', (pb, b) => {
    playerBall.trigger('reduce-clicks-left', 5);
    k.play('saw');
    pb.flashColor(1.5, 0.1, '#ff0000');
    b.trigger('blade-destroyed');
    b.destroy();
  });

  k.on('flashColorEnd', 'player-ball', (pb) => {
    pb.use(k.color('#f1f100'));
  });

  k.on('stopped', 'player-ball', async () => {
    playerBall.isMoving = false;
    const uiQuery = k.get('game-ui');
    const ui = uiQuery?.length ? uiQuery[0] : null;
    if (ui && checkIfGameOver(ui, playerBall)) {
      await k.wait(1)
      highScoreObj.setScore(ui?.score || 0);
      k.go('game-over');
    }
  });

  k.onUpdate(() => {
    getOverHere(playerBall);
  });

  return playerBall;
}
