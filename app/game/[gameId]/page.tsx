"use client";

import { GoalCard } from "@/components/goal-card/goal-card";
import { GameTideGraphAnnotation } from "@/components/tide-graph/game-tide-graph-annotation";
import { GameTideGraph } from "@/components/tide-graph/game-tide-graph";
import { useGameLandingQuery } from "@/lib/hooks/use-game-landing-query";
import { useGamePlayByPlayQuery } from "@/lib/hooks/use-game-play-by-play-query";
import { Box } from "@mui/joy";
import { useWindowSize } from "usehooks-ts";
import { GameHeader } from "@/components/header/game-header";
import { LoadingSplash } from "@/components/loading/loading-splash";
import { goalsFromGame } from "@/lib/models/goal";

const GameIdPage = ({ params }: { params: { gameId: string } }) => {
  const { width: windowWidth } = useWindowSize();

  const gamePlayByPlayQuery = useGamePlayByPlayQuery(params.gameId);
  const gameLandingQuery = useGameLandingQuery(params.gameId);

  if (gamePlayByPlayQuery.isPending || gameLandingQuery.isPending) {
    return <LoadingSplash />;
  }

  if (gamePlayByPlayQuery.isError || gameLandingQuery.isError) {
    return null;
  }

  const goals = goalsFromGame(gameLandingQuery.data, gamePlayByPlayQuery.data);

  return (
    <Box>
      <GameHeader gamePlayByPlay={gamePlayByPlayQuery.data} />
      <Box position={"relative"}>
        <GameTideGraph game={gamePlayByPlayQuery.data} />
        {goals.map((goal) => (
          <GameTideGraphAnnotation
            key={goal.id}
            id={goal.id}
            time={goal.time}
            team={goal.scoringTeam}
          >
            <GoalCard goal={goal} isCompact={windowWidth < 800} />
          </GameTideGraphAnnotation>
        ))}
      </Box>
    </Box>
  );
};

export default GameIdPage;
