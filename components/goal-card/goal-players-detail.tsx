import { RosterSpot } from "@/app/api/nhl/types";
import { formatPlayerName } from "@/lib/helpers/format";
import { useGamePlayByPlayQuery } from "@/lib/hooks/use-game-play-by-play-query";
import { Avatar, Stack, Typography } from "@mui/joy";

interface GoalPlayersDetailProps {
  scorer: RosterSpot;
  primaryAssist?: RosterSpot;
  secondaryAssist?: RosterSpot;
}

export const GoalPlayersDetail = ({
  scorer,
  primaryAssist,
  secondaryAssist,
}: GoalPlayersDetailProps) => {
  const scorerName = formatPlayerName(
    scorer.firstName.default,
    scorer.lastName.default,
    scorer.sweaterNumber,
  );

  const assistNames = primaryAssist
    ? formatPlayerName(
        primaryAssist.firstName.default,
        primaryAssist.lastName.default,
        primaryAssist.sweaterNumber,
        true,
      ) +
      (secondaryAssist
        ? ` and ${formatPlayerName(
            secondaryAssist.firstName.default,
            secondaryAssist.lastName.default,
            secondaryAssist.sweaterNumber,
            true,
          )}`
        : "")
    : null;

  return (
    <Stack direction={"row"} gap={2} alignItems={"center"}>
      <Avatar src={scorer.headshot} sx={{ "--Avatar-size": "4rem" }} />
      <Stack direction="column" alignItems="left">
        <Typography level="title-sm">{scorerName}</Typography>
        {assistNames && <Typography level="body-sm">{assistNames}</Typography>}
      </Stack>
    </Stack>
  );
};
