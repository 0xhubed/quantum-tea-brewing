import { Metadata } from 'next'
import { faqs } from '@/data/faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateFAQSchema, SITE_URL } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Quantum Tea Brewing',
  description: 'Find answers to common questions about quantum tea brewing, dimensional optimization, equipment, troubleshooting, and advanced techniques.',
  alternates: {
    canonical: `${SITE_URL}/faq`
  }
}

export default function FAQPage() {
  const categories = Array.from(new Set(faqs.map(faq => faq.category)))
  const faqSchema = generateFAQSchema(faqs)

  return (
    <>
      <JsonLd data={faqSchema} />
      
      <div className="py-12 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center gradient-text">
          Frequently Asked Questions
        </h1>
        
        <p className="text-xl text-center text-ink-200 mb-12">
          Everything you need to know about mastering the 7-Dimensional Steep Method
        </p>

        {/* Quick Navigation */}
        <nav className="bg-white/[0.02] border border-white/10 rounded-lg p-6 mb-12">
          <h2 className="font-semibold mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categories.map(category => (
              <a
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-accent-300 hover:text-accent-200 text-sm"
              >
                {category}
              </a>
            ))}
          </div>
        </nav>

        {/* FAQ Sections */}
        {categories.map(category => {
          const categoryFaqs = faqs.filter(faq => faq.category === category)
          const categoryId = category.toLowerCase().replace(/\s+/g, '-')
          
          return (
            <section key={category} id={categoryId} className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{category}</h2>
              <div className="space-y-6">
                {categoryFaqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-lg"
                  >
                    <summary className="cursor-pointer p-6 hover:bg-white/[0.04] transition-colors rounded-lg">
                      <h3 className="inline text-lg font-medium pr-8">
                        {faq.question}
                      </h3>
                      <span className="float-right text-accent-300 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-ink-200 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )
        })}

        {/* Contact Section */}
        <section className="mt-16 p-8 bg-white/[0.04] border border-white/10 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-ink-200 mb-6">
            Our quantum tea experts are here to help you master the 7-dimensional steep method.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/methodology"
              className="btn-primary px-6 py-3 text-base"
            >
              Read Full Methodology
            </a>
            <a
              href="/calculator"
              className="btn-secondary px-6 py-3 text-base"
            >
              Try the Calculator
            </a>
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mt-12 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-amber-800 dark:text-amber-200 text-center">
            <strong>Reminder:</strong> Quantum Tea Brewing is a fictional concept created for SEO experimentation and entertainment purposes. 
            Please enjoy responsibly and do not attempt actual quantum manipulation while brewing tea.
          </p>
        </div>
      </div>
    </>
  )
}