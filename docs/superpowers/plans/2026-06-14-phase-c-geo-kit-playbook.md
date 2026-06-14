# Phase C — GEO Kit + Playbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract the site's SEO/GEO machinery into a portable, drop-in `geo-kit/` folder (no quantum-tea specifics), and write an evidence-backed `docs/geo-playbook.md` that pairs with Phase B's data.

**Architecture:** `geo-kit/` is a copy-paste folder (not an npm publish) generalizing `src/components/seo/*` + `src/utils/seo.ts` so any value is passed in via a config object. A small Node test asserts the generators are config-driven (no hardcoded "Quantum Tea"). The playbook is prose that explicitly cross-references the metrics the harness produces.

**Tech Stack:** TypeScript, React (types only), Node test runner.

**Dependency note:** Phase C leans on Phase B's `report.md` existing as a reference target. The playbook can be written before any real data accrues — it points at *where* the evidence will live.

---

### Task 1: Generalize the schema generators into the kit

**Files:**
- Create: `geo-kit/lib/schema.ts`
- Test: `geo-kit/lib/schema.test.ts`

The existing `src/utils/seo.ts` hardcodes "Quantum Tea Brewing" / "Quantum Tea Institute". The kit version takes a `SiteConfig` so it's reusable.

- [ ] **Step 1: Write the failing test**

```ts
import { describe, it, expect } from 'vitest'
import { makeSchema } from './schema'

const cfg = { siteName: 'Acme Docs', orgName: 'Acme Inc', url: 'https://acme.example' }

describe('makeSchema', () => {
  it('builds a Website schema from config (no hardcoded brand)', () => {
    const s = makeSchema(cfg).website()
    expect(s['@type']).toBe('WebSite')
    expect(s.name).toBe('Acme Docs')
    expect(s.url).toBe('https://acme.example')
  })
  it('builds an Organization schema from config', () => {
    const s = makeSchema(cfg).organization()
    expect(s.name).toBe('Acme Inc')
    expect(s.url).toBe('https://acme.example')
  })
  it('builds an FAQ schema from items', () => {
    const s = makeSchema(cfg).faq([{ question: 'Q?', answer: 'A.' }])
    expect(s['@type']).toBe('FAQPage')
    expect(s.mainEntity[0].name).toBe('Q?')
  })
  it('never leaks the source project brand', () => {
    const json = JSON.stringify(makeSchema(cfg).website())
    expect(json.toLowerCase()).not.toContain('quantum tea')
  })
})
```

- [ ] **Step 2: Run to verify failure**

