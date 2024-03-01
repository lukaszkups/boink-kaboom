import k from './kaboom';
import { spawnEntity } from './helpers';
import Ball from './ball';
import ParticleEntity from './particleEntity';

export const shakeEntity = () => {
  let originX = 0;
  let originY = 0;
  return {
    id: 'shake-entity',
    shakeEntity (sizeX = 1, sizeY = 1, speed = 0.05) {
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

  return {
    id: 'spawnParticles',
    spawnParticles (particleEntity, amount = 1, lifetime = 1, speed = 1, extraArgs = []) {
      k.loop(spawnInterval, () => {
        for(let counter = 0; counter < amount; counter++) {
          particleEntity(
            lifetime,
            speed,
            ...extraArgs
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
    spawnParticles(),
    'boost-ball',
    ...optsArr,
  ]);

  boostBall.shakeEntity();
  boostBall.spawnParticles(ParticleEntity);

  k.onCollide('player-ball', 'boost-ball', (pb, bb) => {
    bb.destroy();
    pb.speed = 30;
    k.play('boost');
    k.shake(5);
  })
}
