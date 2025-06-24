export interface Dimension {
  id: string;
  name: string;
  symbol: string;
  description: string;
  unit: string;
  minValue: number;
  maxValue: number;
  defaultValue: number;
}

export interface TeaRecipe {
  id: string;
  name: string;
  slug: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  dimensions: DimensionAdjustment[];
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number;
  steepTime: {
    min: number;
    max: number;
  };
  tastingNotes: string[];
  description: string;
  image?: string;
}

export interface DimensionAdjustment {
  dimensionId: string;
  coefficient: number;
  notes: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  optional?: boolean;
}

export interface CalculatorInput {
  teaType: string;
  waterVolume: number;
  ambientTemperature: number;
  elevation: number;
  timeOfDay: string;
  moonPhase: string;
  quantumSignature: string;
}

export interface CalculatorResult {
  optimalSteepTime: number;
  temperatureAdjustment: number;
  dimensionalCoefficients: Record<string, number>;
  flavorProfile: string[];
  confidence: number;
}