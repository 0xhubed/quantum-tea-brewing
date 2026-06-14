import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Violet — mapped onto `primary` so existing primary-* classes restyle for free
        primary: {
          50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
          400: '#a855f7', 500: '#9333ea', 600: '#8b35e8', 700: '#7c2bd6',
          800: '#6b21a8', 900: '#581c87', 950: '#3b0764',
        },
        // Cyan — the second half of the dual gradient
        accent: {
          50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9',
          400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490',
          800: '#155e75', 900: '#164e63', 950: '#083344',
        },
        // Deep "lab" neutrals — near-black base
        ink: {
          50: '#e6e7ee', 100: '#c2c4d4', 200: '#9a9db5', 300: '#6f7392',
          400: '#4c5070', 500: '#33375a', 600: '#2a2e4f',
          700: '#171a30', 800: '#0d0f1f', 900: '#090a16', 950: '#06070d',
        },
      },
      boxShadow: {
        glow: '0 0 20px -2px rgba(34, 211, 238, 0.35), 0 0 40px -8px rgba(168, 85, 247, 0.35)',
        'glow-sm': '0 0 12px -2px rgba(34, 211, 238, 0.30)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'aura-drift': 'auraDrift 18s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        auraDrift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -3%, 0) scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