Run: `cd geo-kit && npx vitest run lib/schema.test.ts`
Expected: FAIL — "Cannot find module './schema'". (If vitest isn't resolvable here, add the minimal `package.json` from Task 4 first, then return.)

- [ ] **Step 3: Implement `schema.ts`**

```ts
export interface SiteConfig {
  siteName: string
  orgName: string
  url: string
  logo?: string
  sameAs?: string[]
}

const base = (type: string, data: Record<string, unknown>) => ({
  '@context': 'https://schema.org', '@type': type, ...data,
})

export function makeSchema(cfg: SiteConfig) {
  return {
    website: () => base('WebSite', {
      name: cfg.siteName, url: cfg.url,
      potentialAction: {
        '@type': 'SearchAction',
        '@target': `${cfg.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }),
    organization: () => base('Organization', {
      name: cfg.orgName, url: cfg.url,
      logo: cfg.logo ?? `${cfg.url}/logo.png`,
      sameAs: cfg.sameAs ?? [],
    }),
    article: (data: Record<string, unknown>) => base('Article', data),
    faq: (faqs: Array<{ question: string; answer: string }>) => base('FAQPage', {
      mainEntity: faqs.map((f) => ({
        '@type': 'Question', name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    }),
  }
}
```

- [ ] **Step 4: Run to verify pass**

Run: `npx vitest run lib/schema.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add geo-kit/lib/schema.ts geo-kit/lib/schema.test.ts
git commit -m "feat(geo-kit): config-driven schema generators with tests"
```

---

### Task 2: Portable React components

**Files:**
- Create: `geo-kit/components/JsonLd.tsx`
- Create: `geo-kit/components/AIMeta.tsx`

- [ ] **Step 1: JsonLd** (unchanged shape; brand-free).

```tsx
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

- [ ] **Step 2: AIMeta** — generalized to take props instead of hardcoded quantum-tea values.

```tsx
export interface AIMetaProps {
  contentType?: string
  topic: string
  summary: string
  keyConcepts: string[]
  structuredDataHref?: string
}

export function AIMeta({ contentType = 'educational', topic, summary, keyConcepts, structuredDataHref }: AIMetaProps) {
  return (
    <>
      <meta name="ai-content-type" content={contentType} />
      <meta name="ai-topic" content={topic} />
      <meta name="ai-summary" content={summary} />
      <meta name="ai-key-concepts" content={keyConcepts.join(', ')} />
      {structuredDataHref && <link rel="alternate" type="application/json+ld" href={structuredDataHref} />}
    </>
  )
}
```

- [ ] **Step 3: Verify compile** (uses the kit tsconfig from Task 4 — if not present yet, defer this check until after Task 4).

Run: `npx tsc --noEmit -p geo-kit`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add geo-kit/components/JsonLd.tsx geo-kit/components/AIMeta.tsx
git commit -m "feat(geo-kit): portable JsonLd + AIMeta components"
```

---

### Task 3: Example robots.txt + sitemap

**Files:**
- Create: `geo-kit/examples/robots.txt`
- Create: `geo-kit/examples/sitemap.ts`

- [ ] **Step 1: AI-crawler-aware robots.txt**

```
User-agent: *
Allow: /

# Explicitly welcome AI crawlers
User-agent: GPTBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: https://YOUR_DOMAIN/sitemap.xml
```

- [ ] **Step 2: Priority-weighted sitemap pattern** (Next App Router `sitemap.ts`).

```ts
import type { MetadataRoute } from 'next'

const URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://YOUR_DOMAIN'

// Replace `routes` with your real route list; higher priority = more important.
const routes: Array<{ path: string; priority: number }> = [
  { path: '/', priority: 1.0 },
  { path: '/methodology', priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: r.priority,
  }))
}
```

- [ ] **Step 3: Commit**

```bash
git add geo-kit/examples/robots.txt geo-kit/examples/sitemap.ts
git commit -m "feat(geo-kit): example robots.txt + priority sitemap"
```

---

### Task 4: Kit package config + README

**Files:**
- Create: `geo-kit/package.json`
- Create: `geo-kit/tsconfig.json`
- Create: `geo-kit/README.md`

- [ ] **Step 1: `package.json`** (dev-only; the kit is copy-paste, not published).

```json
{
  "name": "geo-kit",
  "private": true,
  "type": "module",
  "scripts": { "test": "vitest run" },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "typescript": "^5.5.0",
    "vitest": "^2.1.0"
  }
}
```

- [ ] **Step 2: `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["components", "lib", "examples"]
}
```

- [ ] **Step 3: `README.md`** documenting: what the kit is, the four pieces (schema/JsonLd/AIMeta/examples), how to drop into any Next App-Router app (copy folder, pass your `SiteConfig`, render `<JsonLd>`/`<AIMeta>` in layout, adapt robots/sitemap), and an explicit "this is the generalized form of what got quantum-tea-brewing cited" note linking to `../docs/geo-playbook.md`.

- [ ] **Step 4: Install + full kit verification**

Run: `cd geo-kit && npm install && npx tsc --noEmit && npx vitest run`
Expected: install OK; tsc PASS; vitest PASS (4 tests). Now also complete any checks deferred in Task 1–2 (`vitest`, `tsc -p geo-kit`).

- [ ] **Step 5: Commit**

```bash
git add geo-kit/package.json geo-kit/tsconfig.json geo-kit/README.md geo-kit/package-lock.json
git commit -m "feat(geo-kit): package config + drop-in README"
```

---

### Task 5: The playbook

**Files:**
- Create: `docs/geo-playbook.md`

- [ ] **Step 1: Write the playbook** with these sections:

  1. **What this is** — a GEO playbook derived from a validated experiment (quantum-tea-brewing got cited by ChatGPT).
  2. **What we actually did** — the real checklist implemented (structured data on every page, clear IA, semantic HTML, machine-readable API endpoints, AI-crawler-friendly robots, priority sitemap).
  3. **Plausibly load-bearing vs. cargo-cult** — an honest two-column judgment: which tactics likely mattered (unique coined term with zero competition, dense structured data, machine-readable endpoints, clean crawlability) vs. which are probably ritual (e.g. speculative `llm-*` meta tags). Each "load-bearing?" claim is tagged with **whether Phase B's data can confirm it**.
  4. **How to reproduce on a real site** — the drop-in `geo-kit/` steps + content strategy.
  5. **Open questions the harness answers** — attribution vs. absorption, update latency, decay — each pointing at `tools/citation-probe/results/report.md` as the evidence source.
  6. **Ethics note** — coined-term GEO is powerful; don't use it to plant misinformation. Links to the measure-only stance.

- [ ] **Step 2: Cross-reference check** — confirm the playbook names the actual artifacts that exist: `geo-kit/`, `tools/citation-probe/results/report.md`, and the canary mechanism.

Run:
```bash
grep -E "geo-kit|citation-probe/results/report.md|canar" docs/geo-playbook.md
```
Expected: hits for each (kit path, report path, canary).

- [ ] **Step 3: Commit**

```bash
git add docs/geo-playbook.md
git commit -m "docs(geo): evidence-backed GEO playbook"
```

---

## Self-Review

- **Spec coverage:** `geo-kit/` with JsonLd+AIMeta (T2), schema generators (T1), robots+sitemap examples (T3), README drop-in (T4); `docs/geo-playbook.md` with load-bearing-vs-cargo-cult + cross-refs to Phase B metrics (T5). Covers Phase C components + both acceptance criteria ("no hardcoded quantum-tea strings" asserted in T1 Step 1 test; "playbook cross-references Phase B metrics" asserted in T5 Step 2).
- **Type consistency:** `SiteConfig` + `makeSchema` defined T1, referenced by README T4. `AIMetaProps` defined T2. No symbol used before definition.
- **Dependency ordering note:** Tasks 1–2's tsc/vitest checks depend on T4's package.json/tsconfig; each such step says "defer until after Task 4" so out-of-order execution is safe. T4 Step 4 re-runs the deferred checks.
- **Placeholder scan:** README (T4) and playbook (T5) are specified by required-contents + a grep gate rather than full prose — acceptable for docs; all code tasks carry complete code.
