# Quantum Tea Brewing — GEO Experiment v2 Design

**Date:** 2026-06-14
**Author:** Daniel Huber (with Claude)
**Status:** Approved for planning

---

## Background

`quantum-tea-brewing` was built ~1 year ago as an experiment in optimizing a brand-new,
fully fictional topic to be discovered and cited by LLMs / AI search ("GEO" — Generative
Engine Optimization), following Vercel's "SEO for LLMs" guidance.

**The hypothesis has been validated:** ChatGPT now references this site when asked about
"quantum tea brewing." The hard part — getting a net-new invented term ingested into the
LLM corpus — is done.

This design covers the next iteration: turn the proven experiment into (1) a measurement
study, (2) a reusable playbook, and (3) a visual refresh — while keeping the project
clearly, honestly fictional.

## Goals

1. **Measure** how, how reliably, and how fast LLMs cite and absorb this site over time.
2. **Extract** the reusable GEO machinery into a portable kit + an evidence-backed playbook.
3. **Refresh** the site to a 2026 "quantum lab / dark glass" aesthetic.

## Non-goals

- No deception. The site keeps its "fictional experiment" disclaimer. We do **not** make
  the fiction more believable in order to mislead models or people.
- No npm package publish for the GEO kit (YAGNI — copy-paste folder + README is enough).
- No backend/database. The site stays static; the harness is a standalone CLI.
- No change to the core fictional concept (the 7 dimensions, recipes, etc.).

## Ethical guardrail

Direction 3 ("can you steer what a model says") is scoped to **measure-only**. We plant
clearly-labeled, uniquely-tagged "canary" facts and observe whether/when models absorb
them. We do not attempt to make models assert the fiction is real, and all disclaimers
stay in place.

---

## Phase A — 2026 Redesign ("Quantum Lab, dark glass")

Purely visual. The stack is already modern (Next 16, React 19, Tailwind 3, framer-motion),
so this is restyling, not migration.

### Design tokens (the foundation everything inherits)

- **Background:** dark-first. Near-black base (`#06070d`) with layered radial cyan/violet
  auras. Glass surfaces = translucent fill + `backdrop-blur` + hairline borders.
- **Accent system:** cyan `#22d3ee` + violet `#a855f7` dual-gradient, replacing the single
  teal `primary`. Define as CSS variables + Tailwind color scale.
- **Typography:**
  - `Space Grotesk` — display headings
  - `JetBrains Mono` — "instrument" numerics (dimension symbols, calculator readouts)
  - `Inter` — body (already present)
- **Motion (framer-motion):** slow animated aura/particle field behind the hero;
  hover-glow on cards; fade-up on scroll. CSS-driven where possible for performance.

### Propagation strategy

All restyling routes through a small number of shared surfaces so the change reaches every
page automatically:

- `src/app/globals.css` — design tokens + `.card` / `.btn-primary` / `.btn-secondary` /
  `.gradient-text` component classes.
- `tailwind.config.ts` — colors, fonts, shadows/glows.
- `src/app/layout.tsx` — header, footer, font loading.

Pages that inherit automatically via shared classes: dimensions, calculator, recipes, FAQ,
methodology. The **homepage** (`src/app/page.tsx`) gets bespoke hero + section treatment.

### Acceptance

- Site renders dark-glass theme across all routes; no page still shows the old light/teal look.
- Lighthouse performance not materially regressed (motion is cheap/CSS-first).
- `npm run build` + `npm run typecheck` pass.

---

## Phase B — Citation-probing harness + canary measurement (Directions 1 + 3)

A self-contained TypeScript CLI under `tools/citation-probe/`, run via `npx tsx`
(cross-platform: macOS / Windows / Linux). It is independent of the Next app and the Next
build — no shared bundling.

### What needs API keys, and why

The harness automates asking ChatGPT and Claude the same questions on a schedule and
recording their answers. Sending those prompts *via code* requires each provider's API key:

- `OPENAI_API_KEY` → OpenAI Responses API + `web_search` tool (captures ChatGPT answers + cited URLs).
- `ANTHROPIC_API_KEY` → Claude + web-search tool (cross-model comparison).

The keys are the **automation credential only** — the website needs none. Provider crawlers
and answer-time web search (the thing that made us cited) operate on the providers' side and
keep working regardless. Keys are paid/usage-metered (pennies per run). The harness
**degrades gracefully**: a missing key → that provider is skipped, the rest still run.

**Honest caveat:** API web-search ≠ guaranteed identical to the consumer ChatGPT app (the
app may add retrieval layers). The API is the closest automatable proxy and the right
directional signal.

### Components

