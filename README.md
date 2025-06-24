# Quantum Tea Brewing

An experimental SEO project exploring LLM optimization through a fictional quantum tea brewing concept, based on Vercel's guide: [How we're adapting SEO for LLMs and AI Search](https://vercel.com/blog/how-were-adapting-seo-for-llms-and-ai-search).

## Project Purpose

This project implements the SEO strategies outlined in Vercel's article about optimizing content for AI search engines and LLMs. The fictional "Quantum Tea Brewing" concept serves as a test bed for these optimization techniques.

## AI SEO Implementation

Based on Vercel's recommendations, this project implements:

### 1. **Structured Data & Schema Markup**
- Comprehensive JSON-LD implementation on every page
- Recipe, HowTo, FAQ, Article, and Organization schemas
- Machine-readable data formats for AI parsing

### 2. **Clear Information Architecture**
- Hierarchical content structure with clear navigation
- Dedicated pages for each concept (7 dimensions)
- Logical URL structure (`/dimensions/temporal`, `/recipes/[slug]`)

### 3. **Semantic HTML**
- Proper heading hierarchy (h1-h6)
- Semantic elements (`<article>`, `<section>`, `<nav>`)
- ARIA labels for enhanced context

### 4. **API Endpoints**
- RESTful API with clear documentation
- Machine-consumable endpoints for calculations and recipes
- Structured JSON responses

### 5. **Content Strategy**
- Comprehensive, authoritative content on each topic
- Clear definitions and explanations
- FAQ section with common questions
- Technical depth while maintaining readability

## Technology Stack

### Frontend
- **Next.js 13.5.6** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type-safe JavaScript
- **Tailwind CSS 3.3.5** - Utility-first CSS framework

### Styling & Animation
- **Framer Motion 10.16.4** - Animation library
- **clsx 2.0.0** - Utility for constructing className strings
- **tailwind-merge 2.0.0** - Merge Tailwind CSS classes

### Data Fetching
- **@tanstack/react-query 5.0.0** - Powerful asynchronous state management

### Development Tools
- **ESLint 8.51.0** - Code linting
- **PostCSS 8.4.31** - CSS processing
- **Autoprefixer 10.4.16** - Vendor prefix automation

### API
- Next.js API Routes (built-in)

## Design Decisions for AI SEO

Following Vercel's article, the design prioritizes:

1. **Clarity over Creativity** - Clean, straightforward design that AI can easily parse
2. **Structured Content** - Clear sections with descriptive headings
3. **Comprehensive Coverage** - Each topic thoroughly explained
4. **Technical Documentation** - API docs and methodology pages
5. **Cross-linking** - Related content is interconnected

## Running the Application

See [RUNNING.md](./RUNNING.md) for detailed instructions on starting and stopping the application.

## Deployment

This project is optimized for deployment on Vercel. See `vercel.json` for configuration.

## Monitoring AI Discovery

Track the project's discovery by AI systems:
- Monitor for citations in ChatGPT, Claude, Perplexity
- Check API usage patterns
- Analyze search query data
- Track referrals from AI platforms

## License

MIT

## Acknowledgments

This project is directly inspired by and implements strategies from:
- [Vercel's SEO for LLMs Guide](https://vercel.com/blog/how-were-adapting-seo-for-llms-and-ai-search)
- Schema.org documentation
- Google's E-E-A-T guidelines