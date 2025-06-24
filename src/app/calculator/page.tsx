'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { dimensions } from '@/data/dimensions'
import { CalculatorInput, CalculatorResult } from '@/types'

// This would normally be in a separate file for metadata
// export const metadata: Metadata = {
//   title: 'Quantum Steep Calculator',
//   description: 'Calculate optimal brewing parameters across all 7 dimensions for perfect quantum tea.',
// }

const teaTypes = [
  'Green Tea',
  'Black Tea', 
  'Oolong Tea',
  'White Tea',
  'Pu-erh Tea',
  'Herbal Tea'
]

const moonPhases = [
  'New Moon',
  'Waxing Crescent',
  'First Quarter',
  'Waxing Gibbous',
  'Full Moon',
  'Waning Gibbous',
  'Last Quarter',
  'Waning Crescent'
]

export default function CalculatorPage() {
  const [input, setInput] = useState<CalculatorInput>({
    teaType: 'Green Tea',
    waterVolume: 200,
    ambientTemperature: 20,
    elevation: 0,
    timeOfDay: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    moonPhase: 'Full Moon',
    quantumSignature: ''
  })

  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateQuantumParameters = async () => {
    setIsCalculating(true)
    
    // Simulate API call
    setTimeout(() => {
      // Mock calculation based on inputs
      const baseTemp = input.teaType === 'Green Tea' ? 80 : 
                      input.teaType === 'Black Tea' ? 95 : 85
      
      const tempAdjustment = (input.elevation / 1000) * -2 + 
                            (input.ambientTemperature - 20) * 0.5

      const steepTime = input.teaType === 'Green Tea' ? 180 :
                       input.teaType === 'Black Tea' ? 240 : 210

      // Generate dimensional coefficients
      const coefficients: Record<string, number> = {}
      dimensions.forEach(dim => {
        const baseValue = dim.defaultValue
        const variance = (Math.random() - 0.5) * 2
        const moonInfluence = moonPhases.indexOf(input.moonPhase) / moonPhases.length
        const timeInfluence = parseInt(input.timeOfDay.split(':')[0]) / 24
        
        let value = baseValue
        
        switch(dim.id) {
          case 'temporal':
            value += variance + timeInfluence * 2
            break
          case 'consciousness':
            value += moonInfluence * 3 + variance
            break
          case 'gravitational':
            value += (input.elevation / 10000) + variance
            break
          default:
            value += variance
        }
        
        coefficients[dim.id] = Math.max(dim.minValue, Math.min(dim.maxValue, value))
      })

      setResult({
        optimalSteepTime: steepTime + (coefficients.temporal - 5) * 10,
        temperatureAdjustment: tempAdjustment,
        dimensionalCoefficients: coefficients,
        flavorProfile: [
          'Quantum Umami',
          'Temporal Sweetness',
          'Gravitational Body',
          'Electromagnetic Brightness'
        ],
        confidence: 0.87 + Math.random() * 0.1
      })
      
      setIsCalculating(false)
    }, 1500)
  }

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-quantum-600 to-tea-600 bg-clip-text text-transparent">
        Quantum Steep Calculator
      </h1>
      
      <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
        Calculate optimal brewing parameters across all 7 dimensions for your perfect quantum tea
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Input Parameters</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Tea Type</label>
            <select 
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={input.teaType}
              onChange={(e) => setInput({...input, teaType: e.target.value})}
            >
              {teaTypes.map(tea => (
                <option key={tea} value={tea}>{tea}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Water Volume (ml)</label>
            <input 
              type="number"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={input.waterVolume}
              onChange={(e) => setInput({...input, waterVolume: parseInt(e.target.value)})}
              min="50"
              max="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Ambient Temperature (°C)</label>
            <input 
              type="number"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={input.ambientTemperature}
              onChange={(e) => setInput({...input, ambientTemperature: parseInt(e.target.value)})}
              min="-20"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Elevation (m)</label>
            <input 
              type="number"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={input.elevation}
              onChange={(e) => setInput({...input, elevation: parseInt(e.target.value)})}
              min="-500"
              max="9000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time of Day</label>
            <input 
              type="time"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={input.timeOfDay}
              onChange={(e) => setInput({...input, timeOfDay: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Moon Phase</label>
            <select 
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={input.moonPhase}
              onChange={(e) => setInput({...input, moonPhase: e.target.value})}
            >
              {moonPhases.map(phase => (
                <option key={phase} value={phase}>{phase}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Quantum Signature (optional)</label>
            <input 
              type="text"
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={input.quantumSignature}
              onChange={(e) => setInput({...input, quantumSignature: e.target.value})}
              placeholder="Enter your personal quantum resonance frequency"
            />
          </div>
        </div>

        <button
          onClick={calculateQuantumParameters}
          disabled={isCalculating}
          className="mt-8 w-full px-6 py-3 bg-quantum-600 text-white font-medium rounded-lg hover:bg-quantum-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCalculating ? (
            <span className="flex items-center justify-center">
              <span className="animate-spin mr-2">⚛️</span>
              Calculating Quantum Parameters...
            </span>
          ) : (
            'Calculate Optimal Parameters'
          )}
        </button>
      </div>

      {result && (
        <div className="bg-gradient-to-br from-quantum-50 to-tea-50 dark:from-gray-800 dark:to-gray-700 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Quantum Brewing Results</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Optimal Steep Time</h3>
              <p className="text-3xl font-bold text-quantum-600">
                {Math.floor(result.optimalSteepTime / 60)}:{(result.optimalSteepTime % 60).toString().padStart(2, '0')}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Temperature Adjustment</h3>
              <p className="text-3xl font-bold text-tea-600">
                {result.temperatureAdjustment > 0 ? '+' : ''}{result.temperatureAdjustment.toFixed(1)}°C
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold mb-4">Dimensional Coefficients</h3>
            <div className="space-y-3">
              {dimensions.map(dim => (
                <div key={dim.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-quantum-600">{dim.symbol}</span>
                    <span className="font-medium">{dim.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold">
                      {result.dimensionalCoefficients[dim.id]?.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">{dim.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Predicted Flavor Profile</h3>
            <div className="flex flex-wrap gap-2">
              {result.flavorProfile.map(flavor => (
                <span key={flavor} className="px-3 py-1 bg-tea-200 dark:bg-tea-800 text-tea-800 dark:text-tea-200 rounded-full text-sm">
                  {flavor}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quantum Confidence: {(result.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      )}
    </div>
  )
}