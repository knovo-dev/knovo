import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Community",
  description: "Community section coming soon for Knovo readers and builders.",
  path: "/community",
});

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight">Community is coming soon</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Expect discussion spaces, study groups, and implementation-focused collaboration.
      </p>
    </div>
  );
}
