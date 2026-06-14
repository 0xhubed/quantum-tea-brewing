import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import type { ProbeResult } from './types'

export function buildReport(rows: ProbeResult[]): string {
  const byDate = new Map<string, ProbeResult[]>()
  for (const r of rows) {
    const date = r.timestamp.slice(0, 10)
    const list = byDate.get(date) ?? []
    list.push(r)
    byDate.set(date, list)
  }

  let md = '# Citation Probe Report\n\nDrift of domain citations and canary absorption over time.\n\n'
  for (const date of [...byDate.keys()].sort()) {
    const run = byDate.get(date)!
    md += `## Run ${date}\n\n| Provider | Domain cited | Canary hits |\n| --- | --- | --- |\n`
    const providers = [...new Set(run.map((r) => r.provider))].sort()
    for (const p of providers) {
      const rowsP = run.filter((r) => r.provider === p)
      const cited = rowsP.filter((r) => r.domainCited).length
      const hits = [...new Set(rowsP.flatMap((r) => r.canaryHits))].sort()
      md += `| ${p} | ${cited}/${rowsP.length} | ${hits.join(', ') || '—'} |\n`
    }
    md += '\n'
  }
  return md
}

// CLI entry: read results/runs.jsonl → write results/report.md
const __dirname = dirname(fileURLToPath(import.meta.url))
const jsonlPath = join(__dirname, '..', 'results', 'runs.jsonl')
const reportPath = join(__dirname, '..', 'results', 'report.md')

if (process.argv[1] && process.argv[1].endsWith('report.ts')) {
  const rows: ProbeResult[] = existsSync(jsonlPath)
    ? readFileSync(jsonlPath, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l))
    : []
  writeFileSync(reportPath, buildReport(rows))
  console.log(`Wrote ${reportPath} (${rows.length} results)`)
}
