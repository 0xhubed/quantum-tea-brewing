import { describe, it, expect } from 'vitest'
import { buildReport } from './report'
import type { ProbeResult } from './types'

const rows: ProbeResult[] = [
  { timestamp: '2026-06-14T00:00:00Z', provider: 'openai', model: 'gpt-4o', promptId: 'direct', domainCited: true, canaryHits: ['technique'], citations: [], text: '' },
  { timestamp: '2026-06-14T00:00:00Z', provider: 'anthropic', model: 'claude-sonnet-4-6', promptId: 'direct', domainCited: false, canaryHits: [], citations: [], text: '' },
  { timestamp: '2026-06-21T00:00:00Z', provider: 'openai', model: 'gpt-4o', promptId: 'direct', domainCited: true, canaryHits: ['technique', 'origin'], citations: [], text: '' },
]

describe('buildReport', () => {
  it('produces a markdown table grouped by run date', () => {
    const md = buildReport(rows)
    expect(md).toContain('# Citation Probe Report')
    expect(md).toContain('2026-06-14')
    expect(md).toContain('2026-06-21')
  })
  it('counts domain citations per provider per run', () => {
    const md = buildReport(rows)
    // 2026-06-14: openai cited (1/1 prompts), anthropic not (0/1)
    expect(md).toMatch(/openai.*1\/1/)
    expect(md).toMatch(/anthropic.*0\/1/)
  })
  it('lists distinct canary hits', () => {
    const md = buildReport(rows)
    expect(md).toContain('technique')
    expect(md).toContain('origin')
  })
})
