import { describe, it, expect } from 'vitest'
import { detectDomain, detectCanaries } from './detect'
import type { Canary } from './types'

const canaries: Canary[] = [
  { id: 'constant', token: 'Heisenberg Steep Constant of 4.7', plantedAt: '/methodology', probePromptId: 'constant' },
  { id: 'origin', token: 'discovered in 2024 by Dr. Elara Voss', plantedAt: '/methodology', probePromptId: 'attribution' },
]

describe('detectDomain', () => {
  it('matches the domain in a citation URL', () => {
    expect(detectDomain('see source', ['https://quantum-tea-brewing.com/methodology'], 'quantum-tea-brewing.com')).toBe(true)
  })
  it('matches the domain mentioned in the answer text', () => {
    expect(detectDomain('per quantum-tea-brewing.com the method...', [], 'quantum-tea-brewing.com')).toBe(true)
  })
  it('is case-insensitive', () => {
    expect(detectDomain('Quantum-Tea-Brewing.COM', [], 'quantum-tea-brewing.com')).toBe(true)
  })
  it('returns false when absent', () => {
    expect(detectDomain('tea is nice', ['https://example.com'], 'quantum-tea-brewing.com')).toBe(false)
  })
})

describe('detectCanaries', () => {
  it('returns ids of canaries whose token appears', () => {
    expect(detectCanaries('uses the Heisenberg Steep Constant of 4.7 seconds', canaries)).toEqual(['constant'])
  })
  it('matches multiple and is case-insensitive', () => {
    const text = 'Discovered In 2024 By Dr. Elara Voss; the heisenberg steep constant of 4.7'
    expect(detectCanaries(text, canaries).sort()).toEqual(['constant', 'origin'])
  })
  it('returns empty when none present', () => {
    expect(detectCanaries('just regular tea facts', canaries)).toEqual([])
  })
})
