import Anthropic from '@anthropic-ai/sdk'
import { config } from '../config'
import type { ProviderAdapter, ProviderAnswer } from '../types'

const MODEL = 'claude-sonnet-4-6'

export const anthropicAdapter: ProviderAdapter = {
  id: 'anthropic',
  isConfigured: () => Boolean(config.anthropicKey),
  async ask(prompt: string): Promise<ProviderAnswer> {
    const client = new Anthropic({ apiKey: config.anthropicKey })
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 5 } as any],
      messages: [{ role: 'user', content: prompt }],
    })
    let text = ''
    const citations: string[] = []
    for (const block of res.content as any[]) {
      if (block.type === 'text') {
        text += block.text
        for (const c of block.citations ?? []) {
          if (c.url) citations.push(c.url)
        }
      }
      if (block.type === 'web_search_tool_result' && Array.isArray(block.content)) {
        for (const r of block.content) if (r.url) citations.push(r.url)
      }
    }
    return { text, citations, model: MODEL }
  },
}
