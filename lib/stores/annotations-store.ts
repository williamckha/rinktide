import { scaleLinear } from "@visx/scale";
import { create } from "zustand";
import { partition } from "../helpers/array";
import {
  TIDE_GRAPH_PERIOD_GUTTER,
  TIDE_GRAPH_Y_SIZE,
} from "@/components/tide-graph/constants";

interface Annotation {
  id: string;
  period: number;
  timeInPeriod: number;
  team: "away" | "home";
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  anchorPositionY: number;
}

interface AnnotationsStore {
  annotations: Annotation[];
  addAnnotation: (
    id: string,
    period: number,
    timeInPeriod: number,
    team: "away" | "home",
    width: number,
    height: number,
    positionX: number,
  ) => void;
  removeAnnotation: (id: string) => void;
}

export const useAnnotationsStore = create<AnnotationsStore>((set) => ({
  annotations: [],
  addAnnotation: (
    id: string,
    period: number,
    timeInPeriod: number,
    team: "away" | "home",
    width: number,
    height: number,
    positionX: number,
  ) => {
    set((store) => ({
      annotations: repositionAnnotations([
        ...store.annotations.filter((annotation) => annotation.id != id),
        {
          id,
          period,
          timeInPeriod,
          team,
          width,
          height,
          positionX,
          positionY: 0,
          anchorPositionY: 0,
        },
      ]),
    }));
  },
  removeAnnotation: (id: string) => {
    set((store) => ({
      annotations: repositionAnnotations(
        store.annotations.filter((annotation) => annotation.id != id),
      ),
    }));
  },
}));

const timeToPositionScale = scaleLinear<number>()
  .domain([0, 1200])
  .range([0, TIDE_GRAPH_Y_SIZE]);

const repositionAnnotations = (oldAnnotations: Annotation[]): Annotation[] => {
  return partition(
    oldAnnotations,
    (annotation) => annotation.team === "away",
  ).reduce<Annotation[]>((newAnnotations, annotations) => {
    const repositionedAnnotations = annotations
      // Set positions based on time
      .map((annotation) => {
        const position =
          (annotation.period - 1) *
            (TIDE_GRAPH_Y_SIZE + TIDE_GRAPH_PERIOD_GUTTER) +
          timeToPositionScale(annotation.timeInPeriod);

        annotation.positionY = Math.max(0, position - annotation.height / 2);
        annotation.anchorPositionY = position;

        return annotation;
      })
      .sort((a, b) => a.positionY - b.positionY)

      // Push annotations upwards
      .reduceRight<Annotation[]>((prev, annotation) => {
        const prevAnnotation = prev[0];

        annotation.positionY =
          Math.min(
            annotation.positionY,
            prevAnnotation?.positionY -
              annotation.height -
              TIDE_GRAPH_PERIOD_GUTTER,
          ) || annotation.positionY;

        return [annotation, ...prev];
      }, [])

      // Push annotations downwards
      .reduce<Annotation[]>((prev, annotation) => {
        const prevAnnotation = prev[prev.length - 1];
        const prevPosition = prevAnnotation?.positionY ?? 0;
        const prevHeight = prevAnnotation?.height ?? 0;

        annotation.positionY = Math.max(
          annotation.positionY,
          prevPosition + prevHeight + TIDE_GRAPH_PERIOD_GUTTER,
        );

        return [...prev, annotation];
      }, []);
    return [...newAnnotations, ...repositionedAnnotations];
  }, []);
};
