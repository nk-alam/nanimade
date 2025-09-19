"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
  CheckCircle, 
  Download, 
  Truck, 
  MessageCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Star,
  Gift
} from "lucide-react"
import { formatPrice, formatDate } from "@/lib/utils"
import confetti from 'canvas-confetti'

interface OrderItem {
  id: string
  product_name: string
  variant_name: string
  quantity: number
  price: number
  image: string
}

interface Order {
  id: string
  order_number: string
  total_amount: number
  status: string
  payment_status: string
  estimated_delivery: string
  items: OrderItem[]
  shipping_address: {
    name: string
    address_line_1: string
    city: string
    state: string
    pincode: string
  }
}

// Mock order data
const mockOrder: Order = {
  id: "order_123",
  order_number: "NM2024001",
  total_amount: 648,
  status: "confirmed",
  payment_status: "paid",
  estimated_delivery: "2024-01-25",
  items: [
    {
      id: "1",
      product_name: "Traditional Mango Pickle",
      variant_name: "250g",
      quantity: 2,
      price: 299,
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=100&q=80"
    }
  ],
  shipping_address: {
    name: "John Doe",
    address_line_1: "123 Main Street, Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  }
}

const relatedProducts = [
  {
    id: "2",
    name: "Spicy Mixed Pickle",
    price: 329,
    compare_at_price: 429,
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=200&q=80",
    rating: 4.7
  },
  {
    id: "3", 
    name: "Sweet Mango Chutney",
    price: 279,
    compare_at_price: 349,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&q=80",
    rating: 4.9
  }
]

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const paymentId = searchParams.get('payment_id')
  const [order] = useState<Order>(mockOrder)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    if (showConfetti) {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      // Trigger a second burst
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        })
      }, 300)
      
      setShowConfetti(false)
    }
  }, [showConfetti])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Confirmed! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you for your order! We've received your payment and are preparing your delicious pickles for delivery.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order #{order.order_number}</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </CardTitle>
                  <p className="text-gray-600">
                    Placed on {formatDate(new Date())} • Total: {formatPrice(order.total_amount)}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.product_name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.product_name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.variant_name} • Quantity: {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Delivery Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Estimated Delivery</h3>
                      <div className="flex items-center space-x-2 text-green-600">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{formatDate(new Date(order.estimated_delivery))}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Standard delivery (3-5 business days)
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Delivery Address</h3>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-600 mt-0.5" />
                        <div className="text-sm text-gray-600">
                          <p className="font-medium text-gray-900">{order.shipping_address.name}</p>
                          <p>{order.shipping_address.address_line_1}</p>
                          <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Tracking */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: "Order Placed", time: "Just now", completed: true, current: true },
                      { status: "Payment Confirmed", time: "Processing", completed: false, current: false },
                      { status: "Preparing Order", time: "Within 2 hours", completed: false, current: false },
                      { status: "Shipped", time: "Within 24 hours", completed: false, current: false },
                      { status: "Delivered", time: formatDate(new Date(order.estimated_delivery)), completed: false, current: false }
                    ].map((step, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          step.completed 
                            ? 'bg-green-600 border-green-600' 
                            : step.current 
                              ? 'bg-orange-600 border-orange-600'
                              : 'border-gray-300'
                        }`}>
                          {step.completed && (
                            <CheckCircle className="h-3 w-3 text-white m-0.5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            step.completed ? 'text-green-600' : step.current ? 'text-orange-600' : 'text-gray-600'
                          }`}>
                            {step.status}
                          </p>
                          <p className="text-sm text-gray-500">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700">
                <Download className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
              <Link href="/dashboard/orders" className="flex-1">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Truck className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-900">Track Your Order</p>
                        <p className="text-sm text-blue-700">Get real-time updates</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Star className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-green-900">Rate & Review</p>
                        <p className="text-sm text-green-700">After you receive it</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Gift className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-purple-900">Refer & Earn</p>
                        <p className="text-sm text-purple-700">Get ₹100 for each referral</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Continue Shopping */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">You Might Also Like</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 text-sm truncate">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                          {product.compare_at_price && (
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(product.compare_at_price)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating) 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Add
                      </Button>
                    </div>
                  ))}
                  
                  <Link href="/products">
                    <Button className="w-full mt-4" variant="outline">
                      Continue Shopping
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Customer Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-medium text-orange-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-orange-700 mb-4">
                    Our customer support team is here to help you with any questions.
                  </p>
                  <Button variant="outline" size="sm" className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}