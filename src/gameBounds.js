import k from './kaboom';

export default function GameBounds () {
  k.setBackground('#1177ff');
  // top wall
  k.add([
    k.rect(
      k.width(), 
      10
    ),
    k.pos(0, 10),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor('topleft'),
    k.color(k.RED),
    { wallId: 'top-wall' },
    'wall',
  ]);

  // bottom wall
  k.add([
    k.rect(
      k.width(), 
      10
    ),
    k.pos(0, k.height()-20),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor('topleft'),
    k.color(k.RED),
    { wallId: 'bottom-wall' },
    'wall',
  ]);

  // left wall
  k.add([
    k.rect( 
      10,
      k.height(),
    ),
    k.pos(k.width()-20, 0),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor('topleft'),
    k.color(k.RED),
    { wallId: 'right-wall' },
    'wall',
  ]);

  // right wall
  k.add([
    k.rect( 
      10,
      k.height(),
    ),
    k.pos(10, 0),
    k.area(),
    k.body({ isStatic: true }),
    k.anchor('topleft'),
    k.color(k.RED),
    { wallId: 'left-wall' },
    'wall',
  ]);
}