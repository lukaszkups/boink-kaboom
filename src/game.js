import k from './kaboom';
import GameBounds from './gameBounds';
import GameAudio from './audio';
import PlayerBall from './playerBall';
import { generateBalls } from './helpers';

export default function Game () {
  GameAudio();
  const { topWall, bottomWall, leftWall, rightWall } = GameBounds();
  const playerBall = PlayerBall();
  generateBalls(3);
}