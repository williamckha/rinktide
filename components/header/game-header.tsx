import { Grid, IconButton, Tooltip } from "@mui/joy";
import { Header } from "./header";
import { Scoreboard } from "../scoreboard/scoreboard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useWindowSize } from "usehooks-ts";
import { GamePlayByPlay } from "@/app/api/nhl/gamecenter/[gameId]/play-by-play/types";

interface GameHeaderProps {
  gamePlayByPlay: GamePlayByPlay;
}

export const GameHeader = ({ gamePlayByPlay }: GameHeaderProps) => {
  const { width: windowWidth } = useWindowSize();

  return (
    <Header>
      <Grid container direction={"row"} width={"100%"} alignItems={"center"}>
        <Grid xs>
          {windowWidth >= 800 && (
            <Tooltip
              title={"Back to scores"}
              variant={"outlined"}
              placement={"bottom-start"}
            >
              <IconButton
                variant={"outlined"}
                component={"a"}
                href={"/"}
                aria-label={"Back to scores"}
              >
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
          )}
        </Grid>
        <Grid xs={"auto"}>
          <Scoreboard game={gamePlayByPlay} />
        </Grid>
        <Grid xs />
      </Grid>
    </Header>
  );
};
