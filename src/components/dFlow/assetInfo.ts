export class AssetInfo {
  dataUrl: string;
  estimatedSize: number;
  type: string;
  loaded: boolean;
  priority: number;
  source: string;

  constructor(dataUrl: string, estimatedSize: number, type: string, priority: number = 0) {
    this.dataUrl = dataUrl;
    this.estimatedSize = estimatedSize;
    this.type = type;
    this.priority = priority;
    this.loaded = false;
    this.source = null;
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