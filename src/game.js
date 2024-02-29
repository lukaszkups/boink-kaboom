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
  spawnEntity(BoinkBall, 5);
  spawnEntity(BoostBall, 5);
}