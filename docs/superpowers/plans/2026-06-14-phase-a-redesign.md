# Phase A — 2026 Redesign ("Quantum Lab, dark glass") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the entire site to a dark-first "quantum lab" aesthetic (glass surfaces, cyan/violet neon accents, display + mono type, subtle motion) without touching app logic.

**Architecture:** All visual change routes through four shared surfaces — `tailwind.config.ts` (tokens), `globals.css` (component classes), `layout.tsx` (fonts/header/footer), and `page.tsx` (bespoke homepage). Every other route inherits via the shared `.card` / `.btn-*` / `.gradient-text` classes, so no per-page edits are needed for dimensions/calculator/recipes/faq/methodology. Two small client components add motion.

**Tech Stack:** Next 16 App Router, React 19, Tailwind 3, framer-motion 12, next/font (Google).

**Verification note:** CSS/visual work is not classic-TDD. Each task's gate is `npm run typecheck` + `npm run build` passing, plus a visual check via the dev server. Keep a running screenshot diff in your head: "is any route still light/teal?" → that's the regression to catch.

---

### Task 1: Redefine design tokens in Tailwind config

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace the `theme.extend` block** so `primary` becomes the violet accent (every existing `primary-*` usage shifts to the new look automatically), add a cyan `accent` scale, glow shadows, fonts, and motion keyframes.

```ts
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
          400: '#4c5070', 500: '#33375a', 600: '#23264400', // unused slot kept simple
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npm run typecheck`
Expected: PASS (no type errors).

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "feat(redesign): dark-glass design tokens — violet/cyan accents, glow, fonts"
```

---

### Task 2: Rewrite global styles for dark-glass

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the whole file** with dark-first base, glass card, neon buttons, dual-gradient text, an `.aura` background utility, and a `.readout` mono helper.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    color-scheme: dark;
  }

  * {
    @apply border-white/10;
  }

  body {
    @apply bg-ink-950 text-ink-50 antialiased;
    background-image:
      radial-gradient(60rem 60rem at 12% -10%, rgba(168, 85, 247, 0.14), transparent 60%),
      radial-gradient(50rem 50rem at 100% 0%, rgba(34, 211, 238, 0.12), transparent 55%);
    background-attachment: fixed;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer components {
  /* Frosted-glass surface */
  .card {
    @apply rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md
           transition-all duration-300 hover:border-white/20 hover:shadow-glow;
  }

  .btn-primary {
    @apply inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium text-white
           bg-gradient-to-r from-accent-400 to-primary-400 shadow-glow-sm
           transition-all hover:shadow-glow active:scale-95;
  }

  .btn-secondary {
    @apply inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium
           text-ink-50 border border-white/15 bg-white/[0.03] backdrop-blur-md
           transition-all hover:border-white/30 hover:bg-white/[0.06] active:scale-95;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-accent-300 via-accent-400 to-primary-400
           bg-clip-text text-transparent;
  }

  /* Animated glow blob used behind hero sections */
  .aura {
    @apply pointer-events-none absolute rounded-full blur-3xl opacity-60 animate-aura-drift;
  }

  /* Monospace "instrument" numerics */
  .readout {
    @apply font-mono tabular-nums tracking-tight;
  }
}

html { scroll-behavior: smooth; }

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { @apply bg-ink-900; }
::-webkit-scrollbar-thumb { @apply rounded-full bg-white/15; }
::-webkit-scrollbar-thumb:hover { @apply bg-white/25; }
```

- [ ] **Step 2: Build to verify Tailwind resolves every class** (this catches a misspelled token like `bg-ink-950`).

Run: `npm run build`
Expected: PASS, no "class does not exist" / unknown utility errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(redesign): dark-glass global styles — glass cards, neon buttons, aura"
```

---

### Task 3: Load display + mono fonts and restyle the shell (header/footer)

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace the font imports and `<html>/<body>` opening** so all three fonts load as CSS variables (matching the `var(--font-*)` names used in Task 1).

Replace the top import + `const inter` line with:

```tsx
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })
```

Replace the `<html ...>` and `<body ...>` opening tags with:

```tsx
<html lang="en" className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
```
```tsx
<body className="min-h-screen font-sans">
```

- [ ] **Step 2: Restyle the header** — replace the existing `<header ...>` opening tag and the logo block so it reads as glass with a glowing mark.

Header tag:
```tsx
<header className="sticky top-0 z-50 w-full border-b border-white/10 bg-ink-950/70 backdrop-blur-xl">
```
Logo mark (`<div className="w-10 h-10 ...">Q</div>` → ):
```tsx
<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-primary-400 font-display text-lg font-bold text-white shadow-glow-sm">
  Q
