# The GEO Playbook

> **Generative Engine Optimization (GEO):** making a site legible, quotable, and
> trustworthy to AI answer engines (ChatGPT, Claude, Perplexity, Google AI
> Overviews) — not just to the classic blue-link search index.

## 1. What this is

This is a field playbook distilled from a real, controlled experiment:
**quantum-tea-brewing.com** — a deliberately fictional "quantum tea" site — was
built to find out *what actually makes an LLM cite a brand-new domain*, and then
to **measure** whether it worked instead of guessing.

The experiment has two halves that this playbook sits between:

- The **mechanism** is packaged as a portable, drop-in toolkit at
  [`geo-kit/`](../geo-kit/README.md) — config-driven JSON-LD generators,
  AI-meta and JSON-LD React components, and example AI-crawler-friendly
  `robots.txt` / priority `sitemap.ts`. It is the generalized form of the SEO
  machinery this site shipped, with every brand-specific string pulled out.
- The **evidence** is produced by the citation-probe harness in
  [`tools/citation-probe/`](../tools/citation-probe/README.md), whose drift
  report lands at **`tools/citation-probe/results/report.md`**. That file is the
  ground truth for every "did it work?" question below.

The honest framing up front: **most published GEO advice is untested ritual.**
This playbook separates what is *plausibly load-bearing* from what is *probably
cargo-cult*, and it tags each load-bearing claim with **whether the harness can
actually confirm it**.

## 2. What we actually did

The site is a dark-glass Next.js (App Router) app. Concretely, it shipped:

- **Structured data on every page.** JSON-LD via a `<JsonLd>` component —
  `WebSite` + `Organization` site-wide, and `Article` / `FAQPage` / `HowTo` on
  the content and recipe pages. (Generalized in `geo-kit/lib/schema.ts`.)
- **Clear information architecture.** A flat, topic-named route tree
  (`/methodology`, `/dimensions/<name>`, `/recipes/<slug>`, `/calculator`,
  `/faq`) so each concept has one canonical, descriptively-slugged URL.
- **Semantic HTML.** Real headings, lists, tables and definition structures
  rather than `<div>` soup, so an extractor can lift facts cleanly.
- **Machine-readable API endpoints.** `/api/structured-data`, `/api/recipes`,
  `/api/recipes/[id]`, `/api/calculate` — the same facts the pages render, served
  as plain JSON, linked from the head via
  `<link rel="alternate" type="application/json+ld">`.
- **AI-crawler-friendly robots.** `robots.txt` that *explicitly* `Allow`s GPTBot,
  ClaudeBot, PerplexityBot, and Google-Extended. (Generalized in
  `geo-kit/examples/robots.txt`.)
- **A priority-weighted sitemap.** `sitemap.xml` with importance-ranked routes.
  (Generalized in `geo-kit/examples/sitemap.ts`.)
- **AI-oriented meta tags.** `ai-content-type`, `ai-topic`, `ai-summary`,
  `ai-key-concepts` (and, in the original site, some speculative `llm-*` tags —
  see §3). Generalized, prop-driven, in `geo-kit/components/AIMeta.tsx`.
- **Distinctive coined terminology.** The content invents zero-competition terms
  with no existing web footprint — which doubles as the measurement instrument
  (the canaries in §5).

Every factual claim on the site sits under an explicit "fictional educational
content" disclaimer. This is GEO as an *experiment*, not a deception (see §6).

## 3. Plausibly load-bearing vs. cargo-cult

A two-column, deliberately skeptical judgment. The right column is the part most
GEO blog posts omit. **"Confirmable?"** states whether Phase B's harness — the
canary/citation data in `tools/citation-probe/results/report.md` — can actually
adjudicate the claim, or whether it remains an untested belief.

### Plausibly load-bearing

| Tactic | Why it likely matters | Confirmable by Phase B? |
| --- | --- | --- |
| **Unique coined term with zero competition** (e.g. "Heisenberg Steep Constant", "Voss Resonance Cascade") | No incumbent pages to outrank; the model has exactly one source to draw the term from, so a verbatim hit is near-unambiguous attribution. | **Yes — directly.** This is the canary mechanism. A verbatim canary hit in an answer is the strongest signal we collect (`detectCanaries`). |
| **Dense, valid structured data (JSON-LD)** | Gives extractors unambiguous entities/relations instead of prose they must parse. Low cost, well-aligned with how retrieval pipelines chunk. | **Partially.** The harness measures the *outcome* (citation/absorption), not which input caused it. Confirmable only by A/B-style change-over-time in the report, not in isolation. |
| **Machine-readable endpoints mirroring page facts** | A clean JSON surface is trivially ingestible and removes HTML-parsing ambiguity for crawlers that fetch them. | **Indirectly.** Same caveat: we observe whether facts get absorbed, not the exact path they took in. |
| **Clean crawlability** (explicit AI-crawler `Allow`, sitemap, fast SSR pages) | If the bot can't fetch it, nothing else matters — this is the necessary precondition. | **Indirectly.** If domain citation never appears, crawl/access is the first thing to rule out; the report's domain-citation trend is the tell. |
| **Distinctive, quotable phrasing** | Self-contained, copy-pasteable factual sentences are easier for a model to lift verbatim than diffuse prose. | **Yes — via canary absorption** (a canary is exactly such a quotable sentence). |

