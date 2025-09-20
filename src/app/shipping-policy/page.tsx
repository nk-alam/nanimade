"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Truck, Clock, MapPin, Shield } from "lucide-react"

export default function ShippingPolicyPage() {
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
                <Truck className="mr-3 h-8 w-8" />
                Shipping Policy
              </CardTitle>
              <p className="text-orange-100">Last updated: {new Date().toLocaleDateString()}</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="mr-2 h-6 w-6 text-orange-600" />
                    Delivery Areas
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We currently deliver to all major cities and towns across India. For remote locations, 
                    delivery may take additional time. Please contact us if you're unsure about delivery 
                    availability to your area.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="mr-2 h-6 w-6 text-orange-600" />
                    Delivery Timeframes
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-orange-50 p-5 rounded-lg">
                      <h3 className="font-bold text-lg text-orange-800 mb-2">Metro Cities</h3>
                      <p className="text-orange-700">2-4 business days</p>
                    </div>
                    <div className="bg-amber-50 p-5 rounded-lg">
                      <h3 className="font-bold text-lg text-amber-800 mb-2">Other Cities</h3>
                      <p className="text-amber-700">4-7 business days</p>
                    </div>
                    <div className="bg-yellow-50 p-5 rounded-lg">
                      <h3 className="font-bold text-lg text-yellow-800 mb-2">Remote Areas</h3>
                      <p className="text-yellow-700">7-10 business days</p>
                    </div>
                    <div className="bg-green-50 p-5 rounded-lg">
                      <h3 className="font-bold text-lg text-green-800 mb-2">Express Delivery</h3>
                      <p className="text-green-700">1-2 business days (additional charges apply)</p>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Shipping Charges</h2>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                    <h3 className="font-bold text-lg text-green-800 mb-3">Free Shipping Offer</h3>
                    <p className="text-green-700 mb-3">
                      Enjoy free shipping on all orders above ₹500/- across India.
                    </p>
                    <p className="text-green-700">
                      For orders below ₹500/-, a nominal shipping charge of ₹50/- applies.
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Processing</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-2 mr-4">
                        <span className="text-orange-800 font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Order Confirmation</h3>
                        <p className="text-gray-700">Orders are processed within 1-2 business days</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-2 mr-4">
                        <span className="text-orange-800 font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Packing & Quality Check</h3>
                        <p className="text-gray-700">Each order is carefully packed to ensure freshness</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-2 mr-4">
                        <span className="text-orange-800 font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Dispatch</h3>
                        <p className="text-gray-700">Orders are dispatched through our trusted logistics partners</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-orange-100 rounded-full p-2 mr-4">
                        <span className="text-orange-800 font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Delivery</h3>
                        <p className="text-gray-700">Estimated delivery times as mentioned above</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="mr-2 h-6 w-6 text-orange-600" />
                    Packaging & Safety
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We take great care in packaging our products to ensure they reach you in perfect condition. 
                    Our packaging is designed to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Protect the product from damage during transit</li>
                    <li>Maintain freshness and quality</li>
                    <li>Prevent leakage or spillage</li>
                    <li>Provide clear product information</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking Your Order</h2>
                  <p className="text-gray-700 mb-4">
                    Once your order is dispatched, you'll receive a tracking number via email and SMS. 
                    You can track your order status in real-time through our website or the courier's 
                    tracking portal.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about our shipping policy or need assistance with your order, 
                    please contact our customer service team:
                  </p>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <p className="text-gray-800">
                      <span className="font-semibold">Email:</span> shipping@nanimade.com
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