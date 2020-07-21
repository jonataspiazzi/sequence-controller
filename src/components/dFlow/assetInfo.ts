import Notifier from "./notifier";

export interface AssetInfoMap {
  load: () => void;
}

export class AssetInfo extends Notifier<AssetInfoMap> {
  dataUrl: string;
  estimatedSize: number;
  type: string;
  loaded: boolean;
  priority: number;
  private __source: string;

  constructor(dataUrl: string, estimatedSize: number, type: string, priority: number = 0) {
    super();
    this.dataUrl = dataUrl;
    this.estimatedSize = estimatedSize;
    this.type = type;
    this.priority = priority;
    this.loaded = false;
    this.__source = null;
  }

  get source() {
    return this.__source;
  }

  set source(src: string) {
    this.__source = src;
    this.loaded = !!src;

    if (this.loaded) this.dispatchEvent('load');
  }
}

export class VideoInfo extends AssetInfo {
  constructor(dataUrl: string, estimatedSize: number) {
    super(dataUrl, estimatedSize, 'video/mp4');
  }
}

export class ImageInfo extends AssetInfo {
  constructor(dataUrl: string, estimatedSize: number, type: string = 'image/png', priority: number = 0) {
    super(dataUrl, estimatedSize, type, priority);
  }
}