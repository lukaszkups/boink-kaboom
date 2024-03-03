import k from './kaboom';
import Ball from './ball';
import { radToDeg, reflectVelocity } from './helpers';


export const flash = () => {
  const flashInterval = 0.15;
  let _loop = null;

  return {
    id: 'flash',
    get isFlashing() {
      return _loop !== null;
    },
    flash (duration = 0) {
      const end = k.time() + duration;

      this.trigger('flashStart');
      _loop = k.loop(flashInterval, () => {
        if (k.time() >= end) {
          this.cancelFlash();
        }
        this.hidden = !this.hidden;
      })
    },
    cancelFlash () {
      if (!_loop) {
        return;
      }
      this.trigger('flashEnd');
      _loop.cancel();
      _loop = null;
    }
  }
}

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
    const angle = reflectVelocity(pb);
    const angleInDeg = radToDeg(angle);
    pb.angleInDeg += angleInDeg;
    pb.rotateTo(k.rand(15) + angle);
    pb.speed -= 2;
    k.play('boink');
    // start flashing ball and remove its collision check
    b.toBeDestroyed = true;
    b.flash(2);
  });

  k.on('flashEnd', 'ball', (b) => {
    b.destroy();
  });
}
