import { DFlowBufferController } from "./flowBuffer";
import Notifier from "./notifier";
import { VideoInfo } from "./assetInfo";
import DMath from "./math";

export interface FrameInfo {
  time: number;
  assetId: number;
  buffer: HTMLVideoElement;
  trusted: boolean;
}

export default class FrameController {
  private readonly frames: FrameInfo[] = [];
  private isExecuting: boolean = false;

  constructor(parent: DFlowBufferController) {
    parent.addEventListener('videoChanged', this.onVideoChanged.bind(this));
  }

  private onVideoChanged(video: VideoInfo) {
    for (let i = 0; i < this.frames.length;) {
      if (this.frames[i].assetId !== video.assetId) {
        this.frames.splice(i, 1);

        continue;
      }

      i++;
    }
  }

  private checkValidFrameTime(alpha: number, video: VideoInfo, buffer: HTMLVideoElement, trusted: boolean) {
    let time = DMath.lerp(0, buffer.duration, alpha);
    time = DMath.snapToggleToSegment(time, 0, buffer.duration, video.frameCount);

    const lastFrame = this.frames[this.frames.length - 1];

    if (lastFrame) {
      // Remove previous frames if the id of the assest don't match.
      if (video.assetId !== lastFrame.assetId) {
        this.frames.splice(0, this.frames.length);
      }
      // Avoid stack up two frames in a row which has equals times.
      else if (lastFrame.time === time) {
        // Prioritize trusted frames above untrusted ones.
        if (!lastFrame.trusted) {
          lastFrame.trusted = trusted;
        }

        return null;
      }
    }

    return time;
  }

  private getNextTrustedOrLast(index: number): FrameInfo {
    const frame = this.frames[index];

    if (!frame) return null;
    if (frame.trusted) return frame;

    const next = this.getNextTrustedOrLast(index + 1);

    // return the last frame if no trusted found.
    if (!next) return frame;

    return next;
  }

  private removeProcessedFrame(frame: FrameInfo) {
    const index = this.frames.indexOf(frame);

    this.frames.splice(0, index + 1);
  }

  private async executeFrames() {
    if (this.isExecuting) return;

    while (true) {
      let frame = this.frames[0];

      // queue is empty.
      if (!frame) {
        this.isExecuting = false;
        return;
      }

      // if current frame is not trusted get the next trusted frame.
      if (!frame.trusted) {
        const next = this.getNextTrustedOrLast(1);

        if (next) frame = next;
      }

      // updates the current frame.
      await this.setCurrentTime(frame);

      this.removeProcessedFrame(frame);
    }
  }

  private async setCurrentTime(frame: FrameInfo) {
    const promise = new Promise(resolve => {
      frame.buffer.addEventListener('seeked', () => {
        frame.buffer.pause();
        resolve();
      }, { once: true });
    });

    frame.buffer.currentTime = frame.time;

    return promise;
  }

  /**
   * Set a specific on a queue.
   * @param alpha Alpha value to a linear interpolation on video duration.
   * @param video The video asset that the frame supose to be.
   * @param buffer The buffer ready to be frame controlled.
   * @param trusted If true the frame will be shown, if false frame can be replaced for others if `setFrame` was called before.
   */
  push(alpha: number, video: VideoInfo, buffer: HTMLVideoElement, trusted: boolean = false) {
    const time = this.checkValidFrameTime(alpha, video, buffer, trusted);

    if (!time) return;

    const frame = { time, assetId: video.assetId, buffer, trusted } as FrameInfo;

    this.frames.push(frame);

    this.executeFrames();
  }
}