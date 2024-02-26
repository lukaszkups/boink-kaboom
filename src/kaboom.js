import kaboom from "kaboom";

const k  = kaboom({
  width: 640,
  height: 480,
  scale: 1,
  debug: true,
});

k.setGravity(0);

export default k;
