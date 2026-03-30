"use client";

import Link from "next/link";
import { Menu, Moon, Search, Sparkles, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/search-modal";

const navLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/tools", label: "Tools", soon: true },
  { href: "/community", label: "Community", soon: true },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            Knovo
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                {link.soon ? " (coming soon)" : ""}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
              aria-label="Search articles"
            >
              <Search className="size-3.5" />
              <span>Search</span>
              <kbd className="ml-1 rounded border border-border px-1 text-xs">⌘K</kbd>
            </button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle dark mode"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
            <Link href="/guides">
              <Button>
                <Sparkles className="mr-2 size-4" />
                Get started free
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border"
              aria-label="Search"
            >
              <Search className="size-4" />
            </button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-nav-menu"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <div
          id="mobile-nav-menu"
          className={cn(
            "overflow-hidden border-t border-border transition-all duration-300 ease-in-out md:hidden",
            open ? "max-h-80 opacity-100" : "max-h-0 border-t-0 opacity-0",
          )}
        >
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {link.label}
                {link.soon ? " (coming soon)" : ""}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Toggle dark mode"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              </Button>
              <Link href="/guides" className="flex-1" onClick={() => setOpen(false)}>
                <Button className="w-full">Get started free</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
