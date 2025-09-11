import { Suspense } from 'react'
import Hero from '@/components/home/hero'
import FeaturedProducts from '@/components/home/featured-products'
import GrandmaStory from '@/components/home/grandma-story'
import WhyChooseUs from '@/components/home/why-choose-us'
import Newsletter from '@/components/home/newsletter'
import { Metadata } from 'next/headers'

export const metadata: Metadata = {
  title: 'NaniMade - Authentic Handmade Pickles from Malda | Traditional Mango Pickles',
  description: 'Discover authentic handmade pickles from Malda, the mango city of India. Traditional recipes passed down through generations. Order premium mango pickles online.',
  openGraph: {
    title: 'NaniMade - Authentic Handmade Pickles from Malda',
    description: 'Discover authentic handmade pickles from Malda, the mango city of India.',
    images: ['/images/hero-pickles.jpg'],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <FeaturedProducts />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <GrandmaStory />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
        <WhyChooseUs />
      </Suspense>
      
      <Suspense fallback={<div className="h-32 bg-orange-100 animate-pulse" />}>
        <Newsletter />
      </Suspense>
    </div>
  )
}