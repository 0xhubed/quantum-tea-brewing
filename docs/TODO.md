# TODO — Next Session

Picks up after the GEO experiment v2 build (dark-glass→monochrome redesign, citation
harness, geo-kit, playbook — all merged to `main`). These are the items that couldn't be
done without a live deploy + API keys.

## 1. Activate the citation harness (your action)
- [ ] **Redeploy the site** so the planted canaries get re-crawled (absorption latency
      starts measuring from the redeploy).
- [ ] **Add API keys** so the probe can run:
  - Local: copy `tools/citation-probe/.env.example` → `.env`, fill `OPENAI_API_KEY` and/or `ANTHROPIC_API_KEY`.
  - CI: add the same as **GitHub repo secrets** so the weekly cron (`.github/workflows/citation-probe.yml`, Mondays 07:00 UTC) runs.

## 2. First live probe run — verify adapters (do together with Claude)
Run `cd tools/citation-probe && npm install && npm run probe && npm run report`, then confirm
the live-run risks flagged during the build:
- [ ] **OpenAI tool type** (`src/adapters/openai.ts`): currently `{ type: 'web_search' } as any`.
      The Responses API may expect `web_search_preview` — fix if the call 400s.
- [ ] **OpenAI model** `gpt-4o` — confirm it's available on the account + supports web search.
- [ ] **Anthropic tool version** (`src/adapters/anthropic.ts`): `web_search_20250305` — confirm
      still valid (a newer `web_search_2026…` may exist).
- [ ] **Anthropic model** `claude-sonnet-4-6` — confirm intended (vs a newer Opus).
- [ ] **Response-shape parsing**: both adapters use `as any` over `res.output` / `res.content`
      annotations — validate citation extraction against the real SDK response shapes.
- [ ] Sanity-check `results/runs.jsonl` + `results/report.md` look right.

## 3. Once data accrues (later)
- [ ] Update `docs/geo-playbook.md` "plausibly load-bearing vs cargo-cult" section with the
      actual evidence from `tools/citation-probe/results/report.md`.
- [ ] Decide probe cadence — weekly is current; daily tightens decay/latency resolution at
      more API cost.

## 4. Optional design polish (deferred)
- [ ] If desired, brighten focal points in the monochrome theme (e.g. the logo "Q", dimension
      symbols) or add a single hairline accent. Token layer (`tailwind.config.ts`) makes it global.

## Reference
- Design spec: `docs/superpowers/specs/2026-06-14-geo-experiment-v2-design.md`
- Plans: `docs/superpowers/plans/2026-06-14-phase-{a,b,c}-*.md`
- Harness README: `tools/citation-probe/README.md`
- Reusable kit: `geo-kit/README.md`
