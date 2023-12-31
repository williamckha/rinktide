import { sum } from "@visx/vendor/d3-array";
import { Gaussian } from "./gaussian";

export const kernelDensityEstimation = (
  kernel: (d: number) => number,
  thresholds: number[],
  data: number[],
): number[][] => {
  return thresholds.map((t) => [t, sum(data, (d) => kernel(t - d)) || 0]);
};

export const kernelGaussian = (
  distribution: Gaussian,
  bandwidth: number,
): ((v: number) => number) => {
  return (v: number) => distribution.pdf(v * bandwidth);
};
