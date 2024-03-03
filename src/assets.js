import k from './kaboom';

export default function GameAssets () {
  k.loadSound('boink', '/audio/boink.webm');
  k.loadSound('click', '/audio/click.webm');
  k.loadSound('boost', '/audio/boost.webm');
  k.loadSound('saw', '/audio/saw.webm');

  k.loadFont('pixel', '/fonts/minimal3x5.ttf');
}
