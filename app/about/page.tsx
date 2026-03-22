import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const metadata = createMetadata({
  title: "About Knovo",
  description: "Knovo is a practical AI knowledge hub built by Sudheer Patibandla to make AI concepts learnable, testable, and immediately usable.",
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
          Knovo exists because the best AI knowledge was scattered, stale, and impossible
          to act on. We are fixing that.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">The problem we solve</h2>
        <div className="mt-6 space-y-5 text-base leading-7 text-muted-foreground">
          <p>
            AI knowledge is scattered across arXiv, Discord, Reddit, and GitHub. Builders
            have to piece together critical concepts from dozens of places, with no single
            trustworthy source that is consistently practical.
          </p>
          <p>
            Most AI guides are written once and never updated. You cannot easily tell
            whether what you are learning is current, deprecated, or no longer reliable for
            production systems.
          </p>
          <p>
            Reading about AI and being able to do AI are completely separate experiences.
            Most content explains ideas, but very little bridges the gap from understanding
            to implementation.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">Our approach</h2>
        <ul className="mt-6 space-y-4 text-base text-muted-foreground">
          <li>Every article has a Last Verified date.</li>
          <li>Deep guides only — no thin content, no AI-generated fluff.</li>
          <li>Practical first — every concept comes with working code.</li>
          <li>Free forever — all articles always free, revenue from tools.</li>
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">The founder</h2>
        <div className="mt-6 space-y-3 text-base text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Name:</span> Sudheer Patibandla
          </p>
          <p>
            <span className="font-medium text-foreground">Location:</span> India
          </p>
          <p>
            <span className="font-medium text-foreground">Mission:</span> Building Knovo to
            be the world&apos;s most complete AI knowledge hub
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
          <li>Live AI playground in every article</li>
          <li>Prompt debugger — find out why your prompt failed</li>
          <li>Personalized learning paths</li>
          <li>Community Q&amp;A</li>
        </ul>
      </section>

      <section className="mt-16 rounded-xl border border-border bg-card/50 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight">Ready to build?</h2>
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
