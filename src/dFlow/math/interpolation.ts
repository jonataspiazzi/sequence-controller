export class Interpolation {
  /**
   * Performs a linear interpolation between two values.
   * @param a A value 
   * @param b B value
   * @param alpha ranges from 0-1.
   */
  static lerp(a: number, b: number, alpha: number) {
    if (alpha < 0) return a;
    if (alpha > 1) return b;

    return (b - a) * alpha + a;
  }

  /**
   * Map a value 
   * @param value 
   * @param amin 
   * @param amax 
   * @param bmin 
   * @param bmax 
   */
  static map(value: number, amin: number, amax: number, bmin: number, bmax: number) {
    return this.lerp(bmin, bmax, (value - amin) / (amax - amin));
  }

  /**
   * Gets the segment to which the value belongs.
   * @param value The value to find.
   * @param start The start point of an interval. 
   * @param end The final point of an interval.
   * @param segmentCount The amout of segments existing in the interval.
   * @returns The center point of the segment found.
   */
  static snapToggleToSegment(value: number, start: number, end: number, segmentCount: number | null) {
    // if there is not step count, the value should be return.
    if (!(segmentCount > 0)) return value;

    const intervalLength = end - start;
    const segmentLength = intervalLength / segmentCount;

    return Math.floor(value / segmentLength) * segmentLength + segmentLength / 2;
  }

  static async wait(ms: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), ms);
    });
  }
}