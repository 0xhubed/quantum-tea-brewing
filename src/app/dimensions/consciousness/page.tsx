import { Metadata } from 'next'
import { DimensionPage } from '@/components/DimensionPage'
import { dimensions } from '@/data/dimensions'
import { SITE_URL } from '@/utils/seo'

const consciousnessDimension = dimensions.find(d => d.id === 'consciousness')!

export const metadata: Metadata = {
  title: 'Consciousness Dimension - Quantum Tea Brewing',
  description: 'Discover the consciousness dimension of quantum tea brewing. Learn how observer effects and intentional brewing create profound flavor experiences.',
  alternates: {
    canonical: `${SITE_URL}/dimensions/consciousness`
  }
}

const consciousnessContent = {
  definition: "The Consciousness dimension explores the profound connection between the observer's mental state and the quantum brewing process. This dimension recognizes that consciousness itself acts as a quantum field that influences wave function collapse, flavor development, and the overall tea experience. It encompasses intention setting, mindful observation, and the bi-directional flow of information between brewer and brew.",
  
  scientificBasis: [
    "Observer effect demonstrates that conscious attention directly influences quantum state collapse in tea molecules",
    "Quantum Zeno effect allows conscious observation to freeze or accelerate extraction processes",
    "Orchestrated objective reduction (Orch-OR) theory suggests consciousness emerges from quantum processes similar to those in brewing",
    "Morphic resonance fields created by experienced brewers influence novice brewing outcomes"
  ],
  
  measurementMethods: [
    "EEG coherence mapping during brewing to correlate brain states with tea quality",
    "Random number generator deviation testing to detect consciousness field effects",
    "Biophoton emission analysis from both brewer and tea to measure energetic exchange",
    "Double-blind taste testing with quantum random assignment to verify consciousness effects"
  ],
  
  effectsOnTea: [
    "Focused intention can alter the molecular structure of water, affecting extraction patterns",
    "Meditative states during brewing enhance flavor complexity and harmonic balance",
    "Emotional resonance between brewer and tea creates unique, unrepeatable flavor profiles",
    "Collective consciousness effects amplify when multiple observers participate in brewing"
  ],
  
  optimizationTechniques: [
    "Practice brewing meditation to achieve optimal brainwave states (alpha/theta dominance)",
    "Set clear intentions before brewing, visualizing desired flavor outcomes",
    "Maintain present-moment awareness throughout the entire brewing process",
    "Create ritual spaces that enhance consciousness-tea field interactions",
    "Use mantras or sound frequencies to establish resonance with the tea's vibrational signature"
  ],
  
  commonMistakes: [
    "Brewing while distracted or in negative emotional states, imprinting discord into the tea",
    "Excessive attachment to outcomes, creating tension that disrupts natural flow",
    "Ignoring the tea's own consciousness and forcing predetermined expectations",
    "Measuring or analyzing during critical consciousness-dependent phases",
    "Dismissing subtle intuitive guidance in favor of rigid protocols"
  ],
  
  relatedDimensions: ["quantum-entanglement", "temporal", "dimensional-flux"]
}

export default function ConsciousnessDimensionPage() {
  return <DimensionPage dimension={consciousnessDimension} content={consciousnessContent} />
}