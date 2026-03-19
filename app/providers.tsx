"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/app/posthog-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </PostHogProvider>
  );
}
