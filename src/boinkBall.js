import k from './kaboom';
import Ball from './ball';

export default function BoinkBall (optsArr = []) {
  const ball = Ball([
    k.color('#ffffff'),
    ...optsArr,
  ]);

  k.onCollide('player-ball', 'ball', (pb, b) => {
    k.play('boink');
    b.destroy();
  });
}