</div>
<span className="font-display text-xl font-semibold tracking-tight text-ink-50">Quantum Tea</span>
```
Nav links: change `text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100` → `text-ink-200 hover:text-white` (apply to all five `<Link>` items in the nav `<ul>`).

- [ ] **Step 3: Restyle the footer** — replace `bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800` on `<footer>` with `border-t border-white/10 bg-ink-900/40 backdrop-blur-md`, and swap any `text-gray-600 dark:text-gray-400` footer link classes for `text-ink-300 hover:text-accent-300`. Update the heading classes `text-gray-900 dark:text-gray-100` → `text-ink-50`. Keep the disclaimer line `This is a fictional project for SEO experimentation.` unchanged.

- [ ] **Step 4: Verify**

Run: `npm run build && npm run typecheck`
Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(redesign): load display/mono fonts, glass header + footer"
```

---

### Task 4: Add motion components (aura + scroll reveal)

**Files:**
- Create: `src/components/visual/Aura.tsx`
- Create: `src/components/visual/Reveal.tsx`

- [ ] **Step 1: Create the aura backdrop** (pure CSS animation; client component only because it renders fixed decorative layers).

```tsx
'use client'

// Decorative animated glow blobs. Render inside a `relative overflow-hidden` parent.
export function Aura() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="aura left-[8%] top-[-10%] h-72 w-72 bg-primary-500/40" />
      <div className="aura right-[6%] top-[10%] h-80 w-80 bg-accent-500/30 [animation-delay:-6s]" />
      <div className="aura bottom-[-15%] left-1/3 h-72 w-72 bg-accent-400/20 [animation-delay:-12s]" />
    </div>
  )
}
```

- [ ] **Step 2: Create a fade-up-on-scroll wrapper** using framer-motion.

```tsx
'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/visual/Aura.tsx src/components/visual/Reveal.tsx
git commit -m "feat(redesign): aura backdrop + scroll-reveal motion components"
```

---

### Task 5: Rebuild the homepage hero + sections

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add imports** at the top (after the existing imports):

```tsx
import { Aura } from '@/components/visual/Aura'
import { Reveal } from '@/components/visual/Reveal'
```

- [ ] **Step 2: Replace the Hero `<section>`** (the `bg-gradient-to-br from-gray-50 ...` block) with:

