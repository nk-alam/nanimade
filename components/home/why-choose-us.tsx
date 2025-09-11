'use client'

import { Shield, Truck, Leaf, Award, Clock, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Made with all-natural ingredients without any artificial preservatives or colors.',
    color: 'text-green-600 bg-green-100'
  },
  {
    icon: Shield,
    title: 'Quality Assured',
    description: 'Every jar goes through rigorous quality checks to ensure the best taste and safety.',
    color: 'text-blue-600 bg-blue-100'
  },
  {
    icon: Clock,
    title: 'Time-Tested Recipes',
    description: 'Traditional recipes passed down through generations, refined over 50+ years.',
    color: 'text-purple-600 bg-purple-100'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and safe delivery to your doorstep with proper packaging and care.',
    color: 'text-orange-600 bg-orange-100'
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized for excellence in taste and quality by food connoisseurs.',
    color: 'text-yellow-600 bg-yellow-100'
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Each jar is prepared with the same love and care as grandma used to make.',
    color: 'text-red-600 bg-red-100'
  }
]

export default function WhyChooseUs() {
  return (
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
            Why Choose NaniMade?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just making pickles, we're preserving traditions and creating memories. 
            Here's what makes our pickles special.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group"
            >
              <div className={`w-16 h-16 rounded-full ${feature.color} mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold font-quicksand text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-orange-600 text-white rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold font-quicksand mb-4">
            Taste the Tradition, Feel the Love
          </h3>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Join thousands of families who have made NaniMade pickles a part of their daily meals. 
            Experience the authentic taste that brings back childhood memories.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-orange-200">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">4.8/5</div>
              <div className="text-orange-200">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-orange-200">Years of Experience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}