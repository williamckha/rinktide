"use client";

import { Box, Grid, Stack } from "@mui/joy";
import { TideGraph } from "./tide-graph";
import { useMemo } from "react";
import { lightenColor } from "@/lib/color/lighten-color";
import { getTeamColor } from "@/lib/color/team-colors";
import {
  FinishedGamePlayByPlay,
  GamePlayByPlay,
  LiveGamePlayByPlay,
  isFinishedGamePlayByPlay,
  isLiveGamePlayByPlay,
  isShotPlay,
} from "@/app/api/nhl/gamecenter/[gameId]/play-by-play/types";
import { clockTimeToSeconds } from "@/lib/clock-helpers";

const TEAM_STROKE_COLOR_LIGHTEN_PERCENT = 20;

interface GameTideGraphProps {
  game: GamePlayByPlay;
}

export const GameTideGraph = ({ game }: GameTideGraphProps) => {
  const awayTeamColor = useMemo(
    () => getTeamColor(game.awayTeam.abbrev),
    [game.awayTeam.abbrev],
  );

  const homeTeamColor = useMemo(
    () => getTeamColor(game.homeTeam.abbrev),
    [game.homeTeam.abbrev],
  );

  const awayTeamStrokeColor = useMemo(
    () => lightenColor(awayTeamColor, TEAM_STROKE_COLOR_LIGHTEN_PERCENT),
    [awayTeamColor],
  );

  const homeTeamStrokeColor = useMemo(
    () => lightenColor(homeTeamColor, TEAM_STROKE_COLOR_LIGHTEN_PERCENT),
    [homeTeamColor],
  );

  if (!isLiveGamePlayByPlay(game) && !isFinishedGamePlayByPlay(game)) {
    return <p>Future game</p>;
  }

  const groupShotTimestampsByPeriod = (
    game: LiveGamePlayByPlay | FinishedGamePlayByPlay,
    teamId: number,
  ): number[][] => {
    return game.plays
      .filter(isShotPlay)
      .filter((play) => play.periodDescriptor.periodType !== "SO")
      .filter((play) => {
        if (play.typeDescKey === "blocked-shot") {
          return play.details.eventOwnerTeamId !== teamId;
        } else {
          return play.details.eventOwnerTeamId === teamId;
        }
      })
      .reduce<number[][]>((periods, play) => {
        const timestamp = clockTimeToSeconds(play.timeInPeriod);

        const periodId = play.periodDescriptor.number - 1;
        periods[periodId] = periods[periodId] || [];
        periods[periodId].push(timestamp);

        return periods;
      }, []);
  }

  const awayTideGraph = groupShotTimestampsByPeriod(game, game.awayTeam.id).map(
    (period, periodId) => (
      <TideGraph
        key={periodId}
        height={800}
        data={period}
        color={awayTeamColor}
        strokeColor={awayTeamStrokeColor}
        flipped={true}
      />
    ),
  );

  const homeTideGraph = groupShotTimestampsByPeriod(game, game.homeTeam.id).map(
    (period, periodId) => (
      <TideGraph
        key={periodId}
        height={800}
        data={period}
        color={homeTeamColor}
        strokeColor={homeTeamStrokeColor}
      />
    ),
  );

  return (
    <Grid container width="100%">
      <Grid xs>
        <Stack direction={"column"} spacing="12px">
          {awayTideGraph}
        </Stack>
      </Grid>
      <Grid xs="auto">
        <Box width={12} />
      </Grid>
      <Grid xs>
        <Stack direction={"column"} spacing="12px">
          {homeTideGraph}
        </Stack>
      </Grid>
    </Grid>
  );
};