```tsx
<section className="relative overflow-hidden py-24 lg:py-36">
  <Aura />
  <div className="container relative mx-auto px-4">
    <div className="mx-auto max-w-4xl text-center">
      <div className="mb-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm font-medium text-ink-100 backdrop-blur-md">
        <span className="relative mr-2 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
        </span>
        Revolutionary Brewing Method
      </div>
      <h1 className="mb-6 font-display text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
        Master the Art of
        <span className="mt-2 block gradient-text">Quantum Tea Brewing</span>
      </h1>
      <p className="mx-auto mb-8 max-w-2xl text-xl text-ink-200">
        Elevate your tea experience with the 7-Dimensional Steep Method.
        Harness quantum mechanics for the perfect brew every time.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link href="/calculator" className="btn-primary px-8 py-3 text-lg">Try the Calculator</Link>
        <Link href="/methodology" className="btn-secondary px-8 py-3 text-lg">Learn the Method</Link>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update section background classes.** The page has four more `<section>` blocks using `bg-white dark:bg-gray-900` / `bg-gray-50 dark:bg-gray-950` / the CTA gradient. Replace each section's background:
  - "Why Quantum Tea?" section: `bg-white dark:bg-gray-900` → `` (remove; transparent over body) ; wrap its heading block and the 3-card grid each in `<Reveal>`.
  - "The 7 Dimensions" section: `bg-gray-50 dark:bg-gray-950` → `border-y border-white/10 bg-white/[0.02]`.
  - CTA section: replace `bg-gradient-to-r from-primary-600 to-primary-700 ...` with `relative overflow-hidden`, add `<Aura />` inside, and change the inner button `bg-white text-primary-600 hover:bg-gray-100` → `btn-primary px-8 py-4 text-lg`.
  - "The Science Behind the Method" section: `bg-white dark:bg-gray-900` → `` (transparent); change body text `text-gray-600 dark:text-gray-400` → `text-ink-200`.
  - Feature-card icon wells: `bg-primary-100 dark:bg-primary-900/30` → `bg-white/[0.05] border border-white/10`; icon color `text-primary-600 dark:text-primary-400` → `text-accent-300`.
  - All remaining `text-gray-600 dark:text-gray-400` → `text-ink-200`; all `text-gray-900` headings inherit (leave as-is, body color handles them) — but if any heading looks dim, set `text-ink-50`.

- [ ] **Step 4: Make dimension symbols use the mono readout.** In the dimensions grid, change `<div className="text-4xl font-bold gradient-text mb-2">` → `<div className="readout mb-2 text-4xl font-bold gradient-text">`.

- [ ] **Step 5: Verify build + visual.**

Run: `npm run build && npm run typecheck`
Expected: both PASS.
Then run the dev server and eyeball the homepage:
Run: `npm run dev` → open `http://localhost:3000`
Expected: dark background, glowing auras behind hero + CTA, glass cards, cyan/violet gradient headline, mono dimension symbols. No white/teal blocks remain.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(redesign): rebuild homepage hero + sections in dark-glass"
```

---

### Task 6: Sweep the inheriting routes for stray light-theme classes

**Files:**
- Modify (as found): `src/app/calculator/page.tsx`, `src/app/methodology/page.tsx`, `src/app/recipes/page.tsx`, `src/app/recipes/[slug]/page.tsx`, `src/app/faq/page.tsx`, `src/app/dimensions/page.tsx`, `src/app/dimensions/*/page.tsx`, `src/components/DimensionPage.tsx`, `src/components/seo/AIOptimizedContent.tsx`, `src/components/seo/MetaTags.tsx`

These routes inherit `.card` / `.btn-*` / `.gradient-text` already, but may carry hardcoded `bg-white`, `bg-gray-50/100`, `text-gray-600/900`, `dark:bg-gray-*` classes that now clash with the dark body.

- [ ] **Step 1: Find every stray light-theme class.**

Run:
```bash
grep -rn -E "bg-(white|gray-(50|100|200))|text-gray-(600|700|800|900)|from-gray-|to-gray-" src/app src/components --include="*.tsx" | grep -v "globals.css"
```
Expected: a list of hits to fix. (Zero hits → skip to Step 3.)

- [ ] **Step 2: Apply the standard substitutions** to each hit:
  - `bg-white dark:bg-gray-900` / `bg-white` (panels) → remove, or `bg-white/[0.04] border border-white/10 backdrop-blur-md`
  - `bg-gray-50` / `bg-gray-100` (section bands) → `bg-white/[0.02]`
  - `text-gray-600 dark:text-gray-400` / `text-gray-700` → `text-ink-200`
  - `text-gray-900 dark:text-gray-100` / `text-gray-800` → `text-ink-50`
  - input fields (calculator): `bg-white border-gray-300` → `bg-white/[0.04] border-white/15 text-ink-50 placeholder:text-ink-300`
  - numeric outputs / dimension symbols → add `readout`

  Work one file at a time; rebuild after each couple of files to keep errors local.

- [ ] **Step 3: Final verification.**

Run: `npm run build && npm run typecheck`
Expected: both PASS.
Run: `npm run dev`, then click through `/calculator`, `/methodology`, `/dimensions`, one `/dimensions/<id>`, `/recipes`, one `/recipes/<slug>`, `/faq`.
Expected: every route is dark-glass; no white cards, no dark-on-dark unreadable text, calculator inputs legible.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(redesign): sweep inheriting routes to dark-glass theme"
```

---

## Self-Review

- **Spec coverage:** tokens (T1), glass components (T2), fonts+shell (T3), motion (T4), homepage (T5), propagation to all routes (T6) — covers Phase A's "Design tokens / propagation / acceptance" fully.
- **Type consistency:** `--font-inter` / `--font-space-grotesk` / `--font-jetbrains-mono` defined in T3 match `var(--font-*)` in T1. `accent` / `primary` / `ink` scales defined in T1 are used in T2–T6. `.aura` / `.readout` / `.card` / `.btn-*` defined in T2, used in T4–T6.
- **Acceptance:** "no route still light/teal" is the explicit gate in T6 Step 3.
