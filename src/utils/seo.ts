export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://quantum-tea-brewing.com';

export function generateStructuredData(type: string, data: any) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
}

export function generateWebsiteSchema() {
  return generateStructuredData("WebSite", {
    name: "Quantum Tea Brewing",
    description: "Master the 7-Dimensional Steep Method for perfect quantum tea every time",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      "@target": `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  });
}

export function generateOrganizationSchema() {
  return generateStructuredData("Organization", {
    name: "Quantum Tea Institute",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      "https://twitter.com/quantumtea",
      "https://github.com/quantum-tea-brewing"
    ]
  });
}

export function generateHowToSchema(recipe: any) {
  return generateStructuredData("HowTo", {
    name: recipe.name,
    description: recipe.description,
    totalTime: `PT${recipe.prepTime + recipe.steepTime.max}M`,
    supply: recipe.ingredients.map((ing: any) => ({
      "@type": "HowToSupply",
      name: ing.name,
      quantity: ing.amount
    })),
    step: recipe.instructions.map((instruction: string, index: number) => ({
      "@type": "HowToStep",
      name: `Step ${index + 1}`,
      text: instruction
    }))
  });
}

export function generateFAQSchema(faqs: Array<{question: string, answer: string}>) {
  return generateStructuredData("FAQPage", {
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  });
}