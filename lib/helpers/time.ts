import { format } from "date-fns";

export const clockTimeToSeconds = (clockTime: string): number => {
  const [mins, secs] = clockTime.split(":");
  return parseInt(mins) * 60 + parseInt(secs);
};

export const getCurrentDate = (): string => {
  return format(new Date(), "yyyy-MM-dd");
};
