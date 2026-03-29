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
| Claude | Build partner — writes code, installs packages, pushes commits |
| Codex | Reviewer — reviews commits/PRs flagged below, can also execute tasks left in Task Queue |

---

## Review Queue

> Claude updates this section after every push that needs Codex review.
> Codex: read each item, review the commit or files listed, leave feedback as a comment or update this file.

### Pending Reviews

| # | Commit | Files Changed | What to Review |
|---|---|---|---|
| 1 | `3c8f0737` | `app/api/newsletter/route.ts`, `package.json` | Resend SDK integration — check correctness, error handling, security |
| 2 | `349337e6` | `app/api/newsletter/route.ts` | Fix: Resend client moved inside handler — verify this is the right pattern |

### Completed Reviews

_None yet._

---

## Task Queue

> Either agent can leave tasks here for the other.

_Empty._

---

## Current Site Status (as of 22 March 2026)

- 10 articles live at knovo.dev/guides/
- Phase 1 complete
- Newsletter connected to Resend (pending Vercel env var)
- `/terms` page — does not exist yet (linked from footer, currently 404)
- `siteConfig.ogImage` — still `/og?...` needs to be `/api/og?...`
- Algolia search — installed but not indexed
