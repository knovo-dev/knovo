import { Badge } from "@/components/ui/badge";
import { ShareButtons } from "@/components/share-buttons";

const TAG_ACCENT: Record<string, string> = {
  llms: "#4F46E5",
  transformers: "#4F46E5",
  foundations: "#0EA5E9",
  ai: "#0EA5E9",
  research: "#10B981",
  "future of work": "#F59E0B",
  "market analysis": "#6366F1",
  tools: "#10B981",
  "prompt engineering": "#8B5CF6",
  security: "#EF4444",
  "how it works": "#4F46E5",
};

function getAccentColor(tags: string[]): string {
  const lower = tags.map((t) => t.toLowerCase());
  for (const tag of lower) {
    if (tag in TAG_ACCENT) return TAG_ACCENT[tag];
  }
  return "#4F46E5";
}

type ArticleHeroProps = {
  title: string;
  description: string;
  author: string;
  date: string;
  lastVerified: string;
  readTime: string;
  tags: string[];
  updatedMonthly?: boolean;
  url: string;
};

export function ArticleHero({
  title,
  description,
  author,
  date,
  lastVerified,
  readTime,
  tags,
  updatedMonthly,
  url,
}: ArticleHeroProps) {
  const accent = getAccentColor(tags);

  return (
    <header
      className="relative overflow-hidden rounded-2xl border border-border"
      style={{
        background: `linear-gradient(135deg, ${accent}18 0%, ${accent}08 60%, transparent 100%)`,
      }}
    >
      {/* Decorative accent line at top */}
      <div
        className="absolute inset-x-0 top-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${accent}, ${accent}00)` }}
      />

      <div className="px-8 py-10 sm:px-12 sm:py-14">
        {/* Tag pills */}
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
              style={{ borderColor: `${accent}40`, color: accent }}
            >
              {tag}
            </span>
          ))}
          {updatedMonthly && (
            <Badge className="border-accent/30 text-accent">Updated monthly</Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
          {description}
        </p>

        {/* Meta row */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>By {author}</span>
          <span aria-hidden>·</span>
          <span>{date}</span>
          <span aria-hidden>·</span>
          <span>{readTime}</span>
          <span aria-hidden>·</span>
          <span>Last verified {lastVerified}</span>
        </div>

        {/* Share */}
        <div className="mt-6">
          <ShareButtons title={title} url={url} />
        </div>
      </div>
    </header>
  );
}
