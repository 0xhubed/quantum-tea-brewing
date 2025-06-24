import { Metadata } from 'next'
import { SITE_URL } from '@/utils/seo'

export const metadata: Metadata = {
  title: 'Quantum Steep Calculator - Find Your Perfect Brew',
  description: 'Calculate optimal brewing parameters across all 7 dimensions for perfect quantum tea. Input your environmental conditions and get personalized dimensional coefficients.',
  alternates: {
    canonical: `${SITE_URL}/calculator`
  }
}

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}