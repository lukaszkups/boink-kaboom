import './style.css'
import k from './kaboom';
import game from './game';
import { GameOver } from './gameOver';

k.scene('game', game);
k.scene('game-over', GameOver);

k.scene('main', () => {
  k.go('game');
});

k.go('main');
