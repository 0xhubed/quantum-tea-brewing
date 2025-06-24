import { Dimension } from '@/types';

export const dimensions: Dimension[] = [
  {
    id: 'temporal',
    name: 'Temporal',
    symbol: 'Δt',
    description: 'The time dimension accounts for quantum fluctuations in the temporal field during steeping',
    unit: 'chronons',
    minValue: 0,
    maxValue: 10,
    defaultValue: 5
  },
  {
    id: 'thermal',
    name: 'Thermal',
    symbol: 'θ',
    description: 'Temperature variations at the quantum level affecting molecular tea extraction',
    unit: 'kelvin',
    minValue: 273,
    maxValue: 373,
    defaultValue: 358
  },
  {
    id: 'gravitational',
    name: 'Gravitational',
    symbol: 'g',
    description: 'Local gravitational field variations impacting water density and extraction rates',
    unit: 'm/s²',
    minValue: 9.75,
    maxValue: 9.85,
    defaultValue: 9.81
  },
  {
    id: 'electromagnetic',
    name: 'Electromagnetic',
    symbol: 'EM',
    description: 'Electromagnetic field strength affecting water molecule alignment',
    unit: 'tesla',
    minValue: 0,
    maxValue: 1,
    defaultValue: 0.3
  },
  {
    id: 'quantum-entanglement',
    name: 'Quantum Entanglement',
    symbol: 'ψ',
    description: 'Degree of quantum entanglement between tea molecules and water',
    unit: 'qubits',
    minValue: 0,
    maxValue: 100,
    defaultValue: 42
  },
  {
    id: 'consciousness',
    name: 'Consciousness',
    symbol: 'Ω',
    description: 'Observer effect on the tea brewing process at quantum scale',
    unit: 'awareness units',
    minValue: 0,
    maxValue: 10,
    defaultValue: 7
  },
  {
    id: 'dimensional-flux',
    name: 'Dimensional Flux',
    symbol: 'Φ',
    description: 'Inter-dimensional energy fluctuations during the brewing process',
    unit: 'flux units',
    minValue: -5,
    maxValue: 5,
    defaultValue: 0
  }
];