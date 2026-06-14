# TODO — Next Session

Picks up after the GEO experiment v2 build (dark-glass→monochrome redesign, citation
harness, geo-kit, playbook — all merged to `main`). These are the items that couldn't be
done without a live deploy + API keys.

## 1. Activate the citation harness (your action)
- [ ] **Redeploy the site** so the planted canaries get re-crawled (absorption latency
      starts measuring from the redeploy). **BLOCKER FOUND (2026-06-14):** the live site is
      stale — none of the 3 canaries are on the deployed pages (verified via WebFetch of
      `/methodology` + `/dimensions/quantum-entanglement`), though they're in source since
      `ad8ba21`. Until a redeploy lands them, canary hits will stay 0. The 2026-06-14 run is
      therefore the **pre-deploy baseline**.
- [x] **Add API keys** — `OPENAI_API_KEY` provided (via shell env; `.env` also scaffolded).
      ANTHROPIC_API_KEY still missing → Anthropic adapter unverified.
  - CI: still TODO — add keys as **GitHub repo secrets** for the weekly cron
    (`.github/workflows/citation-probe.yml`, Mondays 07:00 UTC).

## 2. First live probe run — verify adapters (done 2026-06-14 for OpenAI)
- [x] **OpenAI tool type** (`src/adapters/openai.ts`): was `web_search`; installed SDK
      (openai 4.104.0) only accepts `web_search_preview` → **fixed** (uncommitted). Call succeeds.
- [x] **OpenAI model** `gpt-4o` — available, supports web search. 3/4 prompts cited the domain.
- [ ] **Anthropic tool version** (`src/adapters/anthropic.ts`): `web_search_20250305` — UNVERIFIED
      (no key). Note: anthropic SDK 0.40.1 has no typed web_search tool; passed `as any`.
- [ ] **Anthropic model** `claude-sonnet-4-6` — UNVERIFIED (no key).
- [x] **Response-shape parsing (OpenAI)**: citation extraction from `res.output` annotations
      works — URLs extracted correctly. Anthropic path still unverified.
- [x] Sanity-checked `results/runs.jsonl` + `results/report.md` — look right.

### Baseline result (2026-06-14, pre-redeploy)
Domain cited 3/4 (direct, attribution, constant; adjacent=no). Canaries 0/3 — expected, since
they aren't live yet. Notable: the `attribution` answer credited "Daniel Huber, 2025" (real
owner) instead of the planted "Dr. Elara Voss / 2024". Re-run after redeploy + crawl latency.

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
