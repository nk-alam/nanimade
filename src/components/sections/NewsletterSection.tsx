"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Mail, Gift, Star, CheckCircle } from "lucide-react"
import toast from "react-hot-toast"

const benefits = [
  "🥭 Exclusive mango pickle recipes",
  "🎁 Special offers and discounts",
  "📦 Early access to new products",
  "👨‍🍳 Cooking tips from our masters",
  "📰 Stories from Malda's heritage"
]

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Please enter your email address")
      return
    }

    setIsLoading(true)
    
    try {
      // TODO: Implement newsletter subscription API
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setIsSubscribed(true)
      toast.success("Welcome to the NaniMade family! 🥭")
      setEmail("")
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubscribed) {
    return (
      <section className="py-16 bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to the Family! 🎉
            </h2>
            
            <p className="text-lg text-white/90 mb-8">
              Thank you for subscribing! Get ready to receive exclusive recipes, 
              stories, and special offers from the heart of Malda.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-white/90"
              >
                Explore Products
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
              >
                Read Our Recipes
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gradient-to-br from-orange-600 via-orange-500 to-yellow-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-20 left-10 opacity-20"
      >
        <Gift className="h-16 w-16 text-white" />
      </motion.div>
      
      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 opacity-20"
      >
        <Star className="h-12 w-12 text-white" />
      </motion.div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                <Mail className="h-4 w-4 mr-2" />
                Join Our Community
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white"
              >
                Get Exclusive Recipes & Stories
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-white/90 leading-relaxed"
              >
                Join thousands of pickle lovers and get access to traditional recipes, 
                cooking tips, and exclusive offers delivered straight to your inbox.
              </motion.p>
            </div>

            {/* Benefits List */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center text-white/90"
                >
                  <CheckCircle className="h-5 w-5 text-white mr-3 flex-shrink-0" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center space-x-4 pt-4"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm" />
                ))}
              </div>
              <div className="text-white/90">
                <div className="font-semibold">2,500+ subscribers</div>
                <div className="text-sm">Love our recipes</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <form onSubmit={handleSubscribe} className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Subscribe Now
                </h3>
                <p className="text-white/80 text-sm">
                  Get started with your first recipe in your inbox!
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/90 backdrop-blur-sm border-white/30 text-gray-900 placeholder:text-gray-600 h-12"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full bg-white text-orange-600 hover:bg-white/90 h-12 text-lg font-semibold\"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-600 mr-2" />
                      Subscribing...
                    </div>
                  ) : (
                    "Get Free Recipes"
                  )}
                </Button>
              </div>

              <p className="text-xs text-white/70 text-center">
                By subscribing, you agree to receive marketing emails from NaniMade. 
                You can unsubscribe at any time.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}