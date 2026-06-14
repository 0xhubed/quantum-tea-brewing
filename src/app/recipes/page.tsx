import { Metadata } from 'next'
import Link from 'next/link'
import { recipes } from '@/data/recipes'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateStructuredData, SITE_URL } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Quantum Tea Recipes - Master Collection',
  description: 'Explore our collection of quantum tea recipes, each optimized across 7 dimensions for transcendent brewing experiences.',
  alternates: {
    canonical: `${SITE_URL}/recipes`
  }
}

const recipesSchema = generateStructuredData('CollectionPage', {
  name: 'Quantum Tea Recipe Collection',
  description: 'A curated collection of quantum tea recipes with dimensional optimization',
  url: `${SITE_URL}/recipes`,
  hasPart: recipes.map(recipe => ({
    '@type': 'Recipe',
    name: recipe.name,
    url: `${SITE_URL}/recipes/${recipe.slug}`
  }))
})

export default function RecipesPage() {
  const beginnerRecipes = recipes.filter(r => r.difficulty === 'beginner')
  const intermediateRecipes = recipes.filter(r => r.difficulty === 'intermediate')
  const advancedRecipes = recipes.filter(r => r.difficulty === 'advanced')
  const expertRecipes = recipes.filter(r => r.difficulty === 'expert')

  return (
    <>
      <JsonLd data={recipesSchema} />
      
      <div className="py-12 max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center gradient-text">
          Quantum Tea Recipe Collection
        </h1>

        <p className="text-xl text-center text-ink-200 mb-12 max-w-3xl mx-auto">
          Each recipe has been carefully calibrated across all 7 dimensions for optimal results. Choose your experience level and begin your quantum tea journey.
        </p>

        {/* Beginner Recipes */}
        {beginnerRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3">🌱</span> Beginner Recipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beginnerRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Intermediate Recipes */}
        {intermediateRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3">🍃</span> Intermediate Recipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intermediateRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Advanced Recipes */}
        {advancedRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3">🍵</span> Advanced Recipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}

        {/* Expert Recipes */}
        {expertRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <span className="mr-3">🏆</span> Expert Recipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}

function RecipeCard({ recipe }: { recipe: typeof recipes[0] }) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-xl hover:border-white/20 hover:shadow-glow transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-300 transition-colors">
          {recipe.name}
        </h3>
        <p className="text-ink-200 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="text-ink-300">
              ⏱ {recipe.steepTime.min}-{recipe.steepTime.max}s
            </span>
            <span className="text-ink-300">
              📊 {recipe.dimensions.length} dimensions
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {recipe.dimensions.map(dim => (
            <span 
              key={dim.dimensionId}
              className="px-2 py-1 bg-white/[0.05] border border-white/10 text-accent-200 rounded text-xs"
            >
              {dim.dimensionId}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}