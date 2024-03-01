import { boost } from './ball';
import k from './kaboom';

export const monitorParticleLifespan = () => {
  let timeOfDeath = 0;
  return {
    id: 'monitor-particle-lifespan',
    add () {
      timeOfDeath = this.particleEndOfLife + k.dt();
    },
    update () {
      console.log(111, this);
      if (k.dt() >= timeOfDeath) {
        this.destroy();
      }
    }
  }
}

export const randomizeParticleMovement = (particleSpeed = 10) => {
  return {
    id: 'randomize-particle-movement',
    add() {
      const randomAngle = k.rand(360);
      this.angleInDeg = randomAngle;
      // this.rotateTo(randomAngle);
      this.boost(particleSpeed);
    }
  }
}

export default function ParticleEntity (particleEndOfLife = 1, particleSpeed = 10, args = []) {
  k.add([
    k.circle(3),
    k.color('#000000'),
    {
      particleEndOfLife: particleEndOfLife,
      angleInDeg: 0,
    },
    k.area(),
    k.anchor('center'),
    k.body(),
    k.pos(),
    boost(),
    randomizeParticleMovement(particleSpeed),
    monitorParticleLifespan(),
    'particle-entity',
    ...args,
  ]);
}
