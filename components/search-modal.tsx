"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X, FileText } from "lucide-react";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { cn } from "@/lib/utils";

function getClient() {
  return algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
  );
}

interface Hit {
  objectID: string;
  title: string;
  description: string;
  url: string;
  readTime: string;
  tags: string[];
}

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<Hit[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cmd/Ctrl+K and Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) onClose(); // toggle handled by parent
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setHits([]);
      setSelected(0);
    }
  }, [open]);

  // Search as user types
  useEffect(() => {
    if (!query.trim()) { setHits([]); return; }
    getClient()
      .search({ requests: [{ indexName: "knovo_articles", query, hitsPerPage: 6 }] })
      .then((res) => { setHits((res.results[0] as { hits: Hit[] }).hits); setSelected(0); })
      .catch(() => setHits([]));
  }, [query]);

  // Keyboard navigation
  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelected((s) => Math.min(s + 1, hits.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
    if (e.key === "Enter" && hits[selected]) { navigate(hits[selected].url); }
  };

  const navigate = (url: string) => {
    onClose();
    router.push(url);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={() => onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-xl rounded-xl border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search articles..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
          <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-xs text-muted-foreground sm:block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {hits.length > 0 && (
          <ul className="max-h-80 overflow-y-auto py-2">
            {hits.map((hit, i) => (
              <li key={hit.objectID}>
                <button
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                    i === selected ? "bg-muted" : "hover:bg-muted/50"
                  )}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => navigate(hit.url)}
                >
                  <FileText className="mt-0.5 size-4 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{hit.title}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{hit.description}</p>
                  </div>
                  {hit.readTime && (
                    <span className="ml-auto shrink-0 text-xs text-muted-foreground">{hit.readTime}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        {query && hits.length === 0 && (
          <p className="px-4 py-6 text-center text-sm text-muted-foreground">
            No results for &ldquo;{query}&rdquo;
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-xs text-muted-foreground">
          <span><kbd className="rounded border border-border px-1">↑↓</kbd> navigate</span>
          <span><kbd className="rounded border border-border px-1">↵</kbd> open</span>
          <span><kbd className="rounded border border-border px-1">Esc</kbd> close</span>
          <span className="ml-auto">Powered by Algolia</span>
        </div>
      </div>
    </div>
  );
}

export function SearchButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="hidden items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted md:flex"
      aria-label="Search articles"
    >
      <Search className="size-3.5" />
      <span>Search</span>
      <kbd className="ml-1 rounded border border-border px-1 text-xs">⌘K</kbd>
    </button>
  );
}
