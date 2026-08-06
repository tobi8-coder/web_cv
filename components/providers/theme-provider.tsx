"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // Stops every colour token from cross-fading while the theme swaps.
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
