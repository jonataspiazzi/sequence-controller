import { EventEmitter } from "events";
import { GenericFunc } from "../common/globals";

// This is a advanced type to mask the EventEmitter class
export default class Notifier<T extends { [J in Extract<keyof T, string>]: GenericFunc }> {
  private __emitter = new EventEmitter();

  addEventListener<K extends Extract<keyof T, string>>(event: K, listener: T[K]): void {
    this.__emitter.addListener(event, listener);
  }

  addEventListenerOnce<K extends Extract<keyof T, string>>(event: K, listener: T[K]): void {
    this.__emitter.once(event, listener);
  }

  removeEventListener<K extends Extract<keyof T, string>>(event: K, listener: T[K]): void {
    this.__emitter.removeListener(event, listener);
  };

  protected dispatchEvent<K extends Extract<keyof T, string>>(event: K, ...args: Parameters<T[K]>): void {
    this.__emitter.emit(event, ...args);
  }
}