import { PeriodDescriptor } from "@/app/api/nhl/types";
import ordinal from "ordinal";

export const formatPeriod = (period: PeriodDescriptor): string => {
  if (period.periodType === "REG") {
    return ordinal(period.number);
  }

  if (period.periodType === "OT") {
    return `OT${period.number - 3}`;
  }

  return "SO";
};
