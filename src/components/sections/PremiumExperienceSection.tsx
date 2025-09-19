"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { Sparkles, Shield, Truck, Phone, Gift, Leaf, Clock, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"

const premiumFeatures = [
  {
    icon: Leaf,
    title: "100% Natural Ingredients",
    description: "No artificial preservatives, colors, or flavors. Just pure, natural goodness.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: ChefHat,
    title: "Handcrafted with Care",
    description: "Each jar is carefully prepared by skilled artisans using traditional methods.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    color: "from-orange-500 to-red-600"
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Rigorous quality checks ensure every jar meets our highest standards.",
    image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=400&q=80",
    color: "from-blue-500 to-purple-600"
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    description: "Temperature-controlled packaging ensures freshness from our kitchen to yours.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80",
    color: "from-yellow-500 to-orange-600"
  }
]

const luxuryServices = [
  {
    icon: Gift,
    title: "Premium Gift Packaging",
    description: "Elegant packaging perfect for special occasions and gifting.",
    price: "Free with orders ₹999+"
  },
  {
    icon: Phone,
    title: "Personal Recipe Consultation",
    description: "Get personalized recipe suggestions from our culinary experts.",
    price: "Complimentary service"
  },
  {
    icon: Clock,
    title: "Express Delivery",
    description: "Same-day delivery available in select metros.",
    price: "₹99 extra"
  },
  {
    icon: Sparkles,
    title: "VIP Customer Support",
    description: "Dedicated support line for premium customers.",
    price: "24/7 availability"
  }
]

export default function PremiumExperienceSection() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [hoveredService, setHoveredService] = useState<number | null>(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set(event.clientX - centerX)
    y.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4 mr-2" />
            Premium Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Luxury Meets 
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent"> Tradition</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the perfect blend of traditional recipes and premium service. 
            Every detail is crafted to exceed your expectations.
          </p>
        </motion.div>

        {/* Interactive Premium Features */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`relative cursor-pointer group ${
                  activeFeature === index ? 'scale-105' : ''
                }`}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className={`p-6 rounded-2xl border-2 backdrop-blur-sm transition-all duration-500 ${
                  activeFeature === index 
                    ? 'bg-white/10 border-orange-400 ring-4 ring-orange-400/30 shadow-2xl' 
                    : 'bg-white/5 border-gray-600 hover:border-gray-500 hover:bg-white/8'
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <feature.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                        activeFeature === index ? 'text-orange-400' : 'text-white'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                      {activeFeature === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-gray-600"
                        >
                          <Button variant="outline" size="sm" className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white">
                            Learn More
                          </Button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D Interactive Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative perspective-1000"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
            >
              <motion.div
                key={activeFeature}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <Image
                  src={premiumFeatures[activeFeature].image}
                  alt={premiumFeatures[activeFeature].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div 
                style={{ translateZ: 50 }}
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 3, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut"
                }}
                className="absolute top-8 right-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full p-4 shadow-xl"
              >
                {React.createElement(premiumFeatures[activeFeature].icon, { className: "h-8 w-8 text-white" })}
              </motion.div>

              {/* Title Overlay */}
              <motion.div 
                style={{ translateZ: 30 }}
                key={`title-${activeFeature}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <h3 className="text-3xl font-bold text-white mb-2">
                  {premiumFeatures[activeFeature].title}
                </h3>
                <p className="text-gray-200">
                  {premiumFeatures[activeFeature].description}
                </p>
              </motion.div>

              {/* Sparkle Effects */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [0, Math.random() * 100 - 50],
                    y: [0, Math.random() * 100 - 50]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                  className="absolute w-2 h-2 bg-orange-400 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${20 + i * 10}%`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Luxury Services Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Exclusive <span className="text-orange-400">VIP Services</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Premium services designed to make your experience extraordinary and memorable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxuryServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="relative group"
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-500 h-full ${
                  hoveredService === index
                    ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400 scale-105 shadow-2xl'
                    : 'bg-white/5 border-gray-600 hover:border-gray-500'
                }`}>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                    hoveredService === index ? 'from-orange-400 to-red-400' : 'from-gray-600 to-gray-700'
                  } flex items-center justify-center mb-4 transition-all duration-300`}>
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h4 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                    hoveredService === index ? 'text-orange-400' : 'text-white'
                  }`}>
                    {service.title}
                  </h4>
                  
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className={`text-sm font-medium transition-colors duration-300 ${
                    hoveredService === index ? 'text-orange-300' : 'text-gray-400'
                  }`}>
                    {service.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 lg:p-12"
        >
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready for the Premium Experience?
          </h3>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Join our exclusive community and discover why discerning customers choose our premium service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              Upgrade to Premium
            </Button>
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Contact Concierge
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}