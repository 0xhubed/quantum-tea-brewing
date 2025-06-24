import { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateStructuredData, SITE_URL } from '@/utils/seo'
import { dimensions } from '@/data/dimensions'

export const metadata: Metadata = {
  title: 'The 7-Dimensional Steep Method - Complete Guide',
  description: 'Learn the revolutionary 7-Dimensional Steep Method for quantum tea brewing. Master temporal, thermal, gravitational, and consciousness dimensions for perfect tea.',
  alternates: {
    canonical: `${SITE_URL}/methodology`
  }
}

const methodologySchema = generateStructuredData('Article', {
  headline: 'The 7-Dimensional Steep Method: A Comprehensive Guide',
  description: 'Complete guide to mastering the 7-Dimensional Steep Method for quantum tea brewing',
  author: {
    '@type': 'Organization',
    name: 'Quantum Tea Institute'
  },
  datePublished: '2024-01-01T00:00:00Z',
  dateModified: new Date().toISOString(),
  image: `${SITE_URL}/images/methodology-hero.jpg`,
  articleBody: 'The 7-Dimensional Steep Method represents a paradigm shift in tea preparation...'
});

export default function MethodologyPage() {
  return (
    <>
      <JsonLd data={methodologySchema} />
      
      <article className="py-12 max-w-4xl mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-quantum-600 to-tea-600 bg-clip-text text-transparent">
            The 7-Dimensional Steep Method
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A comprehensive guide to mastering quantum tea brewing through dimensional analysis
          </p>
          <nav className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg" aria-label="Table of contents">
            <h2 className="font-semibold mb-4">Table of Contents</h2>
            <ol className="space-y-2 text-sm">
              <li><a href="#introduction" className="text-quantum-600 hover:text-quantum-700">1. Introduction to Quantum Tea Theory</a></li>
              <li><a href="#scientific-basis" className="text-quantum-600 hover:text-quantum-700">2. Scientific Basis</a></li>
              <li><a href="#seven-dimensions" className="text-quantum-600 hover:text-quantum-700">3. The Seven Dimensions Explained</a></li>
              <li><a href="#mathematical-formulas" className="text-quantum-600 hover:text-quantum-700">4. Mathematical Formulations</a></li>
              <li><a href="#comparison" className="text-quantum-600 hover:text-quantum-700">5. Traditional vs Quantum Brewing</a></li>
              <li><a href="#implementation" className="text-quantum-600 hover:text-quantum-700">6. Practical Implementation</a></li>
              <li><a href="#advanced-techniques" className="text-quantum-600 hover:text-quantum-700">7. Advanced Techniques</a></li>
            </ol>
          </nav>
        </header>

        <section id="introduction" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">1. Introduction to Quantum Tea Theory</h2>
          <p className="mb-4 leading-relaxed">
            The Quantum Tea Brewing methodology emerged from decades of research at the intersection of quantum mechanics and traditional tea ceremony. By recognizing that tea brewing is fundamentally a quantum process—involving the probabilistic extraction of flavor compounds—we can achieve unprecedented control over the final beverage.
          </p>
          <p className="mb-4 leading-relaxed">
            Traditional brewing methods consider only the most basic variables: time, temperature, and tea quantity. The 7-Dimensional Steep Method expands this understanding to encompass the full quantum state of the brewing system, including observer effects, electromagnetic fields, and inter-dimensional flux variations.
          </p>
          <p className="mb-4 leading-relaxed">
            This guide will take you through each dimension systematically, providing both theoretical understanding and practical application techniques. Whether you&apos;re a tea enthusiast seeking perfection or a quantum physicist exploring beverage applications, this methodology offers tools for transcendent tea experiences.
          </p>
        </section>

        <section id="scientific-basis" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">2. Scientific Basis</h2>
          <div className="bg-quantum-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Core Principles</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-quantum-600 mr-2">•</span>
                <div>
                  <strong>Quantum Superposition:</strong> Tea molecules exist in multiple flavor states simultaneously until observation collapses the wave function.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-quantum-600 mr-2">•</span>
                <div>
                  <strong>Entanglement Effects:</strong> Water molecules become quantum-entangled with tea compounds, creating coherent flavor extraction.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-quantum-600 mr-2">•</span>
                <div>
                  <strong>Observer Influence:</strong> The consciousness of the tea preparer affects the quantum state through measurement and intention.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-quantum-600 mr-2">•</span>
                <div>
                  <strong>Dimensional Coupling:</strong> Each dimension influences others through complex field interactions.
                </div>
              </li>
            </ul>
          </div>
          <p className="mb-4 leading-relaxed">
            Recent advances in quantum field theory have revealed that everyday processes like tea brewing involve subtle quantum effects typically ignored in classical approaches. The 7-Dimensional Steep Method harnesses these effects through precise control of environmental variables.
          </p>
        </section>

        <section id="seven-dimensions" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">3. The Seven Dimensions Explained</h2>
          <div className="space-y-8">
            {dimensions.map((dimension, index) => (
              <div key={dimension.id} className="border-l-4 border-quantum-500 pl-6">
                <h3 className="text-2xl font-semibold mb-2">
                  {index + 1}. {dimension.name} Dimension ({dimension.symbol})
                </h3>
                <p className="mb-2 text-gray-600 dark:text-gray-300">{dimension.description}</p>
                <div className="mt-3 space-y-1 text-sm">
                  <p><strong>Unit:</strong> {dimension.unit}</p>
                  <p><strong>Range:</strong> {dimension.minValue} - {dimension.maxValue}</p>
                  <p><strong>Default:</strong> {dimension.defaultValue}</p>
                </div>
                <Link 
                  href={`/dimensions/${dimension.id}`}
                  className="inline-block mt-3 text-quantum-600 hover:text-quantum-700 text-sm"
                >
                  Explore {dimension.name} dimension in detail →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section id="mathematical-formulas" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">4. Mathematical Formulations</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4 font-sans">Core Equation</h3>
            <pre className="mb-4">
              Q(t) = Σ[i=1→7] αᵢ·Dᵢ(t)·exp(-λᵢt) × Ψ(observer)
            </pre>
            <p className="font-sans text-gray-600 dark:text-gray-300 mb-4">Where:</p>
            <ul className="space-y-1 font-sans">
              <li>Q(t) = Quantum tea quality at time t</li>
              <li>αᵢ = Dimensional coefficient for dimension i</li>
              <li>Dᵢ(t) = Dimensional value function</li>
              <li>λᵢ = Decay constant for dimension i</li>
              <li>Ψ(observer) = Observer consciousness factor</li>
            </ul>
          </div>
          <div className="mt-6 bg-tea-50 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Optimization Algorithm</h3>
            <p className="mb-4">
              To find optimal brewing parameters, we minimize the quantum uncertainty:
            </p>
            <pre className="font-mono text-sm">
              ΔQ·Δt ≥ ℏ/2
            </pre>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              This uncertainty principle ensures that perfect precision in all dimensions simultaneously is impossible, requiring careful balance.
            </p>
          </div>
        </section>

        <section id="comparison" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">5. Traditional vs Quantum Brewing</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-3 px-4">Aspect</th>
                  <th className="text-left py-3 px-4">Traditional Method</th>
                  <th className="text-left py-3 px-4">Quantum Method</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Variables Considered</td>
                  <td className="py-3 px-4">3 (time, temperature, quantity)</td>
                  <td className="py-3 px-4">7+ dimensional factors</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Precision</td>
                  <td className="py-3 px-4">Approximate</td>
                  <td className="py-3 px-4">Quantum-level accuracy</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Reproducibility</td>
                  <td className="py-3 px-4">Variable</td>
                  <td className="py-3 px-4">Highly consistent</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Flavor Complexity</td>
                  <td className="py-3 px-4">Limited by method</td>
                  <td className="py-3 px-4">Full spectrum extraction</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 font-semibold">Equipment Needed</td>
                  <td className="py-3 px-4">Basic kettle and timer</td>
                  <td className="py-3 px-4">Quantum field modulators</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="implementation" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">6. Practical Implementation</h2>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 1: Environmental Assessment</h3>
              <p className="mb-3">Begin by measuring your local dimensional values:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Use the Quantum Calculator to determine baseline coefficients</li>
                <li>Account for time of day, lunar phase, and geomagnetic activity</li>
                <li>Calibrate consciousness level through meditation</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 2: Tea Selection and Preparation</h3>
              <p className="mb-3">Choose tea varieties that resonate with current dimensional states:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>High-elevation teas for gravitational dimension work</li>
                <li>Aged teas for temporal dimension exploration</li>
                <li>First flush teas for consciousness dimension alignment</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Step 3: Dimensional Optimization</h3>
              <p className="mb-3">Fine-tune each dimension according to calculated parameters:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                <li>Adjust electromagnetic fields using specialized equipment</li>
                <li>Modulate temporal flow through precision timing</li>
                <li>Enhance quantum entanglement via water structuring</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="advanced-techniques" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">7. Advanced Techniques</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-quantum-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Dimensional Coupling</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Advanced practitioners can create resonance between dimensions, amplifying extraction efficiency through harmonic convergence.
              </p>
            </div>
            <div className="bg-tea-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Quantum Tunneling</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Enable flavor compounds to tunnel through energy barriers, accessing normally hidden taste profiles.
              </p>
            </div>
            <div className="bg-quantum-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Consciousness Amplification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Group brewing sessions can combine observer effects, creating exponentially enhanced tea experiences.
              </p>
            </div>
            <div className="bg-tea-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Temporal Looping</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Create closed timelike curves in your brewing vessel for infinite flavor development.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Link 
              href="/calculator" 
              className="inline-flex items-center text-quantum-600 hover:text-quantum-700"
            >
              ← Try the Calculator
            </Link>
            <Link 
              href="/dimensions/temporal" 
              className="inline-flex items-center text-quantum-600 hover:text-quantum-700"
            >
              Explore Dimensions →
            </Link>
          </div>
        </footer>
      </article>
    </>
  )
}