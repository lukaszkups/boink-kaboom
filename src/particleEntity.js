import k from './kaboom';

export default function ParticleEntity (particleEndOfLife = 1, args = []) {
  k.add([
    k.circle(3),
    k.color('#000000'),
    {
      particleEndOfLife: particleEndOfLife,
    },
    'particle-entity',
    ...args,
  ]);
}
