"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={props.attribute ?? "class"}
      storageKey={props.storageKey ?? "knovo-theme"}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
