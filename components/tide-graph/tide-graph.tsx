import { sum } from "@visx/vendor/d3-array";
import { scaleLinear } from "@visx/scale";
import { Area } from "@visx/shape";
import { curveBasis } from "@visx/curve";
import { Box } from "@mui/joy";
import { LinearGradient } from "@visx/gradient";
import { useId } from "react";

const gaussian = require("gaussian");
const distribution = gaussian(0, 0.4);

interface TideGraphProps {
  height: number;
  data: number[];
  color: string;
  strokeColor: string;
  flipped?: boolean;
}

export const TideGraph = ({
  height,
  data,
  color,
  strokeColor,
  flipped = false,
}: TideGraphProps) => {
  const areaGradientId = useId();

  const xScale = scaleLinear<number>().domain([0, 1]).range([0, 80]);
  const yScale = scaleLinear<number>().domain([0, 1200]).range([0, height]);

  const density = kernelDensityEstimation(
    kernelGaussian(0.01),
    yScale.ticks(60),
    data,
  );

  return (
    <Box height={height}>
      <svg width="100%" height="100%" transform={flipped ? "scale(-1,1)" : ""}>
        <LinearGradient
          id={areaGradientId}
          from={color}
          to={color}
          fromOpacity={0.65}
          vertical={false}
        />
        <Area
          data={density}
          x0={() => 0}
          x1={(d) => xScale(d[1])}
          y={(d) => yScale(d[0])}
          fill={`url(#${areaGradientId})`}
          stroke={strokeColor}
          strokeWidth={2}
          strokeDasharray={"6 3"}
          opacity={0.7}
          curve={curveBasis}
        />
      </svg>
    </Box>
  );
};

const kernelDensityEstimation = (
  kernel: (d: number) => number,
  thresholds: number[],
  data: number[],
): number[][] => {
  return thresholds.map((t) => [t, sum(data, (d) => kernel(t - d)) || 0]);
};

const kernelGaussian = (bandwidth: number): ((v: number) => number) => {
  return (v: number) => distribution.pdf(v * bandwidth);
};
