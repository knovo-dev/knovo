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

### TASK FOR CODEX — Article 12

**Status:** DONE — committed, reviewed by Claude

Write `content/guides/where-ai-is-going-mit-research.mdx` — a deep, research-based article summarising findings from a major MIT study.

**Frontmatter** (copy exactly):
```
---
title: "MIT mapped every AI app against every job. Here's what they found."
description: "Researchers at MIT mapped 39,603 work activities against 13,275 AI tools and every industrial robot ever deployed. The result is the most comprehensive picture of where AI is — and isn't — going."
date: 2026-03-31
lastVerified: 2026-03-31
readTime: "14 min read"
author: "Knovo Team"
tags: ["AI", "research", "future of work", "MIT", "market analysis"]
featured: false
---
```

**Source paper (cite this accurately throughout):**
Cai, YeckehZaare, Sun, Charisi, Wang, Imran, Laubacher, Prakash & Malone (2026). *Where can AI be used? Mapping AI applications to work activities.* MIT Center for Collective Intelligence / SMART Centre. arXiv:2603.20619. Published March 21, 2026.

**Article structure and all required content:**

## Introduction (no heading — open with the hook)
- Open with the scale of the problem: nobody had ever mapped the full AI landscape against every job simultaneously
- 39,603 distinct work activities tracked by the U.S. O*NET database, 13,275 AI applications from the "There's an AI For That" (TAAFT) dataset, and 20.8 million industrial robots from the IFR dataset
- The finding that makes this paper remarkable: 92% of all AI applications cluster into just 6.8% of all work activities

## What the researchers actually measured
- O*NET database: the U.S. government's master catalogue of every job and every task within every job — 923 occupations broken into 39,603 granular activities (e.g. not just "doctor" but "review patient test results", "write prescriptions", "manage medical staff")
- TAAFT dataset: 13,275 AI tools collected from July 2022 to July 2025, each classified by what activity it performs
- IFR (International Federation of Robotics): global data on 20.8 million deployed industrial robots by type and sector
- Classification method: GPT-5.1 used to map each AI app to O*NET activities via a "Structured Prompt with Fallback and Override" (SPFO) approach — validated against human raters who agreed 81.4% of the time

## The Think / Do / Interact framework
This is the conceptual core of the paper. Every work activity falls into one of three categories:

**Think** — information processing, analysis, decision-making (examples: "analyse financial data", "write code", "diagnose medical conditions")
- 72% of the total AI software market (by dollar value)
- Virtually all 13,275 AI apps operate in this category
- AI excels here because these tasks are digital, reproducible, and don't require a physical body

**Do** — physical manipulation, movement, operation (examples: "weld car parts", "operate surgical equipment", "clean floors", "pick and pack")
- Addressed primarily by robotics, not software AI
- 12% of total AI market value
- Enormous workforce globally but far less AI penetration relative to size

**Interact** — social engagement, communication, care (examples: "counsel patients", "teach students", "lead teams", "negotiate")
- 48% of combined AI market value when software + robotics are counted together
- Growing category but still structurally underserved by current AI
- High complexity: humans respond poorly to purely automated interaction in sensitive domains

## Where AI is concentrated — and why
- The 92%/6.8% finding: nearly all AI apps collapse into a tiny fraction of activities
- The top activities by AI app count are all cognitive: writing assistance, coding, data analysis, image generation, customer support, content creation
- 1.6% of all work activities account for over 60% of the entire AI market value (~$186.4B total: $140.3B software + $46.1B robotics)
- Why this happens: network effects reward popular categories (more users → more training data → better models → more users), and digital tasks are cheapest to automate first
- Post-2022 inflection: In 2016 there were just 11 publicly available AI apps. By July 2025 there were 13,275. Crucially, growth has been in *depth* (more apps doing the same tasks better) not *breadth* (genuinely new categories of tasks)

