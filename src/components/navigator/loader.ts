import { EventEmitter } from "events";
import Notifier from "./notifier";
import { totalmem } from "os";

export interface ImageLoaderConfig {
  element: HTMLElement;
  images: string[];
}

export interface ImageLoaderEventMap {
  start: () => void;
  firstFrame: (frame: string) => void;
  progress: (progress: number) => void;
  finished: (images: string[]) => void;
}

type LoadInfo = {
  req: XMLHttpRequest;
  loaded?: number;
  total?: number;
  result?: string;
  finished?: boolean;
  error?: boolean;
  isFirstFrame?: boolean;
}

export default class ImageLoader extends Notifier<ImageLoaderEventMap> {
  private infos: LoadInfo[] = [];
  private progress: number;

  constructor(minProgress: number = .04) {
    super();
    this.progress = minProgress;
  }

  private calculateProgress() {
    if (!this.infos.length) return this.progress;

    let loaded = 0;
    let total = 0;

    for (const info of this.infos) {
      if (!info.total) return this.progress;

      loaded += info.loaded;
      total += info.total;
    }

    const curr = loaded / total;

    return curr > this.progress ? curr : this.progress;
  }

  private allFinished() {
    return this.infos.reduce((ac, i) => ac && i.finished, true);
  }

  private onProgress(caller: string) {
    const newProg = this.calculateProgress();
    if (newProg === this.progress) return;

    this.progress = newProg;

    this.emit('progress', this.progress);

    if (this.progress > .99) {
      console.table(this.infos);
      console.log('caller ', caller);
    }

    if (this.allFinished()) {
      console.log('finished was called');
      this.emit('finished', this.infos.map(i => i.result));
    }
  }

  private createLoader(url: string): LoadInfo {
    const info: LoadInfo = { req: new XMLHttpRequest() };
    info.req.open('GET', url);
    info.req.responseType = 'blob';

    info.req.onloadstart = e => {
      info.total = 0;
      info.loaded = 0;
      info.finished = false;
      info.error = false;
    }

    info.req.onprogress = e => {
      info.total = e.total;
      info.loaded = e.loaded;
      this.onProgress('onprogress');
    };

    info.req.onload = e => {
      console.log('onload was called', info.isFirstFrame);

      info.total = e.total;
      info.loaded = e.loaded;
      info.finished = true;
      info.result = URL.createObjectURL(info.req.response);

      if (info.isFirstFrame) {
        this.emit('firstFrame', info.result);
        return;
      }



      this.onProgress('onload');
    };

    info.req.onerror = e => {
      console.log('onerror was called');
      info.finished = true;
      info.error = true;
      info.loaded = 0;

      if (info.isFirstFrame) {
        this.emit('firstFrame', info.result);
      }

      this.onProgress('onerror');
    };

    return info;
  }

  load(imageUrls: string[]) {
    for (const url of imageUrls) {
      this.infos.push(this.createLoader(url));
    }

    const firstIndex = Math.floor(this.infos.length / 2);
    this.infos[firstIndex].isFirstFrame = true;
    this.infos[firstIndex].req.send();

    this.emit('start');

    this.addEventListener('firstFrame', () => {
      for (const info of this.infos) {
        if (info.finished) continue;
        info.req.send();
      }
    });
  }
}
