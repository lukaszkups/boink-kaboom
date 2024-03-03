import GameAssets from './assets';
import k from './kaboom';
import Score from './score';

export function GameOver () {
  GameAssets();

  const scoreObj = new Score();
  scoreObj.loadScore();
  const score = scoreObj.getScore();

  const gameOver = k.add([
    k.fixed(),
  ]);
  k.setBackground('#000000');

  const titlePos = k.vec2(k.width()/2, k.height()/3);
  const scorePos = k.vec2(k.width()/2, k.height()/2);

  gameOver.on('draw', () => {
    k.drawText({
      text: `Game Over!`,
      size: 36,
      font: 'pixel',
      pos: titlePos,
      anchor: 'center',
    });

    if (score > 0) {
      k.drawText({
        text: `Best score: ${score}`,
        size: 24,
        font: 'pixel',
        pos: scorePos,
        anchor: 'center',
      });
    }
  });

  k.onMousePress(() => {
    k.go('main');
  });
}
