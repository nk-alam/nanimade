"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
              <p className="text-orange-100">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                  <p className="text-gray-700 mb-4">
                    Welcome to NaniMade ("we," "our," or "us"). These Terms of Service ("Terms") 
                    govern your access to and use of our website, products, and services. By accessing 
                    or using our website and services, you agree to be bound by these Terms and our 
                    Privacy Policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Products and Services</h2>
                  <p className="text-gray-700 mb-4">
                    We offer a range of authentic handmade pickles and related products. All products 
                    are subject to availability, and we reserve the right to discontinue any product 
                    at any time. Product descriptions, prices, and availability are subject to change 
                    without notice.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Ordering and Payment</h2>
                  <p className="text-gray-700 mb-4">
                    By placing an order, you agree to provide accurate and complete information. 
                    We accept various payment methods including credit/debit cards, UPI, and other 
                    digital payment options. All payments are processed securely through our payment 
                    partners.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Shipping and Delivery</h2>
                  <p className="text-gray-700 mb-4">
                    We strive to deliver your orders promptly. Shipping times may vary based on your 
                    location and product availability. Risk of loss and title for products pass to you 
                    upon our delivery to the carrier.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Returns and Refunds</h2>
                  <p className="text-gray-700 mb-4">
                    We want you to be completely satisfied with your purchase. If you're not satisfied, 
                    you may return unopened products within 7 days of delivery for a full refund. 
                    Please contact our customer service for return instructions.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                  <p className="text-gray-700 mb-4">
                    All content on our website, including text, graphics, logos, images, and software, 
                    is the property of NaniMade and protected by intellectual property laws. You may 
                    not use our content without our express written permission.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                  <p className="text-gray-700 mb-4">
                    To the fullest extent permitted by law, NaniMade shall not be liable for any 
                    indirect, incidental, special, consequential, or punitive damages, or any loss 
                    of profits or revenues.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
                  <p className="text-gray-700 mb-4">
                    We reserve the right to modify these Terms at any time. Changes will be effective 
                    immediately upon posting on our website. Your continued use of our services after 
                    any changes constitutes your acceptance of the modified Terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-gray-800">
                      <span className="font-semibold">Email:</span> info@nanimade.com
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold">Phone:</span> +91 9876543210
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold">Address:</span> Malda, West Bengal, India
                    </p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}