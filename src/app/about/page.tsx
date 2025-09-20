"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Heart, 
  Award, 
  Users, 
  Leaf, 
  Clock, 
  MapPin,
  Star,
  Crown,
  Sparkles
} from "lucide-react"

const teamMembers = [
  {
    name: "Nalini Devi",
    role: "Founder & Recipe Creator",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&h=300&fit=crop&crop=face",
    description: "Our beloved Nani, whose traditional recipes are the heart of our business."
  },
  {
    name: "Rajesh Kumar",
    role: "Master Chef",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Ensuring every jar meets Nani's standards of taste and quality."
  },
  {
    name: "Priya Sharma",
    role: "Quality Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Maintaining the highest standards in every step of production."
  }
]

const milestones = [
  { year: "1952", event: "Nani's first pickle recipe created", icon: Heart },
  { year: "1985", event: "Family business begins sharing with neighbors", icon: Users },
  { year: "2010", event: "First commercial production starts", icon: Award },
  { year: "2020", event: "Online presence established", icon: Sparkles },
  { year: "2024", event: "Serving 10,000+ happy families", icon: Crown }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1609501676725-7186f529ada5?w=1600&q=80"
            alt="Traditional pickle making"
            fill
            className="object-cover opacity-10"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Heart className="h-4 w-4 mr-2" />
              Our Heritage Story
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Three Generations of
              <span className="block text-orange-600">Love & Tradition</span>
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              From our beloved Nani&apos;s kitchen in Malda to your dining table, 
              we&apos;ve been preserving the authentic taste of Bengal for over 70 years.
            </p>
            
            <Link href="/products">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Taste Our Heritage
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Nani's Kitchen to Your Home
              </h2>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  It all started in 1952 when our beloved Nani, Nalini Devi, created her first 
                  mango pickle recipe in her small kitchen in Malda. What began as a way to 
                  preserve the abundant mango harvest soon became the neighborhood&apos;s favorite.
                </p>
                
                <p>
                  Word spread quickly about the incredible taste and quality of Nani&apos;s pickles. 
                  Friends and family would travel from distant places just to get a jar of her 
                  special creation. The secret? Pure love, traditional methods, and the finest 
                  mangoes from Malda&apos;s royal orchards.
                </p>
                
                <p>
                  Today, three generations later, we continue to honor Nani&apos;s legacy. Every jar 
                  is still made with the same care, using her original recipes and time-tested 
                  methods. We believe that food is love, and every product we create carries 
                  the warmth of our family tradition.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=600&q=80"
                  alt="Traditional pickle making process"
                  width={600}
                  height={400}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating badges */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg"
              >
                <Award className="h-8 w-8 text-orange-600" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg"
              >
                <Leaf className="h-8 w-8 text-green-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide us in preserving tradition while embracing innovation.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Made with Love",
                description: "Every jar is crafted with the same care and affection that Nani put into her original recipes.",
                color: "red"
              },
              {
                icon: Leaf,
                title: "100% Natural",
                description: "We use only the finest natural ingredients, with no artificial preservatives or additives.",
                color: "green"
              },
              {
                icon: Award,
                title: "Authentic Quality",
                description: "Traditional methods and recipes ensure the authentic taste that has been loved for generations.",
                color: "orange"
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-${value.color}-50`}>
                      <value.icon className={`h-8 w-8 text-${value.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
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
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey Through Time
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a small kitchen in Malda to serving families across India.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <div className="text-orange-600 font-bold text-lg mb-2">
                      {milestone.year}
                    </div>
                    <div className="text-gray-900 font-medium">
                      {milestone.event}
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <milestone.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Family
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The dedicated people who ensure every jar meets Nani&apos;s standards.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <div className="text-orange-600 font-medium mb-4">
                      {member.role}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Family Today
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Experience the authentic taste of tradition. Try our pickles and become part of our growing family.
            </p>
            <Link href="/products">
              <Button size="lg" variant="outline" className="bg-white text-orange-600 hover:bg-orange-50 border-white">
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}