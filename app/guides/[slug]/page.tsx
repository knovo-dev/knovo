import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ReadingProgress } from "@/components/reading-progress";
import { ShareButtons } from "@/components/share-buttons";
import { Sidebar } from "@/components/layout/sidebar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCompiledGuide, getGuideSlugs, getNextGuide } from "@/lib/mdx";
import { absoluteUrl, createMetadata } from "@/lib/seo";

type GuidePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const guide = await getCompiledGuide(slug);
    return createMetadata({
      title: guide.title,
      description: guide.description,
      path: `/guides/${slug}`,
    });
  } catch {
    return createMetadata({
      title: "Guide not found",
      path: `/guides/${slug}`,
    });
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;

  try {
    const guide = await getCompiledGuide(slug);
    const nextGuide = getNextGuide(slug);
    const url = absoluteUrl(`/guides/${slug}`);
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      datePublished: guide.date,
      dateModified: guide.lastVerified,
      author: {
        "@type": "Organization",
        name: guide.author,
      },
      publisher: {
        "@type": "Organization",
        name: "Knovo",
      },
      mainEntityOfPage: url,
    };

    return (
      <>
        <ReadingProgress />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="size-4" />
            <Link href="/guides" className="hover:text-foreground">
              Guides
            </Link>
            <ChevronRight className="size-4" />
            <span className="text-foreground">{guide.title}</span>
          </nav>

          <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
            <article className="min-w-0">
              <header className="border-b border-border pb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge>Last verified {guide.lastVerified}</Badge>
                  {guide.updatedMonthly ? <Badge className="border-accent/30 text-accent">Updated monthly</Badge> : null}
                </div>
                <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                  {guide.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{guide.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span>By {guide.author}</span>
                  <span>{guide.date}</span>
                  <span>{guide.readTime}</span>
                </div>
                <div className="mt-6">
                  <ShareButtons title={guide.title} url={url} />
                </div>
              </header>

              <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
                {guide.content}
              </div>

              {nextGuide ? (
                <Card className="mt-12 p-6">
                  <p className="text-sm font-medium text-accent">Next article</p>
                  <Link href={`/guides/${nextGuide.slug}`} className="mt-2 block text-2xl font-semibold tracking-tight">
                    {nextGuide.title}
                  </Link>
                  <p className="mt-2 text-sm text-muted-foreground">{nextGuide.description}</p>
                </Card>
              ) : null}
            </article>

            <Sidebar headings={guide.headings} />
          </div>
        </div>
      </>
    );
  } catch {
    notFound();
  }
}
