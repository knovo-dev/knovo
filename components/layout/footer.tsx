import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.5fr_repeat(4,1fr)] lg:px-8">
        <div>
          <p className="text-lg font-semibold">Knovo</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            The world&apos;s most complete AI knowledge hub for builders who want
            depth, clarity, and practical guidance.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Explore</p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <Link href="/guides" className="block hover:text-foreground">
              Guides
            </Link>
            <Link href="/tools" className="block hover:text-foreground">
              Tools
            </Link>
            <Link href="/community" className="block hover:text-foreground">
              Community
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Company</p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <Link href="/about" className="block hover:text-foreground">
              About
            </Link>
            <Link href="/guides" className="block hover:text-foreground">
              Latest guides
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Tagline</p>
          <p className="mt-4 text-sm text-muted-foreground">
            The world&apos;s most complete AI knowledge hub.
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Legal</p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <Link href="/privacy" className="block hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block hover:text-foreground">
              Terms of Use
            </Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Social</p>
          <div className="mt-4 space-y-3 text-sm text-muted-foreground">
            <a
              href="https://x.com/knovodev"
              target="_blank"
              rel="noreferrer noopener"
              className="block hover:text-foreground"
            >
              Twitter/X
            </a>
            <a
              href="https://github.com/knovo-dev/knovo"
              target="_blank"
              rel="noreferrer noopener"
              className="block hover:text-foreground"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
