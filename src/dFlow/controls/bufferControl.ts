import { VideoInfo as AssetInfo } from "../dataModels/assetInfo";
import Notifier from "../helpers/notifier";
import FrameControl from "./frameControl";

export interface BufferControlMap {
  ended: (id: BufferId) => void;
  assetChanged: (video: AssetInfo) => void;
}

export type BufferId = 0 | 1;
type BufferDictionary<T> = { [key in BufferId]: T };

export default class BufferControl extends Notifier<BufferControlMap> {
  private currentAsset: AssetInfo = null;
  private currentBufferId = 1 as BufferId;
  private readonly buffers = {} as BufferDictionary<HTMLVideoElement>;
  private readonly readys = {} as BufferDictionary<Promise<void>>;
  private readonly frames = new FrameControl(this);

  private getNextBuffer() {
    return this.currentBufferId === 0 ? 1 : 0;
  }

  private setIndex(forward: BufferId) {
    this.buffers[0].style.zIndex = `${forward === 0 ? 2 : 1}`;
    this.buffers[1].style.zIndex = `${forward === 1 ? 2 : 1}`;
  }

  addBuffer(id: BufferId, buffer: HTMLVideoElement) {
    this.buffers[id] = buffer;

    buffer.addEventListener('ended', () => {
      this.dispatchEvent('ended', id);
    });
  }

  async setVideo(video: AssetInfo) {
    if (this.currentAsset?.assetId === video.assetId) return;

    const nextId = this.getNextBuffer();

    return this.readys[nextId] = new Promise((resolve, reject) => {
      this.buffers[nextId].addEventListener('canplay', () => {
        this.setIndex(nextId);
        resolve();
      }, { once: true });

      this.buffers[nextId].addEventListener('error', () => {
        reject();
      }, { once: true });

      this.buffers[nextId].src = video.source;
      this.currentBufferId = nextId;
      this.currentAsset = video;
    });
  }

  async play() {
    await this.readys[this.currentBufferId];

    this.buffers[this.currentBufferId].play();
  }

  async pause() {
    await this.readys[this.currentBufferId];

    this.buffers[this.currentBufferId].pause();
  }

  /**
   * Set a specific frame and force pause on video.
   * @param alpha Alpha value to a linear interpolation on video duration.
   * @param trusted If true the frame will be shown, if false frame can be replaced for others if `setFrame` was called before.
   */
  async setFrame(alpha: number, trusted: boolean = false) {
    await this.readys[this.currentBufferId];

    await this.frames.push(alpha, this.currentAsset, this.buffers[this.currentBufferId], trusted);
  }
}

export const bufferControl = new BufferControl();