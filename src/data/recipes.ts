import { TeaRecipe } from '@/types'

export const recipes: TeaRecipe[] = [
  {
    id: '1',
    name: 'Quantum Earl Grey Transcendence',
    slug: 'quantum-earl-grey-transcendence',
    difficulty: 'intermediate',
    description: 'A sophisticated blend that harnesses electromagnetic fields to amplify bergamot essence while maintaining temporal stability.',
    dimensions: [
      { dimensionId: 'temporal', coefficient: 6.2, notes: 'Extended temporal window for bergamot oil extraction' },
      { dimensionId: 'thermal', coefficient: 353, notes: 'Lower than traditional to preserve volatile compounds' },
      { dimensionId: 'electromagnetic', coefficient: 0.4, notes: 'Moderate field strength for citrus enhancement' }
    ],
    ingredients: [
      { name: 'Earl Grey tea', amount: '2g' },
      { name: 'Water', amount: '200ml' },
      { name: 'Quantum phase modulator', amount: '1 unit', optional: true }
    ],
    instructions: [
      'Pre-charge water with 0.4 Tesla electromagnetic field for 30 seconds',
      'Heat water to precisely 80°C (adjust for elevation)',
      'Introduce tea leaves during peak temporal coefficient (6.2 chronons)',
      'Steep for 3-4 minutes while maintaining field coherence',
      'Remove leaves when quantum entanglement reaches 42 qubits'
    ],
    prepTime: 5,
    steepTime: { min: 180, max: 240 },
    tastingNotes: [
      'Bright citrus notes with quantum-enhanced depth',
      'Smooth tannins through temporal optimization',
      'Lingering bergamot essence in higher dimensions'
    ]
  },
  {
    id: '2',
    name: 'Gravitational Gyokuro',
    slug: 'gravitational-gyokuro',
    difficulty: 'expert',
    description: 'Exploit micro-gravitational variations to achieve unprecedented umami extraction from premium Japanese green tea.',
    dimensions: [
      { dimensionId: 'gravitational', coefficient: 9.82, notes: 'Calibrate to local gravity + 0.01 m/s²' },
      { dimensionId: 'temporal', coefficient: 4.5, notes: 'Slow temporal flow for gentle extraction' },
      { dimensionId: 'consciousness', coefficient: 9, notes: 'High awareness required for optimal results' }
    ],
    ingredients: [
      { name: 'Gyokuro tea', amount: '3g' },
      { name: 'Water', amount: '150ml' },
      { name: 'Gravitational field stabilizer', amount: '1 unit' }
    ],
    instructions: [
      'Create localized gravitational well using field stabilizer',
      'Cool water to 60°C in reduced gravity environment',
      'Introduce leaves at gravity coefficient 9.82 m/s²',
      'Maintain consciousness level above 8.5 units throughout',
      'Extract for 2 minutes with minimal agitation'
    ],
    prepTime: 10,
    steepTime: { min: 120, max: 150 },
    tastingNotes: [
      'Intense umami with zero-gravity sweetness',
      'Chlorophyll notes enhanced by gravitational lensing',
      'Transcendent vegetal complexity'
    ]
  },
  {
    id: '3',
    name: 'Consciousness-Infused Chamomile',
    slug: 'consciousness-infused-chamomile',
    difficulty: 'beginner',
    description: 'A gentle introduction to consciousness-based brewing, perfect for evening meditation and quantum relaxation.',
    dimensions: [
      { dimensionId: 'consciousness', coefficient: 7.5, notes: 'Elevated but accessible awareness level' },
      { dimensionId: 'dimensional-flux', coefficient: -2, notes: 'Negative flux for calming effect' },
      { dimensionId: 'thermal', coefficient: 368, notes: 'Higher temperature for full extraction' }
    ],
    ingredients: [
      { name: 'Chamomile flowers', amount: '1.5g' },
      { name: 'Water', amount: '250ml' },
      { name: 'Meditation bell', amount: '1', optional: true }
    ],
    instructions: [
      'Begin with 5 minutes of mindful breathing',
      'Heat water to 95°C while maintaining awareness',
      'Pour water over chamomile with conscious intention',
      'Steep for 5-7 minutes in dimensional flux field of -2',
      'Sip slowly while observing quantum state collapse'
    ],
    prepTime: 8,
    steepTime: { min: 300, max: 420 },
    tastingNotes: [
      'Honeyed sweetness amplified by consciousness',
      'Soothing floral notes in negative flux space',
      'Quantum calm in every sip'
    ]
  },
  {
    id: '4',
    name: 'Entangled Oolong Odyssey',
    slug: 'entangled-oolong-odyssey',
    difficulty: 'advanced',
    description: 'Create quantum entanglement between tea leaves and water molecules for a truly connected brewing experience.',
    dimensions: [
      { dimensionId: 'quantum-entanglement', coefficient: 75, notes: 'High entanglement for maximum correlation' },
      { dimensionId: 'temporal', coefficient: 5.5, notes: 'Balanced time flow' },
      { dimensionId: 'electromagnetic', coefficient: 0.6, notes: 'Support entanglement with EM coherence' }
    ],
    ingredients: [
      { name: 'Taiwanese high-mountain oolong', amount: '4g' },
      { name: 'Water', amount: '200ml' },
      { name: 'Quantum entanglement chamber', amount: '1 unit' }
    ],
    instructions: [
      'Place tea and water in separate entanglement chambers',
      'Initiate quantum correlation at 75 qubits',
      'Heat water to 90°C while maintaining entanglement',
      'Combine entangled pairs for 30-second initial infusion',
      'Perform multiple short infusions, increasing by 10 seconds each'
    ],
    prepTime: 15,
    steepTime: { min: 30, max: 180 },
    tastingNotes: [
      'Synchronized floral and mineral notes',
      'Perfect balance through quantum correlation',
      'Each infusion reveals entangled flavor dimensions'
    ]
  },
  {
    id: '5',
    name: 'Temporal Pu-erh Portal',
    slug: 'temporal-puerh-portal',
    difficulty: 'intermediate',
    description: 'Manipulate time itself to experience the past, present, and future of aged tea in a single session.',
    dimensions: [
      { dimensionId: 'temporal', coefficient: 8.5, notes: 'High temporal manipulation required' },
      { dimensionId: 'dimensional-flux', coefficient: 3, notes: 'Positive flux for time travel' },
      { dimensionId: 'gravitational', coefficient: 9.85, notes: 'Slight gravity increase for temporal anchor' }
    ],
    ingredients: [
      { name: 'Aged pu-erh tea (10+ years)', amount: '5g' },
      { name: 'Water', amount: '150ml' },
      { name: 'Temporal field generator', amount: '1 unit' }
    ],
    instructions: [
      'Activate temporal field at coefficient 8.5',
      'Rinse tea briefly to awaken time-locked compounds',
      'First infusion: experience the tea\'s youth (20 seconds)',
      'Second infusion: taste the present moment (30 seconds)',
      'Third infusion: glimpse the tea\'s future potential (45 seconds)'
    ],
    prepTime: 10,
    steepTime: { min: 20, max: 60 },
    tastingNotes: [
      'Earth and leather notes from temporal depths',
      'Sweet wood essence across time streams',
      'Infinite complexity in each temporal layer'
    ]
  },
  {
    id: '6',
    name: 'Electromagnetic Matcha Matrix',
    slug: 'electromagnetic-matcha-matrix',
    difficulty: 'intermediate',
    description: 'Use electromagnetic field manipulation to create perfect matcha foam structure at the molecular level.',
    dimensions: [
      { dimensionId: 'electromagnetic', coefficient: 0.8, notes: 'Strong field for molecular alignment' },
      { dimensionId: 'consciousness', coefficient: 8, notes: 'Focus required for whisking technique' },
      { dimensionId: 'thermal', coefficient: 343, notes: 'Precise 70°C for optimal dissolution' }
    ],
    ingredients: [
      { name: 'Ceremonial grade matcha', amount: '2g' },
      { name: 'Water', amount: '70ml' },
      { name: 'Bamboo whisk (electrically grounded)', amount: '1' }
    ],
    instructions: [
      'Sift matcha through electromagnetic field (0.8 Tesla)',
      'Heat water to exactly 70°C using thermal dimension control',
      'Add small amount of water to create paste',
      'Whisk in W pattern while field aligns molecules',
      'Add remaining water, whisk until quantum foam appears'
    ],
    prepTime: 5,
    steepTime: { min: 0, max: 0 },
    tastingNotes: [
      'Electromagnetically enhanced umami',
      'Perfectly structured foam with quantum stability',
      'Bright green essence in every molecule'
    ]
  },
  {
    id: '7',
    name: 'Flux-Shifted White Tea',
    slug: 'flux-shifted-white-tea',
    difficulty: 'beginner',
    description: 'Gentle dimensional flux variations reveal hidden delicacy in silver needle white tea.',
    dimensions: [
      { dimensionId: 'dimensional-flux', coefficient: 1.5, notes: 'Gentle positive flux' },
      { dimensionId: 'thermal', coefficient: 358, notes: '85°C for delicate extraction' },
      { dimensionId: 'temporal', coefficient: 4, notes: 'Slightly slowed time' }
    ],
    ingredients: [
      { name: 'Silver needle white tea', amount: '2.5g' },
      { name: 'Water', amount: '200ml' }
    ],
    instructions: [
      'Set dimensional flux to gentle +1.5 coefficient',
      'Heat water to 85°C in flux field',
      'Pour water in spiral pattern to distribute flux',
      'Steep for 3-4 minutes with minimal disturbance',
      'Experience the tea between dimensions'
    ],
    prepTime: 3,
    steepTime: { min: 180, max: 240 },
    tastingNotes: [
      'Subtle sweetness amplified by flux shift',
      'Delicate floral notes from alternate dimensions',
      'Clean, pure finish across all realities'
    ]
  }
]