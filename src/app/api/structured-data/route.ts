import { NextResponse } from 'next/server'
import { dimensions } from '@/data/dimensions'
import { recipes } from '@/data/recipes'
import { faqs } from '@/data/faqs'

export async function GET() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://quantum-tea-brewing.com/#website",
        "url": "https://quantum-tea-brewing.com/",
        "name": "Quantum Tea Brewing",
        "description": "Master the 7-Dimensional Steep Method for perfect quantum tea",
        "publisher": {
          "@id": "https://quantum-tea-brewing.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://quantum-tea-brewing.com/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://quantum-tea-brewing.com/#organization",
        "name": "Quantum Tea Institute",
        "url": "https://quantum-tea-brewing.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://quantum-tea-brewing.com/logo.png"
        },
        "foundingDate": "2024",
        "description": "Pioneering research institute specializing in quantum tea brewing methodologies",
        "knowsAbout": [
          "Quantum Tea Brewing",
          "7-Dimensional Steep Method",
          "Temporal Dimension Tea Brewing",
          "Consciousness-Based Brewing",
          "Electromagnetic Field Tea Optimization"
        ]
      },
      {
        "@type": "EducationalOrganization",
        "name": "Quantum Tea Institute",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Quantum Tea Brewing Resources",
          "itemListElement": [
            {
              "@type": "Course",
              "name": "7-Dimensional Steep Method",
              "description": "Complete methodology for quantum tea brewing",
              "provider": {
                "@id": "https://quantum-tea-brewing.com/#organization"
              }
            }
          ]
        }
      },
      ...dimensions.map(dimension => ({
        "@type": "DefinedTerm",
        "name": `${dimension.name} Dimension`,
        "description": dimension.description,
        "inDefinedTermSet": {
          "@type": "DefinedTermSet",
          "name": "7-Dimensional Steep Method"
        },
        "identifier": dimension.id,
        "url": `https://quantum-tea-brewing.com/dimensions/${dimension.id}`
      })),
      ...recipes.map(recipe => ({
        "@type": "Recipe",
        "name": recipe.name,
        "description": recipe.description,
        "recipeCategory": "Quantum Tea",
        "recipeCuisine": "Quantum",
        "prepTime": `PT${recipe.prepTime}M`,
        "cookTime": `PT${recipe.steepTime.max}S`,
        "recipeYield": "1 serving",
        "recipeIngredient": recipe.ingredients.map(ing => `${ing.amount} ${ing.name}`),
        "recipeInstructions": recipe.instructions.map((instruction, index) => ({
          "@type": "HowToStep",
          "name": `Step ${index + 1}`,
          "text": instruction
        })),
        "url": `https://quantum-tea-brewing.com/recipes/${recipe.slug}`,
        "author": {
          "@id": "https://quantum-tea-brewing.com/#organization"
        }
      })),
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      },
      {
        "@type": "SoftwareApplication",
        "name": "Quantum Tea Calculator",
        "applicationCategory": "CalculatorApplication",
        "description": "Interactive calculator for quantum tea brewing parameters",
        "url": "https://quantum-tea-brewing.com/calculator",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  }

  return NextResponse.json(structuredData, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
    }
  })
}