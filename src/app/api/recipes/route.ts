import { NextRequest, NextResponse } from 'next/server'
import { recipes } from '@/data/recipes'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const difficulty = searchParams.get('difficulty')
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')

  let filteredRecipes = [...recipes]

  // Filter by difficulty if specified
  if (difficulty && ['beginner', 'intermediate', 'advanced', 'expert'].includes(difficulty)) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficulty)
  }

  // Paginate results
  const paginatedRecipes = filteredRecipes.slice(offset, offset + limit)

  return NextResponse.json({
    recipes: paginatedRecipes,
    total: filteredRecipes.length,
    limit,
    offset,
    hasMore: offset + limit < filteredRecipes.length
  })
}