import { Metadata } from 'next'
import Link from 'next/link'
import { dimensions } from '@/data/dimensions'

export const metadata: Metadata = {
  title: 'The 7 Dimensions of Quantum Tea',
  description: 'Explore all seven dimensions of the Quantum Tea Brewing method: temporal, thermal, gravitational, electromagnetic, quantum entanglement, consciousness, and dimensional flux.',
}

export default function DimensionsPage() {
  return (
    <div className="py-12 max-w-6xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center gradient-text">
        The 7 Dimensions of Quantum Tea
      </h1>
      
      <p className="text-xl text-center text-ink-200 mb-12 max-w-3xl mx-auto">
        Each dimension plays a crucial role in the quantum tea brewing process. Master all seven to achieve transcendent tea experiences.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dimensions.map((dimension) => (
          <Link
            key={dimension.id}
            href={`/dimensions/${dimension.id}`}
            className="group relative bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-xl hover:border-white/20 hover:shadow-glow transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 to-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-8">
              <div className="text-5xl font-bold text-accent-300 readout mb-4 group-hover:scale-110 transition-transform">
                {dimension.symbol}
              </div>
              <h2 className="text-2xl font-semibold mb-3">{dimension.name}</h2>
              <p className="text-ink-200 mb-4">
                {dimension.description}
              </p>
              <div className="space-y-1 text-sm text-ink-300">
                <p><span className="font-medium">Unit:</span> {dimension.unit}</p>
                <p><span className="font-medium">Range:</span> {dimension.minValue} - {dimension.maxValue}</p>
              </div>
              <div className="mt-6 text-accent-300 group-hover:text-accent-200 font-medium">
                Explore dimension →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/calculator"
          className="btn-primary px-8 py-4 text-base"
        >
          Calculate Your Dimensional Coefficients
        </Link>
      </div>
    </div>
  )
}