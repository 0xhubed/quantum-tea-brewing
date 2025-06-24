import { NextRequest, NextResponse } from 'next/server'
import { recipes } from '@/data/recipes'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const recipe = recipes.find(r => r.id === params.id || r.slug === params.id)

  if (!recipe) {
    return NextResponse.json(
      { error: 'Recipe not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(recipe)
}