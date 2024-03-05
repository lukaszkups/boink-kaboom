import { radToDeg } from './helpers';
import k from './kaboom';

export default function Magnet(optsArr = []) {
  const mag = k.add([
    k.sprite('magnet'),
    k.area(),
    k.anchor('center'),
    k.pos(100, 100),
    k.body({ isStatic: true }),
    k.rotate(0),
    k.scale(0.1),
    {
      angleInDeg: 0,
    },
    'magnet',
    ...optsArr,
  ]);

  k.onUpdate(() => {
    const pb = k.get('player-ball');
    if (pb?.length) {
      const playerBall = pb[0];
      const angle = Math.atan2(playerBall.pos.y - mag.pos.y, playerBall.pos.x - mag.pos.x);
      const angleInDeg = radToDeg(angle);
      mag.angleInDeg = angleInDeg;
      mag.rotateTo(angleInDeg);
    }
  });

  k.onCollide('player-ball', 'magnet', (pb, m) => {
    pb.speed = 1;
    pb.moveTo(m.pos.x, m.pos.y, 5);
    k.play('magnet');
    m.destroy();
  });
}
