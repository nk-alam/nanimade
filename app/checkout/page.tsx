'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, CreditCard, Truck, Shield, MapPin, Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'

export default function CheckoutPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('razorpay')
  const [sameAsShipping, setSameAsShipping] = useState(true)
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  })
  
  const [billingAddress, setBillingAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India'
  })

  const [orderNotes, setOrderNotes] = useState('')

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/checkout')
      return
    }
    
    if (items.length === 0) {
      router.push('/cart')
      return
    }

    // Pre-fill user data if available
    if (session.user) {
      setShippingAddress(prev => ({
        ...prev,
        fullName: session.user.name || '',
        email: session.user.email || ''
      }))
    }
  }, [session, items.length, router])

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 500 ? 0 : 50
  const tax = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + shipping + tax

  const handleShippingChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }))
    
    if (sameAsShilling) {
      setBillingAddress(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleBillingChange = (field: string, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }))
  }

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked)
    if (checked) {
      setBillingAddress(shippingAddress)
    }
  }

  const handlePlaceOrder = async () => {
    setIsLoading(true)
    
    try {
      // Validate required fields
      const requiredShippingFields = ['fullName', 'phone', 'email', 'addressLine1', 'city', 'state', 'postalCode']
      const missingFields = requiredShippingFields.filter(field => !shippingAddress[field as keyof typeof shippingAddress])
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required shipping details.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate order number
      const orderNumber = `NM${Date.now()}`
      
      toast({
        title: "Order placed successfully!",
        description: `Your order ${orderNumber} has been confirmed. You'll receive a confirmation email shortly.`,
      })
      
      // Clear cart and redirect
      clearCart()
      router.push(`/order-confirmation?order=${orderNumber}`)
      
    } catch (error) {
      toast({
        title: "Order failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!session || items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold font-quicksand text-gray-900">
            Checkout
          </h1>
          <p className="text-gray-600 mt-2">
            Complete your order in just a few steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={shippingAddress.fullName}
                        onChange={(e) => handleShippingChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => handleShippingChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingAddress.email}
                      onChange={(e) => handleShippingChange('email', e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="addressLine1">Address Line 1 *</Label>
                    <Input
                      id="addressLine1"
                      value={shippingAddress.addressLine1}
                      onChange={(e) => handleShippingChange('addressLine1', e.target.value)}
                      placeholder="Street address, P.O. Box, company name"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="addressLine2">Address Line 2</Label>
                    <Input
                      id="addressLine2"
                      value={shippingAddress.addressLine2}
                      onChange={(e) => handleShippingChange('addressLine2', e.target.value)}
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => handleShippingChange('city', e.target.value)}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => handleShippingChange('state', e.target.value)}
                        placeholder="State"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                        placeholder="Postal Code"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Billing Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="w-5 h-5 mr-2 text-orange-600" />
                    Billing Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sameAsShipping"
                      checked={sameAsShipping}
                      onCheckedChange={handleSameAsShippingChange}
                    />
                    <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                  </div>

                  {!sameAsShipping && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billingFullName">Full Name *</Label>
                          <Input
                            id="billingFullName"
                            value={billingAddress.fullName}
                            onChange={(e) => handleBillingChange('fullName', e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingPhone">Phone Number *</Label>
                          <Input
                            id="billingPhone"
                            type="tel"
                            value={billingAddress.phone}
                            onChange={(e) => handleBillingChange('phone', e.target.value)}
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="billingEmail">Email Address *</Label>
                        <Input
                          id="billingEmail"
                          type="email"
                          value={billingAddress.email}
                          onChange={(e) => handleBillingChange('email', e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="billingAddressLine1">Address Line 1 *</Label>
                        <Input
                          id="billingAddressLine1"
                          value={billingAddress.addressLine1}
                          onChange={(e) => handleBillingChange('addressLine1', e.target.value)}
                          placeholder="Street address, P.O. Box, company name"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="billingCity">City *</Label>
                          <Input
                            id="billingCity"
                            value={billingAddress.city}
                            onChange={(e) => handleBillingChange('city', e.target.value)}
                            placeholder="City"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingState">State *</Label>
                          <Input
                            id="billingState"
                            value={billingAddress.state}
                            onChange={(e) => handleBillingChange('state', e.target.value)}
                            placeholder="State"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="billingPostalCode">Postal Code *</Label>
                          <Input
                            id="billingPostalCode"
                            value={billingAddress.postalCode}
                            onChange={(e) => handleBillingChange('postalCode', e.target.value)}
                            placeholder="Postal Code"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-orange-600" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="razorpay" id="razorpay" />
                      <Label htmlFor="razorpay" className="flex-1 cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Razorpay</div>
                            <div className="text-sm text-gray-500">Credit/Debit Card, UPI, Net Banking</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-green-600" />
                            <span className="text-xs text-green-600">Secure</span>
                          </div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                      <RadioGroupItem value="cod" id="cod" disabled />
                      <Label htmlFor="cod" className="flex-1 cursor-not-allowed">
                        <div>
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-gray-500">Pay when you receive (Coming Soon)</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order Notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Any special instructions for your order..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows={3}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="font-quicksand">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={item.product.featured_image || 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg'}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded"
                          />
                          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-orange-600">
                            {item.quantity}
                          </Badge>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.variant.name} - {item.variant.weight}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ₹{item.variant.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (5%)</span>
                      <span>₹{tax}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <p className="text-sm text-orange-800">
                        Add ₹{500 - subtotal} more to get free shipping!
                      </p>
                    </div>
                  )}

                  {/* Place Order Button */}
                  <Button
                    size="lg"
                    className="w-full bg-orange-600 hover:bg-orange-700"
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : `Place Order - ₹${total}`}
                  </Button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Secure SSL encrypted checkout</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}