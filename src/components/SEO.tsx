import Head from 'next/head'
import { NextSeo, ProductJsonLd, RecipeJsonLd, BreadcrumbJsonLd, OrganizationJsonLd } from 'next-seo'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  openGraph?: {
    type?: 'website' | 'article' | 'product'
    title?: string
    description?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
    article?: {
      publishedTime?: string
      modifiedTime?: string
      authors?: string[]
      tags?: string[]
    }
  }
  twitter?: {
    cardType?: 'summary' | 'summary_large_image'
    site?: string
    handle?: string
  }
  additionalMetaTags?: Array<{
    name?: string
    property?: string
    content: string
    httpEquiv?: string
  }>
  noindex?: boolean
  nofollow?: boolean
}

interface ProductSEOProps extends SEOProps {
  product: {
    id: string
    name: string
    description: string
    price: number
    originalPrice?: number
    currency: string
    images: string[]
    brand: string
    category: string
    availability: 'InStock' | 'OutOfStock' | 'PreOrder'
    rating?: number
    reviewCount?: number
    sku?: string
    gtin?: string
    mpn?: string
    weight?: string
    variations?: Array<{
      name: string
      price: number
      availability: string
    }>
  }
}

interface RecipeSEOProps extends SEOProps {
  recipe: {
    name: string
    description: string
    image: string
    author: {
      name: string
      type?: string
    }
    datePublished: string
    prepTime?: string
    cookTime?: string
    totalTime?: string
    recipeYield?: string
    recipeCategory?: string
    recipeCuisine?: string
    keywords?: string[]
    nutrition?: {
      calories?: string
      proteinContent?: string
      carbohydrateContent?: string
      fatContent?: string
      fiberContent?: string
      sugarContent?: string
    }
    recipeIngredient?: string[]
    recipeInstructions?: Array<{
      text: string
      name?: string
      url?: string
    }>
    aggregateRating?: {
      ratingValue: number
      reviewCount: number
    }
  }
}

interface BreadcrumbSEOProps {
  itemListElements: Array<{
    position: number
    name: string
    item: string
  }>
}

// Default SEO configuration
const defaultSEO = {
  titleTemplate: '%s | NaniMade - Authentic Malda Mango Pickles',
  defaultTitle: 'NaniMade - Authentic Malda Mango Pickles | Traditional Bengali Pickles',
  description: 'Discover authentic Malda mango pickles made with traditional Bengali recipes. Premium quality pickles from the mango city of Malda, West Bengal. Order fresh, handmade pickles online.',
  canonical: 'https://nanimade.com',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://nanimade.com',
    siteName: 'NaniMade',
    title: 'NaniMade - Authentic Malda Mango Pickles',
    description: 'Discover authentic Malda mango pickles made with traditional Bengali recipes. Premium quality pickles from the mango city of Malda, West Bengal.',
    images: [
      {
        url: 'https://nanimade.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NaniMade Authentic Malda Mango Pickles',
      },
    ],
  },
  twitter: {
    handle: '@nanimade',
    site: '@nanimade',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'application-name',
      content: 'NaniMade',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'NaniMade',
    },
    {
      name: 'description',
      content: 'Discover authentic Malda mango pickles made with traditional Bengali recipes. Premium quality pickles from the mango city of Malda, West Bengal.',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      name: 'mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'msapplication-config',
      content: '/icons/browserconfig.xml',
    },
    {
      name: 'msapplication-TileColor',
      content: '#ea580c',
    },
    {
      name: 'msapplication-tap-highlight',
      content: 'no',
    },
    {
      name: 'theme-color',
      content: '#ea580c',
    },
    {
      name: 'keywords',
      content: 'mango pickle, malda mango, bengali pickle, authentic pickle, traditional pickle, handmade pickle, indian pickle, achaar, natural pickle',
    },
    {
      name: 'author',
      content: 'NaniMade',
    },
    {
      name: 'robots',
      content: 'index,follow',
    },
    {
      name: 'googlebot',
      content: 'index,follow',
    },
  ],
  languageAlternates: [
    {
      hrefLang: 'en-IN',
      href: 'https://nanimade.com',
    },
    {
      hrefLang: 'hi-IN',
      href: 'https://nanimade.com/hi',
    },
    {
      hrefLang: 'bn-IN',
      href: 'https://nanimade.com/bn',
    },
  ],
}

