import React, { useEffect, useRef } from 'react';
import { VideoInfo } from './assetInfo';
import Notifier from './notifier';

export interface FlowControllerMap {
  ended: (id: BufferId) => void;
}

export type BufferId = 0 | 1;
type BufferDictionary<T> = { [key in BufferId]: T };

class FlowController extends Notifier<FlowControllerMap> {
  private currentBufferId = 1 as BufferId;
  private buffers = {} as BufferDictionary<HTMLVideoElement>;
  private readys = {} as BufferDictionary<Promise<void>>;

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

  setVideo(asset: VideoInfo) {
    const nextId = this.getNextBuffer();

    this.readys[nextId] = new Promise((resolve, reject) => {
      this.buffers[nextId].addEventListener('canplay', () => {
        this.setIndex(nextId);
        resolve();
      }, { once: true });

      this.buffers[nextId].addEventListener('error', () => {
        reject();
      }, { once: true });

      this.buffers[nextId].src = asset.source;
      this.currentBufferId = nextId;
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
}

export const flowController = new FlowController();

export default function Flow() {
  const buff0Ref = useRef<HTMLVideoElement>(null);
  const buff1Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    flowController.setBuffer(0, buff0Ref.current);
    flowController.setBuffer(1, buff1Ref.current);
  }, []);

  return (
    <div className={`screen flow`}>
      <video ref={buff0Ref} className="full-child buffer-0" />
      <video ref={buff1Ref} className="full-child buffer-1" />
    </div>
  );
}