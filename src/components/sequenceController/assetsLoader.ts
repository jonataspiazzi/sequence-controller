import Notifier from "./notifier";
import { AssetInfo } from "./types";
import { SPLASH_PROGRESS_SEGMENT } from "./config";

export interface ProgressInfo {
  loaded: number;
  total: number;
  progress?: number;
}

export interface AssetsLoaderEventMap {
  progress: (e: ProgressInfo) => void;
  load: (data: AssetInfo[]) => void;
  error: (error: string, info: AssetInfo) => void;
}

export default class AssetsLoader extends Notifier<AssetsLoaderEventMap> {
  private requests: XMLHttpRequest[] = [];
  private progressInfos: ProgressInfo[] = [];
  private hasError: boolean = false;
  private lastProgress: number = SPLASH_PROGRESS_SEGMENT;

  constructor(private sequenceInfos: AssetInfo[]) {
    super();
  }

  load() {
    for (const info of this.sequenceInfos) {
      this.createRequest(info);
    }
  }

  private createRequest(sInfo: AssetInfo) {
    const req = new XMLHttpRequest();
    req.open('GET', sInfo.dataUrl);
    req.responseType = 'blob';
    this.requests.push(req);

    const pInfo: ProgressInfo = { total: 0, loaded: 0 };
    this.progressInfos.push(pInfo);

    req.addEventListener('loadstart', e => {
      pInfo.loaded = 0;
      pInfo.total = sInfo.estimatedSize || 0;
    });

    req.addEventListener('progress', e => {
      pInfo.loaded = e.loaded;
      pInfo.total = e.total;
      this.onProgress();
    });

    req.addEventListener('load', e => {
      pInfo.loaded = pInfo.total = e.total;

      sInfo.source = URL.createObjectURL(req.response);

      this.onProgress();
    });

    req.addEventListener('error', e => {
      if (this.hasError) return;

      this.hasError = true;

      this.abortAll();
      this.dispatchEvent('error', req.responseText, sInfo);
    });

    req.send();
  }

  private abortAll() {
    for (const req of this.requests) {
      req.abort();
    }
  }

  private onProgress() {
    const loaded = this.progressInfos.reduce((ac, i) => ac + i.loaded, 0);
    const total = this.progressInfos.reduce((ac, i) => ac + i.total, 0);
    const progress = loaded / total;

    if (this.lastProgress >= progress) return;
    this.lastProgress = progress;

    console.log(`l = ${loaded}, t = ${total}, p = ${progress}`);

    if (loaded === total) this.dispatchEvent('load', this.sequenceInfos);

    this.dispatchEvent('progress', { loaded, total, progress });
  }
}