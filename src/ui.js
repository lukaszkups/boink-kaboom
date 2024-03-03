import k from './kaboom';
import Score from './score';

export default function UI () {
  const score = new Score();
  score.loadScore();

  const ui = k.add([
    k.fixed(),
    k.z(100),
    'game-ui',
    {
      clicksLeft: 50,
      score: 0,
      bestScore: 0,
    },
  ]);

  ui.bestScore = score.getScore();

  const clicksLeftPos = k.vec2(5, 5);
  const scorePos = k.vec2(k.width()/2, 5)
  const bestScorePos = k.vec2(k.width() - (k.width()/3), 5)

  ui.on('draw', () => {
    k.drawText({
      text: `Clicks left: ${ui.clicksLeft}`,
      size: 24,
      font: 'pixel',
      pos: clicksLeftPos,
    });

    k.drawText({
      text: `Score: ${ui.score}`,
      size: 24,
      font: 'pixel',
      pos: scorePos,
    });

    if (ui.bestScore) {
      k.drawText({
        text: `Best: ${ui.bestScore}`,
        size: 24,
        font: 'pixel',
        pos: bestScorePos,
      });
    }
  });

  k.on('reduce-clicks-left', 'player-ball', (pb, amount = 1) => {
    ui.clicksLeft -= amount;
  });

  k.on('add-clicks-left', 'player-ball', (g, amount = 1) => {
    ui.clicksLeft += amount;
  });

  k.on('add-score', 'boink-ball', (bb, amount = 1) => {
    ui.score += amount;
  });

  return ui;
}
