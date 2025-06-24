import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { recipes } from '@/data/recipes'
import { dimensions } from '@/data/dimensions'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateHowToSchema, SITE_URL } from '@/utils/seo'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = recipes.find(r => r.slug === params.slug)
  
  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    }
  }

  return {
    title: `${recipe.name} - Quantum Tea Recipe`,
    description: recipe.description,
    alternates: {
      canonical: `${SITE_URL}/recipes/${recipe.slug}`
    }
  }
}

export default function RecipePage({ params }: Props) {
  const recipe = recipes.find(r => r.slug === params.slug)

  if (!recipe) {
    notFound()
  }

  const recipeSchema = generateHowToSchema(recipe)

  return (
    <>
      <JsonLd data={recipeSchema} />
      
      <article className="py-12 max-w-4xl mx-auto px-4">
        <header className="mb-12">
          <div className="mb-6">
            <Link 
              href="/recipes"
              className="text-quantum-600 hover:text-quantum-700 text-sm"
            >
              ← Back to Recipes
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-quantum-600 to-tea-600 bg-clip-text text-transparent">
            {recipe.name}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {recipe.description}
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Difficulty:</span>
              <span className="capitalize px-3 py-1 bg-quantum-100 dark:bg-quantum-900/30 text-quantum-700 dark:text-quantum-300 rounded">
                {recipe.difficulty}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Prep Time:</span>
              <span>{recipe.prepTime} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Steep Time:</span>
              <span>{recipe.steepTime.min}-{recipe.steepTime.max} seconds</span>
            </div>
          </div>
        </header>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Dimensional Adjustments</h2>
          <div className="space-y-4">
            {recipe.dimensions.map(dim => {
              const dimension = dimensions.find(d => d.id === dim.dimensionId)
              if (!dimension) return null
              
              return (
                <div key={dim.dimensionId} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span className="text-2xl text-quantum-600">{dimension.symbol}</span>
                        {dimension.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        {dim.notes}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-quantum-600">
                        {dim.coefficient}
                      </div>
                      <div className="text-sm text-gray-500">{dimension.unit}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-center">
                <span className="text-quantum-600 mr-3">•</span>
                <span className="font-medium mr-2">{ingredient.amount}</span>
                <span>{ingredient.name}</span>
                {ingredient.optional && (
                  <span className="ml-2 text-sm text-gray-500">(optional)</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-quantum-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </span>
                <p className="text-gray-600 dark:text-gray-300 pt-1">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tasting Notes</h2>
          <div className="bg-tea-50 dark:bg-gray-800 p-6 rounded-lg">
            <ul className="space-y-2">
              {recipe.tastingNotes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-tea-600 mr-2">🍃</span>
                  <span className="text-gray-700 dark:text-gray-300">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12 bg-quantum-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Pro Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>• Always calibrate your dimensional coefficients before brewing</li>
            <li>• Use filtered water for optimal quantum coherence</li>
            <li>• Maintain consciousness awareness throughout the process</li>
            <li>• Record your results to fine-tune future attempts</li>
          </ul>
        </section>

        <footer className="mt-16 pt-8 border-t">
          <div className="flex justify-between items-center">
            <Link 
              href="/calculator" 
              className="text-quantum-600 hover:text-quantum-700"
            >
              ← Calculate Your Parameters
            </Link>
            <Link 
              href="/recipes" 
              className="text-quantum-600 hover:text-quantum-700"
            >
              More Recipes →
            </Link>
          </div>
        </footer>
      </article>
    </>
  )
}