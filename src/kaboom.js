import kaboom from "kaboom";

const k  = kaboom({
  width: 800,
  height: 600,
  scale: 1,
  global: false,
  debug: false,
  pixelDensity: 2,
});

k.setGravity(0);

export default k;
