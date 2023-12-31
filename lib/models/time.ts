export interface Time {
  period: number;
  periodType: "REG" | "OT" | "SO";
  timeInPeriod: string;
}
