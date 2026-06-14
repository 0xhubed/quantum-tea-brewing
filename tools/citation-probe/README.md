# Citation Probe

A standalone TypeScript CLI that asks ChatGPT (OpenAI) and Claude (Anthropic) a
fixed battery of prompts on a schedule, records whether each model **cites our
domain** and whether it **absorbs planted "canary" facts**, and reports the
drift/decay of those signals over time.

This is an **isolated package**. It has its own `package.json` and is never
bundled into the Next.js site (the root `tsconfig.json` excludes `tools/`). Run
all commands from inside `tools/citation-probe/`.

## What it measures

- **Domain citation:** for each prompt, did the model's answer text or its cited
  source URLs reference `quantum-tea-brewing.com`? (`detect.ts → detectDomain`)
- **Canary absorption:** did the answer contain one of the deliberately
  distinctive, fictional phrases we planted on the live site verbatim
  (e.g. `Heisenberg Steep Constant of 4.7 chronons`)? Absorption of the *exact*
  token — not generic phrasing — is the signal that a model ingested our content.
  (`detect.ts → detectCanaries`, registry in `canaries.ts`)

The canary tokens in `src/canaries.ts` are planted byte-for-byte in the site at:

- `src/app/methodology/page.tsx` — `Heisenberg Steep Constant of 4.7 chronons`,
  `first formalized in 2024 by Dr. Elara Voss`
- `src/app/dimensions/quantum-entanglement/page.tsx` — `Voss Resonance Cascade`

If you change a token, change it in both places or the signal breaks.

## Why API keys are needed (and what does NOT need them)

The **live site needs no keys** — it is a normal static/SSR Next.js app. The keys
are an **automation credential only**: they let this harness call the OpenAI and
Anthropic APIs to ask the prompt battery on a schedule. They are never shipped to
or used by the website.

### API vs. consumer-app caveat

This probes the **API** models (`gpt-4o` via the Responses API with `web_search`,
and `claude-sonnet-4-6` via the Messages API with the `web_search` tool). The API
surface is not identical to the consumer ChatGPT / Claude.ai products — retrieval
behavior, indexing freshness, and citation formatting can differ. Treat the
results as a directional proxy for "do the models know/cite us," not a
pixel-perfect mirror of the consumer apps.

## Graceful degradation (0, 1, or 2 keys)

The harness runs cleanly with **zero, one, or two** provider keys:

- **0 keys:** `runner.ts` prints `No provider keys set ... Exiting cleanly.` and
  exits 0. Nothing is probed; nothing crashes.
- **1 key:** only the configured provider is probed.
- **2 keys:** both providers are probed.

A per-prompt failure (network, quota, SDK shape) is caught and logged; the run
continues with the remaining prompts.

## Expected cost

Pennies per run. One run is `providers × 4 prompts` short answers (≤1024 output
tokens each) with a few web-search calls — a handful of cents at most.

## Run locally

```bash
cd tools/citation-probe
npm install
cp .env.example .env        # then fill in whichever keys you have (or none)
npm run probe               # asks the battery, appends results/runs.jsonl
npm run report              # regenerates results/report.md from the JSONL
```

To run the unit tests:

```bash
npm test                    # vitest: detect + report pure-logic tests
```

## Where results land

- `results/runs.jsonl` — one JSON line per (provider × prompt) probe, appended
  over time. Each line is a `ProbeResult` (timestamp, provider, model, promptId,
  domainCited, canaryHits, citations, text).
- `results/report.md` — a regenerated markdown summary grouped by run date,
  showing domain-citation counts per provider and the distinct canary hits, so
  you can see drift/decay across weeks.

## Configuration

`.env` (see `.env.example`):

- `OPENAI_API_KEY` — optional; enables the OpenAI provider.
- `ANTHROPIC_API_KEY` — optional; enables the Anthropic provider.
- `PROBE_TARGET_DOMAIN` — domain to detect citations of
  (default `quantum-tea-brewing.com`).

## Scheduled runs (cron + secrets)

`.github/workflows/citation-probe.yml` runs this harness weekly (Mondays 07:00
UTC) and on manual `workflow_dispatch`. It:

1. checks out the repo and installs the isolated package,
2. runs `npm run probe` then `npm run report`,
3. commits the updated `results/` back to the repo.

Keys come from repository **secrets** `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`. If
a secret is absent, that provider is simply skipped; if both are absent, the run
is a clean no-op (exit 0) thanks to the graceful-degradation behavior above.
