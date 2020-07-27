import { ORBIT_STANDARD_X_MOVEMENT_TICK, ORBIT_MOVEMENT_WIDTH, ORBIT_ANIMATION_TIME } from "../helpers/config";
import { FrameSequenceInfo } from "../dataModels/assetInfo";
import { DMath } from "../helpers/dMath";
import { bufferControl } from "./bufferControl";

export default class OrbitYControl<T extends SVGElement> {
  private readonly movementTick: number;
  private isMoving: boolean = false;
  private isGoingBack: boolean = false;
  private cursorClassList: string[];
  private currentCursorClass: string;
  private currentX: number = 0;
  private currentFrameIndex: number = 0;

  constructor(
    private readonly element: T,
    private readonly asset: FrameSequenceInfo,
    private readonly cursorLeft: string,
    private readonly cursorCenter: string,
    private readonly cursorRight: string
  ) {
    element.addEventListener('mouseenter', this.enter.bind(this));
    element.addEventListener('mouseleave', this.leave.bind(this));
    element.addEventListener('mousemove', this.move.bind(this));
    element.addEventListener('mousedown', this.down.bind(this));
    element.addEventListener('mouseup', this.up.bind(this));

    this.cursorClassList = [this.cursorCenter, this.cursorLeft, this.cursorRight];
    this.movementTick = this.calculateMovementTick();
    this.setCursorClass(this.cursorCenter);
  }

  private calculateMovementTick() {
    const rect = this.element.getBoundingClientRect();

    if (!rect) return ORBIT_STANDARD_X_MOVEMENT_TICK;

    const { width } = rect;

    if (!width) return ORBIT_STANDARD_X_MOVEMENT_TICK;

    return Math.round(width * ORBIT_MOVEMENT_WIDTH / this.asset.frameCount);
  }

  private enter(e: MouseEvent) {
    this.isMoving = false;
  }

  private leave(e: MouseEvent) {
    this.isMoving = false;
    this.setCursorClass(this.cursorCenter);
  }

  private move(e: MouseEvent) {
    if (!this.isMoving) return;

    this.setCursorDirection(e.movementX);

    const dX = e.offsetX - this.currentX;
    const ticks = Math.floor(Math.abs(dX) / this.movementTick);
    const direction = dX / Math.abs(dX);

    //console.log(`dX = ${dX}, ticks = ${ticks}, direction = ${direction}, currentX = ${this.currentX}, tick = ${this.movementTick}`);

    if (ticks <= 0) return;

    this.currentX = this.currentX + direction * ticks * this.movementTick;
    this.currentFrameIndex = DMath.clamp(this.currentFrameIndex + direction * ticks, 0, this.asset.frameCount - 1);
    const currentFrameAlpha = DMath.segmentCenter(this.currentFrameIndex, this.asset.frameCount);

    bufferControl.setFrame(currentFrameAlpha);
  }

  private down(e: MouseEvent) {
    this.isMoving = true;
    this.setCursorClass(this.cursorCenter);
    this.currentX = e.offsetX;

    if (!this.isGoingBack) {

      this.currentFrameIndex = Math.floor(this.asset.frameCount / 2);
      //console.log('deu ruim', this.currentFrameIndex);
    } else {
      //console.log('deu bom ', this.currentFrameIndex);
    }
  }

  private up(e: MouseEvent) {
    this.isMoving = false;
    this.setCursorClass(this.cursorCenter);
    this.goToCenter();
  }

  private setCursorDirection(direction: number) {
    if (direction < 0) {
      this.setCursorClass(this.cursorLeft);
    }
    else if (direction === 0) {
      this.setCursorClass(this.cursorCenter);
    }
    else if (direction > 0) {
      this.setCursorClass(this.cursorRight);
    }
  }

  private setCursorClass(cursorClass: string) {
    if (this.currentCursorClass === cursorClass) return;
    this.currentCursorClass = cursorClass;

    for (const c of this.cursorClassList) {
      if (c === cursorClass) {
        this.element.classList.add(c);
      }
      else {
        this.element.classList.remove(c);
      }
    }
  }

  private async goToCenter() {
    this.isGoingBack = true;
    const start = new Date();

    const originFrameIndex = this.currentFrameIndex;
    const destFrameIndex = Math.floor(this.asset.frameCount / 2);

    while (true) {
      if (this.isMoving) {
        this.isGoingBack = false;
        return;
      }

      const now = new Date();
      const elapsed = now.getTime() - start.getTime();

      if (elapsed > ORBIT_ANIMATION_TIME) {
        bufferControl.setFrame(.5);
        this.isGoingBack = false;
        return;
      }

      const alpha = elapsed / ORBIT_ANIMATION_TIME;
      const frameIndex = Math.round(DMath.lerp(alpha, originFrameIndex, destFrameIndex));
      const frame = DMath.segmentCenter(frameIndex, this.asset.frameCount);
      this.currentFrameIndex = frame;
      //console.log('current frame index = ', this.currentFrameIndex);

      await bufferControl.setFrame(frame);
    }
  }
}