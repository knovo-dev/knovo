import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { ReadingProgress } from "@/components/reading-progress";
import { Sidebar } from "@/components/layout/sidebar";
import { ArticleHero } from "@/components/article-hero";
import { RelatedArticles } from "@/components/related-articles";
import { getCompiledGuide, getGuideSlugs, getRelatedGuides } from "@/lib/mdx";
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
    const relatedGuides = getRelatedGuides(slug, guide.tags);
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
              <ArticleHero
                title={guide.title}
                description={guide.description}
                author={guide.author}
                date={guide.date}
                lastVerified={guide.lastVerified}
                readTime={guide.readTime}
                tags={guide.tags}
                updatedMonthly={guide.updatedMonthly}
                url={url}
              />

              <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">
                {guide.content}
              </div>

              <RelatedArticles guides={relatedGuides} />
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
