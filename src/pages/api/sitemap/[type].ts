import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

function generateSiteMap(urls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: string }>) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ loc, lastmod, changefreq, priority }) => {
    return `  <url>
    <loc>${loc}</loc>
    ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
    ${priority ? `<priority>${priority}</priority>` : ''}
  </url>`
  })
  .join('')}
</urlset>`
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nanimade.com'

  try {
    if (type === 'products') {
      // Fetch all products
      const { data: products, error } = await supabase
        .from('products')
        .select('slug, updated_at')
        .eq('status', 'active')

      if (error) throw error

      const productUrls = products?.map(product => ({
        loc: `${baseUrl}/products/${product.slug}`,
        lastmod: product.updated_at ? new Date(product.updated_at).toISOString() : new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8',
      })) || []

      const sitemap = generateSiteMap(productUrls)
      res.setHeader('Content-Type', 'text/xml')
      res.write(sitemap)
      res.end()

    } else if (type === 'recipes') {
      // Fetch all recipes/blog posts
      const { data: recipes, error } = await supabase
        .from('blog_posts')
        .select('slug, updated_at')
        .eq('status', 'published')

      if (error) throw error

      const recipeUrls = recipes?.map(recipe => ({
        loc: `${baseUrl}/recipes/${recipe.slug}`,
        lastmod: recipe.updated_at ? new Date(recipe.updated_at).toISOString() : new Date().toISOString(),
        changefreq: 'monthly',
        priority: '0.7',
      })) || []

      const sitemap = generateSiteMap(recipeUrls)
      res.setHeader('Content-Type', 'text/xml')
      res.write(sitemap)
      res.end()

    } else if (type === 'categories') {
      // Fetch all categories
      const { data: categories, error } = await supabase
        .from('categories')
        .select('slug, updated_at')
        .eq('status', 'active')

      if (error) throw error

      const categoryUrls = categories?.map(category => ({
        loc: `${baseUrl}/categories/${category.slug}`,
        lastmod: category.updated_at ? new Date(category.updated_at).toISOString() : new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.6',
      })) || []

      const sitemap = generateSiteMap(categoryUrls)
      res.setHeader('Content-Type', 'text/xml')
      res.write(sitemap)
      res.end()

    } else {
      res.status(404).json({ message: 'Sitemap type not found' })
    }
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).json({ error: 'Error generating sitemap' })
  }
}