/**
 * Models a normal distribution.
 */
export class Gaussian {
  mean: number;
  variance: number;
  standardDeviation: number;

  constructor(mean: number, variance: number) {
    if (variance <= 0) {
      throw new Error("Variance must be > 0");
    }
    this.mean = mean;
    this.variance = variance;
    this.standardDeviation = Math.sqrt(variance);
  }

  /**
   * Returns the probability density at point x.
   *
   * @param x the point
   * @returns the probability density at point x
   */
  pdf(x: number) {
    var m = this.standardDeviation * Math.sqrt(2 * Math.PI);
    var e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));
    return e / m;
  }
}
