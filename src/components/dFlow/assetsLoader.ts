import Notifier from "./notifier";
import { AssetInfo } from "./assetInfo";
import { MINIMUM_PROGRESS_VALUE_DISPLAY } from "./config";

export interface ProgressInfo {
  loaded: number;
  total: number;
  progress?: number;
}

export interface AssetsLoaderEventMap {
  progress: (e: ProgressInfo, target: AssetsLoader) => void;
  load: (priority: number, target: AssetsLoader) => void;
  error: (error: string, info: AssetInfo, target: AssetsLoader) => void;
}

type AssetLoaderInfo = ProgressInfo & { request: XMLHttpRequest, asset: AssetInfo };

export default class AssetsLoader extends Notifier<AssetsLoaderEventMap> {
  //private requests: XMLHttpRequest[] = [];
  //private progressInfos: ProgressInfo[] = [];

  private infos: AssetLoaderInfo[];
  private priorities: number[];
  private hasError: boolean = false;
  private lastProgress: number = MINIMUM_PROGRESS_VALUE_DISPLAY;
  public loaded: number;
  public total: number;
  public progress: number;

  constructor(private assets: AssetInfo[]) {
    super();

    this.priorities = this.assets
      .map(a => a.priority)
      .filter((v, i, s) => s.indexOf(v) === i)
      .sort((a, b) => b - a);

    this.assets = assets;

    this.infos = assets.map(asset => ({
      asset,
      loaded: 0,
      total: asset.estimatedSize,
      progress: 0,
      request: null
    } as AssetLoaderInfo));
  }

  async load() {
    for (const priority of this.priorities) {
      if (this.hasError) return;

      for (const info of this.infos.filter(a => a.asset.priority === priority)) {
        this.createRequest(info);
      }

      await new Promise(resolve => {
        this.addEventListenerOnce('load', resolve);
        this.addEventListenerOnce('error', resolve);
      });
    }
  }

  private createRequest(info: AssetLoaderInfo) {
    info.request = new XMLHttpRequest();
    info.request.open('GET', info.asset.dataUrl);
    info.request.responseType = 'blob';

    info.request.addEventListener('loadstart', e => {
      info.loaded = 0;
      info.total = info.asset.estimatedSize || 0;
    });

    info.request.addEventListener('progress', e => {
      info.loaded = e.loaded;
      info.total = e.total;
      this.onProgress(info, 'progress');
    });

    info.request.addEventListener('load', e => {
      info.loaded = info.total = e.total;

      info.asset.source = URL.createObjectURL(info.request.response);

      this.onProgress(info, 'load');
    });

    info.request.addEventListener('error', e => {
      if (this.hasError) return;

      this.hasError = true;

      this.abortAll();
      this.dispatchEvent('error', info.request.responseText, info.asset, this);
    });

    info.request.send();
  }

  private abortAll() {
    for (const info of this.infos) {
      if (!info.request) continue;

      info.request.abort();
    }
  }

  private onProgress(targetInfo: AssetLoaderInfo, caller: 'progress' | 'load') {
    const loaded = this.priorities.map(p => 0);
    const total = [...loaded];
    this.loaded = 0;
    this.total = 0;

    this.infos.forEach((info, i) => {
      loaded[info.asset.priority] += info.loaded;
      total[info.asset.priority] += info.total;
      this.loaded += info.loaded;
      this.total += info.total;
    });

    const progress = loaded.map((l, i) => l / total[i]);
    this.progress = this.loaded / this.total;

    if (this.lastProgress >= this.progress) {
      this.progress = this.lastProgress;
    }

    if (progress[targetInfo.asset.priority] === 1 && caller === 'load') {
      this.onLoad(targetInfo.asset.priority);
    }

    if (this.lastProgress === this.progress) return;

    this.dispatchEvent('progress', this, this);
  }

  private onLoad(priority: number) {
    this.dispatchEvent('load', priority, this);
  }
}