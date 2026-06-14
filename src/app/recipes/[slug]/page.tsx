import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { recipes } from '@/data/recipes'
import { dimensions } from '@/data/dimensions'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateHowToSchema, SITE_URL } from '@/utils/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = recipes.find(r => r.slug === slug)
  
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

export default async function RecipePage({ params }: Props) {
  const { slug } = await params
  const recipe = recipes.find(r => r.slug === slug)

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
              className="text-accent-300 hover:text-accent-200 text-sm"
            >
              ← Back to Recipes
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {recipe.name}
          </h1>

          <p className="text-xl text-ink-200 mb-6">
            {recipe.description}
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Difficulty:</span>
              <span className="capitalize px-3 py-1 bg-white/[0.05] border border-white/10 text-accent-200 rounded">
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
                <div key={dim.dimensionId} className="bg-white/[0.04] border border-white/10 backdrop-blur-md p-6 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <span className="text-2xl text-accent-300 readout">{dimension.symbol}</span>
                        {dimension.name}
                      </h3>
                      <p className="text-ink-200 text-sm mt-1">
                        {dim.notes}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-accent-300 readout">
                        {dim.coefficient}
                      </div>
                      <div className="text-sm text-ink-300">{dimension.unit}</div>
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
                <span className="text-accent-300 mr-3">•</span>
                <span className="font-medium mr-2">{ingredient.amount}</span>
                <span>{ingredient.name}</span>
                {ingredient.optional && (
                  <span className="ml-2 text-sm text-ink-300">(optional)</span>
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
                <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-accent-400 to-primary-400 text-white rounded-full flex items-center justify-center font-semibold shadow-glow-sm">
                  {index + 1}
                </span>
                <p className="text-ink-200 pt-1">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tasting Notes</h2>
          <div className="bg-white/[0.04] border border-white/10 p-6 rounded-lg">
            <ul className="space-y-2">
              {recipe.tastingNotes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary-300 mr-2">🍃</span>
                  <span className="text-ink-200">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12 bg-white/[0.04] border border-white/10 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Pro Tips</h3>
          <ul className="space-y-2 text-sm text-ink-200">
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
              className="text-accent-300 hover:text-accent-200"
            >
              ← Calculate Your Parameters
            </Link>
            <Link 
              href="/recipes" 
              className="text-accent-300 hover:text-accent-200"
            >
              More Recipes →
            </Link>
          </div>
        </footer>
      </article>
    </>
  )
}