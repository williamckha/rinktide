import { Box, CircularProgress } from "@mui/joy";

export const LoadingSplash = () => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress size="lg" variant="soft" color="neutral" />
    </Box>
  );
};
