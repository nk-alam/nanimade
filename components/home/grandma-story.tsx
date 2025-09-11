'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Heart, Award, Users, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function GrandmaStory() {
  const stats = [
    { icon: Heart, label: 'Years of Tradition', value: '50+' },
    { icon: Award, label: 'Awards Won', value: '12+' },
    { icon: Users, label: 'Happy Families', value: '10K+' },
    { icon: Clock, label: 'Hours of Love', value: '∞' },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-bold font-quicksand text-gray-900 mb-6">
                Grandma's Legacy Lives On
              </h2>
              
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed mb-8">
                <p>
                  In the heart of Malda, where the sweetest mangoes ripen under the Bengal sun, 
                  our grandmother began her journey of preserving flavors and traditions over five decades ago.
                </p>
                
                <p>
                  What started as a small kitchen experiment with her secret blend of spices and 
                  hand-picked mangoes has now become a cherished family legacy. Each jar of 
                  NaniMade pickle carries the essence of her love, care, and time-tested recipes.
                </p>
                
                <p>
                  Today, we continue her tradition with the same dedication to quality, 
                  using only the finest ingredients and following her exact methods. 
                  Every bite tells the story of our heritage and brings families together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/about">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                    Read Our Full Story
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" size="lg">
                    Shop Our Products
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 bg-orange-50 rounded-lg"
                  >
                    <stat.icon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold font-quicksand text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Story Images */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/5702794/pexels-photo-5702794.jpeg"
                  alt="Traditional pickle making"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Image 1 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -top-8 -left-8 w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-white"
              >
                <Image
                  src="https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg"
                  alt="Fresh mangoes"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Floating Image 2 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-8 w-40 h-32 rounded-xl overflow-hidden shadow-lg border-4 border-white"
              >
                <Image
                  src="https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg"
                  alt="Pickle jars"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-orange-400 rounded-full opacity-20" />
              <div className="absolute bottom-12 left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-30" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}