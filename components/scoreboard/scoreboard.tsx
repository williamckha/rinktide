import {
  GamePlayByPlay,
  isFinishedGamePlayByPlay,
  isFutureGamePlayByPlay,
  isLiveGamePlayByPlay,
} from "@/app/api/nhl/gamecenter/[gameId]/play-by-play/types";
import { Box, Grid, Stack, Typography } from "@mui/joy";
import { LiveGameClock } from "./live-game-clock";
import { format } from "date-fns";
import { formatFinal } from "@/lib/helpers/format";

interface ScoreboardProps {
  game: GamePlayByPlay;
}

export const Scoreboard = ({ game }: ScoreboardProps) => {
  return (
    <Grid container spacing={{ xs: 2, sm: 4 }} alignItems={"center"}>
      <Grid xs>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={{ xs: "center", sm: "start" }}
          alignItems={"center"}
          spacing={{ xs: 0, sm: 2 }}
        >
          <img
            src={game.awayTeam.logo}
            alt={game.awayTeam.abbrev}
            width={50}
            height={50}
          />
          <Typography level="title-lg">{game.awayTeam.abbrev}</Typography>
        </Stack>
      </Grid>

      <Grid xs={8} sm={6}>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          spacing={4}
        >
          <Grid xs={2}>
            {"score" in game.awayTeam && (
              <Typography level="h2" textAlign={"center"}>
                {game.awayTeam.score}
              </Typography>
            )}
          </Grid>
          <Grid xs={2}>
            {isLiveGamePlayByPlay(game) ? (
              <LiveGameClock
                period={game.periodDescriptor.number}
                periodType={game.periodDescriptor.periodType}
                timeRemaining={game.clock.timeRemaining}
                isIntermission={game.clock.inIntermission}
              />
            ) : (
              <Box>
                <Typography
                  level="title-sm"
                  fontWeight="lg"
                  textAlign={"center"}
                >
                  {isFinishedGamePlayByPlay(game)
                    ? formatFinal(
                        game.periodDescriptor.number,
                        game.periodDescriptor.periodType,
                      )
                    : format(game.startTimeUTC, "h:mm a ")}
                </Typography>
                <Typography level="body-sm" textAlign={"center"}>
                  {format(game.startTimeUTC, "PP")}
                </Typography>
              </Box>
            )}
          </Grid>
          <Grid xs={2}>
            {"score" in game.homeTeam && (
              <Typography level="h2" textAlign={"center"}>
                {game.homeTeam.score}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>

      <Grid xs>
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          justifyContent={{ xs: "center", sm: "end" }}
          alignItems={"center"}
          spacing={{ xs: 0, sm: 2 }}
        >
          <Typography level={"title-lg"}>{game.homeTeam.abbrev}</Typography>
          <img
            src={game.homeTeam.logo}
            alt={game.homeTeam.abbrev}
            width={50}
            height={50}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};
