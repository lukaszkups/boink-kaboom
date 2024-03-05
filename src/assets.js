import k from './kaboom';
import pixelFont from '/fonts/minimal3x5.ttf';
import boinkSfx from '/audio/boink.webm';
import clickSfx from '/audio/click.webm';
import boostSfx from '/audio/boost.webm';
import sawSfx from '/audio/saw.webm';
import magnetSfx from '/audio/magnet.webm';
import magnetImg from '/images/magnet.png';

export default function GameAssets () {
  k.loadSound('boink', boinkSfx);
  k.loadSound('click', clickSfx);
  k.loadSound('boost', boostSfx);
  k.loadSound('saw', sawSfx);
  k.loadSound('magnet', magnetSfx);

  k.loadFont('pixel', pixelFont);

  k.loadSprite('magnet', magnetImg);
}
