import k from './kaboom';
import GameBounds from './gameBounds';
import GameAssets from './assets';
import PlayerBall from './playerBall';
import { spawnEntity } from './helpers';
import BoinkBall from './boinkBall';
import BoostBall from './boostBall';
import Blade from './blade';
import UI from './ui';
import Magnet from './magnet';

export default function Game () {
  GameAssets();
  UI();
  const { topWall, bottomWall, leftWall, rightWall } = GameBounds();
  const playerBall = PlayerBall();
  let level = 1;
  let sawCounter = 0;
  let bladeCounter = 0;


  const loadLevel = (level) => {
    spawnEntity(BoinkBall, level + 3);
    // Spawn boosters
    if (level > 2 && k.rand(5) >= 2) {
      spawnEntity(BoostBall, k.rand(2));
    }
    // Spawn magnet, same rules as boosters but are independently randomized
    if (level > 2 && k.rand(5) >= 2) {
      spawnEntity(Magnet, k.rand(2));
    }
    // Spawn blades
    if (level > 2 && k.rand(5) >= 3 && bladeCounter < 2) {
      spawnEntity(Blade, k.rand(2));
      bladeCounter++;
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
        player[0].trigger('add-clicks-left', 1);
      }
    }
  });

  k.on('blade-destroyed', () => {
    bladeCounter--;
  });
}