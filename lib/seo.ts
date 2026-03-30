import type { Metadata } from "next";

const siteUrl = "https://www.knovo.dev";

export const siteConfig = {
  name: "Knovo",
  description: "The world's most complete AI knowledge hub",
  tagline:
    "Deep, practical, always-updated guides on AI, LLMs, prompt engineering, RAG, agents, fine-tuning, and everything AI-related.",
  url: siteUrl,
  ogImage: `${siteUrl}/api/og?title=Knovo`,
};

export function absoluteUrl(path = "") {
  return `${siteUrl}${path}`;
}

export function createMetadata({
  title,
  description,
  path = "",
}: {
  title?: string;
  description?: string;
  path?: string;
}): Metadata {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const resolvedDescription = description ?? siteConfig.tagline;
  const url = absoluteUrl(path);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: `${siteConfig.url}/api/og?title=${encodeURIComponent(title ?? siteConfig.name)}&description=${encodeURIComponent(resolvedDescription)}`,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [`${siteConfig.url}/api/og?title=${encodeURIComponent(title ?? siteConfig.name)}&description=${encodeURIComponent(resolvedDescription)}`],
    },
  };
}
