"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Heart, 
  Award, 
  Shield, 
  Clock,
  Users,
  Star,
  Leaf,
  Crown,
  Truck,
  CheckCircle
} from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every jar is handcrafted with the same care and affection Nani put into her original recipes.",
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    textColor: "text-red-600"
  },
  {
    icon: Clock,
    title: "70+ Years Legacy",
    description: "Traditional recipes passed down through three generations, preserving authentic Bengali flavors.",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-600"
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Pure ingredients with no artificial preservatives, colors, or chemicals. Just nature's goodness.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Hand-picked Malda mangoes and authentic spices ensure consistent premium quality in every jar.",
    color: "from-purple-500 to-indigo-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600"
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    description: "Direct from our kitchen to your doorstep with careful packaging to maintain freshness.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    icon: Users,
    title: "Family Trusted",
    description: "Trusted by 10,000+ families across India who love the authentic taste of tradition.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600"
  }
]

const stats = [
  { icon: Crown, number: "10,000+", label: "Happy Families", color: "text-yellow-600" },
  { icon: CheckCircle, number: "50,000+", label: "Jars Delivered", color: "text-green-600" },
  { icon: Star, number: "4.9/5", label: "Average Rating", color: "text-orange-600" },
  { icon: Clock, number: "70+", label: "Years of Heritage", color: "text-purple-600" }
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Crown className="h-4 w-4 mr-2" />
            Why Choose NaniMade
          </span>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            The Taste of
            <span className="block text-orange-600">Authentic Tradition</span>
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Experience the difference that comes from generations of perfected recipes, 
            premium ingredients, and unwavering commitment to quality.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.textColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Trusted by Thousands of Families
            </h3>
            <p className="text-orange-100 text-lg max-w-2xl mx-auto">
              Join our growing family of satisfied customers who have made 
              NaniMade a part of their daily meals and special occasions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-orange-100 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to Taste the Tradition?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the authentic flavors that have been bringing families together for generations. 
            Order now and become part of the NaniMade family.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Heart className="h-5 w-5 mr-2" />
              Shop Now & Taste Tradition
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}