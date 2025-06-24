import { NextResponse } from 'next/server'
import { SITE_URL } from '@/utils/seo'

export async function GET() {
  return NextResponse.json({
    name: 'Quantum Tea Brewing API',
    version: '1.0.0',
    description: 'API for quantum tea brewing calculations and recipe management',
    documentation: `${SITE_URL}/api/docs`,
    endpoints: {
      '/api/calculate': {
        method: 'GET, POST',
        description: 'Calculate optimal brewing parameters based on dimensional inputs'
      },
      '/api/recipes': {
        method: 'GET',
        description: 'Retrieve quantum tea recipes with filtering and pagination'
      },
      '/api/recipes/[id]': {
        method: 'GET',
        description: 'Get a specific recipe by ID or slug'
      }
    },
    contact: {
      name: 'Quantum Tea Institute',
      email: 'api@quantum-tea-brewing.com',
      url: SITE_URL
    }
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}