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
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-quantum-600 to-tea-600 bg-clip-text text-transparent">
        The 7 Dimensions of Quantum Tea
      </h1>
      
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
        Each dimension plays a crucial role in the quantum tea brewing process. Master all seven to achieve transcendent tea experiences.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dimensions.map((dimension) => (
          <Link
            key={dimension.id}
            href={`/dimensions/${dimension.id}`}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-quantum-500/10 to-tea-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative p-8">
              <div className="text-5xl font-bold text-quantum-500 mb-4 group-hover:scale-110 transition-transform">
                {dimension.symbol}
              </div>
              <h2 className="text-2xl font-semibold mb-3">{dimension.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {dimension.description}
              </p>
              <div className="space-y-1 text-sm text-gray-500">
                <p><span className="font-medium">Unit:</span> {dimension.unit}</p>
                <p><span className="font-medium">Range:</span> {dimension.minValue} - {dimension.maxValue}</p>
              </div>
              <div className="mt-6 text-quantum-600 group-hover:text-quantum-700 font-medium">
                Explore dimension →
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link
          href="/calculator"
          className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-quantum-600 hover:bg-quantum-700 transition-colors"
        >
          Calculate Your Dimensional Coefficients
        </Link>
      </div>
    </div>
  )
}