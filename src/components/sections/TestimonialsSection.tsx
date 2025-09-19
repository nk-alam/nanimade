"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    rating: 5,
    text: "The authentic taste of Malda mangoes in every bite! NaniMade's pickles remind me of my grandmother's homemade pickles. The quality is exceptional and the delivery was prompt.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    product: "Traditional Mango Pickle"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi, NCR",
    rating: 5,
    text: "Being from Bengal, I was skeptical about ordering pickles online. But NaniMade exceeded my expectations! The taste is exactly like what we get in Kolkata. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    product: "Spicy Mixed Pickle"
  },
  {
    id: 3,
    name: "Anita Devi",
    location: "Bangalore, Karnataka",
    rating: 5,
    text: "I've been ordering from NaniMade for over a year now. The consistency in taste and quality is remarkable. My family loves the sweet mango chutney - it's our favorite!",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    product: "Sweet Mango Chutney"
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Pune, Maharashtra",
    rating: 5,
    text: "The premium gift box was perfect for Diwali gifts. All my relatives were impressed with the taste and packaging. NaniMade has become our go-to brand for authentic pickles.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    product: "Premium Gift Box"
  },
  {
    id: 5,
    name: "Meera Patel",
    location: "Ahmedabad, Gujarat",
    rating: 5,
    text: "As someone who loves spicy food, their spicy mixed pickle is perfect! The balance of spices is just right - not too overpowering but enough to satisfy your taste buds.",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    product: "Spicy Mixed Pickle"
  },
  {
    id: 6,
    name: "Suresh Reddy",
    location: "Hyderabad, Telangana",
    rating: 5,
    text: "The traditional mango pickle is absolutely divine! It pairs perfectly with our South Indian meals. The 1kg jar lasted just a week because everyone in the family loved it so much!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    product: "Traditional Mango Pickle"
  }
]

interface TestimonialCardProps {
  testimonial: typeof testimonials[0]
  index: number
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6 space-y-4">
          {/* Quote Icon */}
          <div className="flex justify-between items-start">
            <Quote className="h-8 w-8 text-orange-200 flex-shrink-0" />
            <div className="flex items-center">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-700 italic leading-relaxed">
            "{testimonial.text}"
          </p>

          {/* Product */}
          <div className="inline-block bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
            {testimonial.product}
          </div>

          {/* Customer Info */}
          <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
              <p className="text-sm text-gray-600">{testimonial.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const currentTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy customers 
            have to say about their NaniMade experience.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentTestimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>

          {/* Navigation */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === index 
                        ? "bg-orange-600 w-8" 
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12 border-t border-gray-200"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
            <div className="text-gray-600">Repeat Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">24hrs</div>
            <div className="text-gray-600">Fast Delivery</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready to taste the difference?
          </h3>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
            Order Now & Join Our Happy Customers
          </Button>
        </motion.div>
      </div>
    </section>
  )
}