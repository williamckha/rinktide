import { QueryFunction, useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentDate } from "../helpers/time";
import { Schedule } from "@/app/api/nhl/types";

export const useScoreQuery = () => {
  const fetchScore: QueryFunction<Schedule, string[], string> = async ({
    pageParam,
  }) => {
    const response = await fetch(`/api/nhl/score/${pageParam}`);
    return await response.json();
  };

  return useInfiniteQuery({
    queryKey: ["score"],
    queryFn: fetchScore,
    initialPageParam: getCurrentDate(),
    getNextPageParam: (lastPage) => lastPage.nextDate,
    getPreviousPageParam: (firstPage) => firstPage.prevDate,
  });
};
