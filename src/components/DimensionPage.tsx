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
          <div className="text-6xl font-bold text-quantum-500 mb-4 animate-quantum-pulse">
            {dimension.symbol}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The {dimension.name} Dimension
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {dimension.description}
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Definition</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {content.definition}
          </p>
          <div className="mt-4 bg-quantum-50 dark:bg-gray-800 p-4 rounded-lg">
            <dl className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="font-semibold text-quantum-600">Unit</dt>
                <dd>{dimension.unit}</dd>
              </div>
              <div>
                <dt className="font-semibold text-quantum-600">Range</dt>
                <dd>{dimension.minValue} - {dimension.maxValue}</dd>
              </div>
              <div>
                <dt className="font-semibold text-quantum-600">Default</dt>
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
                <span className="text-quantum-600 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Measurement Methods</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {content.measurementMethods.map((method, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">Method {index + 1}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{method}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Effects on Tea</h2>
          <div className="space-y-4">
            {content.effectsOnTea.map((effect, index) => (
              <div key={index} className="border-l-4 border-tea-500 pl-4">
                <p className="text-gray-600 dark:text-gray-300">{effect}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Optimization Techniques</h2>
          <ol className="space-y-4">
            {content.optimizationTechniques.map((technique, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-quantum-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <p className="text-gray-600 dark:text-gray-300">{technique}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Common Mistakes</h2>
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <ul className="space-y-3">
              {content.commonMistakes.map((mistake, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-600 dark:text-red-400 mr-2">⚠️</span>
                  <span className="text-gray-700 dark:text-gray-300">{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Related Dimensions</h2>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            The {dimension.name} dimension interacts closely with:
          </p>
          <div className="flex flex-wrap gap-3">
            {content.relatedDimensions.map((related) => (
              <Link
                key={related}
                href={`/dimensions/${related}`}
                className="px-4 py-2 bg-quantum-100 dark:bg-quantum-900/30 text-quantum-700 dark:text-quantum-300 rounded-lg hover:bg-quantum-200 dark:hover:bg-quantum-900/50 transition-colors"
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
              className="text-quantum-600 hover:text-quantum-700"
            >
              ← All Dimensions
            </Link>
            <Link 
              href="/calculator" 
              className="text-quantum-600 hover:text-quantum-700"
            >
              Calculate Coefficients →
            </Link>
          </div>
        </footer>
      </article>
    </>
  )
}