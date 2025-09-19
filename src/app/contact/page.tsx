"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  Users,
  Heart
} from "lucide-react"
import toast from "react-hot-toast"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Kitchen",
    details: ["Malda, West Bengal 732101", "India"],
    color: "blue"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 98765 43210", "+91 87654 32109"],
    color: "green"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@nanimade.com", "support@nanimade.com"],
    color: "orange"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Sat: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
    color: "purple"
  }
]

const faqs = [
  {
    question: "What makes NaniMade pickles special?",
    answer: "Our pickles are made using traditional recipes passed down for three generations, with hand-picked Malda mangoes and pure mustard oil. No artificial preservatives or colors are used."
  },
  {
    question: "How long do the pickles last?",
    answer: "Our pickles have a shelf life of 12 months when stored properly. Once opened, consume within 3-4 months for best taste."
  },
  {
    question: "Do you offer bulk orders?",
    answer: "Yes, we offer bulk orders for events, restaurants, and corporate gifting. Contact us for special pricing and customization options."
  },
  {
    question: "Can I visit your production facility?",
    answer: "We offer guided tours of our facility in Malda by appointment. Contact us to schedule a visit and see how your favorite pickles are made!"
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Implement actual form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Thank you! We'll get back to you within 24 hours.")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              Get in Touch
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              We'd Love to
              <span className="block text-orange-600">Hear From You</span>
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed">
              Whether you have questions about our products, want to share feedback, 
              or just want to say hello, we're here to help!
            </p>
          </motion.div>

          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-${info.color}-50`}>
                      <info.icon className={`h-8 w-8 text-${info.color}-600`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 text-sm leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form & FAQ */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <Send className="h-6 w-6 text-orange-600 mr-2" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this about?"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={4}
                        required
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 hover:bg-orange-700 h-12 text-lg font-medium"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending Message...
                        </div>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="h-6 w-6 text-orange-600 mr-2" />
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  Quick answers to common questions about our products and services.
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Additional Contact Options */}
              <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    Need Immediate Help?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    For urgent inquiries or order-related issues, you can reach us directly:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 text-green-600 mr-2" />
                      <span className="font-medium">WhatsApp:</span>
                      <span className="ml-2 text-gray-700">+91 98765 43210</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-medium">Priority Email:</span>
                      <span className="ml-2 text-gray-700">urgent@nanimade.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
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
              Visit Our Heritage Kitchen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the authentic process of pickle making and taste fresh samples 
              right from our kitchen in Malda.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card>
              <CardContent className="p-8">
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Interactive map coming soon</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Malda, West Bengal, India
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Getting Here</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Our facility is easily accessible by road from Kolkata (approximately 350km). 
                      The nearest railway station is Malda Town, about 15km away.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What to Expect</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Guided tours include the production process, tasting session, and 
                      opportunity to meet our master chefs. Tours must be scheduled in advance.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}