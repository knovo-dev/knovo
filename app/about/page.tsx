import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "About Knovo",
  description:
    "Knovo is a practical AI knowledge hub built by Sudheer Patibandla to make AI concepts learnable, testable, and immediately usable.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <section>
        <p className="text-sm font-medium text-accent">About Knovo</p>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Built for AI builders, by an AI builder
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
          Knovo exists because the best AI knowledge was scattered, stale, and impossible to
          act on. We are fixing that.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">The problem</h2>
        <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
          <p>
            AI knowledge is scattered across arxiv, Discord, Reddit, GitHub, and a hundred
            documentation sites. There is no single trustworthy source that covers everything
            — so every developer wastes hours every week just finding reliable information.
          </p>
          <p>
            Most guides are written once and forgotten. Models change weekly. Prices change
            monthly. Frameworks release breaking updates. But the articles stay the same.
            You cannot tell if you are learning current best practice or outdated advice from
            two years ago.
          </p>
          <p>
            Reading about AI and being able to DO AI are completely separate experiences.
            Every article ends with theory. Nobody puts a live, testable playground inside
            the guide itself — where you can run the example the moment you read it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">Our approach</h2>
        <ul className="mt-6 space-y-4 text-base text-muted-foreground">
          <li>
            Every article has a Last Verified date — so you always know how fresh the
            information is
          </li>
          <li>
            Deep guides only — no thin summaries, no AI-generated fluff, no content written
            for SEO bots
          </li>
          <li>
            Practical first — every concept comes with working code you can run immediately
          </li>
          <li>
            Free forever — all articles are always free. Revenue comes from tools, not
            paywalled content.
          </li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">The founder</h2>
        <div className="mt-6 space-y-4 text-base text-muted-foreground">
          <p>
            Knovo is built by Sudheer Patibandla, an independent builder from India. After
            spending too many hours hunting for reliable, up-to-date AI knowledge across
            dozens of fragmented sources, he decided to build the resource he always wished
            existed.
          </p>
          <p>
            <span className="font-medium text-foreground">Contact:</span>{" "}
            <a href="mailto:hello@knovo.dev" className="underline underline-offset-4 hover:text-foreground">
              hello@knovo.dev
            </a>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">What is coming</h2>
        <ul className="mt-6 space-y-4 text-base text-muted-foreground">
          <li>Live AI playground embedded in every article</li>
          <li>Prompt debugger — find out exactly why your prompt failed</li>
          <li>Personalized learning paths from beginner to production</li>
          <li>Community Q&amp;A that becomes permanent site knowledge</li>
        </ul>
      </section>

      <section className="mt-16 rounded-xl border border-border bg-card/50 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Start learning</h2>
        <p className="mt-3 text-muted-foreground">
          Start with a guide and build something real today.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/guides">
            <Button>Start learning</Button>
          </Link>
          <a
            href="mailto:hello@knovo.dev"
            className="text-sm font-medium text-accent underline underline-offset-4 hover:text-foreground"
          >
            Get in touch
          </a>
        </div>
      </section>
    </div>
  );
}
