import { boost } from './ball';
import k from './kaboom';

export const monitorParticleLifespan = () => {
  let timeOfDeath = 0;
  return {
    id: 'monitor-particle-lifespan',
    add () {
      timeOfDeath = this.particleLifespan + k.time();
    },
    update () {
      if (k.time() >= timeOfDeath) {
        this.destroy();
      }
    }
  }
}

export const randomizeParticleMovement = (particleSpeed = 10) => {
  return {
    id: 'randomize-particle-movement',
    require: ['body'],
    add() {
      const randomAngle = k.rand(360);
      this.angleInDeg = randomAngle;
      this.drag = 0;
      this.rotateTo(randomAngle);
      this.boost(particleSpeed);
    }
  }
}

export default function ParticleEntity (particleLifespan = 1, particleSpeed = 10, args = []) {
  k.add([
    k.circle(3),
    k.color('#000000'),
    {
      particleLifespan: particleLifespan,
      angleInDeg: 0,
    },
    k.area(),
    k.anchor('center'),
    k.body(),
    k.pos(),
    k.rotate(),
    boost(),
    randomizeParticleMovement(particleSpeed),
    monitorParticleLifespan(),
    'particle-entity',
    ...args,
  ]);
}
