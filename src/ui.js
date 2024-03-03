import k from './kaboom';

export function UI () {
  const ui = k.add([
    k.fixed(),
    k.z(100),
    'ui-layer',
    {
      clicksLeft: 50,
      score: 0,
    },
  ]);

  ui.on('draw', () => {
    k.drawText({
      text: `Clicks left: ${ui.clicksLeft}`,
      size: 14,
      font: 'sink',
      pos: (k.vec2(5, 5)),
    });

    k.drawText({
      text: `Score: ${ui.score}`,
      size: 14,
      font: 'sink',
      pos: (k.vec2(120, 5)),
    });
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
}
