import type { Metadata } from "next";
import "@fontsource/inter";
import { QueryProvider } from "@/components/providers/query-provider";
import { CssBaseline, CssVarsProvider } from "@mui/joy";

export const metadata: Metadata = {
  title: "Rinktide",
  description: "Track and discuss NHL games live.",
};

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <CssVarsProvider defaultMode="dark">
          <CssBaseline />
          <QueryProvider>{children}</QueryProvider>
        </CssVarsProvider>
      </body>
    </html>
  );
};

export default RootLayout;
