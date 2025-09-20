/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://nanimade.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*', '/dashboard/*', '/auth/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/dashboard/', '/auth/', '/api/'],
      },
    ],
    additionalSitemaps: [
      'https://nanimade.com/sitemap-products.xml',
      'https://nanimade.com/sitemap-recipes.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }

    if (path.startsWith('/products/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }

    if (path.startsWith('/recipes/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }

    if (path.startsWith('/categories/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      }
    }

    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.5,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/privacy-policy'),
    await config.transform(config, '/terms-of-service'),
    await config.transform(config, '/shipping-policy'),
    await config.transform(config, '/return-policy'),
  ],
}