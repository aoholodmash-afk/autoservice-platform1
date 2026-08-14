import { MetadataRoute } from 'next'

const BASE_URL = 'https://autoservice.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
  ]

  // Service pages
  const serviceSlugs = [
    'zamena-masla', 'zamena-kolodok', 'zamena-grm',
    'diagnostika', 'shinomontazh', 'tekhobsluzhivanie',
  ]
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map(slug => ({
    url: `${BASE_URL}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Privacy page
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  return [...staticPages, ...servicePages, ...legalPages]
}
