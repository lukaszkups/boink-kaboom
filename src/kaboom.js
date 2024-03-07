import kaboom from 'kaboom';
import { getGameSizes } from './helpers';

const { width, height } = getGameSizes();

const k  = kaboom({
  width: width,
  height: height,
  scale: 1,
  global: false,
  debug: false,
  pixelDensity: 2,
});

k.setGravity(0);

export default k;
