# geo-kit

A small, **copy-paste** toolkit for making any Next.js App-Router site legible to
AI crawlers and answer engines (GEO — Generative Engine Optimization). This is the
generalized form of the SEO/GEO machinery that got
[quantum-tea-brewing](../docs/geo-playbook.md) cited by ChatGPT — with every
project-specific value pulled out into a config you pass in.

> Not an npm package. There is nothing to `npm publish` and nothing for your app
> to import as a dependency. You **copy the folder in** and adapt it. Its
> `package.json` / `tsconfig.json` exist only so the kit can type-check and run
> its own tests in isolation (the same pattern as `tools/citation-probe/`).

## The four pieces

1. **`lib/schema.ts`** — config-driven JSON-LD generators. `makeSchema(cfg)`
   returns builders for `website()`, `organization()`, `article(data)`, and
   `faq(items)`. Everything project-specific comes from a `SiteConfig`:

   ```ts
   import { makeSchema } from './geo-kit/lib/schema'

   export const schema = makeSchema({
     siteName: 'Acme Docs',
     orgName: 'Acme Inc',
     url: 'https://acme.example',
     logo: 'https://acme.example/logo.png',     // optional
     sameAs: ['https://twitter.com/acme'],       // optional
   })
   ```

   There are **no hardcoded brand strings** in the kit — a unit test
   (`lib/schema.test.ts`) asserts the output never leaks the source project's
   brand.

2. **`components/JsonLd.tsx`** — a tiny React component that renders any schema
   object as an `application/ld+json` `<script>`.

3. **`components/AIMeta.tsx`** — renders the AI-oriented `<meta>` tags
   (`ai-content-type`, `ai-topic`, `ai-summary`, `ai-key-concepts`) plus an
   optional `<link rel="alternate" type="application/json+ld">` to a
   machine-readable structured-data endpoint. All values are props
   (`AIMetaProps`); nothing is hardcoded.

4. **`examples/`** — a starting `robots.txt` that explicitly welcomes the major
   AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) and a
   priority-weighted Next App-Router `sitemap.ts` you edit to list your real
   routes.

## Drop it into a Next App-Router app

1. **Copy the folder** into your repo (e.g. `cp -r geo-kit ./src/lib/geo-kit`).
2. **Define your `SiteConfig`** once and build your schemas with `makeSchema`.
3. **Render in your root layout** — emit the site/org schema once via `<JsonLd>`,
   and add `<AIMeta>` with your topic/summary/key-concepts:

   ```tsx
   import { JsonLd } from './geo-kit/components/JsonLd'
   import { AIMeta } from './geo-kit/components/AIMeta'
   import { schema } from './seo-config'

   export default function RootLayout({ children }) {
     return (
       <html>
         <head>
           <JsonLd data={schema.website()} />
           <JsonLd data={schema.organization()} />
           <AIMeta
             topic="your subject"
             summary="one-sentence machine summary"
             keyConcepts={['concept a', 'concept b']}
             structuredDataHref="/api/structured-data"
           />
         </head>
         <body>{children}</body>
       </html>
     )
   }
   ```

   On content/article pages, add a page-level `<JsonLd data={schema.faq(...)} />`
   or `schema.article(...)`.
4. **Adapt `examples/robots.txt`** — replace `YOUR_DOMAIN` with your domain (or
   port it to a Next `robots.ts`).
5. **Adapt `examples/sitemap.ts`** — replace the `routes` list with your real
   pages and set `NEXT_PUBLIC_SITE_URL`. Drop it at `app/sitemap.ts`.

## Develop / verify the kit in isolation

```bash
cd geo-kit
npm install
npx tsc --noEmit   # type-checks lib + components (skipLibCheck on)
npx vitest run     # runs the schema generator tests
```

## Why this works (and where the evidence lives)

This kit is the *mechanism*; the *strategy* and the honest "what mattered vs. what
was ritual" judgment live in **[`../docs/geo-playbook.md`](../docs/geo-playbook.md)**.
Whether any of it actually moves the needle is measured continuously by the
citation-probe harness in `tools/citation-probe/`, whose drift report lands at
`tools/citation-probe/results/report.md`.
