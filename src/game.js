import k from './kaboom';
import GameBounds from './gameBounds';
import GameAudio from './audio';
import PlayerBall from './playerBall';
import { spawnEntity } from './helpers';
import BoinkBall from './boinkBall';
import BoostBall from './boostBall';

export default function Game () {
  GameAudio();
  const { topWall, bottomWall, leftWall, rightWall } = GameBounds();
  const playerBall = PlayerBall();
  let level = 1;
  let sawCounter = 0;

  const loadLevel = (level) => {
    spawnEntity(BoinkBall, level + 3);
    if (level > 2 && k.rand(5) >= 4) {
      spawnEntity(BoostBall, k.rand(2));
    }
  }

  loadLevel(1);

  k.onUpdate(() => {
    // check if can launch next level
    const player = k.get('player-ball');
    if (!player[0]?.isMoving) {
      const boinkBalls = k.get('boink-ball');
      if (!boinkBalls?.length) {
        loadLevel(level++);
      }
    }
  });
}