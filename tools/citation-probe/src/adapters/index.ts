import type { ProviderAdapter } from '../types'
import { openaiAdapter } from './openai'
import { anthropicAdapter } from './anthropic'

export function activeAdapters(): ProviderAdapter[] {
  return [openaiAdapter, anthropicAdapter].filter((a) => a.isConfigured())
}
