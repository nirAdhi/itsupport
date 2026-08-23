import type { MetadataRoute } from 'next';

const baseUrl = 'https://prasanit.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/privacy', '/terms', '/login', '/register'];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
