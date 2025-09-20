"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ChevronDown, HelpCircle, Mail, Phone } from "lucide-react"

const faqData = [
  {
    category: "Ordering & Payment",
    questions: [
      {
        question: "How do I place an order?",
        answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You'll need to create an account or sign in to complete your purchase."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit and debit cards, UPI payments, net banking, and popular digital wallets. All transactions are secured with SSL encryption."
      },
      {
        question: "Is it safe to use my credit card on your website?",
        answer: "Absolutely. We use industry-standard SSL encryption to protect your payment information. We do not store your credit card details on our servers."
      }
    ]
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        question: "How long does delivery take?",
        answer: "Delivery typically takes 2-7 business days depending on your location. Metro cities usually receive orders within 2-4 days, while other areas may take 4-7 days."
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free shipping on all orders above ₹500. For orders below ₹500, a nominal shipping charge of ₹50 applies."
      },
      {
        question: "Can I track my order?",
        answer: "Yes, once your order is dispatched, you'll receive a tracking number via email and SMS. You can track your order status in real-time."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 7-day return window from the date of delivery. You can return unopened products for a full refund if they are damaged, defective, or different from what was ordered."
      },
      {
        question: "How do I initiate a return?",
        answer: "Contact our customer service team within 7 days of delivery with your order details and reason for return. We'll provide you with a Return Authorization Number and instructions."
      },
      {
        question: "How long does it take to process a refund?",
        answer: "Once we receive and inspect the returned item, refunds are processed within 5-7 business days to your original payment method."
      }
    ]
  },
  {
    category: "Product Information",
    questions: [
      {
        question: "Are your pickles vegetarian?",
        answer: "Yes, all our pickles are 100% vegetarian and made with natural ingredients. We do not use any non-vegetarian additives or preservatives."
      },
      {
        question: "How long do your pickles last?",
        answer: "Our pickles have a shelf life of 12 months from the date of manufacturing when unopened. Once opened, they should be refrigerated and consumed within 6 months."
      },
      {
        question: "Do you use preservatives?",
        answer: "We use minimal preservatives as required by food safety regulations. Our pickles are made with traditional recipes using natural ingredients and spices."
      },
      {
        question: "Are your products gluten-free?",
        answer: "Yes, all our pickle products are gluten-free. However, please check individual product descriptions for specific dietary information."
      }
    ]
  },
  {
    category: "Account & Support",
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click on the 'Sign In' button at the top right corner of our website and select 'Create Account'. Fill in your details and verify your email to get started."
      },
      {
        question: "How can I contact customer support?",
        answer: "You can reach us via email at support@nanimade.com or call us at +91 9876543210. Our support team is available Monday to Saturday, 9:00 AM to 6:00 PM."
      },
      {
        question: "Can I change my delivery address after placing an order?",
        answer: "If your order hasn't been shipped yet, we can update the delivery address. Please contact our customer service team immediately with your order number and new address."
      }
    ]
  }
]

export default function FAQPage() {
  const [openQuestions, setOpenQuestions] = useState<{[key: string]: boolean}>({})

  const toggleQuestion = (categoryId: number, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <HelpCircle className="mr-3 text-orange-600" />
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Find answers to common questions about our products, orders, and services
            </p>
          </div>

          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                    <CardTitle className="text-2xl font-bold">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {category.questions.map((faq, questionIndex) => {
                        const key = `${categoryIndex}-${questionIndex}`
                        const isOpen = openQuestions[key] || false
                        
                        return (
                          <div key={questionIndex} className="p-6">
                            <button
                              className="flex justify-between items-start w-full text-left"
                              onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                            >
                              <h3 className="font-semibold text-lg text-gray-900 pr-4">
                                {faq.question}
                              </h3>
                              <ChevronDown 
                                className={`h-5 w-5 text-orange-600 flex-shrink-0 mt-1 transition-transform duration-200 ${
                                  isOpen ? 'rotate-180' : ''
                                }`} 
                              />
                            </button>
                            
                            {isOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 pl-2"
                              >
                                <p className="text-gray-700">
                                  {faq.answer}
                                </p>
                              </motion.div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Still Need Help */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Our customer support team is here to help you with any questions or concerns you may have.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@nanimade.com</span>
              </div>
            </div>
            <p className="text-orange-200 text-sm mt-4">
              Monday to Saturday, 9:00 AM to 6:00 PM
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
