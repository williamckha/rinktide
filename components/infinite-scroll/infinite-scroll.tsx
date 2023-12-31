import { useScrollPosition } from "@/lib/hooks/use-scroll-position";
import { Box, Button, Stack } from "@mui/joy";
import { ReactNode, forwardRef, useCallback, useEffect, useRef } from "react";

interface InfiniteScrollProps {
  children?: ReactNode;
  loadingComponent: ReactNode;
  loadTopPageButtonText: string;
  reversed: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  isLoadingPreviousPage: boolean;
  isLoadingNextPage: boolean;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
}

export const InfiniteScroll = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  (
    {
      children,
      loadingComponent,
      reversed = false,
      loadTopPageButtonText,
      hasPreviousPage,
      hasNextPage,
      isLoadingPreviousPage,
      isLoadingNextPage,
      fetchNextPage,
      fetchPreviousPage,
    },
    ref,
  ) => {
    const bottomSentinel = useRef<HTMLDivElement>(null);

    const isLoadingPage = isLoadingPreviousPage || isLoadingNextPage;
    const hasTopPage = reversed ? hasNextPage : hasPreviousPage;
    const hasBottomPage = reversed ? hasPreviousPage : hasNextPage;
    const fetchTopPage = reversed ? fetchNextPage : fetchPreviousPage;
    const fetchBottomPage = reversed ? fetchPreviousPage : fetchNextPage;

    const handleTopButtonClick = () => {
      if (hasTopPage && !isLoadingPage) {
        fetchTopPage();
      }
    };

    const handleBottomObserver: IntersectionObserverCallback = useCallback(
      ([target]) => {
        if (target.isIntersecting && hasBottomPage && !isLoadingPage) {
          fetchBottomPage();
        }
      },
      [hasBottomPage, isLoadingPage, fetchBottomPage],
    );

    useEffect(() => {
      if (!bottomSentinel.current) {
        return;
      }
      const bottomObserver = new IntersectionObserver(handleBottomObserver);
      bottomObserver.observe(bottomSentinel.current);
    }, [handleBottomObserver]);

    return (
      <Stack ref={ref} direction={"column"}>
        <Box display={"flex"} justifyContent={"center"} paddingBottom={4}>
          {(reversed ? isLoadingNextPage : isLoadingPreviousPage) ? (
            loadingComponent
          ) : (
            <Button
              variant="outlined"
              color="neutral"
              onClick={handleTopButtonClick}
            >
              {loadTopPageButtonText}
            </Button>
          )}
        </Box>
        <Stack flexDirection={reversed ? "column-reverse" : "column"}>
          {children}
        </Stack>
        <Box display={"flex"} justifyContent={"center"} paddingTop={2}>
          {(reversed ? isLoadingPreviousPage : isLoadingNextPage) &&
            loadingComponent}
        </Box>
        <div ref={bottomSentinel} />
      </Stack>
    );
  },
);

InfiniteScroll.displayName = "InfiniteScroll";
