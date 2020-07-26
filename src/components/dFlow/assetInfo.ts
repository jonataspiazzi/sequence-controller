import Notifier from "./notifier";

export interface AssetInfoMap {
  load: () => void;
}

let assetId = 1;

export class AssetInfo extends Notifier<AssetInfoMap> {
  readonly assetId: number;
  readonly dataUrl: string;
  readonly estimatedSize: number;
  readonly type: string;
  loaded: boolean;
  priority: number;
  private _source: string;

  constructor(dataUrl: string, estimatedSize: number, type: string, priority: number = 0) {
    super();
    this.assetId = assetId++;
    this.dataUrl = dataUrl;
    this.estimatedSize = estimatedSize;
    this.type = type;
    this.priority = priority;
    this.loaded = false;
    this._source = null;
  }

  get source() {
    return this._source;
  }

  set source(src: string) {
    this._source = src;
    this.loaded = !!src;

    if (this.loaded) this.dispatchEvent('load');
  }
}

export class VideoInfo extends AssetInfo {
  constructor(dataUrl: string, estimatedSize: number, readonly frameCount: number = 0) {
    super(dataUrl, estimatedSize, 'video/mp4');
  }
}

export class ImageInfo extends AssetInfo {
  constructor(dataUrl: string, estimatedSize: number, type: string = 'image/png', priority: number = 0) {
    super(dataUrl, estimatedSize, type, priority);
  }
}