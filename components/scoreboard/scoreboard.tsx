import {
  GamePlayByPlay,
  isFinishedGamePlayByPlay,
  isLiveGamePlayByPlay,
} from "@/app/api/nhl/gamecenter/[gameId]/play-by-play/types";
import { formatPeriod } from "@/lib/format/format-period";
import { Box, Grid, Stack, Typography } from "@mui/joy";
import { format, parseISO } from "date-fns";

interface ScoreboardProps {
  game: GamePlayByPlay;
}

export const Scoreboard = ({ game }: ScoreboardProps) => {
  let clock;
  if (isLiveGamePlayByPlay(game)) {
    if (game.periodDescriptor.periodType === "SO") {
      clock = (
        <Box>
          <Typography level="title-sm" fontWeight="lg" textAlign={"center"}>
            {"Shootout"}
          </Typography>
        </Box>
      );
    } else {
      clock = (
        <Box>
          <Typography level="title-sm" fontWeight="lg" textAlign={"center"}>
            {game.clock.timeRemaining}
          </Typography>
          <Typography level="body-sm" textAlign={"center"}>
            {formatPeriod(game.periodDescriptor)}
          </Typography>
        </Box>
      );
    }
  } else {
    const startDate = parseISO(game.startTimeUTC);
    clock = (
      <Box>
        <Typography level="title-sm" fontWeight="lg" textAlign={"center"}>
          {isFinishedGamePlayByPlay(game)
            ? "Final"
            : format(startDate, "h:mm a ")}
        </Typography>
        <Typography level="body-sm" textAlign={"center"}>
          {format(startDate, "PP")}
        </Typography>
      </Box>
    );
  }

  const centerComponent =
    isLiveGamePlayByPlay(game) || isFinishedGamePlayByPlay(game) ? (
      <Grid container justifyContent={"center"} spacing={4}>
        <Grid xs={2}>
          <Typography level="h2" textAlign={"center"}>
            {game.awayTeam.score}
          </Typography>
        </Grid>
        <Grid xs={2}>{clock}</Grid>
        <Grid xs={2}>
          <Typography level="h2" textAlign={"center"}>
            {game.homeTeam.score}
          </Typography>
        </Grid>
      </Grid>
    ) : (
      clock
    );

  return (
    <Grid container spacing={{xs: 2, sm: 4}} alignItems={"center"}>
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
        {centerComponent}
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
