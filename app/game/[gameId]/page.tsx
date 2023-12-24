"use client";

import { GameHeader } from "@/components/game-header/game-header";
import { GoalCard } from "@/components/play-card/goal-card";
import { GameTideGraphAnnotation } from "@/components/tide-graph/annotation";
import { GameTideGraph } from "@/components/tide-graph/game-tide-graph";
import { clockTimeToSeconds } from "@/lib/clock-helpers";
import { formatPeriod } from "@/lib/format/format-period";
import { useGameLandingQuery } from "@/lib/hooks/use-game-landing-query";
import { useGamePlayByPlayQuery } from "@/lib/hooks/use-game-play-by-play-query";
import { Box, Stack } from "@mui/joy";
import { useWindowSize } from "usehooks-ts";

export default function GameIdPage({ params }: { params: { gameId: string } }) {
  const { width: windowWidth } = useWindowSize();

  const gamePlayByPlayQuery = useGamePlayByPlayQuery(params.gameId);
  const gameLandingQuery = useGameLandingQuery(params.gameId);

  if (gamePlayByPlayQuery.isPending || gameLandingQuery.isPending) {
    return <p>Loading</p>;
  }

  if (gamePlayByPlayQuery.isError || gameLandingQuery.isError) {
    return <p>Error</p>;
  }

  const getSweaterNumber = (playerId?: number) => {
    if (playerId == undefined) {
      return undefined;
    }
    return gamePlayByPlayQuery.data.rosterSpots.find(
      (rosterSpot) => rosterSpot.playerId === playerId,
    )?.sweaterNumber;
  };

  return (
    <Box>
      <GameHeader game={gamePlayByPlayQuery.data} />
      <Box position={"relative"}>
        <GameTideGraph game={gamePlayByPlayQuery.data}></GameTideGraph>
        {gameLandingQuery.data.summary.scoring.flatMap((period) =>
          period.goals.map((goal) => (
            <GameTideGraphAnnotation
              key={`${goal.awayScore}-${goal.homeScore}-${goal.timeInPeriod}`}
              period={period.periodDescriptor.number}
              timeInPeriod={clockTimeToSeconds(goal.timeInPeriod)}
              team={
                goal.teamAbbrev === gameLandingQuery.data.awayTeam.abbrev
                  ? "away"
                  : "home"
              }
            >
              <GoalCard
                scorerFirstName={goal.firstName}
                scorerLastName={goal.lastName}
                scorerSweaterNumber={getSweaterNumber(goal.playerId)}
                scorerHeadshot={goal.headshot}
                scorerTeam={
                  goal.teamAbbrev === gameLandingQuery.data.awayTeam.abbrev
                    ? "away"
                    : "home"
                }
                primaryAssistFirstName={goal.assists.at(0)?.firstName}
                primaryAssistLastName={goal.assists.at(0)?.lastName}
                primaryAssistSweaterNumber={getSweaterNumber(
                  goal.assists.at(0)?.playerId,
                )}
                secondaryAssistFirstName={goal.assists.at(1)?.firstName}
                secondaryAssistLastName={goal.assists.at(1)?.lastName}
                secondaryAssistSweaterNumber={getSweaterNumber(
                  goal.assists.at(1)?.playerId,
                )}
                period={formatPeriod(period.periodDescriptor)}
                timeInPeriod={goal.timeInPeriod}
                awayTeamAbbrev={gameLandingQuery.data.awayTeam.abbrev}
                homeTeamAbbrev={gameLandingQuery.data.homeTeam.abbrev}
                awayTeamScore={goal.awayScore}
                homeTeamScore={goal.homeScore}
                highlightClipId={goal.highlightClip}
                isCompact={windowWidth < 800}
              />
            </GameTideGraphAnnotation>
          )),
        )}
      </Box>
    </Box>
  );
}
