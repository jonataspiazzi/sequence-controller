export interface Dictionary<T> {
  [key: string]: T;
}

export interface GenericFunc<TArgs extends any[] = any[], TResult = any> {
  (...args: TArgs): TResult;
}

export function nameof<T>(key: keyof T) {
  return key;
}

export function lerp(alpha: number, amin: number, amax: number) {
  return amin + (amax - amin) * alpha;
}

export function map(value: number, amin: number, amax: number, bmin: number, bmax: number) {
  return lerp((value - amin) / (amax - amin), bmin, bmax);
}