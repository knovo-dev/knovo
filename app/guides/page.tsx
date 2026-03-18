import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getGuides } from "@/lib/mdx";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "AI Guides",
  description: "Browse in-depth AI guides on prompting, RAG, agents, models, and more.",
  path: "/guides",
});

export default function GuidesPage() {
  const guides = getGuides();

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-medium text-accent">Guides</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Practical AI knowledge that compounds</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Deep guides for developers, researchers, and teams building real AI systems.
        </p>
      </div>

      <div className="mt-10 grid gap-6">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}>
            <Card className="p-6 transition-colors hover:border-accent/40">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    {guide.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                    {guide.updatedMonthly ? <Badge className="border-accent/30 text-accent">Updated monthly</Badge> : null}
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight">{guide.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.description}</p>
                </div>
                <div className="shrink-0 text-sm text-muted-foreground">
                  <p>{guide.readTime}</p>
                  <p className="mt-2">Verified {guide.lastVerified}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
