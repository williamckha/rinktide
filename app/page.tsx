"use client";

import { InfiniteScroll } from "@/components/infinite-scroll/infinite-scroll";
import { ScoreCard } from "@/components/score-card/score-card";
import { useScoreQuery } from "@/lib/hooks/use-score-query";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/joy";
import { format } from "date-fns";
import { useWindowSize } from "usehooks-ts";
import { Header } from "@/components/header/header";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import { LoadingSplash } from "@/components/loading/loading-splash";

const ScoresPage = () => {
  const {
    data,
    error,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    isPending,
    isError,
    fetchNextPage,
    fetchPreviousPage,
  } = useScoreQuery();

  const { width: windowWidth } = useWindowSize();

  if (isPending) {
    return <LoadingSplash />;
  }

  if (isError) {
    return null;
  }

  const scoreCards = data.pages.map((page) => (
    <Box key={page.currentDate}>
      <Divider>
        <Typography level={"body-md"}>
          {format(Date.parse(page.currentDate), "PPPP")}
        </Typography>
      </Divider>
      <Box paddingY={4}>
        {page?.games.length ? (
          <Grid container spacing={2}>
            {page.games.map((game) => (
              <Grid key={game.id} xs={12} sm={6}>
                <ScoreCard game={game} compact={windowWidth < 800} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography level={"body-sm"} textAlign={"center"} padding={4}>
            {"No games scheduled"}
          </Typography>
        )}
      </Box>
    </Box>
  ));

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Header>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <SportsHockeyIcon sx={{ color: "success.400", fontSize: "1.5rem" }} />
          <Typography level="h4">{"Rinktide"}</Typography>
        </Stack>
      </Header>
      <Box maxWidth={1000} paddingX={2} paddingY={4}>
        <InfiniteScroll
          reversed={true}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          isLoadingPreviousPage={isFetchingPreviousPage}
          isLoadingNextPage={isFetchingNextPage}
          fetchPreviousPage={fetchPreviousPage}
          fetchNextPage={fetchNextPage}
          loadTopPageButtonText={"Load upcoming games"}
          loadingComponent={
            <CircularProgress size="md" variant="soft" color="neutral" />
          }
        >
          {scoreCards}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default ScoresPage;
