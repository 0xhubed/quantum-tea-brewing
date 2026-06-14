import OpenAI from 'openai'
import { config } from '../config'
import type { ProviderAdapter, ProviderAnswer } from '../types'

const MODEL = 'gpt-4o'

export const openaiAdapter: ProviderAdapter = {
  id: 'openai',
  isConfigured: () => Boolean(config.openaiKey),
  async ask(prompt: string): Promise<ProviderAnswer> {
    const client = new OpenAI({ apiKey: config.openaiKey })
    const res = await client.responses.create({
      model: MODEL,
      tools: [{ type: 'web_search_preview' } as any],
      input: prompt,
    })
    const text = res.output_text ?? ''
    const citations: string[] = []
    for (const item of res.output ?? []) {
      if (item.type !== 'message') continue
      for (const content of item.content ?? []) {
        if (content.type !== 'output_text') continue
        for (const ann of content.annotations ?? []) {
          if (ann.type === 'url_citation' && ann.url) citations.push(ann.url)
        }
      }
    }
    return { text, citations, model: MODEL }
  },
}
