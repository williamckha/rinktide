import { Box } from "@mui/joy";
import { ReactNode } from "react";

interface HeaderProps {
  children?: ReactNode;
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <Box
      bgcolor={"background.surface"}
      borderBottom={"1px solid"}
      borderColor={"divider"}
      position={"sticky"}
      top={0}
      zIndex={1000}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={2}
    >
      {children}
    </Box>
  );
};