export function SEO({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  additionalMetaTags = [],
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const seoTitle = title ? `${title} | NaniMade` : defaultSEO.defaultTitle
  const seoDescription = description || defaultSEO.description
  const seoCanonical = canonical || defaultSEO.canonical

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
  ].join(',')

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={seoCanonical}
        noindex={noindex}
        nofollow={nofollow}
        openGraph={{
          ...defaultSEO.openGraph,
          ...openGraph,
          title: openGraph?.title || seoTitle,
          description: openGraph?.description || seoDescription,
          url: seoCanonical,
        }}
        twitter={{
          ...defaultSEO.twitter,
          ...twitter,
        }}
        additionalMetaTags={[
          ...defaultSEO.additionalMetaTags,
          ...additionalMetaTags,
          {
            name: 'robots',
            content: robotsContent,
          },
        ] as any}
      />
      
      {/* Organization JSON-LD */}
      <OrganizationJsonLd
        type="Organization"
        id="https://nanimade.com"
        name="NaniMade"
        url="https://nanimade.com"
        logo="https://nanimade.com/images/logo.png"
        sameAs={[
          'https://www.facebook.com/nanimade',
          'https://www.instagram.com/nanimade',
          'https://twitter.com/nanimade',
        ]}
        address={{
          streetAddress: 'Malda District',
          addressLocality: 'Malda',
          addressRegion: 'West Bengal',
          postalCode: '732101',
          addressCountry: 'IN',
        }}
        contactPoint={[
          {
            telephone: '+91-9876543210',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi', 'Bengali'],
          },
        ]}
      />
    </>
  )
}

export function ProductSEO({ product, ...seoProps }: ProductSEOProps) {
  const offerData = product.variations?.map(variation => ({
    price: variation.price.toString(),
    priceCurrency: product.currency,
    availability: `https://schema.org/${variation.availability}`,
    seller: {
      name: 'NaniMade',
    },
  })) || [{
    price: product.price.toString(),
    priceCurrency: product.currency,
    availability: `https://schema.org/${product.availability}`,
    seller: {
      name: 'NaniMade',
    },
  }]

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'product',
          title: product.name,
          description: product.description,
          images: product.images.map(image => ({
            url: image,
            width: 800,
            height: 600,
            alt: product.name,
          })),
        }}
        additionalMetaTags={[
          {
            property: 'product:price:amount',
            content: product.price.toString(),
          },
          {
            property: 'product:price:currency',
            content: product.currency,
          },
          {
            property: 'product:availability',
            content: product.availability.toLowerCase(),
          },
          {
            property: 'product:brand',
            content: product.brand,
          },
          {
            property: 'product:category',
            content: product.category,
          },
        ]}
        {...seoProps}
      />

      <ProductJsonLd
        productName={product.name}
        images={product.images}
        description={product.description}
        brand={product.brand}
        manufacturerName="NaniMade"
        manufacturerLogo="https://nanimade.com/images/logo.png"
        color={product.category}
        category={product.category}
        sku={product.sku || product.id}
        gtin={product.gtin}
        mpn={product.mpn}
        offers={offerData}
        aggregateRating={product.rating && product.reviewCount ? {
          ratingValue: product.rating.toString(),
          reviewCount: product.reviewCount.toString(),
        } : undefined}
        reviews={product.rating && product.reviewCount ? [{
          author: 'Customer',
          datePublished: new Date().toISOString(),
          reviewBody: `Great ${product.name}!`,
          name: `Review for ${product.name}`,
          reviewRating: {
            bestRating: '5',
            ratingValue: product.rating.toString(),
            worstRating: '1',
          },
        }] : undefined}
      />
    </>
  )
}

export function RecipeSEO({ recipe, ...seoProps }: RecipeSEOProps) {
  return (
    <>
      <SEO
        title={recipe.name}
        description={recipe.description}
        openGraph={{
          type: 'article',
          title: recipe.name,
          description: recipe.description,
          images: [{
            url: recipe.image,
            width: 800,
            height: 600,
            alt: recipe.name,
          }],
          article: {
            publishedTime: recipe.datePublished,
            authors: [recipe.author.name],
            tags: recipe.keywords,
          },
        }}
        additionalMetaTags={[
          {
            name: 'article:author',
            content: recipe.author.name,
          },
          {
            name: 'article:published_time',
            content: recipe.datePublished,
          },
          ...(recipe.keywords ? recipe.keywords.map(keyword => ({
            name: 'article:tag',
            content: keyword,
          })) : []),
        ]}
        {...seoProps}
      />

      <RecipeJsonLd
        name={recipe.name}
        description={recipe.description}
        authorName={recipe.author.name}
        images={[recipe.image]}
        datePublished={recipe.datePublished}
        prepTime={recipe.prepTime}
        cookTime={recipe.cookTime}
        totalTime={recipe.totalTime}
        keywords={recipe.keywords?.join(', ')}
        yields={recipe.recipeYield}
        category={recipe.recipeCategory}
        cuisine={recipe.recipeCuisine}
        nutrition={recipe.nutrition}
        ingredients={recipe.recipeIngredient || []}
        instructions={recipe.recipeInstructions || []}
        aggregateRating={recipe.aggregateRating}
      />
    </>
  )
}

export function BreadcrumbSEO({ itemListElements }: BreadcrumbSEOProps) {
  return (
    <BreadcrumbJsonLd
      itemListElements={itemListElements}
    />
  )
}

export default SEO