const MOVEMENT_TICK = 5;

export default class NativeNavigator {
  private isMoving: boolean;
  private currentX: number;
  private images: string[];
  private currentImage: string;
  private currentIndex: number;

  constructor(private img: HTMLImageElement, private controller: HTMLElement) {
    this.images = this.imageListGenerator();
    this.isMoving = false;
    this.currentX = 0;
    this.currentIndex = 0;
    this.currentImage = this.images[this.currentIndex];
    this.img.addEventListener('load', this.imageLoaded.bind(this));
    this.controller.addEventListener('mousedown', this.mouseDown.bind(this));
    this.controller.addEventListener('mousemove', this.mouseMove.bind(this));
    this.controller.addEventListener('mouseup', this.mouseUp.bind(this));
    this.imageLoaded();
  }

  imageListGenerator() {
    const imgs = [];

    for (let i = 0; i <= 100; i++) {
      imgs.push(require(`./render/_0${i.toString().padStart(3, '0')}.jpg`));
    }

    return imgs;
  }


  mouseDown(e: MouseEvent) {
    this.isMoving = true;
    this.currentX = e.offsetX;
  }

  mouseMove(e: MouseEvent) {
    if (!this.isMoving) return;

    const offset = e.offsetX - this.currentX;

    if (Math.abs(offset) > MOVEMENT_TICK) {

      if (offset > 0) {
        this.currentX += MOVEMENT_TICK;
        this.goToNext();
      }

      if (offset < 0) {
        this.currentX -= MOVEMENT_TICK;
        this.goToPrevious();
      }
    }
  }

  mouseUp(e: MouseEvent) {
    this.isMoving = false;
  }

  imageLoaded() {
  }

  goToPrevious() {
    if (this.currentIndex === 0) return;

    this.currentIndex--;
    this.currentImage = this.images[this.currentIndex];
    this.img.src = this.currentImage;
  }

  goToNext() {
    if (this.currentIndex === this.images.length - 1) return;

    this.currentIndex++;
    this.currentImage = this.images[this.currentIndex];
    this.img.src = this.currentImage;
  }
}

export function makeNativeNavigator(img: HTMLImageElement, controller: HTMLElement) {
  if (!img || !controller) return;

  new NativeNavigator(img, controller);
}
