import { appendFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { config, hasAnyProvider } from './config'
import { activeAdapters } from './adapters'
import { prompts } from './prompts'
import { canaries } from './canaries'
import { detectDomain, detectCanaries } from './detect'
import type { ProbeResult } from './types'

const __dirname = dirname(fileURLToPath(import.meta.url))
const resultsDir = join(__dirname, '..', 'results')
const jsonlPath = join(resultsDir, 'runs.jsonl')

async function main() {
  if (!hasAnyProvider()) {
    console.log('No provider keys set (OPENAI_API_KEY / ANTHROPIC_API_KEY). Nothing to probe. Exiting cleanly.')
    return
  }
  const adapters = activeAdapters()
  console.log(`Active providers: ${adapters.map((a) => a.id).join(', ')}`)
  mkdirSync(resultsDir, { recursive: true })

  for (const adapter of adapters) {
    for (const prompt of prompts) {
      try {
        const answer = await adapter.ask(prompt.text)
        const result: ProbeResult = {
          timestamp: new Date().toISOString(),
          provider: adapter.id,
          model: answer.model,
          promptId: prompt.id,
          domainCited: detectDomain(answer.text, answer.citations, config.targetDomain),
          canaryHits: detectCanaries(answer.text, canaries),
          citations: answer.citations,
          text: answer.text,
        }
        appendFileSync(jsonlPath, JSON.stringify(result) + '\n')
        console.log(`${adapter.id}/${prompt.id}: cited=${result.domainCited} canaries=[${result.canaryHits.join(',')}]`)
      } catch (err) {
        console.error(`${adapter.id}/${prompt.id} failed:`, (err as Error).message)
      }
    }
  }
  console.log(`Done. Appended to ${jsonlPath}`)
}

main()
