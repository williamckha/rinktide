import {
  GameLanding,
  isLiveGameLanding,
} from "@/app/api/nhl/gamecenter/[gameId]/landing/types";
import { useQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 30000;

export const useGameLandingQuery = (gameId: string) => {
  return useQuery({
    queryKey: ["gameLanding"],
    queryFn: async (): Promise<GameLanding> =>
      fetch(`/api/nhl/gamecenter/${gameId}/landing`).then((response) =>
        response.json(),
      ),
    refetchInterval: (query) => {
      const game = query.state.data;
      return game && isLiveGameLanding(game) ? REFETCH_INTERVAL : false;
    },
  });
};
