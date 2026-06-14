export type ProviderId = 'openai' | 'anthropic'

export interface ProviderAnswer {
  text: string
  citations: string[]   // URLs the model cited, if the provider exposes them
  model: string
}

export interface ProviderAdapter {
  id: ProviderId
  isConfigured(): boolean
  ask(prompt: string): Promise<ProviderAnswer>
}

export interface Canary {
  id: string
  token: string         // unique nonce that proves absorption (not generic phrasing)
  plantedAt: string     // where on the site it lives, for traceability
  probePromptId: string // which prompt's answer would contain it if absorbed
}

export interface ProbeResult {
  timestamp: string     // ISO 8601, injected by runner (not generated in pure code)
  provider: ProviderId
  model: string
  promptId: string
  domainCited: boolean
  canaryHits: string[]  // canary ids whose token appeared
  citations: string[]
  text: string
}
