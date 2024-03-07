import kaboom from 'kaboom';
import { getGameSizes } from './helpers';

const { width, height, scale } = getGameSizes();

const k  = kaboom({
  width: width,
  height: height,
  scale: scale,
  global: false,
  debug: false,
  pixelDensity: 2,
});

k.setGravity(0);

export default k;
