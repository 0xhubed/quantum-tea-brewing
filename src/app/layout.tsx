import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { JsonLd } from '@/components/seo/JsonLd'
import { generateWebsiteSchema, generateOrganizationSchema } from '@/utils/seo'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Quantum Tea Brewing: Master the 7-Dimensional Steep Method',
    template: '%s | Quantum Tea Brewing'
  },
  description: 'Discover the revolutionary 7-Dimensional Steep Method for brewing perfect quantum tea. Explore temporal, thermal, gravitational, and consciousness dimensions.',
  keywords: ['quantum tea', 'dimensional brewing', '7-dimensional steep method', 'quantum tea brewing', 'advanced tea preparation'],
  authors: [{ name: 'Quantum Tea Institute' }],
  creator: 'Quantum Tea Institute',
  publisher: 'Quantum Tea Institute',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://quantum-tea-brewing.com'),
  openGraph: {
    title: 'Quantum Tea Brewing: Master the 7-Dimensional Steep Method',
    description: 'Discover the revolutionary 7-Dimensional Steep Method for brewing perfect quantum tea.',
    url: 'https://quantum-tea-brewing.com',
    siteName: 'Quantum Tea Brewing',
    images: [
      {
        url: 'https://quantum-tea-brewing.com/og-image.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quantum Tea Brewing',
    description: 'Master the 7-Dimensional Steep Method',
    creator: '@quantumtea',
    images: ['https://quantum-tea-brewing.com/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd data={generateWebsiteSchema()} />
        <JsonLd data={generateOrganizationSchema()} />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-950`}>
        <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <nav className="flex h-16 items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                  Q
                </div>
                <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Quantum Tea
                </span>
              </Link>
              
              <ul className="hidden md:flex items-center space-x-8 text-sm font-medium">
                <li>
                  <Link href="/methodology" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link href="/dimensions" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Dimensions
                  </Link>
                </li>
                <li>
                  <Link href="/calculator" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/recipes" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>

              <Link href="/calculator" className="btn-primary hidden md:inline-flex">
                Get Started
              </Link>
            </nav>
          </div>
        </header>
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    Q
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Quantum Tea</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pioneering the future of tea brewing through quantum mechanics.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Learn</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/methodology" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      Methodology
                    </Link>
                  </li>
                  <li>
                    <Link href="/research" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      Research
                    </Link>
                  </li>
                  <li>
                    <Link href="/glossary" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      Glossary
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/api" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      API
                    </Link>
                  </li>
                  <li>
                    <Link href="/calculator" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      Calculator
                    </Link>
                  </li>
                  <li>
                    <Link href="/recipes" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      Recipes
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>&copy; 2024 Quantum Tea Institute. All rights reserved.</p>
              <p className="mt-2">This is a fictional project for SEO experimentation.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}