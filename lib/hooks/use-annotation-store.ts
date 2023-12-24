import { scaleLinear } from "@visx/scale";
import { StateCreator, create } from "zustand";

interface Annotation {
  id: string;
  period: number;
  timeInPeriod: number;
  height: number;
  position: number;
  anchorPosition: number;
}

interface AwayGoalAnnotationSlice {
  awayGoalAnnotations: Annotation[];
  addAwayGoalAnnotation: (
    id: string,
    period: number,
    timeInPeriod: number,
    height: number,
  ) => void;
  removeAwayGoalAnnotation: (id: string) => void;
}

interface HomeGoalAnnotationSlice {
  homeGoalAnnotations: Annotation[];
  addHomeGoalAnnotation: (
    id: string,
    period: number,
    timeInPeriod: number,
    height: number,
  ) => void;
  removeHomeGoalAnnotation: (id: string) => void;
}

type AnnotationStore = AwayGoalAnnotationSlice & HomeGoalAnnotationSlice;

export const createAwayGoalAnnotationSlice: StateCreator<
  AnnotationStore,
  [],
  [],
  AwayGoalAnnotationSlice
> = (set) => ({
  awayGoalAnnotations: [],
  addAwayGoalAnnotation: (id, period, timeInPeriod, height) => {
    set((store) => ({
      awayGoalAnnotations: repositionAnnotations([
        ...store.awayGoalAnnotations,
        { id, period, timeInPeriod, height, position: 0, anchorPosition: 0 },
      ]),
    }));
  },
  removeAwayGoalAnnotation: (id) => {
    set((store) => ({
      awayGoalAnnotations: store.awayGoalAnnotations.filter(
        (annotation) => annotation.id !== id,
      ),
    }));
  },
});

export const createHomeGoalAnnotationSlice: StateCreator<
  AnnotationStore,
  [],
  [],
  HomeGoalAnnotationSlice
> = (set) => ({
  homeGoalAnnotations: [],
  addHomeGoalAnnotation: (id, period, timeInPeriod, height) => {
    set((store) => ({
      homeGoalAnnotations: repositionAnnotations([
        ...store.homeGoalAnnotations,
        { id, period, timeInPeriod, height, position: 0, anchorPosition: 0 },
      ]),
    }));
  },
  removeHomeGoalAnnotation: (id) => {
    set((store) => ({
      homeGoalAnnotations: store.homeGoalAnnotations.filter(
        (annotation) => annotation.id !== id,
      ),
    }));
  },
});

export const useAnnotationStore = create<AnnotationStore>((...set) => ({
  ...createAwayGoalAnnotationSlice(...set),
  ...createHomeGoalAnnotationSlice(...set),
}));

const timeToPositionScale = scaleLinear<number>()
  .domain([0, 1200])
  .range([0, 800]);

const repositionAnnotations = (oldAnnotations: Annotation[]): Annotation[] => {
  return (
    oldAnnotations
      // Set positions based on time
      .map((annotation) => {
        const position =
          (annotation.period - 1) * 812 +
          timeToPositionScale(annotation.timeInPeriod);
        annotation.position = Math.max(0, position - annotation.height / 2);
        annotation.anchorPosition = position;
        console.log(annotation.height);
        return annotation;
      })
      .sort((a, b) => a.position - b.position)

      // Push annotations downwards
      .reduce<Annotation[]>((prev, annotation) => {
        const prevAnnotation = prev[prev.length - 1];
        const prevPosition = prevAnnotation?.position ?? 0;
        const prevHeight = prevAnnotation?.height ?? 0;

        annotation.position = Math.max(
          annotation.position,
          prevPosition + prevHeight + 12,
        );

        return [...prev, annotation];
      }, [])
  );
};
