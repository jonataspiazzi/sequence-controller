import Notifier from "../helpers/notifier";
import { AudioInfo } from "../dataModels/assetInfo";

export interface AudioControlsMap {
  volumeEnableChanged: (target: AudioControls) => void;
}

export default class AudioControls extends Notifier<AudioControlsMap> {
  private player: HTMLAudioElement;
  private _audioEnabled: boolean;

  get audioEnabled() { return this._audioEnabled; }

  setPlayer(element: HTMLAudioElement) {
    this.player = element;
    this.player.controls = false;
    this.player.loop = true;
  }

  setAudio(audio: AudioInfo) {
    if (!this.player) return;

    return new Promise((resolve, reject) => {
      this.player.addEventListener('canplay', () => {
        this.player.play();
        resolve();
      }, { once: true });

      this.player.addEventListener('error', () => {
        reject();
      }, { once: true });

      this.player.src = audio.source;
      this._audioEnabled = true;
      this.dispatchEvent('volumeEnableChanged', this);
    });
  }

  toggleAudioEnabled() {
    if (this._audioEnabled) {
      this.disableAudio();
    }
    else {
      this.enableAudio();
    }
  }

  disableAudio() {
    if (!this.player) return;

    this._audioEnabled = false;
    this.player.pause();
    this.dispatchEvent('volumeEnableChanged', this);
  }

  enableAudio() {
    if (!this.player) return;

    this._audioEnabled = true;
    this.player.play();
    this.dispatchEvent('volumeEnableChanged', this);
  }
}

export const audioControls = new AudioControls();