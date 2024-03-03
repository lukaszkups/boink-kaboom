import k from './kaboom';
import Ball from './ball';
import { radToDeg, reflectVelocity } from './helpers';
import { flash } from './utils';

export default function BoinkBall (optsArr = []) {
  const ball = Ball([
    k.color('#ffffff'),
    flash(),
    'boink-ball',
    ...optsArr,
  ]);

  k.onCollide('player-ball', 'boink-ball', (pb, b) => {
    // check if ball is not already flashing and should not have collision
    if (b.toBeDestroyed) {
      return;
    }
    // calculate and set new angle for player ball
    let angle = reflectVelocity(pb);
    // add some randomness to new angle
    const prevAngle = pb.agle;
    if (prevAngle <= angle) {
      angle += k.rand(100)/100;
    } else {
      angle -= k.rand(100)/100;
    }
    const angleInDeg = radToDeg(angle);
    pb.angleInDeg += angleInDeg;
    pb.rotateTo(angle);
    pb.speed -= 2;
    k.play('boink');
    // start flashing ball and remove its collision check
    b.toBeDestroyed = true;
    b.trigger('add-score', 1);
    b.flash(2);
  });

  ball.on('flashEnd', () => {
    ball.destroy();
  });
}
