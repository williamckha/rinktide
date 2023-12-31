import { RefObject, useEffect, useRef, useState } from "react";

export const useScrollPosition = (): [
  boolean,
  boolean,
  (isTop: boolean) => void,
  (isBottom: boolean) => void,
  RefObject<HTMLDivElement>,
] => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isTop, setIsTop] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    setIsTop(container.scrollTop === 0);
    setIsBottom(
      container.scrollTop === container.scrollHeight - container.clientHeight,
    );

    const handleScroll = () => {
      if (!container) {
        return;
      }

      setIsTop(container.scrollTop === 0);
      setIsBottom(
        container.scrollTop === container.scrollHeight - container.clientHeight,
      );
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  return [isTop, isBottom, setIsTop, setIsBottom, containerRef];
};
