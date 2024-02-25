import './style.css'
import k from './kaboom';
import game from './game';

k.scene('game', game);

k.scene('main', () => {
  k.go('game');
});

k.go('main');
