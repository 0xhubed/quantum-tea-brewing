import type { Canary } from './types'

export function detectDomain(text: string, citations: string[], domain: string): boolean {
  const needle = domain.toLowerCase()
  if (text.toLowerCase().includes(needle)) return true
  return citations.some((url) => url.toLowerCase().includes(needle))
}

export function detectCanaries(text: string, canaries: Canary[]): string[] {
  const haystack = text.toLowerCase()
  return canaries.filter((c) => haystack.includes(c.token.toLowerCase())).map((c) => c.id)
}
