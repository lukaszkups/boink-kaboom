import kaboom from "kaboom";

const k  = kaboom({
  width: 800,
  height: 600,
  scale: 1,
  debug: true,
  global: false,
});

k.setGravity(0);

export default k;
