import BoinkBall from './boinkBall';
import k from './kaboom';

export const radToDeg = (angle) => (angle * 180) / Math.PI;

export const generateBalls = (amount) => {
  for(let counter = 0; counter < amount; counter++) {
    k.add([
      BoinkBall([
        // randomize position for ball
        k.pos(
          k.rand(8, k.width()-8),
          k.rand(8, k.height()-8),
        )
      ]),
    ]);
  }
}
