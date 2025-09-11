'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { useCart } from '@/lib/hooks/use-cart'
import { useSession } from 'next-auth/react'
import { useToast } from '@/hooks/use-toast'

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems, isLoading } = useCart()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)

  const subtotal = getTotalPrice()
  const shipping = subtotal >= 500 ? 0 : 50
  const tax = Math.round(subtotal * 0.05) // 5% tax
  const total = subtotal + shipping + tax - discount

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    await updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = async (itemId: string) => {
    await removeItem(itemId)
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    })
  }

  const handleApplyPromo = () => {
    // Simple promo code logic - in real app, this would be validated on server
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(Math.round(subtotal * 0.1))
      toast({
        title: "Promo code applied!",
        description: "You saved 10% on your order.",
      })
    } else if (promoCode.toLowerCase() === 'save50') {
      setDiscount(50)
      toast({
        title: "Promo code applied!",
        description: "You saved ₹50 on your order.",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold font-quicksand text-gray-900 mb-2">
                Your cart is empty
              </h1>
              <p className="text-gray-600">
                Looks like you haven't added any items to your cart yet.
              </p>
            </div>
            <Link href="/products">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold font-quicksand text-gray-900">
            Shopping Cart ({getTotalItems()} items)
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.product.featured_image || 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg'}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-orange-600 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.variant.name} - {item.variant.weight}
                        </p>
                        {item.variant.compare_at_price > item.variant.price && (
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {Math.round(((item.variant.compare_at_price - item.variant.price) / item.variant.compare_at_price) * 100)}% OFF
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || isLoading}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.variant.stock_quantity || isLoading}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          ₹{item.variant.price * item.quantity}
                        </div>
                        {item.variant.compare_at_price > item.variant.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ₹{item.variant.compare_at_price * item.quantity}
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="font-quicksand">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Promo Code</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleApplyPromo}>
                      <Tag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>₹{tax}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
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

                {/* Checkout Button */}
                <div className="space-y-2">
                  {session ? (
                    <Link href="/checkout">
                      <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/auth/signin?callbackUrl=/checkout">
                      <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                        Sign in to Checkout
                      </Button>
                    </Link>
                  )}
                  <Link href="/products">
                    <Button variant="outline" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="text-center pt-4">
                  <p className="text-xs text-gray-500">
                    🔒 Secure checkout with SSL encryption
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}