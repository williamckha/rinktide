import { scaleLinear } from "@visx/scale";
import { Area, Line, LinePath } from "@visx/shape";
import { curveBasis } from "@visx/curve";
import { Box } from "@mui/joy";
import { LinearGradient } from "@visx/gradient";
import { useId } from "react";
import { kernelDensityEstimation, kernelGaussian } from "@/lib/math/kde";
import { Gaussian } from "@/lib/math/gaussian";
import { useAnnotationsStore } from "@/lib/stores/annotations-store";
import { useWindowSize } from "usehooks-ts";
import { TIDE_GRAPH_PERIOD_GUTTER } from "./constants";

const distribution = new Gaussian(0, 0.4);

interface TideGraphProps {
  xSize: number;
  ySize: number;
  data: number[][];
  color: string;
  strokeColor: string;
  team: "away" | "home";
}

export const TideGraph = ({
  xSize,
  ySize,
  data,
  color,
  strokeColor,
  team,
}: TideGraphProps) => {
  const { width: windowWidth } = useWindowSize();

  const areaGradientId = useId();
  const annotations = useAnnotationsStore((store) => store.annotations);

  const xScale = scaleLinear<number>().domain([0, 1]).range([0, xSize]);
  const yScale = scaleLinear<number>().domain([0, 1200]).range([0, ySize]);

  const tideGraphs = data.map((periodData, period) => {
    const yOffset = period * (ySize + TIDE_GRAPH_PERIOD_GUTTER);

    const density = kernelDensityEstimation(
      kernelGaussian(distribution, 0.01),
      yScale.ticks(60),
      periodData,
    );

    return (
      <Area
        key={period}
        data={density}
        x0={() => 0}
        x1={(d) => xScale(d[1])}
        y={(d) => yScale(d[0]) + yOffset}
        fill={`url(#${areaGradientId})`}
        stroke={strokeColor}
        strokeWidth={2}
        strokeDasharray={"6 3"}
        opacity={0.7}
        curve={curveBasis}
      />
    );
  });

  const annotationConnectors = annotations
    .filter((annotation) => annotation.team === team)
    .map((annotation) => {
      const annotationX = windowWidth / 2 - annotation.width;
      const annotationY = annotation.positionY + annotation.height / 2;
      return (
        <LinePath
          key={annotation.id}
          data={[
            [0, annotation.anchorPositionY],
            [annotationX / 2, annotationY],
            [annotationX, annotationY],
          ]}
          curve={curveBasis}
          stroke={strokeColor}
          strokeWidth={2}
          filter={"drop-shadow(2px 2px 2px rgb(0 0 0 / 0.4))"}
        />
      );
    });

  const containerHeight =
    ySize * data.length + TIDE_GRAPH_PERIOD_GUTTER * (data.length - 1);

  return (
    <Box height={containerHeight}>
      <svg
        width="100%"
        height="100%"
        transform={team === "away" ? "scale(-1,1)" : undefined}
      >
        <Line
          from={{ x: xScale(1.5), y: 0 }}
          to={{ x: xScale(1.5), y: containerHeight }}
          stroke={"white"}
          strokeWidth={1}
          strokeDasharray={"4 4"}
          opacity={0.2}
        />
        <Line
          from={{ x: xScale(3), y: 0 }}
          to={{ x: xScale(3), y: containerHeight }}
          stroke={"white"}
          strokeWidth={1}
          strokeDasharray={"4 4"}
          opacity={0.2}
        />
        <LinearGradient
          id={areaGradientId}
          from={color}
          to={color}
          fromOpacity={0.65}
          vertical={false}
        />
        {tideGraphs}
        {annotationConnectors}
      </svg>
    </Box>
  );
};
