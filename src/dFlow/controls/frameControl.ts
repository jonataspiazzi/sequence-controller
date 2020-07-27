import BufferControl from "./bufferControl";
import { VideoInfo, FrameSequenceInfo } from "../dataModels/assetInfo";
import { DMath } from '../helpers/dMath';

export interface FrameInfo {
  frameIndex: number;
  time: number;
  assetId: number;
  buffer: HTMLVideoElement;
  trusted: boolean;
}

function fToS(frame: FrameInfo) {
  return `${frame.frameIndex}__t${frame.time.toFixed(3)}_${frame.trusted ? 'trusted' : 'untrusted'}`;
}

export default class FrameControl {
  private readonly frames: FrameInfo[] = [];
  private isExecuting: boolean = false;

  constructor(parent: BufferControl) {
    parent.addEventListener('assetChanged', this.onAssetChanged.bind(this));
  }

  private onAssetChanged(video: VideoInfo) {
    for (let i = 0; i < this.frames.length;) {
      if (this.frames[i].assetId !== video.assetId) {
        this.frames.splice(i, 1);

        continue;
      }

      i++;
    }
  }

  private validateFrameInfo(alpha: number, video: VideoInfo, buffer: HTMLVideoElement, trusted: boolean) {
    const frameCount = (video as FrameSequenceInfo).frameCount;
    let time = DMath.lerp(alpha, 0, buffer.duration);
    time = DMath.snapToggleToSegment(time, 0, buffer.duration, frameCount);

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

    const frameIndex = frameCount ? Math.floor(time / (buffer.duration / frameCount)) : null;

    return { frameIndex, time };
  }

  private getNextTrustedOrLast(index: number): FrameInfo {
    const frame = this.frames[index];

    if (!frame) return null;
    if (frame.trusted) return frame;

    const next = this.getNextTrustedOrLast(index + 1);

    // return the last frame if no trusted found.
    if (!next) return frame;

    console.log(`skipping --| ${fToS(frame)}`);

    return next;
  }

  private removeProcessedFrame(frame: FrameInfo) {
    const index = this.frames.indexOf(frame);

    this.frames.splice(0, index + 1);
  }

  private async executeFrames() {
    if (this.isExecuting) return;
    this.isExecuting = true;

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

        if (next) {
          //console.log(`skipping --| ${fToS(frame)}`);

          frame = next;
        }
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
    //console.log(`updating >>> ${fToS(frame)}`);

    return promise;
  }

  /**
   * Set a specific on a queue.
   * @param alpha Alpha value to a linear interpolation on video duration.
   * @param video The video asset that the frame supose to be.
   * @param buffer The buffer ready to be frame controlled.
   * @param trusted If true the frame will be shown, if false frame can be replaced for others if `setFrame` was called before.
   */
  async push(alpha: number, video: VideoInfo, buffer: HTMLVideoElement, trusted: boolean = false) {
    const validation = this.validateFrameInfo(alpha, video, buffer, trusted);

    if (!validation) return;

    const { frameIndex, time } = validation;
    const frame = { frameIndex, time, assetId: video.assetId, buffer, trusted } as FrameInfo;
    this.frames.push(frame);

    await this.executeFrames();
  }
}