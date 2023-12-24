export const clockTimeToSeconds = (clockTime: string) => {
  const [mins, secs] = clockTime.split(":");
  return parseInt(mins) * 60 + parseInt(secs);
}