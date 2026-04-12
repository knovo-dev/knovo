# Claude working instructions — Knovo project

## Project overview
- **Knovo** — AI learning platform at https://knovo.dev
- Next.js 16.2.0 App Router · TypeScript strict · Tailwind CSS v3 · MDX via next-mdx-remote/rsc
- Articles live at `/guides/[slug]` · content in `content/guides/*.mdx`
- Deployed via Vercel · push to `main` → auto-deploy

## Article plan
- Target: **52 articles** (50-article plan + 2 ad-hoc MIT research articles)
- Plan source: `Knovo_50Articles_Plan_22Mar2026 1.docx`
- Current count: **15 articles live** as of 2026-04-12
- Ad-hoc articles (not in plan): `where-ai-is-going-mit-research` and `ai-opportunity-gaps-mit-research`
- Next to write: **Plan #14** — structured output: getting reliable JSON from any LLM

## Codex task handoff
- Give the Codex prompt **directly in chat** — short and actionable
- Do NOT write full specs into AGENTS.md — one-line status only (e.g. "Article 13 — PENDING")
- Claude writes SVG diagrams and reviews output after Codex delivers

## Workflow
1. Give Codex prompt in chat
2. Codex implements → user pastes "Implemented X" back
3. Claude reads article, reviews accuracy, builds 2 SVG diagrams, wires them in
4. `npm run build` → must pass with zero errors
5. Commit + push to main

## SVG diagram conventions
- File location: `components/mdx/diagrams/DiagramName.tsx`
- Register in: `components/mdx/diagrams/index.ts` AND `components/mdx/mdx-components.tsx`
- Use CSS custom properties for theme awareness: `hsl(var(--foreground))`, `hsl(var(--muted))`, `hsl(var(--border))`, `hsl(var(--muted-foreground))`
- Accent hex colours (consistent palette): indigo `#4F46E5` · violet `#7C3AED` · sky `#0EA5E9` · emerald `#10B981` · amber `#F59E0B` · red `#EF4444`
- Wrap in `<figure className="not-prose my-8">` + `<figcaption>`
- ViewBox typically `0 0 600 200` or `0 0 600 220`; always `width="100%"`
- Existing diagrams to reference for style: `AiConcentrationDiagram.tsx`, `ContextWindowAnatomyDiagram.tsx`

## Content standards
- Always run `npm run build` before committing
- Every article needs at least 2 SVG diagrams (leave `{/* DIAGRAM: Name */}` placeholders for Claude)
- Cite sources explicitly (author, year, arXiv/URL)
- Cross-link related articles using relative MDX links
- Article slug format: `kebab-case` matching filename

## 2-minute rule
If any task can be done in under 2 minutes, do it immediately before moving on.

## Algolia
- Re-index after every batch of new articles: `node scripts/index-algolia.mjs`
- Index name: `knovo_articles` · keys in `.env.local`

## LinkedIn
- Company page not yet created — pending

## Monthly refresh
- Articles 2 & 5 due for refresh ~April 19, 2026
