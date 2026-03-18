"use client";

import { useState } from "react";
import { Copy, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareButtons({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const [copied, setCopied] = useState(false);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={twitterUrl} target="_blank" rel="noreferrer">
        <Button variant="secondary" size="sm">
          <Twitter className="mr-2 size-4" />
          Share on X
        </Button>
      </a>
      <a href={linkedInUrl} target="_blank" rel="noreferrer">
        <Button variant="secondary" size="sm">
          <Linkedin className="mr-2 size-4" />
          LinkedIn
        </Button>
      </a>
      <Button variant="secondary" size="sm" onClick={copyLink}>
        <Copy className="mr-2 size-4" />
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}
