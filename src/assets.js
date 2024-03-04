import k from './kaboom';
import pixelFont from '/fonts/minimal3x5.ttf';

export default function GameAssets () {
  k.loadSound('boink', '/audio/boink.webm');
  k.loadSound('click', '/audio/click.webm');
  k.loadSound('boost', '/audio/boost.webm');
  k.loadSound('saw', '/audio/saw.webm');

  k.loadFont('pixel', pixelFont);
}
