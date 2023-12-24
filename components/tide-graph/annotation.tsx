import { useAnnotationStore } from "@/lib/hooks/use-annotation-store";
import { Box } from "@mui/joy";
import { ReactNode, useEffect, useMemo } from "react";
import { useElementSize } from "usehooks-ts";

interface GameTideGraphAnnotationProps {
  period: number;
  timeInPeriod: number;
  team: "away" | "home";
  children?: ReactNode;
}

export const GameTideGraphAnnotation = ({
  period,
  timeInPeriod,
  team,
  children,
}: GameTideGraphAnnotationProps) => {
  const [elementRef, size] = useElementSize();

  const awayGoalAnnotations = useAnnotationStore(
    (store) => store.awayGoalAnnotations,
  );
  const homeGoalAnnotations = useAnnotationStore(
    (store) => store.homeGoalAnnotations,
  );
  const addAwayGoalAnnotation = useAnnotationStore(
    (store) => store.addAwayGoalAnnotation,
  );
  const addHomeGoalAnnotation = useAnnotationStore(
    (store) => store.addHomeGoalAnnotation,
  );
  const removeAwayGoalAnnotation = useAnnotationStore(
    (store) => store.removeAwayGoalAnnotation,
  );
  const removeHomeGoalAnnotation = useAnnotationStore(
    (store) => store.removeHomeGoalAnnotation,
  );
  
  useEffect(() => {
    if (team === "away") {
      addAwayGoalAnnotation(
        `goal-${period}-${timeInPeriod}`,
        period,
        timeInPeriod,
        size.height,
      );
      return () => {
        removeAwayGoalAnnotation(`goal-${period}-${timeInPeriod}`);
      }
    } else {
      addHomeGoalAnnotation(
        `goal-${period}-${timeInPeriod}`,
        period,
        timeInPeriod,
        size.height,
      );
      return () => {
        removeHomeGoalAnnotation(`goal-${period}-${timeInPeriod}`);
      }
    }
  }, [
    addAwayGoalAnnotation,
    addHomeGoalAnnotation,
    removeAwayGoalAnnotation,
    removeHomeGoalAnnotation,
    team,
    period,
    timeInPeriod,
    size.height,
  ]);

  return (
    <Box
      ref={elementRef}
      sx={{ transition: "all 300ms cubic-bezier(0.655, 0.18, 0.3, 1.255)" }}
      position={"absolute"}
      top={() => {
        if (team === "away") {
          return awayGoalAnnotations.find(
            (annotation) => annotation.id === `goal-${period}-${timeInPeriod}`,
          )?.position;
        } else {
          return homeGoalAnnotations.find(
            (annotation) => annotation.id === `goal-${period}-${timeInPeriod}`,
          )?.position;
        }
      }}
      left={team === "away" ? 16 : undefined}
      right={team === "home" ? 16 : undefined}
    >
      {children}
    </Box>
  );
};
