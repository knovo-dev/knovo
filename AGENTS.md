# Knovo — Agent Instructions

This file is read automatically by Codex and any AI agent working on this project.

## Project

- **Platform**: Knovo (knovo.dev) — AI knowledge hub
- **Stack**: Next.js 16.2.0, TypeScript strict, Tailwind CSS v3, MDX + Contentlayer
- **Repo**: github.com/knovo-dev/knovo
- **Owner**: Sudheer Patibandla (hello@knovo.dev)
- **Build partner**: Claude (Anthropic)

## Rules — apply to all agents

- Never use `git add .` — always add specific files only
- Never push directly without a passing build (`npm run build`)
- Never commit `.env.local`, `node_modules/`, `.next/`, `*.docx`, `*.log`, `.playwright-cli/`
- All commits use `hello@knovo.dev` as git identity
- One step at a time — confirm before moving to the next task
- Always run `npm run build` and verify zero errors before committing

## Role split

| Agent | Role |
|---|---|
| Claude | Orchestrator — gives task commands to Codex, reviews Codex's output, pushes approved changes |
| Codex | Implementer — receives task instructions, writes code, reports back for Claude to review |

## Workflow

```
Claude writes task instruction → posts to Task Queue below
    ↓
Codex reads AGENTS.md → implements the task
    ↓
Claude reviews Codex's diff: git diff <files> | npx @openai/codex review -
    ↓
Claude approves → commits + pushes
Claude rejects → leaves feedback in Task Queue for Codex to fix
```

---

## Review Mechanism

Claude invokes Codex directly via CLI after every significant push:

```bash
npx @openai/codex review --commit <SHA> --title "description of change"
```

Codex review output appears in the Codex UI chat. Claude reads the output and acts on any flagged issues before proceeding to the next task.

## Task Queue

> Either agent can leave tasks here for the other.

### TASK FOR CODEX — Task 2: Create /terms page

**Status:** DONE — committed 8814da9a, reviewed by Codex (gpt-5.4)

### TASK FOR CODEX — Article 11

**Status:** DONE — committed, reviewed by Claude

Write `content/guides/how-llms-work.mdx` — a deep, practical article.

**Frontmatter** (copy exactly):
```
---
title: "How LLMs actually work: transformers, tokens, and attention explained (2026)"
description: "A practical, deep explanation of how large language models work — covering transformers, tokenisation, attention mechanisms, training, and what this means for builders."
date: 2026-03-30
lastVerified: 2026-03-30
readTime: "20 min read"
author: "Knovo Team"
tags: ["LLMs", "transformers", "foundations", "AI", "how it works"]
featured: false
---
```

**Article requirements:**
- 4,000+ words, practical depth, written for AI builders not academics
- Cover: what a token is, how tokenisation affects prompts and cost, transformer architecture (plain English), attention mechanism (why it matters for context), how training works (pretraining + RLHF), what temperature/top-p do, context windows and their limits, what this means for prompt engineering
- Include at least 3 practical Python/code examples (e.g. tokenisation with tiktoken, temperature effect demo, context window calculation)
- Each section has a clear h2 heading, sub-sections use h3
- End with a practical "What this means for builders" section
- Match the style of existing articles in content/guides/ — read one for tone reference
- Do NOT include word count notes in headings

Create `app/terms/page.tsx` following the exact same pattern as `app/privacy/page.tsx`.

Requirements:
- Use `createMetadata` from `@/lib/seo` with title "Terms of Use", description about Knovo terms, path "/terms"
- Match the same JSX layout: `mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8`
- Label: "Legal", h1: "Terms of Use", last updated: "March 29, 2026"
- Include these sections (title + content):
  1. "Use of content" — All articles on Knovo are free to read. Article content is proprietary copyright (c) 2026 Knovo (knovo.dev). You may not reproduce or republish without written permission from hello@knovo.dev. Code snippets are MIT licensed.
  2. "Newsletter" — By subscribing you agree to receive the weekly Knovo newsletter. Unsubscribe anytime via the link in any email.
  3. "No warranties" — Knovo content is provided for informational purposes. We make no guarantees about accuracy or completeness. Always verify AI model information independently as it changes frequently.
  4. "Limitation of liability" — Knovo is not liable for any damages arising from use of this site or reliance on its content.
  5. "Changes to these terms" — We may update these terms at any time. Continued use of the site means you accept the updated terms.
  6. "Contact" — For questions about these terms, contact us at hello@knovo.dev.
- Do not modify any other files. Only create `app/terms/page.tsx`.

After creating the file, run `npm run build` and confirm it passes with zero errors.

---

## Current Site Status (as of 22 March 2026)

- 10 articles live at knovo.dev/guides/
- Phase 1 complete
- Newsletter connected to Resend (pending Vercel env var)
- `/terms` page — does not exist yet (linked from footer, currently 404)
- `siteConfig.ogImage` — still `/og?...` needs to be `/api/og?...`
- Algolia search — installed but not indexed
