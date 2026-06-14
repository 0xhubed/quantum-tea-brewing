export interface SiteConfig {
  siteName: string
  orgName: string
  url: string
  logo?: string
  sameAs?: string[]
}

const base = (type: string, data: Record<string, unknown>) => ({
  '@context': 'https://schema.org', '@type': type, ...data,
})

export function makeSchema(cfg: SiteConfig) {
  return {
    website: () => base('WebSite', {
      name: cfg.siteName, url: cfg.url,
      potentialAction: {
        '@type': 'SearchAction',
        '@target': `${cfg.url}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }),
    organization: () => base('Organization', {
      name: cfg.orgName, url: cfg.url,
      logo: cfg.logo ?? `${cfg.url}/logo.png`,
      sameAs: cfg.sameAs ?? [],
    }),
    article: (data: Record<string, unknown>) => base('Article', data),
    faq: (faqs: Array<{ question: string; answer: string }>) => base('FAQPage', {
      mainEntity: faqs.map((f) => ({
        '@type': 'Question', name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    }),
  }
}
