
import { AssetInfo, AudioInfo, VideoInfo, ImageInfo, FrameSequenceInfo } from '../../dFlow/dataModels/assetInfo';

export const assets = {
  a360: new FrameSequenceInfo(require('./assets/a360.fs.25.mp4'), 3417236, 25),
  audioOff: new ImageInfo(require('./assets/audioOff.png'), 1802),
  audioOn: new ImageInfo(require('./assets/audioOn.png'), 3697),
  base: new ImageInfo(require('./assets/base.jpg'), 836608, 'image/jpg'),
  cursorArrowCenter: new ImageInfo(require('./assets/cursorArrowCenter.png'), 17454),
  cursorArrowLeft: new ImageInfo(require('./assets/cursorArrowLeft.png'), 18475),
  cursorArrowRight: new ImageInfo(require('./assets/cursorArrowRight.png'), 18616),
  entrance: new VideoInfo(require('./assets/entrance.mp4'), 10935513),
  fullscreenDisable: new ImageInfo(require('./assets/fullscreenDisable.png'), 15655),
  fullscreenEnable: new ImageInfo(require('./assets/fullscreenEnable.png'), 15674),
  instrucoes: new ImageInfo(require('./assets/instrucoes.jpg'), 1012903, 'image/jpg'),
  light: new ImageInfo(require('./assets/light.png'), 857202),
  live: new VideoInfo(require('./assets/live.mp4'), 31181464),
  liveFinalFrame: new ImageInfo(require('./assets/liveFinalFrame.png'), 2190809),
  loading: new ImageInfo(require('./assets/loading.png'), 1992091),
  loungeMusic: new AudioInfo(require('./assets/loungeMusic.mp3'), 2990938),
  overLive: new ImageInfo(require('./assets/overLive.png'), 185686),
  overReception: new ImageInfo(require('./assets/overReception.png'), 113472),
  overTotem: new ImageInfo(require('./assets/overTotem.png'), 59407),
  promoterAvatar: new ImageInfo(require('./assets/promoterAvatar.png'), 214336),
  receptionBackward: new VideoInfo(require('./assets/receptionBackward.mp4'), 12578368),
  receptionForward: new VideoInfo(require('./assets/receptionForward.mp4'), 11647417),
  sendIcon: new ImageInfo(require('./assets/sendIcon.png'), 1973),
  slide01: new ImageInfo(require('./assets/slide01.jpg'), 225810, 'image/jpg'),
  slide02: new ImageInfo(require('./assets/slide02.jpg'), 1644640, 'image/jpg'),
  slide03: new ImageInfo(require('./assets/slide03.jpg'), 131377, 'image/jpg'),
  slide04: new ImageInfo(require('./assets/slide04.jpg'), 181723, 'image/jpg'),
  slide05: new ImageInfo(require('./assets/slide05.jpg'), 3003794, 'image/jpg'),
  slide06: new ImageInfo(require('./assets/slide06.jpg'), 2531544, 'image/jpg'),
  slideArrowLeft: new ImageInfo(require('./assets/slideArrowLeft.png'), 33035),
  slideArrowRight: new ImageInfo(require('./assets/slideArrowRight.png'), 33576),
  slideClose: new ImageInfo(require('./assets/slideClose.png'), 25663),
  totemBackawrd: new VideoInfo(require('./assets/totemBackawrd.mp4'), 17353856),
  totemFoward: new VideoInfo(require('./assets/totemFoward.mp4'), 18077565),

};

export const assetsList: AssetInfo[] = Object.getOwnPropertyNames(assets).map(prop => (assets as any)[prop]);
