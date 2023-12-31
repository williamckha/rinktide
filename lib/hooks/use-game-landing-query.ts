import {
  GameLanding,
  isLiveGameLanding,
} from "@/app/api/nhl/gamecenter/[gameId]/landing/types";
import { useQuery } from "@tanstack/react-query";

const REFETCH_INTERVAL = 30000;

export const useGameLandingQuery = (gameId: string) => {
  const fetchGameLanding = async (): Promise<GameLanding> => {
    const response = await fetch(`/api/nhl/gamecenter/${gameId}/landing`);
    return await response.json();
  };

  return useQuery({
    queryKey: ["gameLanding"],
    queryFn: fetchGameLanding,
    refetchInterval: (query) => {
      const game = query.state.data;
      return game && isLiveGameLanding(game) ? REFETCH_INTERVAL : false;
    },
  });
};
