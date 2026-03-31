# Claude working instructions — Knovo project

## Codex task handoff
- Do NOT write full article specs into AGENTS.md
- Give the Codex prompt directly in chat, short and actionable
- AGENTS.md Task Queue: one-line status update only (e.g. "Article 13 — PENDING")
- Claude writes diagrams and reviews output after Codex delivers

## Workflow reminder
1. Give Codex prompt in chat
2. Codex implements
3. User pastes result back
4. Claude reviews, adds diagrams, builds, commits, pushes

## Content standards
- Always run `npm run build` before committing
- Every article needs at least 2 SVG diagrams
- Cite sources explicitly in articles (author, year, arXiv/URL)
- Cross-link related articles
