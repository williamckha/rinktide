export const ordinal = (n: number) => {
  return n + ordinalIndicator(n);
};

const ordinalIndicator = (n: number) => {
  const cent = n % 100;
  if (cent >= 10 && cent <= 20) {
    return "th";
  }

  const dec = n % 100;
  if (dec === 1) return "st";
  if (dec === 2) return "nd";
  if (dec === 3) return "rd";
  return "th";
};

export const formatPlayerName = (
  firstName: string,
  lastName: string,
  sweaterNumber?: number,
  initializeFirstName: boolean = false,
) => {
  let formattedName = "";

  if (initializeFirstName) {
    formattedName += `${firstName.charAt(0)}. ${lastName}`;
  } else {
    formattedName += `${firstName} ${lastName}`;
  }

  if (sweaterNumber != null) {
    formattedName += ` (${sweaterNumber})`;
  }

  return formattedName;
};

export const formatPeriod = (
  period: number,
  periodType: "REG" | "SO" | "OT",
  isIntermission?: boolean,
): string => {
  const getFormattedPeriod = () => {
    if (periodType === "REG") {
      return ordinal(period);
    }

    if (periodType === "OT") {
      const overtimeCount = period - 3;
      return overtimeCount === 1 ? "OT" : `${overtimeCount}OT`;
    }

    return "SO";
  };

  return (isIntermission ? "End of " : "") + getFormattedPeriod();
};

export const formatFinal = (
  period: number,
  periodType: "REG" | "SO" | "OT",
): string => {
  return (
    "Final" +
    (periodType !== "REG" ? ` / ${formatPeriod(period, periodType)}` : "")
  );
};
