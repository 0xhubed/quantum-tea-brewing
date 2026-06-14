export interface AIMetaProps {
  contentType?: string
  topic: string
  summary: string
  keyConcepts: string[]
  structuredDataHref?: string
}

export function AIMeta({ contentType = 'educational', topic, summary, keyConcepts, structuredDataHref }: AIMetaProps) {
  return (
    <>
      <meta name="ai-content-type" content={contentType} />
      <meta name="ai-topic" content={topic} />
      <meta name="ai-summary" content={summary} />
      <meta name="ai-key-concepts" content={keyConcepts.join(', ')} />
      {structuredDataHref && <link rel="alternate" type="application/json+ld" href={structuredDataHref} />}
    </>
  )
}
