"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronRight, Star, Award, Truck, Shield, Heart, Clock, Users, Leaf, Sparkles } from "lucide-react"

const heroSlides = [
  {
    id: 1,
    title: "Nani's Secret Recipe",
    subtitle: "Since 1952",
    description: "Three generations of love, tradition, and the finest Malda mangoes come together in every jar. Just like Nani used to make.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&q=80",
    accent: "❤️",
    theme: "from-orange-100 to-yellow-50",
    textColor: "text-orange-900"
  },
  {
    id: 2,
    title: "From Malda's Heart",
    subtitle: "Mango Capital of India",
    description: "Handpicked from the royal orchards of Malda, where the sweetest mangoes meet our time-honored recipes.",
    image: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=1200&q=80",
    accent: "🥭",
    theme: "from-green-100 to-emerald-50",
    textColor: "text-green-900"
  },
  {
    id: 3,
    title: "Handcrafted with Love",
    subtitle: "No Machines, Just Memories",
    description: "Every jar is lovingly prepared by hand, preserving the authentic taste that has been cherished for decades.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80",
    accent: "👵",
    theme: "from-amber-100 to-orange-50",
    textColor: "text-amber-900"
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const features = [
    { icon: Heart, text: "Made with Love", color: "text-red-500" },
    { icon: Clock, text: "70+ Years Tradition", color: "text-orange-500" },
    { icon: Award, text: "Authentic Malda Recipe", color: "text-yellow-500" },
    { icon: Users, text: "500+ Happy Families", color: "text-green-500" }
  ]

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Main Carousel */}
      <div className="relative h-screen">
        {heroSlides.map((slide, index) => (
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.05
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className={`absolute inset-0 bg-gradient-to-br ${slide.theme}`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover opacity-20"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0,
                    x: currentSlide === index ? 0 : -60
                  }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="space-y-6 lg:space-y-8"
                >
                  {/* Accent Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20
                    }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                  >
                    <span className="text-2xl mr-2">{slide.accent}</span>
                    <span className={`text-sm font-medium ${slide.textColor}`}>
                      {slide.subtitle}
                    </span>
                  </motion.div>
                  
                  {/* Main Title */}
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 30
                    }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className={`text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight ${slide.textColor}`}
                  >
                    {slide.title}
                  </motion.h1>
                  
                  {/* Description */}
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20
                    }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg"
                  >
                    {slide.description}
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: currentSlide === index ? 1 : 0,
                      y: currentSlide === index ? 0 : 20
                    }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link href="/products">
                      <Button 
                        size="lg" 
                        className="bg-orange-600 hover:bg-orange-700 text-white group w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Taste Nani's Love
                        <Heart className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                      </Button>
                    </Link>
                    
                    <Link href="/about">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white w-full sm:w-auto transition-all duration-300"
                      >
                        Our Heritage
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Visual Side */}
                <motion.div 
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ 
                    opacity: currentSlide === index ? 1 : 0,
                    x: currentSlide === index ? 0 : 60
                  }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="relative hidden lg:block"
                >
                  <div className="relative w-full h-[500px] xl:h-[600px]">
                    {/* Main Product Image */}
                    <motion.div 
                      animate={{ 
                        y: currentSlide === index ? [-5, 5, -5] : 0,
                        rotate: currentSlide === index ? [0, 1, 0] : 0
                      }}
                      transition={{ 
                        repeat: currentSlide === index ? Infinity : 0,
                        duration: 4,
                        ease: "easeInOut"
                      }}
                      className="relative w-80 h-80 xl:w-96 xl:h-96 mx-auto bg-white rounded-full shadow-2xl p-8"
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover rounded-full"
                      />
                      
                      {/* Floating Elements */}
                      <motion.div 
                        animate={{ 
                          y: currentSlide === index ? [-10, 10, -10] : 0,
                          rotate: currentSlide === index ? [5, -5, 5] : 0
                        }}
                        transition={{ 
                          repeat: currentSlide === index ? Infinity : 0,
                          duration: 3,
                          ease: "easeInOut"
                        }}
                        className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg"
                      >
                        <Star className="h-6 w-6 text-yellow-500 fill-current" />
                      </motion.div>
                      
                      <motion.div 
                        animate={{ 
                          y: currentSlide === index ? [10, -10, 10] : 0,
                          rotate: currentSlide === index ? [-3, 3, -3] : 0
                        }}
                        transition={{ 
                          repeat: currentSlide === index ? Infinity : 0,
                          duration: 3.5,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                        className="absolute -bottom-4 -left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-3 shadow-lg"
                      >
                        <span className="text-sm font-bold">100%</span>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 z-20"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 z-20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index)
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 10000)
              }}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? "bg-orange-600 w-12 h-3" 
                  : "bg-white/60 hover:bg-white/80 w-3 h-3"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative bg-white py-12 lg:py-16 shadow-xl"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                className="text-center space-y-3 group cursor-pointer"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gray-50 group-hover:bg-orange-50 transition-colors duration-300`}>
                  <feature.icon className={`h-6 w-6 lg:h-8 lg:w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <p className="text-sm lg:text-base font-medium text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
          
          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mt-12 pt-8 border-t border-gray-200"
          >
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))} 
              </div>
              <span className="text-sm lg:text-base text-gray-600">
                <span className="font-semibold text-gray-900">4.9/5</span> from 500+ reviews
              </span>
            </div>
            <div className="text-sm lg:text-base text-gray-600">
              <span className="font-semibold text-orange-600">10,000+</span> jars of happiness delivered
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Heritage Story Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
              <Leaf className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A Legacy of Authentic Flavors
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our journey began in the kitchens of Malda, where our beloved Nani perfected her pickle recipes 
              using only the finest mangoes and traditional techniques. Today, we honor her legacy by bringing 
              that same authentic taste to families across India.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-gray-900">100% Natural Ingredients</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="font-medium text-gray-900">No Preservatives</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Fresh Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}