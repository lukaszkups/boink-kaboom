import k from './kaboom';
import { spawnEntity } from './helpers';
import Ball from './ball';

export const shakeEntity = (sizeX = 2, sizeY = 2, speed = 0.06) => {
  let originX = 0;
  let originY = 0;
  return {
    id: 'shake-entity',
    shakeEntity () {
      originX = this.pos.x;
      originY = this.pos.y;

      k.loop(speed, () => {
        if (this.pos.x !== originX && this.pos.y !== originY) {
          this.pos.x = originX;
          this.pos.y = originY;
        } else {
          this.pos.x += k.rand(sizeX);
          this.pos.y += k.rand(sizeY);
        }
      });
    }
  }
}

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
    shakeEntity(),
    'boost-ball',
    ...optsArr,
  ]);

  boostBall.shakeEntity();

  k.onCollide('player-ball', 'boost-ball', (pb, bb) => {
    bb.destroy();
    pb.speed = 30;
    k.play('boost');
    k.shake(5);
  })
}
