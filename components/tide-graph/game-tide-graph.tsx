"use client";

import { Box, Grid, Typography } from "@mui/joy";
import { TideGraph } from "./tide-graph";
import { lightenColor } from "@/lib/color/lighten-color";
import { TEAM_COLORS } from "@/lib/color/team-colors";
import {
  FinishedGamePlayByPlay,
  GamePlayByPlay,
  LiveGamePlayByPlay,
  isFutureGamePlayByPlay,
  isShotPlay,
} from "@/app/api/nhl/gamecenter/[gameId]/play-by-play/types";
import { clockTimeToSeconds } from "@/lib/helpers/time";
import { useWindowSize } from "usehooks-ts";
import {
  TEAM_STROKE_COLOR_LIGHTEN_PERCENT,
  TIDE_GRAPH_COMPACT_X_SIZE,
  TIDE_GRAPH_X_SIZE,
  TIDE_GRAPH_Y_SIZE,
} from "./constants";

interface GameTideGraphProps {
  game: GamePlayByPlay;
}

export const GameTideGraph = ({ game }: GameTideGraphProps) => {
  const { width: windowWidth } = useWindowSize();

  if (isFutureGamePlayByPlay(game)) {
    return (
      <Box display={"flex"} justifyContent={"center"} padding={8}>
        <Typography level="body-md" textColor={"neutral.400"}>
          {"This game has not started yet"}
        </Typography>
      </Box>
    );
  }

  const awayTeamColor = TEAM_COLORS[game.awayTeam.abbrev];
  const homeTeamColor = TEAM_COLORS[game.homeTeam.abbrev];

  const awayTeamStrokeColor = lightenColor(
    awayTeamColor,
    TEAM_STROKE_COLOR_LIGHTEN_PERCENT,
  );
  const homeTeamStrokeColor = lightenColor(
    homeTeamColor,
    TEAM_STROKE_COLOR_LIGHTEN_PERCENT,
  );

  const tideGraphXSize =
    windowWidth < 800 ? TIDE_GRAPH_COMPACT_X_SIZE : TIDE_GRAPH_X_SIZE;

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
  };

  return (
    <Grid container width="100%">
      <Grid xs>
        <TideGraph
          xSize={tideGraphXSize}
          ySize={TIDE_GRAPH_Y_SIZE}
          data={groupShotTimestampsByPeriod(game, game.awayTeam.id)}
          color={awayTeamColor}
          strokeColor={awayTeamStrokeColor}
          team={"away"}
        />
      </Grid>
      <Grid xs="auto">
        <Box
          width={4}
          height={"100%"}
          marginX={"4px"}
          bgcolor={"neutral.400"}
        />
      </Grid>
      <Grid xs>
        <TideGraph
          xSize={tideGraphXSize}
          ySize={TIDE_GRAPH_Y_SIZE}
          data={groupShotTimestampsByPeriod(game, game.homeTeam.id)}
          color={homeTeamColor}
          strokeColor={homeTeamStrokeColor}
          team={"home"}
        />
      </Grid>
    </Grid>
  );
};
