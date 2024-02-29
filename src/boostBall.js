import k from './kaboom';
import { spawnEntity } from './helpers';
import Ball from './ball';

export const spawnParticles = () => {
  const spawnInterval = 0.1;
  let _loop = null;

  return {
    id: 'spawnParticles',
    spawnParticles (particleEntity, amount = 1, lifetime = 1) {
      const particleEndOfLife = k.time() + lifetime;

      k.loop(spawnInterval, () => {
        for(let counter = 0; counter < amount; counter++) {
          spawnEntity(
            particleEntity([
              k.pos(this.pos.x, this.pos.y),
              { 
                particleEndOfLife: particleEndOfLife,
              }
            ]), 
            1,
          );
        }
      });
    },
  }
}

export default function BoostBall (optsArr = []) {
  const boostBall = Ball([
    k.color('#000000'),
    'boost-ball',
    ...optsArr,
  ]);

  k.onCollide('player-ball', 'boost-ball', (pb, bb) => {
    bb.destroy();
    pb.speed = 50;
    k.play('boost');
    k.shake(5);
  })
}
