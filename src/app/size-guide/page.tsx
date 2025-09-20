"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Package, Scale, Ruler } from "lucide-react"

export default function SizeGuidePage() {
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
                <Ruler className="mr-3 h-8 w-8" />
                Product Size Guide
              </CardTitle>
              <p className="text-orange-100">Find the perfect size for your needs</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Our Product Sizes</h2>
                  <p className="text-gray-700 mb-4">
                    At NaniMade, we offer our authentic pickles in various sizes to suit your needs, 
                    whether you're trying our products for the first time or stocking up for your family. 
                    Here's a guide to help you choose the right size.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Package className="mr-2 h-6 w-6 text-orange-600" />
                    Pickle Jar Sizes
                  </h2>
                  
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="border border-orange-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                      <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-orange-800">250g</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Small Jar</h3>
                      <p className="text-gray-600 text-sm">
                        Perfect for individuals or couples trying our pickles for the first time
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="font-semibold text-orange-600">Ideal for:</p>
                        <ul className="text-gray-700 text-sm mt-2 space-y-1">
                          <li>• 2-3 servings</li>
                          <li>• 2-3 weeks of regular use</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border-2 border-orange-500 rounded-lg p-6 text-center bg-orange-50 relative">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        MOST POPULAR
                      </div>
                      <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-white">500g</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Medium Jar</h3>
                      <p className="text-gray-600 text-sm">
                        Great for families of 3-4 members or regular pickle lovers
                      </p>
                      <div className="mt-4 pt-4 border-t border-orange-200">
                        <p className="font-semibold text-orange-600">Ideal for:</p>
                        <ul className="text-gray-700 text-sm mt-2 space-y-1">
                          <li>• 4-6 servings</li>
                          <li>• 3-4 weeks of regular use</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="border border-orange-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                      <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-orange-800">1kg</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Large Jar</h3>
                      <p className="text-gray-600 text-sm">
                        Perfect for large families or gifting to friends and relatives
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="font-semibold text-orange-600">Ideal for:</p>
                        <ul className="text-gray-700 text-sm mt-2 space-y-1">
                          <li>• 8-10 servings</li>
                          <li>• 6-8 weeks of regular use</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <Scale className="mr-2 h-6 w-6 text-orange-600" />
                    Nutritional Information
                  </h2>
                  <p className="text-gray-700 mb-4">
                    All our pickle jars contain the same delicious recipe, regardless of size. 
                    Here's the nutritional information per 100g serving:
                  </p>
                  
                  <div className="bg-orange-50 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-lg text-orange-800 mb-4">Per 100g Serving</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-orange-600">120</p>
                        <p className="text-gray-600 text-sm">Calories</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-orange-600">1.2g</p>
                        <p className="text-gray-600 text-sm">Protein</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-orange-600">0.8g</p>
                        <p className="text-gray-600 text-sm">Fat</p>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-orange-600">28g</p>
                        <p className="text-gray-600 text-sm">Carbs</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Storage Instructions</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-5 rounded-lg border border-green-200">
                      <h3 className="font-bold text-green-800 mb-2">Before Opening</h3>
                      <ul className="text-green-700 space-y-2">
                        <li>• Store in a cool, dry place</li>
                        <li>• Keep away from direct sunlight</li>
                        <li>• Best consumed within 12 months</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-blue-800 mb-2">After Opening</h3>
                      <ul className="text-blue-700 space-y-2">
                        <li>• Refrigerate after opening</li>
                        <li>• Consume within 6 months</li>
                        <li>• Use a clean, dry spoon</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help Choosing?</h2>
                  <p className="text-gray-700 mb-4">
                    Not sure which size is right for you? Our customer service team is here to help. 
                    Consider these factors when choosing:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                    <li>Number of people in your household</li>
                    <li>Frequency of pickle consumption</li>
                    <li>Storage space availability</li>
                    <li>Budget considerations</li>
                    <li>Gifting purposes</li>
                  </ul>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-5 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Pro Tip</h3>
                    <p>
                      If you're new to our pickles, start with a smaller size to discover your favorite 
                      varieties. Once you've found your favorites, stock up with larger jars for better value!
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