```
tools/citation-probe/
├── README.md            # setup, keys, how to run, how to read reports
├── package.json         # isolated deps (openai, @anthropic-ai/sdk, tsx, dotenv, zod)
├── src/
│   ├── types.ts         # ProbeResult, ProviderAdapter interface
│   ├── config.ts        # loads .env, target domain (PROBE_TARGET_DOMAIN), which providers are active
│   ├── prompts.ts       # fixed prompt battery (direct / adjacent / attribution)
│   ├── canaries.ts      # registry of planted facts, each with a unique nonce token
│   ├── adapters/
│   │   ├── openai.ts     # ProviderAdapter — Responses API + web_search
│   │   └── anthropic.ts  # ProviderAdapter — messages + web_search tool
│   ├── detect.ts        # given an answer: domain-cited? canary token present? wording captured?
│   ├── runner.ts        # prompts × active providers → append JSONL
│   └── report.ts        # aggregate JSONL → drift/decay markdown table
└── results/
    ├── runs.jsonl       # append-only time-series (one line per prompt×provider×run)
    └── report.md        # generated summary (regenerated by report.ts)
```

### ProviderAdapter interface

```ts
interface ProviderAdapter {
  id: 'openai' | 'anthropic';
  isConfigured(): boolean;            // key present?
  ask(prompt: string): Promise<{
    text: string;
    citations: string[];              // URLs the model cited, if exposed
  }>;
}
```

### Detection (`detect.ts`) records, per prompt × provider × run

- `domainCited` — boolean; target domain appears in citations or answer text.
- `canaryHits` — which planted nonce tokens appear in the answer (absorption signal).
- `attribution` — captured wording for "who invented / what is" prompts.
- `rawText` — full answer (for later re-analysis).
- `timestamp`, `provider`, `promptId`, `model`.

### Canaries (Direction 3, measure-only)

A handful of uniquely-tagged facts planted in the live site copy, each with a distinctive
nonce string so absorption is unambiguous (not generic phrasing). Examples (final values TBD
in implementation):

- A named constant with an oddly-specific value (e.g. "the Heisenberg Steep Constant").
- An invented discovery date / fictional discoverer name.
- A uniquely-named recipe or technique.

Each canary is registered in `canaries.ts` with: the nonce token, where it's planted, and
the probe prompt whose answer would contain it if absorbed. All remain under the site's
fictional disclaimer.

### Scheduling

- `.github/workflows/citation-probe.yml` — weekly cron. Keys via repo secrets. Commits the
  updated `runs.jsonl` + regenerated `report.md` back to the repo so the time-series
  accrues automatically.
- Local run documented in README (`npx tsx src/runner.ts` then `npx tsx src/report.ts`).

### Acceptance

- `npx tsx src/runner.ts` runs with 0, 1, or 2 keys present (graceful skip verified).
- A run appends valid JSONL; `report.ts` produces a readable drift table.
- Canaries are planted in the live site and registered in `canaries.ts`.
- GitHub Actions workflow validates (syntax) and is documented.

---

## Phase C — GEO kit + playbook (Direction 2)

### `geo-kit/`

The portable SEO machinery, extracted clean and dependency-light so it can be dropped into
any Next App-Router project:

```
geo-kit/
├── README.md            # what it is, how to drop into a Next app, what each piece does
├── components/
│   ├── JsonLd.tsx
│   └── AIMeta.tsx
├── lib/
│   └── schema.ts        # schema generators (Website, Organization, Article, Recipe, FAQ, HowTo)
└── examples/
    ├── robots.txt       # AI-crawler-aware
    └── sitemap.ts       # priority-weighted sitemap pattern
```

Sourced from the existing `src/components/seo/*` and `src/utils/seo.ts`, generalized
(no quantum-tea-specific values hardcoded).

### `docs/geo-playbook.md`

The writeup, designed to pair with Phase B's data:

- What we did (the full checklist actually implemented).
- **What plausibly moved the needle vs. cargo-cult** — honest separation, flagged where the
  Phase B data can confirm/refute.
- How to reproduce on a real commercial site.
- Open questions the harness is built to answer (attribution vs. absorption, update latency,
  decay).

### Acceptance

- `geo-kit/` contains no quantum-tea-specific hardcoded strings; README explains drop-in use.
- `docs/geo-playbook.md` cross-references the Phase B metrics it depends on.

---

## Build order

**A → B → C.**
Redesign first (immediately visible, self-contained). Harness second so the time-series
starts accruing ASAP. Playbook last since it leans on B's data and the kit extraction.

Each phase is independently shippable and reviewable.

## Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| API keys absent / cost | Graceful skip; pennies per run; document expected cost |
| API web-search ≠ consumer app | Documented as a known proxy limitation, not hidden |
| Canary absorption needs re-crawl | That latency *is* the measurement; not a blocker |
| Redesign motion hurts perf | CSS-first, framer-motion sparingly, Lighthouse check |
| Scope creep across 3 dirs | Strict phase boundaries; each ships on its own |
