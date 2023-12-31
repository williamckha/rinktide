import { Game, isFinishedGame, isLiveGame } from "@/app/api/nhl/types";
import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/joy";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { format } from "date-fns";
import { formatFinal, formatPeriod } from "@/lib/helpers/format";
import { Link as MUILink } from "@mui/joy";
import { VideoPlayerModal } from "../video-player/video-player-modal";
import { Fragment, useState } from "react";

interface ScoreCardProps {
  game: Game;
  compact?: boolean;
}

export const ScoreCard = ({ game, compact }: ScoreCardProps) => {
  const [isRecapModalOpen, setIsRecapModalOpen] = useState(false);
  const isLiveOrFinishedGame = isLiveGame(game) || isFinishedGame(game);

  return (
    <Card
      orientation={compact ? "vertical" : "horizontal"}
      sx={{
        transition: "background-color 150ms",
        ":hover": { bgcolor: "background.level1" },
        ":active": { bgcolor: "background.level2" },
      }}
    >
      <Stack direction={"column"} gap={2} flex={1} paddingRight={1}>
        <ScoreCardRow
          teamName={game.awayTeam.name?.default ?? game.awayTeam.abbrev}
          teamLogo={game.awayTeam.logo}
          score={isLiveOrFinishedGame ? game.awayTeam.score : undefined}
          subtext={
            isLiveOrFinishedGame ? `SOG: ${game.awayTeam.sog}` : undefined
          }
        />
        <ScoreCardRow
          teamName={game.homeTeam.name?.default ?? game.homeTeam.abbrev}
          teamLogo={game.homeTeam.logo}
          score={isLiveOrFinishedGame ? game.homeTeam.score : undefined}
          subtext={
            isLiveOrFinishedGame ? `SOG: ${game.homeTeam.sog}` : undefined
          }
        />
      </Stack>
      <Divider />
      <Stack
        direction={compact ? "row-reverse" : "column"}
        justifyContent={compact ? "space-between" : "center"}
        alignItems={"center"}
        width={compact ? undefined : 100}
        gap={1}
      >
        <Typography textAlign={"center"}>
          <MUILink
            href={`/game/${game.id}`}
            overlay
            underline="none"
            level={"body-md"}
            color="neutral"
          >
            {isLiveGame(game) ? (
              <Stack direction={"column"} gap={0.5}>
                <Typography color="success">
                  {`${formatPeriod(
                    game.periodDescriptor.number,
                    game.periodDescriptor.periodType,
                    game.clock.inIntermission,
                  )} - ${game.clock.timeRemaining}`}
                </Typography>
                <LinearProgress variant="plain" thickness={2} color="success" />
              </Stack>
            ) : isFinishedGame(game) ? (
              formatFinal(
                game.periodDescriptor.number,
                game.periodDescriptor.periodType,
              )
            ) : (
              format(Date.parse(game.startTimeUTC), "h:mm a")
            )}
          </MUILink>
        </Typography>
        {isFinishedGame(game) && game.threeMinRecap && (
          <Fragment>
            <Button
              startDecorator={<PlayCircleOutlineIcon />}
              variant="outlined"
              color="neutral"
              sx={{ bgcolor: "background.surface" }}
              onClick={() => setIsRecapModalOpen(true)}
            >
              {"Recap"}
            </Button>
            <VideoPlayerModal
              videoId={game.threeMinRecap.split("-").pop()?.trim() ?? ""}
              open={isRecapModalOpen}
              onClose={() => setIsRecapModalOpen(false)}
            />
          </Fragment>
        )}
      </Stack>
    </Card>
  );
};

interface ScoreCardRowProps {
  teamName: string;
  teamLogo: string;
  score?: number;
  subtext?: string;
}

const ScoreCardRow = ({
  teamName,
  teamLogo,
  score,
  subtext,
}: ScoreCardRowProps) => {
  return (
    <Grid container direction={"row"} alignItems={"center"} spacing={2}>
      <Grid xs={"auto"} width={64} height={64}>
        <AspectRatio ratio={1} objectFit="contain" variant="plain">
          <img src={teamLogo} alt={teamName} style={{ userSelect: "none" }} />
        </AspectRatio>
      </Grid>
      <Grid xs>
        <Stack direction={"column"}>
          <Typography level="title-lg">{teamName}</Typography>
          {subtext && <Typography level="body-sm">{subtext}</Typography>}
        </Stack>
      </Grid>
      <Grid xs={"auto"}>
        {score !== null && <Typography level="h3">{score}</Typography>}
      </Grid>
    </Grid>
  );
};
