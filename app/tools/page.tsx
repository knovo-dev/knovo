import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Tools",
  description: "Tooling section coming soon for the Knovo knowledge hub.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Tools are coming soon</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        We&apos;re preparing calculators, prompt workbenches, and evaluation utilities for AI teams.
      </p>
    </div>
  );
}
