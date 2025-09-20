"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { 
  CreditCard, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  CheckCircle,
  ArrowLeft,
  Gift,
  Percent,
  Star
} from "lucide-react"
import { formatPrice } from "@/lib/utils"
import toast from "react-hot-toast"

interface CartItem {
  id: string
  product: {
    id: string
    name: string
    slug: string
    images: string[]
  }
  variant: {
    id: string
    name: string
    price: number
    compare_at_price?: number
    weight: number
  }
  quantity: number
}

interface Address {
  id: string
  name: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  pincode: string
  phone: string
  is_default: boolean
}

interface UpsellProduct {
  id: string
  name: string
  slug: string
  images: string[]
  price: number
  compare_at_price?: number
  discount_percentage?: number
  rating: number
  reviews_count: number
}

// Mock data
const mockCartItems: CartItem[] = [
  {
    id: "1",
    product: {
      id: "1",
      name: "Traditional Mango Pickle",
      slug: "traditional-mango-pickle",
      images: ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&q=80"]
    },
    variant: {
      id: "1",
      name: "250g",
      price: 299,
      compare_at_price: 399,
      weight: 250
    },
    quantity: 2
  }
]

const mockAddresses: Address[] = [
  {
    id: "1",
    name: "Home",
    address_line_1: "123 Main Street",
    address_line_2: "Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    phone: "+91 9876543210",
    is_default: true
  }
]

const upsellProducts: UpsellProduct[] = [
  {
    id: "2",
    name: "Spicy Mixed Pickle",
    slug: "spicy-mixed-pickle",
    images: ["https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=200&q=80"],
    price: 329,
    compare_at_price: 429,
    discount_percentage: 23,
    rating: 4.7,
    reviews_count: 98
  },
  {
    id: "3",
    name: "Sweet Mango Chutney",
    slug: "sweet-mango-chutney", 
    images: ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&q=80"],
    price: 279,
    compare_at_price: 349,
    discount_percentage: 20,
    rating: 4.9,
    reviews_count: 156
  },
  {
    id: "4",
    name: "Premium Gift Box",
    slug: "premium-gift-box",
    images: ["https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=200&q=80"],
    price: 1299,
    compare_at_price: 1599,
    discount_percentage: 19,
    rating: 5.0,
    reviews_count: 73
  }
]

