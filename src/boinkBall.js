import k from './kaboom';
import Ball from './ball';
import { radToDeg, reflectVelocity } from './helpers';

export default function BoinkBall (optsArr = []) {
  const ball = Ball([
    k.color('#ffffff'),
    ...optsArr,
  ]);

  k.onCollide('player-ball', 'ball', (pb, b) => {
    // check if ball is not already flashing and should not have collision
    if (b.toBeDestroyed) {
      return;
    }
    // calculate and set new angle for player ball
    const angle = reflectVelocity(pb);
    const angleInDeg = radToDeg(angle);
    pb.angleInDeg = angleInDeg;
    pb.rotateTo(angle);
    k.play('boink');
    // start flashing ball and remove its collision check
    b.toBeDestroyed = true;
    b.flash(2);
  });

  k.on('flashEnd', 'ball', (b) => {
    b.destroy();
  });
}
