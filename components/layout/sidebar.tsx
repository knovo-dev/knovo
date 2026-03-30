import Link from "next/link";
import type { Heading } from "@/lib/mdx";
import { cn } from "@/lib/utils";

export function Sidebar({ headings }: { headings: Heading[] }) {
  return (
    <aside className="sticky top-24 hidden h-fit xl:block">
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-sm font-semibold">On this page</p>
        <nav className="mt-4 max-h-[calc(100vh-10rem)] space-y-2 overflow-y-auto pr-1">
          {headings.map((heading) => (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block text-sm text-muted-foreground transition-colors hover:text-foreground",
                heading.level === 3 && "pl-4 text-xs",
              )}
            >
              {heading.text}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
