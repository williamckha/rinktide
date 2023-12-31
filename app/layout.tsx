import type { Metadata } from "next";
import { QueryProvider } from "@/components/providers/query-provider";
import { CssBaseline, CssVarsProvider } from "@mui/joy";

import "@fontsource/inter";

export const metadata: Metadata = {
  title: "Rinktide",
  description: "Track and discuss NHL games live.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
