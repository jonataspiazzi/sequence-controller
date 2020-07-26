import React, { useEffect, useRef } from 'react';
import { VideoInfo } from './assetInfo';
import Notifier from './notifier';
import FrameController from './frameController';

export interface FlowControllerMap {
  ended: (id: BufferId) => void;
  videoChanged: (video: VideoInfo) => void;
}

export type BufferId = 0 | 1;
type BufferDictionary<T> = { [key in BufferId]: T };

export class DFlowBufferController extends Notifier<FlowControllerMap> {
  private currentAsset: VideoInfo = null;
  private currentBufferId = 1 as BufferId;
  private readonly buffers = {} as BufferDictionary<HTMLVideoElement>;
  private readonly readys = {} as BufferDictionary<Promise<void>>;
  private readonly frames = new FrameController(this);

  private getNextBuffer() {
    return this.currentBufferId === 0 ? 1 : 0;
  }

  private setIndex(forward: BufferId) {
    this.buffers[0].style.zIndex = `${forward === 0 ? 2 : 1}`;
    this.buffers[1].style.zIndex = `${forward === 1 ? 2 : 1}`;
  }

  setBuffer(id: BufferId, buffer: HTMLVideoElement) {
    this.buffers[id] = buffer;

    buffer.addEventListener('ended', () => {
      this.dispatchEvent('ended', id);
    });
  }

  setVideo(video: VideoInfo) {
    if (this.currentAsset?.assetId === video.assetId) return;

    const nextId = this.getNextBuffer();

    this.readys[nextId] = new Promise((resolve, reject) => {
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
    console.log('on play ', this.currentBufferId, this.readys);

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

    this.frames.push(alpha, this.currentAsset, this.buffers[this.currentBufferId], trusted);
  }
}

export const flowBufferController = new DFlowBufferController();

export default function DFlowBuffer() {
  const buff0Ref = useRef<HTMLVideoElement>(null);
  const buff1Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    flowBufferController.setBuffer(0, buff0Ref.current);
    flowBufferController.setBuffer(1, buff1Ref.current);
  }, []);

  return (
    <div className={`screen flow`}>
      <video ref={buff0Ref} className="full-child buffer-0" />
      <video ref={buff1Ref} className="full-child buffer-1" />
    </div>
  );
}