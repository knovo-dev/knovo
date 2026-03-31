import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { Guide } from "@/lib/mdx";

export function RelatedArticles({ guides }: { guides: Pick<Guide, "slug" | "title" | "description" | "readTime" | "tags">[] }) {
  if (guides.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="text-xl font-semibold">Related articles</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
            <Card className="flex h-full flex-col p-5 transition-colors group-hover:border-accent/50">
              <div className="flex flex-wrap gap-1.5">
                {guide.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-semibold leading-snug tracking-tight group-hover:text-accent transition-colors">
                {guide.title}
              </p>
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
                {guide.description}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">{guide.readTime}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
