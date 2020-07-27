export class DMath {
  /**
   * Performs a linear interpolation between two values.
   * @param alpha ranges from 0-1.
   * @param a A value 
   * @param b B value
   */
  static lerp(alpha: number, a: number, b: number) {
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
    return this.lerp((value - amin) / (amax - amin), bmin, bmax);
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

  /**
   * Get the center point of a specific segment.
   * @param segmentIndex The index of the segment.
   * @param segmentCount The number of segments in a interval between 0 and 1.
   * @param approximation The number of decimal digits to approximate the result.
   */
  static segmentCenter(segmentIndex: number, segmentCount: number, approximation: number = 4) {
    const segmentLength = 1 / segmentCount;
    const center = segmentLength / 2;
    const value = segmentIndex * segmentLength + center;

    if (!approximation) return value;

    const a = Math.pow(10, approximation);

    return Math.round(value * a) / a;
  }

  /**
   * Restric a value inside a range.
   * @param value 
   * @param min The inclusive start of the range.
   * @param max The inclusive end of the range.
   */
  static clamp(value: number, min: number, max: number) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }

  static async wait(ms: number) {
    return new Promise(resolve => {
      setTimeout(() => resolve(), ms);
    });
  }
}

(window as any).DMath = DMath;