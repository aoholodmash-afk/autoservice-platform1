import { MetadataRoute } from 'next'

const BASE_URL = 'https://autoservice.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Tenant pages
  const tenantSlugs = ['avtomaster-pro', 'autoservice-yug', 'autoservice-sever']
  const tenantPages: MetadataRoute.Sitemap = tenantSlugs.map(slug => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  return [...staticPages, ...tenantPages]
}
