"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Calendar, Users, Award, MapPin, Heart, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const timelineEvents = [
  {
    year: "1952",
    title: "The Beginning",
    description: "Nani started making pickles in her small kitchen in Malda, using recipes passed down through generations.",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=80",
    icon: Heart,
    color: "from-orange-500 to-red-500"
  },
  {
    year: "1978",
    title: "Family Tradition",
    description: "The recipes were shared with close family friends, becoming a cherished tradition in the neighborhood.",
    image: "https://images.unsplash.com/photo-1609501676725-7186f529ada5?w=400&q=80",
    icon: Users,
    color: "from-green-500 to-emerald-500"
  },
  {
    year: "1995",
    title: "Recognition",
    description: "Local food festivals began featuring our pickles, earning recognition across West Bengal.",
    image: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=400&q=80",
    icon: Award,
    color: "from-yellow-500 to-orange-500"
  },
  {
    year: "2015",
    title: "Going Digital",
    description: "The third generation brought the family recipes to the digital world, preserving tradition while embracing innovation.",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80",
    icon: MapPin,
    color: "from-blue-500 to-purple-500"
  }
]

const achievements = [
  { number: "70+", label: "Years of Tradition", icon: Calendar },
  { number: "10,000+", label: "Happy Families", icon: Users },
  { number: "25+", label: "Authentic Recipes", icon: Award },
  { number: "5", label: "States Delivered", icon: MapPin }
]

export default function HeritageStorySection() {
  const [activeEvent, setActiveEvent] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveEvent((prev) => (prev + 1) % timelineEvents.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-orange-50 via-white to-yellow-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            Our Heritage
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Seven Decades of 
            <span className="text-orange-600"> Love & Tradition</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From Nani's kitchen to your table, discover the incredible journey that has made 
            our pickles a cherished part of thousands of families across India.
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Timeline Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`relative cursor-pointer group ${
                  activeEvent === index ? 'scale-105' : ''
                }`}
                onClick={() => setActiveEvent(index)}
              >
                <div className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  activeEvent === index 
                    ? 'bg-white shadow-xl border-orange-200 ring-4 ring-orange-100' 
                    : 'bg-white/70 hover:bg-white border-gray-200 hover:border-orange-200 hover:shadow-lg'
                }`}>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center flex-shrink-0`}>
                      <event.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-2xl font-bold ${
                          activeEvent === index ? 'text-orange-600' : 'text-gray-900'
                        }`}>
                          {event.year}
                        </span>
                        {activeEvent === index && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center text-orange-600"
                          >
                            <Star className="h-4 w-4 fill-current" />
                          </motion.div>
                        )}
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${
                        activeEvent === index ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {event.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-all duration-300 ${
                      activeEvent === index 
                        ? 'text-orange-600 transform translate-x-1' 
                        : 'text-gray-400 group-hover:text-orange-400'
                    }`} />
                  </div>
                </div>
                
                {/* Timeline Connector */}
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-orange-200 to-gray-200" />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <motion.div
                key={activeEvent}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={timelineEvents[activeEvent].image}
                  alt={timelineEvents[activeEvent].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div 
                animate={{ 
                  y: [-5, 5, -5],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut"
                }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg"
              >
                {React.createElement(timelineEvents[activeEvent].icon, { className: "h-8 w-8 text-orange-600" })}
              </motion.div>

              {/* Year Badge */}
              <motion.div 
                key={`year-${activeEvent}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-6 bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full shadow-lg"
              >
                <span className="text-2xl font-bold">{timelineEvents[activeEvent].year}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Achievements Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">Our Journey in Numbers</h3>
            <p className="text-orange-100 text-lg">
              Every number tells a story of trust, quality, and love shared across generations.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors duration-300">
                  <achievement.icon className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 1 + index * 0.1, type: "spring", bounce: 0.3 }}
                  className="text-3xl lg:text-4xl font-bold mb-2"
                >
                  {achievement.number}
                </motion.div>
                <p className="text-orange-100 font-medium">{achievement.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Be Part of Our Story
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have made our pickles a cherished part of their dining table. 
            Your story with us starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
              Explore Our Products
            </Button>
            <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              Read More Stories
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}