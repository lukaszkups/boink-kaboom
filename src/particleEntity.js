import k from './kaboom';

export default function ParticleEntity (args = [{ particleEndOfLife: 1 }]) {
  k.add([
    k.circle(3),
    k.color('#000000'),
    {
      particleEndOfLife: args.particleEndOfLife,
    },
    'particle-entity',
    ...args,
  ]);
}
