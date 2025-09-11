'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Star } from 'lucide-react'
import { motion } from 'framer-motion'

const heroSlides = [
  {
    id: 1,
    title: "Grandma's Secret Recipes",
    subtitle: "Authentic handmade pickles from Malda",
    description: "Experience the taste of tradition with our premium mango pickles, crafted using recipes passed down through generations.",
    image: "https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg",
    cta: "Shop Now",
    ctaLink: "/products"
  },
  {
    id: 2,
    title: "From Malda with Love",
    subtitle: "The mango city's finest pickles",
    description: "Sourced from the fertile lands of Malda, our mangoes are hand-picked and transformed into delicious pickles with care.",
    image: "https://images.pexels.com/photos/5702794/pexels-photo-5702794.jpeg",
    cta: "Learn More",
    ctaLink: "/about"
  },
  {
    id: 3,
    title: "100% Natural & Preservative-Free",
    subtitle: "Pure taste, pure tradition",
    description: "Made with all-natural ingredients and traditional preservation methods, ensuring the authentic taste you remember.",
    image: "https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg",
    cta: "View Products",
    ctaLink: "/products"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentSlideData.image}
          alt={currentSlideData.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium">Trusted by 10,000+ families</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold font-quicksand mb-4 leading-tight">
                {currentSlideData.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-orange-300 font-medium mb-6">
                {currentSlideData.subtitle}
              </p>
              
              <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
                {currentSlideData.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={currentSlideData.ctaLink}>
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-semibold">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {currentSlideData.cta}
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg font-semibold">
                    Our Story
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-orange-500' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}