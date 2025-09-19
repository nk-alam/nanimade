"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Award, Users, Clock, MapPin } from "lucide-react"

const stats = [
  { icon: Award, label: "Years of Tradition", value: "25+" },
  { icon: Users, label: "Happy Customers", value: "500+" },
  { icon: Clock, label: "Hours of Preparation", value: "48" },
  { icon: MapPin, label: "From Malda", value: "100%" }
]

const values = [
  {
    title: "Authentic Recipes",
    description: "Traditional methods passed down through generations",
    icon: "🏺"
  },
  {
    title: "Premium Quality",
    description: "Only the finest mangoes and spices make it to our jars",
    icon: "⭐"
  },
  {
    title: "Handcrafted Love",
    description: "Every jar is prepared with care and attention to detail",
    icon: "❤️"
  },
  {
    title: "Natural & Pure",
    description: "No artificial preservatives or chemical additives",
    icon: "🌿"
  }
]

export default function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                Our Story
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900"
              >
                From Malda's Heart to Your Home
              </motion.h2>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4 text-gray-600 leading-relaxed"
              >
                <p>
                  NaniMade was born from a grandmother's kitchen in the mango-rich lands of Malda, 
                  West Bengal. For over 25 years, our family has been preserving the authentic 
                  taste of traditional Bengali pickles, using recipes that have been cherished 
                  for generations.
                </p>
                <p>
                  Every jar of NaniMade pickle is a testament to our commitment to quality and 
                  authenticity. We source the finest mangoes directly from Malda's orchards, 
                  ensuring that each pickle captures the true essence of this legendary fruit.
                </p>
              </motion.div>
            </div>

            {/* Values Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value, index) => (
                <div key={index} className="text-center p-4 bg-white/70 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl mb-2">{value.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{value.title}</h3>
                  <p className="text-xs text-gray-600">{value.description}</p>
                </div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Learn More About Us
              </Button>
            </motion.div>
          </motion.div>

          {/* Images */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80"
                    alt="Traditional pickle making"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=400&q=80"
                    alt="Fresh mango harvest"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1609501676725-7186f529ada5?w=400&q=80"
                    alt="Authentic spices"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80"
                    alt="Finished pickle jars"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">25+</div>
                <div className="text-xs text-gray-600">Years</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}