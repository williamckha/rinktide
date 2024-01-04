import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardOverflow,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/joy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fragment, useState } from "react";
import { formatPlayerName } from "@/lib/helpers/format";
import { VideoPlayer } from "../video-player/video-player";
import { GoalPlayersDetail } from "./goal-players-detail";
import { useGamePlayByPlayQuery } from "@/lib/hooks/use-game-play-by-play-query";
import { Goal } from "@/lib/models/goal";
import { CompactScoreline } from "./compact-scoreline";
import { GoalModal } from "./goal-modal";
import { GoalScoringDetail } from "./goal-scoring-detail";

interface GoalCardProps {
  goal: Goal;
  isCompact: boolean;
}

export const GoalCard = ({ goal, isCompact = false }: GoalCardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isSuccess, data: gamePlayByPlay } = useGamePlayByPlayQuery(
    goal.gameId.toString(),
  );

  if (!isSuccess) {
    return null;
  }

  return isCompact ? (
    <Fragment>
      <GoalModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        goal={goal}
      />
      <Card
        sx={{ padding: 1, boxShadow: "lg", cursor: "pointer" }}
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar src={goal.scoringPlayer.headshot} size="sm" />
            <Stack direction="column" justifyContent="left" alignItems="left">
              <CompactScoreline
                scoringTeam={goal.scoringTeam}
                awayTeamAbbrev={gamePlayByPlay.awayTeam.abbrev}
                homeTeamAbbrev={gamePlayByPlay.homeTeam.abbrev}
                awayTeamScore={goal.awayScore}
                homeTeamScore={goal.homeScore}
              />
              <Typography level="body-sm">
                {formatPlayerName(
                  goal.scoringPlayer.firstName.default,
                  goal.scoringPlayer.lastName.default,
                  goal.scoringPlayer.sweaterNumber,
                  true,
                )}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Fragment>
  ) : (
    <Card
      variant={"outlined"}
      sx={{
        width: 330,
        boxShadow: "lg",
      }}
    >
      {goal.highlightClip && !isCollapsed && (
        <CardOverflow>
          <VideoPlayer videoId={goal.highlightClip.toString()} />
        </CardOverflow>
      )}
      <CardContent>
        <Box
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          gap={2}
        >
          <GoalPlayersDetail
            scorer={goal.scoringPlayer}
            primaryAssist={goal.primaryAssistPlayer}
            secondaryAssist={goal.secondaryAssistPlayer}
          />
          {goal.highlightClip && (
            <Box marginLeft={"auto"}>
              <IconButton
                variant="outlined"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Chip variant="outlined" color="neutral" size="sm">
            {"GOAL"}
          </Chip>
          <GoalScoringDetail goal={goal} />
        </CardContent>
      </CardOverflow>
    </Card>
  );
};
