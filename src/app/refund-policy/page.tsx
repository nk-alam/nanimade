"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { RotateCcw, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function RefundPolicyPage() {
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
              <CardTitle className="text-3xl font-bold flex items-center">
                <RotateCcw className="mr-3 h-8 w-8" />
                Refund Policy
              </CardTitle>
              <p className="text-orange-100">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to You</h2>
                  <p className="text-gray-700 mb-4">
                    At NaniMade, we are committed to providing you with the highest quality authentic 
                    pickles made with traditional recipes. We want you to be completely satisfied with 
                    your purchase. If for any reason you're not happy with your order, we're here to help.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="mr-2 h-6 w-6 text-green-600" />
                    Eligibility for Refund
                  </h2>
                  <p className="text-gray-700 mb-4">
                    You may be eligible for a refund if:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>The product is damaged or defective upon arrival</li>
                    <li>The product is different from what was ordered</li>
                    <li>The product has expired or is near expiry</li>
                    <li>The packaging is damaged and affects product quality</li>
                  </ul>
                  
                  <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                    <h3 className="font-bold text-green-800 mb-2">7-Day Return Window</h3>
                    <p className="text-green-700">
                      You have 7 days from the date of delivery to initiate a return or refund request.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Refundable Items</h2>
                  <p className="text-gray-700 mb-4">
                    Certain items are non-refundable due to hygiene and safety reasons:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Opened or partially consumed products</li>
                    <li>Products past their expiration date (unless received that way)</li>
                    <li>Custom or personalized orders</li>
                    <li>Digital products or gift cards</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="mr-2 h-6 w-6 text-orange-600" />
                    Refund Process
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-2 mr-4 mt-1">
                        <span className="text-orange-800 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Contact Us</h3>
                        <p className="text-gray-700">
                          Reach out to our customer service team within 7 days of delivery with your 
                          order details and reason for return.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-2 mr-4 mt-1">
                        <span className="text-orange-800 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Return Authorization</h3>
                        <p className="text-gray-700">
                          We'll provide you with a Return Authorization Number (RAN) and instructions 
                          for returning the product.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-2 mr-4 mt-1">
                        <span className="text-orange-800 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Return Shipping</h3>
                        <p className="text-gray-700">
                          Pack the item securely and ship it back to us using the provided address. 
                          For damaged/defective items, we'll cover return shipping costs.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-2 mr-4 mt-1">
                        <span className="text-orange-800 font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Inspection</h3>
                        <p className="text-gray-700">
                          Our quality team will inspect the returned item to verify the issue.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-2 mr-4 mt-1">
                        <span className="text-orange-800 font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Refund Processing</h3>
                        <p className="text-gray-700">
                          Once approved, refunds are processed within 5-7 business days to your original 
                          payment method.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <AlertTriangle className="mr-2 h-6 w-6 text-yellow-600" />
                    Important Notes
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h3 className="font-bold text-yellow-800 mb-2">Original Packaging</h3>
                      <p className="text-yellow-700">
                        Please return items in their original packaging whenever possible to ensure 
                        product safety during transit.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-blue-800 mb-2">Refund Method</h3>
                      <p className="text-blue-700">
                        Refunds will be issued to the original payment method. Processing times may 
                        vary depending on your payment provider.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h3 className="font-bold text-purple-800 mb-2">Damaged Items</h3>
                      <p className="text-purple-700">
                        If you receive a damaged item, please contact us immediately with photos of 
                        both the item and packaging. We'll arrange for a replacement or refund.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about our refund policy or need to initiate a return, 
                    please contact our customer service team:
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-gray-800">
                      <span className="font-semibold">Email:</span> returns@nanimade.com
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold">Phone:</span> +91 9876543210
                    </p>
                    <p className="text-gray-800">
                      <span className="font-semibold">Timing:</span> Monday to Saturday, 9:00 AM to 6:00 PM
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