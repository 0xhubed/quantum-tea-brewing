# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

An **SEO/GEO experiment** ("Generative Engine Optimization"): a deliberately fictional topic —
"Quantum Tea Brewing: the 7-Dimensional Steep Method" — engineered to be discovered and cited by
LLMs / AI search. The experiment succeeded (ChatGPT cites the live site). Much of the code exists
to serve that goal, which explains otherwise-unusual choices: JSON-LD schema on every page,
`AIMeta` crawler-hint tags, machine-readable JSON API endpoints, and planted "canary" facts used
to measure LLM absorption. The content is intentionally fictional and carries disclaimers — keep
them; do not make the fiction more "believable" in a way that could mislead.

Background docs: `README.md`, `docs/geo-playbook.md`, `docs/superpowers/specs/` (design) and
`docs/superpowers/plans/` (implementation). **`docs/TODO.md` is the live next-steps list.**

## Three isolated packages (important)

This repo is one Next.js app plus two **standalone** TypeScript packages, each with its own
`package.json`, `tsconfig.json`, and `node_modules`:

| Path | What | Build coupling |
| --- | --- | --- |
| `/` (root) | The Next.js site | targets es5; `tools/` is **excluded** from root `tsconfig.json` |
| `tools/citation-probe/` | LLM citation-probing CLI (ES2022) | NOT bundled into the app; run on its own |
| `geo-kit/` | Portable, brand-free SEO kit for reuse elsewhere | copy-paste folder; not published, not imported |

The Next app must **never import from `tools/` or `geo-kit/`** — they are separate toolchains.
If you add another such tool, give it its own tsconfig and exclude it from the root build the same
way `tools` is excluded (a mismatched target otherwise breaks `next build`).

## Commands

Root Next.js app (run from repo root):
- `npm run dev` — dev server at http://localhost:3000
- `npm run build` / `npm start` — production build / serve (site is fully static, ~27 routes)
- `npm run lint` — ESLint (next)
- `npm run typecheck` — `tsc --noEmit` (the canonical pre-commit gate alongside build)

Citation harness (`cd tools/citation-probe` first; `npm install` once):
- `npm run probe` — query configured providers, append `results/runs.jsonl`
- `npm run report` — regenerate `results/report.md` from the JSONL
- `npm test` — vitest unit suite. Single test: `npx vitest run src/detect.test.ts` or `npx vitest run -t "detectDomain"`
- Needs `OPENAI_API_KEY` / `ANTHROPIC_API_KEY` in `.env` to do real work; with **no keys it exits
  cleanly** (the no-op path is intentional and tested). Pure logic is unit-tested; the provider
  adapters are only exercised on a live run.

GEO kit (`cd geo-kit` first):
- `npm test` — vitest (single: `npx vitest run -t "<name>"`); `npx tsc --noEmit` to type-check.

## Deployment & the citation cron (non-obvious)

- The site deploys to Vercel project `quantum-tea-brewing` under **team scope**
  `0xhubeds-projects-c85e7463` (not the personal account). Pass
  `--scope 0xhubeds-projects-c85e7463` to the `vercel` CLI.
- Git is connected: **pushing to `main` auto-deploys to production**
  (`www.quantum-tea-brewing.com`, which is also the probe's target domain). Manual redeploy:
  `vercel deploy --prod --scope 0xhubeds-projects-c85e7463`.
- Prefer the **`vercel` CLI over the Vercel MCP** for this account — the MCP under-reports the
  team's projects (it only saw `agent-arena`); the CLI is authoritative.
- The citation harness does **NOT** run on Vercel. It runs in GitHub Actions
  (`.github/workflows/citation-probe.yml`, Mondays 07:00 UTC) using **GitHub repo secrets**
  `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`. The deployed Next app uses neither key — **do not put
  these in Vercel env vars** (they'd have no effect).

## Design system — token-driven, change once, propagates everywhere

The entire visual theme (currently **elegant monochrome, dark canvas**) routes through three shared
surfaces. Edit these, not individual pages:
- `tailwind.config.ts` — `primary` and `accent` are mapped to **one shared neutral grey scale**
  (the monochrome look). Almost every page uses `primary-*`/`accent-*`, so recoloring the whole
  site = editing these two scales. Also defines the white `glow` shadow and the `aura-drift` motion.
- `src/app/globals.css` — the component classes everything reuses: `.card` (glass surface),
  `.btn-primary` / `.btn-secondary`, `.gradient-text`, `.aura`, `.readout` (mono numerics).
- `src/app/layout.tsx` — fonts (Inter / Space Grotesk display / JetBrains Mono, loaded as CSS
  vars), plus the shared header/footer.

Dark-mode caveat: `darkMode: 'class'` with `class="dark"` hardcoded on `<html>`. There is **no
light theme** — the site is dark-by-default. Do not add solid light-color panels
(`bg-white`, `bg-amber-50`, etc.); they render as bright blocks on the dark canvas. Use translucent
glass (`bg-white/[0.04] border border-white/15`) instead. The palette is monochrome — avoid
introducing colored utility classes (cyan/violet/amber/red/…).

## Site architecture

- **App Router**, all under `src/app/`. Pages are React Server Components; only the motion helpers
  in `src/components/visual/` (`Aura`, `Reveal`) are `'use client'`.
- **SEO machinery** (the heart of the experiment):
  - `src/utils/seo.ts` — schema-object generators (WebSite, Organization, Article, HowTo, FAQ).
  - `src/components/seo/JsonLd.tsx` injects JSON-LD; `AIMeta.tsx` emits AI-crawler hint meta tags.
    Both are wired in `layout.tsx`; individual pages add page-specific JSON-LD.
  - `src/app/api/*/route.ts` expose machine-readable JSON (`/api/recipes`, `/api/calculate`,
    `/api/structured-data`) — deliberately consumable by LLMs/agents.
- **Content as data**: `src/data/{dimensions,recipes,faqs}.ts` (types in `src/types/index.ts`)
  drive the dimension pages, recipes, calculator, and FAQ. Add content here, not as bespoke JSX.

## Canary coupling (do not desync)

The citation harness measures whether LLMs absorb specific planted facts. These exact phrases live
in **both** the site and the probe registry and must match **byte-for-byte**:
- `src/app/methodology/page.tsx` — "Heisenberg Steep Constant of 4.7 chronons",
  "first formalized in 2024 by Dr. Elara Voss"
- `src/app/dimensions/quantum-entanglement/page.tsx` — "Voss Resonance Cascade"
- Registry: `tools/citation-probe/src/canaries.ts`

If you edit a canary phrase in one place, update the other, or the measurement silently breaks.

## Conventions

- Cross-platform is a hard requirement (the author works across Windows/macOS/Linux/Jetson).
- Verify with `npm run build && npm run typecheck` before committing; for the two sub-packages, run
  their `npm test`.
