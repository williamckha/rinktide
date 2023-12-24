import { Box } from "@mui/joy";
import { Scoreboard } from "../scoreboard/scoreboard";
import { GamePlayByPlay } from "@/app/api/nhl/gamecenter/[gameId]/play-by-play/types";

interface GameHeaderProps {
  game: GamePlayByPlay;
}

export const GameHeader = ({ game }: GameHeaderProps) => {
  return (
    <Box
      bgcolor={"background.surface"}
      borderBottom={"1px solid"}
      borderColor={"divider"}
      position={"sticky"}
      top={0}
      zIndex={1000}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      padding={2}
    >
      <Scoreboard game={game} />
    </Box>
  );
};
