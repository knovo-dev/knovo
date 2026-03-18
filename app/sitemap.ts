import type { MetadataRoute } from "next";
import { getGuideSlugs } from "@/lib/mdx";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/guides", "/about"].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
  }));

  const guideRoutes = getGuideSlugs().map((slug) => ({
    url: absoluteUrl(`/guides/${slug}`),
    lastModified: new Date(),
  }));

  return [...routes, ...guideRoutes];
}
