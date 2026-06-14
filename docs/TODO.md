# TODO — Next Session

Picks up after the GEO experiment v2 build (dark-glass→monochrome redesign, citation
harness, geo-kit, playbook — all merged to `main`). These are the items that couldn't be
done without a live deploy + API keys.

## 1. Activate the citation harness (your action)
- [x] **Redeploy the site** — DONE 2026-06-14. The project had **no Git integration** (so
      pushes never deployed; site was 65 days stale). Linked the repo (`vercel link`) and ran
      `vercel deploy --prod` → deployment `dpl_4S8RPEgK84RvnpyyzJS5qykbGbL2`, aliased to
      www.quantum-tea-brewing.com. All 3 canaries verified live via curl. Absorption latency
      now starts from here.
- [ ] **Connect Git for auto-deploy** — `vercel git connect` FAILED: the Vercel GitHub App
      isn't authorized for `0xhubed/quantum-tea-brewing`. Fix once via dashboard: Project →
      Settings → Git → Connect, or install the Vercel GitHub App on the repo, then re-run
      `vercel git connect`. Until then, redeploy manually with `vercel deploy --prod`.
- [ ] **Re-probe after crawl latency** (days) to measure real absorption — let Monday's cron
      catch it, or run `npm run probe` manually. Note: last run showed the model citing only
      shallow pages (/faq, /, /dimensions/temporal); canaries live on /methodology and
      /dimensions/quantum-entanglement, so absorption also depends on those deep pages being
      crawled/indexed — watch whether prompts need to be more targeted.
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
