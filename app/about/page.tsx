import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About Knovo",
  description: "Why Knovo exists and how it helps AI builders learn with depth.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-medium text-accent">About</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Built for serious AI learning</h1>
      <p className="mt-6 text-lg leading-8 text-muted-foreground">
        Knovo is designed for people who want practical, deeply researched guidance on
        modern AI systems. We focus on implementation details, tradeoffs, and durable
        mental models rather than surface-level summaries.
      </p>
    </div>
  );
}
