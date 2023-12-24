import { HIGHLIGHT_CLIP_URL } from "@/app/api/nhl/constants";
import {
  AspectRatio,
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
import { useState } from "react";
import { formatPlayerName } from "@/lib/format";

interface GoalCardProps {
  scorerFirstName: string;
  scorerLastName: string;
  scorerSweaterNumber?: number;
  scorerHeadshot: string;
  scorerTeam: "away" | "home";
  primaryAssistFirstName?: string;
  primaryAssistLastName?: string;
  primaryAssistSweaterNumber?: number;
  secondaryAssistFirstName?: string;
  secondaryAssistLastName?: string;
  secondaryAssistSweaterNumber?: number;
  period: string;
  timeInPeriod: string;
  awayTeamAbbrev: string;
  homeTeamAbbrev: string;
  awayTeamScore: number;
  homeTeamScore: number;
  highlightClipId?: number;
  isCompact: boolean;
}

export const GoalCard = ({
  scorerFirstName,
  scorerLastName,
  scorerSweaterNumber,
  scorerHeadshot,
  scorerTeam,
  primaryAssistFirstName,
  primaryAssistLastName,
  primaryAssistSweaterNumber,
  secondaryAssistFirstName,
  secondaryAssistLastName,
  secondaryAssistSweaterNumber,
  period,
  timeInPeriod,
  awayTeamAbbrev,
  homeTeamAbbrev,
  awayTeamScore,
  homeTeamScore,
  highlightClipId,
  isCompact = false,
}: GoalCardProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const assistNames =
    primaryAssistFirstName && primaryAssistLastName
      ? formatPlayerName(
          primaryAssistFirstName,
          primaryAssistLastName,
          primaryAssistSweaterNumber,
          true,
        ) +
        (secondaryAssistFirstName && secondaryAssistLastName
          ? ` and ${formatPlayerName(
              secondaryAssistFirstName,
              secondaryAssistLastName,
              secondaryAssistSweaterNumber,
              true,
            )}`
          : "")
      : null;

  if (isCompact) {
    return (
      <Card sx={{ padding: 1, boxShadow: "lg" }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Avatar src={scorerHeadshot} size="sm" />
            <Stack direction="column" justifyContent="left" alignItems="left">
              <Typography
                level="title-sm"
                fontWeight="md"
                textColor="text.secondary"
              >
                <Typography fontWeight={scorerTeam === "away" ? "lg" : "sm"}>
                  {`${awayTeamAbbrev} ${awayTeamScore}`}
                </Typography>
                {" - "}
                <Typography fontWeight={scorerTeam === "home" ? "lg" : "sm"}>
                  {`${homeTeamAbbrev} ${homeTeamScore}`}
                </Typography>
              </Typography>
              <Typography level="body-sm">
                {`${scorerFirstName.charAt(
                  0,
                )}. ${scorerLastName} (${scorerSweaterNumber})`}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        boxShadow: "lg",
      }}
    >
      {highlightClipId && (
        <CardOverflow
          sx={{
            overflow: "hidden",
            height: isCollapsed ? 0 : null,
          }}
        >
          <AspectRatio>
            <iframe
              style={{ border: 0, userSelect: "none" }}
              src={HIGHLIGHT_CLIP_URL + highlightClipId + "&autoplay=false"}
              allowFullScreen={true}
              allow="encrypted-media *;"
            />
          </AspectRatio>
        </CardOverflow>
      )}
      <CardContent>
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
          spacing={2}
        >
          <Avatar src={scorerHeadshot} sx={{ "--Avatar-size": "4rem" }} />
          <Stack direction="column" justifyContent={"left"} alignItems="left">
            <Typography level="title-sm">
              {`${scorerFirstName} ${scorerLastName} (${scorerSweaterNumber})`}
            </Typography>
            {assistNames && (
              <Typography level="body-sm">{assistNames}</Typography>
            )}
          </Stack>
          <IconButton
            variant="outlined"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Stack>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: "background.level1" }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Chip
            variant="outlined"
            color="neutral"
            size="sm"
            sx={{ pointerEvents: "none" }}
          >
            {"GOAL"}
          </Chip>
          <Typography
            level="body-xs"
            fontWeight="md"
            textColor="text.secondary"
          >
            {timeInPeriod}
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body-xs"
            fontWeight="md"
            textColor="text.secondary"
          >
            {period}
          </Typography>
          <Divider orientation="vertical" />
          <Typography
            level="body-xs"
            fontWeight="md"
            textColor="text.secondary"
          >
            <Typography fontWeight={scorerTeam === "away" ? "lg" : "sm"}>
              {`${awayTeamAbbrev} ${awayTeamScore}`}
            </Typography>
            {" - "}
            <Typography fontWeight={scorerTeam === "home" ? "lg" : "sm"}>
              {`${homeTeamAbbrev} ${homeTeamScore}`}
            </Typography>
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};
