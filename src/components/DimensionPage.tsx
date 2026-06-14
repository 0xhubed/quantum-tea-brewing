import { Dimension } from '@/types'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateStructuredData, SITE_URL } from '@/utils/seo'

interface DimensionPageProps {
  dimension: Dimension
  content: {
    definition: string
    scientificBasis: string[]
    measurementMethods: string[]
    effectsOnTea: string[]
    optimizationTechniques: string[]
    commonMistakes: string[]
    relatedDimensions: string[]
  }
}

export function DimensionPage({ dimension, content }: DimensionPageProps) {
  const schema = generateStructuredData('Article', {
    headline: `${dimension.name} Dimension in Quantum Tea Brewing`,
    description: dimension.description,
    author: {
      '@type': 'Organization',
      name: 'Quantum Tea Institute'
    },
    datePublished: '2024-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    image: `${SITE_URL}/images/dimensions/${dimension.id}.jpg`,
    articleBody: content.definition
  });

  return (
    <>
      <JsonLd data={schema} />
      
      <article className="py-12 max-w-4xl mx-auto px-4">
        <header className="mb-12 text-center">
          <div className="text-6xl font-bold text-accent-300 readout mb-4 animate-pulse-slow">
            {dimension.symbol}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The {dimension.name} Dimension
          </h1>
          <p className="text-xl text-ink-200 max-w-2xl mx-auto">
            {dimension.description}
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Definition</h2>
          <p className="text-ink-200 leading-relaxed">
            {content.definition}
          </p>
          <div className="mt-4 bg-white/[0.04] border border-white/10 p-4 rounded-lg">
            <dl className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="font-semibold text-accent-300">Unit</dt>
                <dd>{dimension.unit}</dd>
              </div>
              <div>
                <dt className="font-semibold text-accent-300">Range</dt>
                <dd>{dimension.minValue} - {dimension.maxValue}</dd>
              </div>
              <div>
                <dt className="font-semibold text-accent-300">Default</dt>
                <dd>{dimension.defaultValue}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Scientific Basis</h2>
          <ul className="space-y-3">
            {content.scientificBasis.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent-300 mr-2">•</span>
                <span className="text-ink-200">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Measurement Methods</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {content.measurementMethods.map((method, index) => (
              <div key={index} className="bg-white/[0.04] border border-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Method {index + 1}</h3>
                <p className="text-sm text-ink-200">{method}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Effects on Tea</h2>
          <div className="space-y-4">
            {content.effectsOnTea.map((effect, index) => (
              <div key={index} className="border-l-4 border-primary-400 pl-4">
                <p className="text-ink-200">{effect}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Optimization Techniques</h2>
          <ol className="space-y-4">
            {content.optimizationTechniques.map((technique, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-accent-400 to-primary-400 text-white rounded-full flex items-center justify-center text-sm font-semibold shadow-glow-sm">
                  {index + 1}
                </span>
                <p className="text-ink-200">{technique}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common Mistakes</h2>
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-lg">
            <ul className="space-y-3">
              {content.commonMistakes.map((mistake, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">⚠️</span>
                  <span className="text-ink-200">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Related Dimensions</h2>
          <p className="mb-4 text-ink-200">
            The {dimension.name} dimension interacts closely with:
          </p>
          <div className="flex flex-wrap gap-3">
            {content.relatedDimensions.map((related) => (
              <Link
                key={related}
                href={`/dimensions/${related}`}
                className="px-4 py-2 bg-white/[0.05] border border-white/10 text-accent-200 rounded-lg hover:bg-white/[0.08] hover:border-white/20 transition-colors"
              >
                {related.charAt(0).toUpperCase() + related.slice(1).replace('-', ' ')}
              </Link>
            ))}
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Link 
              href="/dimensions" 
              className="text-accent-300 hover:text-accent-200"
            >
              ← All Dimensions
            </Link>
            <Link 
              href="/calculator" 
              className="text-accent-300 hover:text-accent-200"
            >
              Calculate Coefficients →
            </Link>
          </div>
        </footer>
      </article>
    </>
  )
}