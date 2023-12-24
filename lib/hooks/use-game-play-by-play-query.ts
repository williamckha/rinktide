import {
  GamePlayByPlay,
  isLiveGamePlayByPlay,
} from "@/app/api/nhl/gamecenter/[gameId]/play-by-play/types";
import { useQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 30000;

export const useGamePlayByPlayQuery = (gameId: string) => {
  return useQuery({
    queryKey: ["gamePlayByPlay"],
    queryFn: async (): Promise<GamePlayByPlay> =>
      fetch(`/api/nhl/gamecenter/${gameId}/play-by-play`).then((response) =>
        response.json(),
      ),
    refetchInterval: (query) => {
      const game = query.state.data;
      return game && isLiveGamePlayByPlay(game) ? REFETCH_INTERVAL : false;
    },
  });
};
