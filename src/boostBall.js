import k from './kaboom';
import Ball from './ball';
import { shakeEntity, spawnParticles } from './utils';

export default function BoostBall (optsArr = []) {
  const boostBall = Ball([
    k.color('#000000'),
    shakeEntity(),
    spawnParticles(),
    'boost-ball',
    ...optsArr,
  ]);

  boostBall.shakeEntity();
  boostBall.spawnParticles(0.25, 4, 1, 50);

  k.onCollide('player-ball', 'boost-ball', (pb, bb) => {
    bb.destroy();
    pb.speed = 40;
    k.play('boost');
    k.shake(5);
  })
}
