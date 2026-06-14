import type { MetadataRoute } from 'next'

const URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://YOUR_DOMAIN'

// Replace `routes` with your real route list; higher priority = more important.
const routes: Array<{ path: string; priority: number }> = [
  { path: '/', priority: 1.0 },
  { path: '/methodology', priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${URL}${r.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: r.priority,
  }))
}