### Probably cargo-cult (ritual until proven otherwise)

| Tactic | Why it's suspect | Confirmable by Phase B? |
| --- | --- | --- |
| **Speculative `llm-*` meta tags** (`llm-training-quality`, `llm-factual-accuracy`, `llm-use-case`) | No major crawler documents reading these; they look like wishful incantation. The kit's `AIMeta` deliberately **drops** them and keeps only the plausibly-read `ai-*` set. | **No.** The harness can't isolate a single meta tag's effect; absent a documented consumer, treat as inert. |
| **`ai-*` meta tags themselves** | More plausible than `llm-*`, but still undocumented as inputs to any production retrieval stack. | **No (not in isolation).** Kept because they're cheap and harmless, not because they're proven. |
| **Keyword-style `ai-key-concepts` stuffing** | Smells like meta-keywords, which search abandoned decades ago. | **No.** Unmeasurable here; included only as a low-cost hedge. |
| **`sameAs` / sitemap `priority` micro-tuning** | Marginal at best; priority is a hint search engines already largely ignore. | **No.** Below the harness's resolution. |

**The discipline:** anything in the right column stays *only* because it is cheap
and non-harmful. The moment a tactic costs real effort or risks credibility, the
burden is on the data in `report.md` to justify it — not on folklore.

## 4. How to reproduce on a real site

1. **Drop in the kit.** Copy [`geo-kit/`](../geo-kit/README.md) into your repo.
   Define one `SiteConfig` (`siteName`, `orgName`, `url`, optional `logo` /
   `sameAs`) and build your schemas with `makeSchema(cfg)`.
2. **Render in your layout.** Emit `WebSite` + `Organization` JSON-LD via
   `<JsonLd>` once in the root layout; add `<AIMeta>` with your real topic /
   summary / key-concepts; add page-level `FAQPage` / `Article` JSON-LD on
   content pages.
3. **Expose the same facts as JSON.** Mirror your key content at a small set of
   machine-readable endpoints and link them from `<head>`.
4. **Open the doors.** Adapt `geo-kit/examples/robots.txt` (explicit AI-crawler
   `Allow`) and `geo-kit/examples/sitemap.ts` to your routes.
5. **Content strategy — the actual lever.** Coin one or two **distinctive,
   zero-competition terms** for ideas you genuinely own, and state the
   corresponding facts in single, self-contained, quotable sentences. This is
   what turns "indexed" into "cited."
6. **Instrument it.** Stand up a probe like `tools/citation-probe/`: plant a
   verbatim **canary** phrase, then ask the models a fixed prompt battery on a
   schedule and watch `report.md`. Do not trust any tactic you cannot measure.

## 5. Open questions the harness answers

These are the questions the **canary mechanism** exists to resolve. The canary
registry (`tools/citation-probe/src/canaries.ts`) plants three byte-for-byte
fictional tokens on the live site and probes for them:

- `Heisenberg Steep Constant of 4.7 chronons` — planted on `/methodology`.
- `first formalized in 2024 by Dr. Elara Voss` — the origin attribution, planted
  on `/methodology`.
- `Voss Resonance Cascade` — planted on `/dimensions/quantum-entanglement`.

Each open question maps to a signal the harness records into
**`tools/citation-probe/results/report.md`**:

- **Attribution vs. absorption.** Does the model *cite our domain*
  (`detectDomain` finds `quantum-tea-brewing.com` in the answer or its sources)
  or does it *absorb the fact without credit* (a verbatim canary hit with no
  citation)? Absorption-without-attribution is the most interesting — and least
  discussed — GEO outcome. → `report.md`.
- **Update latency.** How long after publishing does a fresh canary first appear
  in answers? The weekly cron run timestamps each first sighting. → `report.md`.
- **Decay.** Once present, does citation/absorption persist or fade as the index
  churns? The report groups results by run date so drift is visible week over
  week. → `report.md`.

The harness probes the **API** models (`gpt-4o`, `claude-sonnet-4-6`) with web
search, which is a *directional proxy* for the consumer apps, not a pixel-perfect
mirror. Read every conclusion above through that caveat.

## 6. Ethics note

Coined-term GEO works precisely because the model has no competing source for the
term — which is exactly what makes it dangerous. The same mechanism that gets a
legitimate, novel idea cited could be used to **plant misinformation** into answer
engines that millions trust.

The stance of this project is **measure-only**: every canary is fictional, sits
under an explicit "fictional educational content" disclaimer, and exists to
quantify the channel — never to assert a false claim about the real world. If you
adopt this playbook, hold the same line. Use coined-term GEO to make *true,
genuinely original* contributions legible to AI. Do not use it to launder
falsehoods into a model's answers.
