import { clockTimeToSeconds } from "@/lib/helpers/time";
import { Time } from "@/lib/models/time";
import { useAnnotationsStore } from "@/lib/stores/annotations-store";
import { Box } from "@mui/joy";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useEffectOnce } from "usehooks-ts";

interface GameTideGraphAnnotationProps {
  id: string;
  time: Time;
  team: "away" | "home";
  children?: ReactNode;
}

export const GameTideGraphAnnotation = ({
  id,
  time,
  team,
  children,
}: GameTideGraphAnnotationProps) => {
  const elementRef = useRef<HTMLElement>(null);

  const annotations = useAnnotationsStore((store) => store.annotations);
  const addAnnotation = useAnnotationsStore((store) => store.addAnnotation);
  const removeAnnotation = useAnnotationsStore(
    (store) => store.removeAnnotation,
  );

  const updateAnnotation = () => {
    if (!elementRef.current) {
      return;
    }
    addAnnotation(
      id,
      time.period,
      clockTimeToSeconds(time.timeInPeriod),
      team,
      elementRef.current.clientWidth,
      elementRef.current.clientHeight,
      elementRef.current.clientLeft,
    );
  };

  useEffectOnce(() => {
    if (!elementRef.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(updateAnnotation);
    resizeObserver.observe(elementRef.current);
    return () => {
      resizeObserver.disconnect();
      removeAnnotation(id);
    };
  });

  return (
    <Box
      ref={elementRef}
      position={"absolute"}
      top={() =>
        annotations.find((annotation) => annotation.id === id)?.positionY
      }
      left={team === "away" ? 16 : undefined}
      right={team === "home" ? 16 : undefined}
    >
      {children}
    </Box>
  );
};
