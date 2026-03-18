import Link from "next/link";
import { ArrowRight, BookOpenText, BrainCircuit, Bot, DatabaseZap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const featuredGuides = [
  {
    title: "Prompt Engineering",
    description:
      "Learn reusable prompting patterns, system prompt design, evaluation, and failure-proof instruction writing.",
    href: "/guides/prompt-engineering-guide",
    icon: BrainCircuit,
    meta: "18 min read",
  },
  {
    title: "RAG Systems",
    description:
      "Build retrieval pipelines with strong chunking, embedding, reranking, grounding, and evaluation foundations.",
    href: "/guides/how-to-build-rag",
    icon: DatabaseZap,
    meta: "20 min read",
  },
  {
    title: "AI Agents",
    description:
      "Understand planning, tool use, memory, orchestration, and what makes agents reliable in production.",
    href: "/guides",
    icon: Bot,
    meta: "Coming soon",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <p className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-4 py-1 text-sm font-medium text-accent">
            The world&apos;s most complete AI knowledge hub
          </p>
          <h1 className="mt-6 text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Master AI. Build with confidence.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            The most comprehensive, always-updated knowledge hub for AI engineers,
            researchers, and builders.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/guides">
              <Button size="lg">
                Start learning
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="/guides">
              <Button size="lg" variant="secondary">
                Browse all guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm font-medium text-muted-foreground sm:px-6 lg:px-8">
          50+ deep guides - 12 knowledge domains - Updated weekly
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-accent">Featured guides</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Start with the essentials</h2>
          </div>
          <Link href="/guides" className="hidden text-sm font-medium text-accent md:inline-flex">
            View all guides
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featuredGuides.map((guide) => {
            const Icon = guide.icon ?? BookOpenText;

            return (
              <Link href={guide.href} key={guide.title}>
                <Card className="group h-full p-6 transition-transform duration-200 hover:-translate-y-1">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight group-hover:text-accent">
                    {guide.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{guide.description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{guide.meta}</span>
                    <span>{guide.title}</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-accent/20 bg-gradient-to-br from-accent/10 via-card to-card p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-medium text-accent">Newsletter</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Get weekly AI insights</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                Join builders who want practical breakdowns of new models, architectures,
                evaluation methods, and implementation patterns without the hype.
              </p>
            </div>
            <form className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 rounded-lg border border-border bg-background px-4 text-sm outline-none ring-offset-background transition focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button type="submit" className="h-11">
                Subscribe
              </Button>
            </form>
          </div>
        </Card>
      </section>
    </div>
  );
}
