import { AssetInfo, VideoInfo, ImageInfo } from "../../dFlow/assetInfo";

export const assets = {
  frameInitial: new ImageInfo(require('./stand-splash.jpg'), 498332, 'image/jpg', 1),
  video180: new VideoInfo(require('./stand-180.mp4'), 3478475),
  videoCameraB: new VideoInfo(require('./stand-camera-b.mp4'), 6620145),
  videoCameraF: new VideoInfo(require('./stand-camera-f.mp4'), 6815145),
  videoNotebookB: new VideoInfo(require('./stand-notebook-b.mp4'), 3801815),
  videoNotebookF: new VideoInfo(require('./stand-notebook-f.mp4'), 3679800),
  videoPromoterB: new VideoInfo(require('./stand-promoter-b.mp4'), 4098461),
  videoPromoterF: new VideoInfo(require('./stand-promoter-f.mp4'), 4152317),
  cursorLeft: new ImageInfo(require('./cursor-arrow-left.png'), 8503),
  cursorRight: new ImageInfo(require('./cursor-arrow-right.png'), 20192),
  layerHelp: new ImageInfo(require('./help-layer.png'), 124389),
  layerTotemCameraHighlight: new ImageInfo(require('./overlay-camera.png'), 72825),
  layerTotemPromoterHighlight: new ImageInfo(require('./overlay-promoter.png'), 62118),
  layerTotemNotebookHighlight: new ImageInfo(require('./overlay-notebook.png'), 74385),
  layerCameraHelp: new ImageInfo(require('./camera-help-layer.png'), 129118),
  layerNotebookHelp: new ImageInfo(require('./notebook-help-layer.png'), 97929),
  layerNotebookScreen: new ImageInfo(require('./notebook-screen-layer.png'), 4998),
  promoterAvatar: new ImageInfo(require('./promoter-avavatar.png'), 214336),
  sendIcon: new ImageInfo(require('./send-icon.png'), 1629),
  layerPromoterScreen: new ImageInfo(require('./promoter-screen.jpg'), 331792)
};

export const assetsList: AssetInfo[] = Object.getOwnPropertyNames(assets).map(prop => (assets as any)[prop]);