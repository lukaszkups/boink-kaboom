import { spawnParticles } from './utils';
import { ballSize } from './helpers';
import k from './kaboom';

export default function Blade (args = []) {
  const bladeSize = ballSize*2;
  const blade = k.add([
    k.rect(bladeSize, bladeSize),
    k.color('#c0c0c0'),
    k.anchor('center'),
    k.pos(),
    k.area(),
    k.body(),
    k.rotate(),
    spawnParticles(),
    'blade',
    ...args,
  ]);

  blade.spawnParticles (0.25, 5, 0.5, 90, [
    k.color('#ffff11'),
    k.z(-1),
  ]);

  k.onUpdate(() => {
    blade.rotateBy(15);
  });
}