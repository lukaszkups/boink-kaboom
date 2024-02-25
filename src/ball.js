import k from './kaboom';

export default function Ball () {
  return k.add([
    k.circle(16),
    k.pos(
      k.width()/2,
      k.height()/2
    )
  ]);
};
