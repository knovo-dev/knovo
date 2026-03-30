import { algoliasearch } from "algoliasearch";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";
import { config } from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "../.env.local") });

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const adminKey = process.env.ALGOLIA_ADMIN_KEY;

if (!appId || !adminKey) {
  console.error("Missing NEXT_PUBLIC_ALGOLIA_APP_ID or ALGOLIA_ADMIN_KEY in .env.local");
  process.exit(1);
}

const client = algoliasearch(appId, adminKey);
const guidesDir = path.join(__dirname, "../content/guides");
const files = fs.readdirSync(guidesDir).filter((f) => f.endsWith(".mdx"));

const records = files.map((file) => {
  const raw = fs.readFileSync(path.join(guidesDir, file), "utf-8");
  const { data, content: body } = matter(raw);
  const slug = file.replace(".mdx", "");
  const excerpt = body
    .replace(/^#{1,6}\s.+$/gm, "")
    .replace(/\n+/g, " ")
    .trim()
    .slice(0, 250);

  return {
    objectID: slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    slug,
    url: `/guides/${slug}`,
    date: data.date?.toString() ?? "",
    tags: data.tags ?? [],
    readTime: data.readTime ?? "",
    excerpt,
  };
});

console.log(`Indexing ${records.length} articles to Algolia...`);

const result = await client.saveObjects({
  indexName: "knovo_articles",
  objects: records,
});

console.log("Done!", result);
records.forEach((r) => console.log(`  ✓ ${r.title}`));
