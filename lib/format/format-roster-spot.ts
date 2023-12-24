import { RosterSpot } from "@/app/api/nhl/types";

export const formatRosterSpot = (
  rosterSpot: RosterSpot,
  abbrevFirstName: boolean = false,
  includeSweaterNumber: boolean = true,
): string => {
  const firstName = abbrevFirstName
    ? `${rosterSpot.firstName.default.charAt(0)}.`
    : rosterSpot.firstName.default;
  let formattedString = `${firstName} ${rosterSpot.lastName.default}`;

  if (includeSweaterNumber) {
    formattedString += ` ${rosterSpot.sweaterNumber}`;
  }

  return formattedString;
};
