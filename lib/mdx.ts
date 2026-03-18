import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx/mdx-components";

export type GuideFrontmatter = {
  title: string;
  description: string;
  date: string;
  lastVerified: string;
  readTime: string;
  author: string;
  tags: string[];
  featured: boolean;
  updatedMonthly?: boolean;
};

export type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type Guide = GuideFrontmatter & {
  slug: string;
  content: string;
  headings: Heading[];
};

const guidesDirectory = path.join(process.cwd(), "content", "guides");

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string): Heading[] {
  return content
    .split("\n")
    .map((line) => {
      const match = /^(##|###)\s+(.*)$/.exec(line.trim());
      if (!match) {
        return null;
      }

      const level = match[1] === "##" ? 2 : 3;
      const text = match[2].replace(/[*_`]/g, "").trim();

      return {
        id: slugify(text),
        text,
        level,
      } satisfies Heading;
    })
    .filter((value): value is Heading => value !== null);
}

function readGuideFile(slug: string) {
  return fs.readFileSync(path.join(guidesDirectory, `${slug}.mdx`), "utf8");
}

export function getGuideSlugs() {
  return fs
    .readdirSync(guidesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getGuides(): Guide[] {
  return getGuideSlugs()
    .map((slug) => {
      const file = readGuideFile(slug);
      const { data, content } = matter(file);

      return {
        slug,
        content,
        headings: extractHeadings(content),
        ...(data as GuideFrontmatter),
      };
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getFeaturedGuides() {
  return getGuides().filter((guide) => guide.featured).slice(0, 3);
}

export function getGuideBySlug(slug: string) {
  const file = readGuideFile(slug);
  const { data, content } = matter(file);

  return {
    slug,
    content,
    headings: extractHeadings(content),
    ...(data as GuideFrontmatter),
  } satisfies Guide;
}

export async function getCompiledGuide(slug: string) {
  const guide = getGuideBySlug(slug);
  const { content, frontmatter } = await compileMDX<GuideFrontmatter>({
    source: guide.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: {
                dark: "github-dark-dimmed",
                light: "github-light",
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  return {
    ...guide,
    frontmatter,
    content,
  };
}

export function getNextGuide(slug: string) {
  const guides = getGuides();
  const currentIndex = guides.findIndex((guide) => guide.slug === slug);
  if (currentIndex === -1 || currentIndex === guides.length - 1) {
    return guides[0] ?? null;
  }

  return guides[currentIndex + 1];
}
