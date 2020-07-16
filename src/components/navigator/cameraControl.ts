import { EventEmitter } from "events";
import { nameof, map } from "../common/globals";
import Notifier from "./notifier";

interface CameraControlEventMap {
  'rotate': (x: number, y: number, z: number) => void
}

export interface CameraControlConfig {
  element?: HTMLElement;
  tick?: number;
  useDynamicTick?: boolean;
  frameCount?: number;
}

const configDefault: CameraControlConfig = {
  tick: 5,
  useDynamicTick: true
};

export default class CameraControl extends Notifier<CameraControlEventMap> {
  private config: CameraControlConfig;
  private isMoving: boolean;
  private currentX: number;

  constructor(config?: CameraControlConfig) {
    super();
    this.config = { ...configDefault, ...config };
    this.setup();
  }

  setup() {
    this.isMoving = false;
    this.currentX = 0;

    this.config.element.addEventListener('mousedown', this.startControl.bind(this));
    this.config.element.addEventListener('mousemove', this.onMovement.bind(this));
    this.config.element.addEventListener('mouseup', this.stopControl.bind(this));
    this.config.element.addEventListener('mouseleave', this.stopControl.bind(this));

    if (this.config.useDynamicTick) {
      window.addEventListener('resize', this.calculateMovementTick.bind(this));

      this.calculateMovementTick();
    }
    else {
      console.log('useDynamicTick = false');
    }
  }

  calculateMovementTick() {
    console.log('calculateMovementTick');

    const rect = this.config.element.getClientRects()[0];

    this.config.tick = Math.floor(rect.width * 1.6 / this.config.frameCount);

    console.log('result', this.config.tick, rect.width, this.config.frameCount);
  }

  startControl(e: MouseEvent) {
    this.currentX = e.offsetX;
    this.isMoving = true;
  }

  stopControl(e: MouseEvent) {
    this.isMoving = false;
  }

  onMovement(e: MouseEvent) {
    if (!this.isMoving) return;

    const offset = e.offsetX - this.currentX;

    if (Math.abs(offset) > this.config.tick) {
      if (offset > 0) {
        this.currentX += this.config.tick;
        this.emit('rotate', 1, 0, 0);
      }

      if (offset < 0) {
        this.currentX -= this.config.tick;
        this.emit('rotate', -1, 0, 0);
      }
    }
  }
}