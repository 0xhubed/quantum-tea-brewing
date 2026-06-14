import 'dotenv/config'

export const config = {
  targetDomain: process.env.PROBE_TARGET_DOMAIN || 'quantum-tea-brewing.com',
  openaiKey: process.env.OPENAI_API_KEY || '',
  anthropicKey: process.env.ANTHROPIC_API_KEY || '',
}

export function hasAnyProvider(): boolean {
  return Boolean(config.openaiKey || config.anthropicKey)
}
