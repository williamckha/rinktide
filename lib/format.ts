export const formatPlayerName = (
  firstName: string,
  lastName: string,
  sweaterNumber?: number,
  initializeFirstName: boolean = false,
) => {
  let formattedName = "";

  if (initializeFirstName) {
    formattedName += `${firstName.charAt(0)}. ${lastName}`
  } else {
    formattedName += `${firstName} ${lastName}`;
  }

  if (sweaterNumber != null) {
    formattedName += ` (${sweaterNumber})`;
  }

  return formattedName;
}