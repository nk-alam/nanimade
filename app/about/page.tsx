'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Award, Users, Clock, Leaf, Shield, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every jar is prepared with the same love and care as grandma used to make.',
      color: 'text-red-600 bg-red-100'
    },
    {
      icon: Leaf,
      title: '100% Natural',
      description: 'Made with all-natural ingredients without any artificial preservatives.',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Every jar goes through rigorous quality checks to ensure the best taste.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence in taste and quality by food connoisseurs.',
      color: 'text-yellow-600 bg-yellow-100'
    }
  ]

  const timeline = [
    {
      year: '1970',
      title: 'The Beginning',
      description: 'Grandma started making pickles in her small kitchen in Malda with traditional family recipes.'
    },
    {
      year: '1985',
      title: 'Local Recognition',
      description: 'Our pickles became famous in the local community for their authentic taste and quality.'
    },
    {
      year: '2000',
      title: 'Expanding Reach',
      description: 'Started supplying to local stores and markets across West Bengal.'
    },
    {
      year: '2015',
      title: 'Going Digital',
      description: 'Launched our online presence to share our authentic pickles with the world.'
    },
    {
      year: '2024',
      title: 'NaniMade Today',
      description: 'Serving thousands of families worldwide while maintaining our traditional recipes.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-4 bg-orange-100 text-orange-800">Our Story</Badge>
              <h1 className="text-4xl md:text-6xl font-bold font-quicksand text-gray-900 mb-6">
                From Grandma's Kitchen to Your Table
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                For over 50 years, we've been preserving the authentic taste of traditional pickles, 
                crafted with love in the heart of Malda, the mango city of India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Shop Our Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/5702794/pexels-photo-5702794.jpeg"
                  alt="Traditional pickle making"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-orange-600">50+</div>
                  <div className="text-sm text-gray-600">Years of<br />Tradition</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-quicksand text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do, from sourcing ingredients to delivering the final product.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-full ${value.color} mx-auto mb-6 flex items-center justify-center`}>
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold font-quicksand text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-quicksand text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to serving families worldwide, here's our story of growth and tradition.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-orange-100 text-orange-800">
                        {item.year}
                      </Badge>
                      <h3 className="text-xl font-bold font-quicksand text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-4 h-4 bg-orange-600 rounded-full flex-shrink-0 relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-quicksand mb-6">
              Meet Our Family
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
              Behind every jar of NaniMade pickle is a dedicated team that shares the same passion 
              for quality and tradition that started with our grandmother.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">50+ Team Members</h3>
                <p className="opacity-90">Dedicated craftspeople preserving tradition</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Star className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">10,000+ Happy Customers</h3>
                <p className="opacity-90">Families who trust our authentic taste</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Clock className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-bold mb-2">3 Generations</h3>
                <p className="opacity-90">Of pickle-making expertise</p>
              </div>
            </div>

            <div className="mt-12">
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  Join Our Family
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}