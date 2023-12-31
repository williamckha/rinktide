import {
  GamePlayByPlay,
  isLiveGamePlayByPlay,
} from "@/app/api/nhl/gamecenter/[gameId]/play-by-play/types";
import { QueryFunction, useQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 30000;

export const useGamePlayByPlayQuery = (gameId: string | number) => {
  const fetchGamePlayByPlay = async (): Promise<GamePlayByPlay> => {
    const response = await fetch(`/api/nhl/gamecenter/${gameId}/play-by-play`);
    return await response.json();
  };

  return useQuery({
    queryKey: ["gamePlayByPlay"],
    queryFn: fetchGamePlayByPlay,
    refetchInterval: (query) => {
      const game = query.state.data;
      return game && isLiveGamePlayByPlay(game) ? REFETCH_INTERVAL : false;
    },
  });
};
