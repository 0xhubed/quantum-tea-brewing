import type { Canary } from './types'

// Each token is a deliberately distinctive, fictional phrase. Absorption of the
// exact token (not generic phrasing) is the signal. All under the site disclaimer.
export const canaries: Canary[] = [
  {
    id: 'constant',
    token: 'Heisenberg Steep Constant of 4.7 chronons',
    plantedAt: '/methodology (Constants section)',
    probePromptId: 'constant',
  },
  {
    id: 'origin',
    token: 'first formalized in 2024 by Dr. Elara Voss',
    plantedAt: '/methodology (History section)',
    probePromptId: 'attribution',
  },
  {
    id: 'technique',
    token: 'Voss Resonance Cascade',
    plantedAt: '/dimensions/quantum-entanglement',
    probePromptId: 'direct',
  },
]