## The robotics finding
- 20.8 million industrial robots deployed globally
- 76.7% of them are floor-cleaning robots (autonomous vacuum/mop units in commercial settings)
- Only ~23% of deployed robots handle genuinely complex physical tasks: welding, assembly, surgical assistance, material handling
- Implication: the physical "Do" domain is far less automated than headlines suggest. The robot revolution hasn't reached most factories, warehouses, or healthcare settings

## Three types of opportunity the paper identifies
The researchers categorise unoccupied activity space into three buckets:

**1. Technical opportunities** — activities where AI is technically feasible (proven capabilities exist) but no AI application has been shipped yet. These represent near-term building opportunities.

**2. Economic opportunities** — activities that are both technically feasible *and* economically attractive (large workforce, high wage, high repetition) but remain unaddressed. The paper calls these the most valuable gaps.

**3. Unrecognized opportunities** — activities where even the *possibility* of AI hasn't been widely considered. Often found in physical and social domains. Higher risk but potentially transformational.

## What this means
- For workers: AI is not coming for "all jobs" uniformly — it is drilling extremely deep into a narrow set of cognitive tasks. Workers in physical or high-interaction roles have significantly more time before automation reaches their core activities.
- For companies: Most enterprise AI budgets are being spent in the same 6.8% of activity space every other company is targeting. The competitive advantage from AI in writing, coding, and analysis is compressing fast.
- For builders: The paper is essentially a map of where the next wave of AI companies could be built — in the unaddressed 93.2% of activity space. Physical automation, social care, skilled trades, and complex interaction remain structurally underserved.
- For policymakers: Concentration of AI in a few activity categories means economic disruption is also concentrated — specific job categories will be hit hard while others remain largely untouched for years.

## Limitations the researchers acknowledge
- TAAFT dataset covers publicly listed AI tools — internal enterprise AI systems are not captured (real concentration may be even higher)
- O*NET is U.S.-centric; activity structures differ across countries
- Market value estimates based on available pricing data which is incomplete for enterprise/SaaS
- Rapid pace of change: the paper reflects state as of July 2025

## Conclusion
- The most striking finding is not where AI is — it's where it isn't
- 39,603 activities mapped, and a handful of them are attracting 92% of all AI development
- This is a deliberate market choice, not a technological limit — the researchers identified dozens of categories that are technically feasible but commercially ignored
- Article 13 (link to it at the end) will cover the specific opportunity gaps in detail

**Writing requirements:**
- 3,500–4,500 words
- Tone: authoritative but accessible — explain technical terms when first used
- Attribution: cite the paper (Cai et al., 2026, arXiv:2603.20619) explicitly in the text at least twice — once in the intro and once in the methodology section. This is a legal and editorial requirement.
- Do NOT invent statistics — every number in this spec is from the paper. Use only these numbers.
- Each section has a clear h2 heading; sub-points use h3 where helpful
- Include a short intro paragraph before the first h2 (after the hook opening)
- End with a cross-link: "Read next: Where AI doesn't exist yet — the opportunity gaps MIT's research exposed" (href: `/guides/ai-opportunity-gaps-mit-research`)
- Match the tone of existing articles in `content/guides/` — read one for style reference
- Do NOT include word count notes or meta-commentary in the article

**Diagrams (SVG components — insert these tags at the right places in the MDX):**
Claude will add SVG diagram components after review. For now, leave two placeholder comments in the MDX where diagrams would fit best:
```
{/* DIAGRAM: Think/Do/Interact distribution */}
{/* DIAGRAM: AI concentration — 92% in 6.8% of activities */}
```

**After writing:**
Run `npm run build` and confirm zero errors. Report back.

---

## Current Site Status (as of 22 March 2026)

- 10 articles live at knovo.dev/guides/
- Phase 1 complete
- Newsletter connected to Resend (pending Vercel env var)
- `/terms` page — does not exist yet (linked from footer, currently 404)
- `siteConfig.ogImage` — still `/og?...` needs to be `/api/og?...`
- Algolia search — installed but not indexed
