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
