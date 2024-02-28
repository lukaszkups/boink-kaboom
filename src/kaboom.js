import kaboom from "kaboom";
import { Engine, Body, Bodies, Runner, Composite } from 'matter-js'

const k  = kaboom({
  width: 640,
  height: 480,
  scale: 1,
  debug: true,
  global: false,
});

k.setGravity(0);

const matterEngine = Engine.create();

k.matter = {
  Body, Body,
  Bodies: Bodies,
  Composite: Composite,
  Engine: Engine,
  engine: matterEngine,
  world: matterEngine.world,
  runner: Runner.create(),
  bodies: [],
}

export default k;
