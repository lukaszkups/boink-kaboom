import k from './kaboom';
import pixelFont from '/fonts/minimal3x5.ttf';
import boinkSfx from '/audio/boink.webm';
import clickSfx from '/audio/click.webm';
import boostSfx from '/audio/boost.webm';
import sawSfx from '/audio/saw.webm';

export default function GameAssets () {
  k.loadSound('boink', boinkSfx);
  k.loadSound('click', clickSfx);
  k.loadSound('boost', boostSfx);
  k.loadSound('saw', sawSfx);

  k.loadFont('pixel', pixelFont);
}
