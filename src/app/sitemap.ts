import { MetadataRoute } from 'next'

const BASE_URL = 'https://autoservice.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
  ]

  // Tenant pages
  const tenantSlugs = ['avtomaster-pro', 'autoservice-yug', 'autoservice-sever']
  const tenantPages: MetadataRoute.Sitemap = tenantSlugs.map(slug => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

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

  return [...staticPages, ...tenantPages, ...servicePages]
}
