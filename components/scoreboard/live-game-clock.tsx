import { formatPeriod } from "@/lib/helpers/format";
import { Box, LinearProgress, Typography } from "@mui/joy";

interface LiveGameClockProps {
  period: number;
  periodType: "REG" | "OT" | "SO";
  timeRemaining: string;
  isIntermission: boolean;
}

export const LiveGameClock = ({
  period,
  periodType,
  timeRemaining,
  isIntermission,
}: LiveGameClockProps) => {
  if (periodType === "SO") {
    return (
      <Box>
        <Typography level="title-sm" fontWeight="lg" textAlign={"center"}>
          {"Shootout"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        level="title-sm"
        fontWeight="lg"
        textAlign={"center"}
        color="success"
      >
        {timeRemaining}
      </Typography>
      <Typography level="body-sm" textAlign={"center"} color="success">
        {formatPeriod(period, periodType, isIntermission)}
      </Typography>
      <LinearProgress
        variant="plain"
        thickness={2}
        color="success"
        sx={{ paddingTop: 0.5 }}
      />
    </Box>
  );
};
