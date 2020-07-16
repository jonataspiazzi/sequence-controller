import CameraControl from "./cameraControl";
import ImageLoader from "./loader";
import LoadingBar from "./loadingBar";

export interface NativeNavigatorConfig {
  frameElement?: HTMLImageElement;
  controllerElement?: HTMLElement;
  loadingElement?: HTMLElement;
  frames?: string[];
  tick?: number;
  useDynamicTick?: boolean;
}

export default class NativeNavigator {
  private element: HTMLImageElement;
  private control: CameraControl;
  private loader: ImageLoader;
  private loadingBar: LoadingBar;
  private frames: string[];
  private frameIndex: number;
  private movementEnabled: boolean = false;

  constructor(config: NativeNavigatorConfig) {
    this.element = config.frameElement;

    this.loader = new ImageLoader();

    this.control = new CameraControl({
      element: config.controllerElement,
      frameCount: config.frames.length,
      tick: config.tick,
      useDynamicTick: config.useDynamicTick
    });

    this.loadingBar = new LoadingBar(config.loadingElement);

    this.setup(config);
  }

  private setup(config: NativeNavigatorConfig) {
    this.loader.addEventListener('finished', frames => {
      console.log('finished was called');
      this.frames = frames;
      this.movementEnabled = true;
      this.loadingBar.setVisibility(false);
    });

    this.loader.addEventListener('firstFrame', frame => this.element.src = frame);
    this.loader.addEventListener('progress', p => this.loadingBar.setProgress(p));

    this.loader.load(config.frames);

    this.control.addEventListener('rotate', this.rotate.bind(this));
  }

  onFirstFrame(frame: string) {
    this.element.src = frame;
  }

  loadFrames(frames: string[]) {
    this.frames = frames;
  }

  rotate(x: number) {
    if (x > 0) this.goToPrevious();
    else if (x < 0) this.goToNext();
  }

  goToPrevious() {
    if (this.frameIndex === 0) return;

    this.frameIndex--;
    this.element.src = this.frames[this.frameIndex];
  }

  goToNext() {
    if (this.frameIndex === this.frames.length - 1) return;

    this.frameIndex++;
    this.element.src = this.frames[this.frameIndex];
  }
}

export function makeNativeNavigator(config: NativeNavigatorConfig) {
  if (!config || !config.frameElement || !config.controllerElement || !config.frames) return;

  new NativeNavigator(config);
}
