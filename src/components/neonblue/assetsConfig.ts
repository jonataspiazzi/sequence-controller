import { AssetInfo, VideoInfo, ImageInfo } from '../../dFlow/dataModels/assetInfo';

export const assets = {
  frameInitial: new ImageInfo(require('./assets/stand-splash.jpg'), 498332, 'image/jpg', 1),
  video180: new VideoInfo(require('./assets/stand-180.mp4'), 3478475, 49),
  videoCameraB: new VideoInfo(require('./assets/stand-camera-b.mp4'), 6620145),
  videoCameraF: new VideoInfo(require('./assets/stand-camera-f.mp4'), 6815145),
  videoNotebookB: new VideoInfo(require('./assets/stand-notebook-b.mp4'), 3801815),
  videoNotebookF: new VideoInfo(require('./assets/stand-notebook-f.mp4'), 3679800),
  videoPromoterB: new VideoInfo(require('./assets/stand-promoter-b.mp4'), 4098461),
  videoPromoterF: new VideoInfo(require('./assets/stand-promoter-f.mp4'), 4152317),
  cursorLeft: new ImageInfo(require('./assets/cursor-arrow-left.png'), 8503),
  cursorRight: new ImageInfo(require('./assets/cursor-arrow-right.png'), 20192),
  layerHelp: new ImageInfo(require('./assets/help-layer.png'), 124389),
  layerTotemCameraHighlight: new ImageInfo(require('./assets/overlay-camera.png'), 72825),
  layerTotemPromoterHighlight: new ImageInfo(require('./assets/overlay-promoter.png'), 62118),
  layerTotemNotebookHighlight: new ImageInfo(require('./assets/overlay-notebook.png'), 74385),
  layerCameraHelp: new ImageInfo(require('./assets/camera-help-layer.png'), 129118),
  layerNotebookHelp: new ImageInfo(require('./assets/notebook-help-layer.png'), 97929),
  layerNotebookScreen: new ImageInfo(require('./assets/notebook-screen-layer.png'), 4998),
  promoterAvatar: new ImageInfo(require('./assets/promoter-avavatar.png'), 214336),
  sendIcon: new ImageInfo(require('./assets/send-icon.png'), 1629),
  layerPromoterScreen: new ImageInfo(require('./assets/promoter-screen.jpg'), 331792)
};

export const assetsList: AssetInfo[] = Object.getOwnPropertyNames(assets).map(prop => (assets as any)[prop]);