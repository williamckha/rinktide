import { formatPeriod } from "@/lib/helpers/format";
import { Stack, Typography, Divider } from "@mui/joy";
import { CompactScoreline } from "./compact-scoreline";
import { Goal } from "@/lib/models/goal";
import { useGamePlayByPlayQuery } from "@/lib/hooks/use-game-play-by-play-query";

interface GoalScoringDetailProps {
  goal: Goal;
}

export const GoalScoringDetail = ({ goal }: GoalScoringDetailProps) => {
  const { isSuccess, data: gamePlayByPlay } = useGamePlayByPlayQuery(
    goal.gameId.toString(),
  );

  if (!isSuccess) {
    return null;
  }

  return (
    <Stack direction={"row"} justifyContent={"center"} spacing={1.5}>
      <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
        {formatPeriod(goal.time.period, goal.time.periodType)}
      </Typography>
      <Divider orientation="vertical" />
      <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
        {goal.time.timeInPeriod}
      </Typography>
      <Divider orientation="vertical" />
      <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
        {goal.strength.toUpperCase()}
      </Typography>
      <Divider orientation="vertical" />
      <CompactScoreline
        scoringTeam={goal.scoringTeam}
        awayTeamAbbrev={gamePlayByPlay.awayTeam.abbrev}
        homeTeamAbbrev={gamePlayByPlay.homeTeam.abbrev}
        awayTeamScore={goal.awayScore}
        homeTeamScore={goal.homeScore}
      />
    </Stack>
  );
};