export default function CheckoutPage() {
  const { data: session } = useSession()
  const router = useRouter()
  
  const [step, setStep] = useState(1) // 1: Address, 2: Review & Upsell, 3: Payment
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [selectedAddress, setSelectedAddress] = useState<Address>(mockAddresses[0])
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [showUpsell, setShowUpsell] = useState(true)
  const [addedUpsells, setAddedUpsells] = useState<string[]>([])

  // Calculations
  const subtotal = cartItems.reduce((total, item) => total + (item.variant.price * item.quantity), 0)
  const upsellTotal = addedUpsells.reduce((total, productId) => {
    const product = upsellProducts.find(p => p.id === productId)
    return total + (product?.price || 0)
  }, 0)
  const totalBeforeShipping = subtotal + upsellTotal
  const shippingCost = totalBeforeShipping >= 500 ? 0 : 50
  const total = totalBeforeShipping + shippingCost

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/checkout')
    }
  }, [session, router])

  const handleAddUpsell = (productId: string) => {
    setAddedUpsells([...addedUpsells, productId])
    toast.success("Added to your order!")
  }

  const handleRemoveUpsell = (productId: string) => {
    setAddedUpsells(addedUpsells.filter(id => id !== productId))
    toast.success("Removed from order")
  }

  const handlePayment = async () => {
    setIsLoading(true)
    
    try {
      // Create payment order
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          receipt: `order_${Date.now()}`
        })
      })

      const { orderId, key } = await response.json()

      // Initialize Razorpay
      const options = {
        key,
        amount: total * 100,
        currency: 'INR',
        name: 'NaniMade',
        description: 'Order Payment',
        order_id: orderId,
        handler: function (response: any) {
          // Handle successful payment
          toast.success("Payment successful!")
          router.push(`/order-confirmation?payment_id=${response.razorpay_payment_id}`)
        },
        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
          contact: selectedAddress.phone
        },
        theme: {
          color: '#ea580c'
        }
      }

      // Note: In production, load Razorpay script dynamically
      // const rzp = new (window as any).Razorpay(options)
      // rzp.open()
      
      // Mock successful payment for demo
      setTimeout(() => {
        toast.success("Payment successful!")
        router.push("/order-confirmation")
      }, 2000)

    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-gray-900">NaniMade</span>
            </div>

            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            {[
              { number: 1, title: "Address", completed: step > 1 },
              { number: 2, title: "Review", completed: step > 2 },
              { number: 3, title: "Payment", completed: step > 3 }
            ].map((stepItem, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepItem.completed 
                    ? 'bg-green-600 text-white' 
                    : step === stepItem.number 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepItem.completed ? <CheckCircle className="h-4 w-4" /> : stepItem.number}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{stepItem.title}</span>
                {index < 2 && <div className="w-8 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Address Selection */}
              {step === 1 && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        Delivery Address
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          onClick={() => setSelectedAddress(address)}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedAddress.id === address.id 
                              ? 'border-orange-600 bg-orange-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900">{address.name}</h3>
                              <p className="text-gray-600 text-sm mt-1">
                                {address.address_line_1}
                                {address.address_line_2 && `, ${address.address_line_2}`}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {address.city}, {address.state} - {address.pincode}
                              </p>
                              <p className="text-gray-600 text-sm">📞 {address.phone}</p>
                              {address.is_default && (
                                <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mt-1">
                                  Default
                                </span>
                              )}
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedAddress.id === address.id 
                                ? 'border-orange-600 bg-orange-600' 
                                : 'border-gray-300'
                            }`}>
                              {selectedAddress.id === address.id && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Address
                      </Button>
                    </CardContent>
                  </Card>

                  <div className="mt-6 flex justify-end">
                    <Button 
                      onClick={() => setStep(2)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Continue to Review
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Review & Upsell */}
              {step === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Order Review */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Review</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                            <p className="text-sm text-gray-600">
                              {item.variant.name} • Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="font-medium">
                            {formatPrice(item.variant.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Upsell Section */}
                  {showUpsell && (
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center">
                            <Gift className="h-5 w-5 mr-2 text-orange-600" />
                            Complete Your Order
                          </CardTitle>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setShowUpsell(false)}
                          >
                            Skip
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">
                          Customers who bought this also loved these products
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {upsellProducts.map((product) => {
                            const isAdded = addedUpsells.includes(product.id)
                            
                            return (
                              <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  width={120}
                                  height={120}
                                  className="w-full aspect-square object-cover rounded-lg mb-3"
                                />
                                
                                <h3 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h3>
                                
                                <div className="flex items-center mb-2">
                                  <div className="flex">
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
                                  <span className="text-xs text-gray-600 ml-1">
                                    ({product.reviews_count})
                                  </span>
                                </div>
                                
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center space-x-1">
                                    <span className="font-bold text-gray-900">
                                      {formatPrice(product.price)}
                                    </span>
                                    {product.compare_at_price && (
                                      <span className="text-xs text-gray-500 line-through">
                                        {formatPrice(product.compare_at_price)}
                                      </span>
                                    )}
                                  </div>
                                  {product.discount_percentage && (
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                      {product.discount_percentage}% OFF
                                    </span>
                                  )}
                                </div>

                                <Button
                                  onClick={() => 
                                    isAdded 
                                      ? handleRemoveUpsell(product.id)
                                      : handleAddUpsell(product.id)
                                  }
                                  variant={isAdded ? "outline" : "default"}
                                  size="sm"
                                  className="w-full"
                                >
                                  {isAdded ? (
                                    <>
                                      <Minus className="h-3 w-3 mr-1" />
                                      Remove
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="h-3 w-3 mr-1" />
                                      Add to Order
                                    </>
                                  )}
                                </Button>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={() => setStep(3)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Payment Method
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div 
                          onClick={() => setPaymentMethod("razorpay")}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            paymentMethod === "razorpay" 
                              ? 'border-orange-600 bg-orange-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <CreditCard className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">Razorpay</h3>
                                <p className="text-sm text-gray-600">Cards, UPI, NetBanking, Wallets</p>
                              </div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              paymentMethod === "razorpay" 
                                ? 'border-orange-600 bg-orange-600' 
                                : 'border-gray-300'
                            }`}>
                              {paymentMethod === "razorpay" && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                              <Truck className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-500">Cash on Delivery</h3>
                              <p className="text-sm text-gray-400">Coming Soon</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                          <span>Your payment information is secure and encrypted</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6 flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button 
                      onClick={handlePayment}
                      disabled={isLoading}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Processing...
                        </div>
                      ) : (
                        `Pay ${formatPrice(total)}`
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={40}
                        height={40}
                        className="rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-600">
                          {item.variant.name} × {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        {formatPrice(item.variant.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Added Upsells */}
                {addedUpsells.length > 0 && (
                  <div className="border-t pt-3 space-y-3">
                    {addedUpsells.map((productId) => {
                      const product = upsellProducts.find(p => p.id === productId)
                      if (!product) return null
                      
                      return (
                        <div key={productId} className="flex items-center space-x-3">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </p>
                            <p className="text-xs text-green-600">Added item</p>
                          </div>
                          <span className="text-sm font-medium">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                )}

                <hr />

                {/* Pricing Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {upsellTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Added items</span>
                      <span>{formatPrice(upsellTotal)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className={shippingCost === 0 ? "text-green-600" : ""}>
                      {shippingCost === 0 ? "Free" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  
                  <hr />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">Free shipping included</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">7-day return policy</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">100% authentic products</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}