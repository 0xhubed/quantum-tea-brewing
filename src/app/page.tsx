import { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateStructuredData, SITE_URL } from '@/utils/seo'
import { dimensions } from '@/data/dimensions'

export const metadata: Metadata = {
  title: 'Quantum Tea Brewing: Master the 7-Dimensional Steep Method',
  description: 'Discover the revolutionary 7-Dimensional Steep Method for brewing perfect quantum tea. Explore temporal, thermal, gravitational, and consciousness dimensions for the ultimate tea experience.',
  alternates: {
    canonical: SITE_URL
  }
}

const homePageSchema = generateStructuredData('Article', {
  headline: 'Quantum Tea Brewing: Master the 7-Dimensional Steep Method',
  description: 'Revolutionary approach to tea brewing using quantum mechanics and dimensional analysis',
  author: {
    '@type': 'Organization',
    name: 'Quantum Tea Institute'
  },
  datePublished: new Date().toISOString(),
  dateModified: new Date().toISOString(),
  image: `${SITE_URL}/images/quantum-tea-hero.jpg`
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={homePageSchema} />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 mb-6">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              Revolutionary Brewing Method
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Master the Art of
              <span className="block gradient-text">Quantum Tea Brewing</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Elevate your tea experience with the 7-Dimensional Steep Method. 
              Harness quantum mechanics for the perfect brew every time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calculator" className="btn-primary text-lg px-8 py-3">
                Try the Calculator
              </Link>
              <Link href="/methodology" className="btn-secondary text-lg px-8 py-3">
                Learn the Method
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Quantum Tea?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Traditional brewing only scratches the surface. Unlock the full potential of your tea.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="card text-center group">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Precision Control</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Manipulate 7 dimensional parameters for exact flavor profiles every time.
              </p>
            </div>
            
            <div className="card text-center group">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Scientific Method</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Based on quantum mechanics principles for reproducible results.
              </p>
            </div>
            
            <div className="card text-center group">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Experience transcendent flavors through dimensional optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dimensions Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The 7 Dimensions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Master each dimension to unlock the full potential of quantum tea brewing.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {dimensions.map((dimension) => (
              <Link
                key={dimension.id}
                href={`/dimensions/${dimension.id}`}
                className="card group hover:border-primary-500 dark:hover:border-primary-400 transition-all"
              >
                <div className="text-4xl font-bold gradient-text mb-2">{dimension.symbol}</div>
                <h3 className="font-semibold mb-1">{dimension.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {dimension.description}
                </p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/dimensions" className="btn-secondary">
              Explore All Dimensions
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Tea Experience?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start your quantum tea journey today with our interactive calculator.
          </p>
          <Link href="/calculator" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center">
            Launch Calculator
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">The Science Behind the Method</h2>
            <div className="prose prose-lg dark:prose-invert mx-auto">
              <p className="text-gray-600 dark:text-gray-400">
                The Quantum Tea Brewing methodology represents a paradigm shift in beverage preparation. 
                By considering seven distinct dimensional factors—temporal, thermal, gravitational, 
                electromagnetic, quantum entanglement, consciousness, and dimensional flux—we achieve 
                unprecedented control over the tea brewing process.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                This scientific approach, while entirely fictional, demonstrates the potential for 
                applying advanced physics concepts to everyday experiences. Each dimension interacts 
                with the others to create a complex system that, when properly calibrated, produces 
                the perfect cup of tea.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}