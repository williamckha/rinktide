import { Typography } from "@mui/joy";

interface CompactScorelineProps {
  scoringTeam: "away" | "home";
  awayTeamAbbrev: string;
  homeTeamAbbrev: string;
  awayTeamScore: number;
  homeTeamScore: number;
}

export const CompactScoreline = ({
  scoringTeam,
  awayTeamAbbrev,
  homeTeamAbbrev,
  awayTeamScore,
  homeTeamScore,
}: CompactScorelineProps) => {
  return (
    <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
      <Typography fontWeight={scoringTeam === "away" ? "lg" : "sm"}>
        {`${awayTeamAbbrev} ${awayTeamScore}`}
      </Typography>
      {" - "}
      <Typography fontWeight={scoringTeam === "home" ? "lg" : "sm"}>
        {`${homeTeamAbbrev} ${homeTeamScore}`}
      </Typography>
    </Typography>
  );
};
