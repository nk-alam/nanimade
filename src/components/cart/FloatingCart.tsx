"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { 
  X, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  Heart,
  Gift
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
  }
  quantity: number
}

interface RecommendedProduct {
  id: string
  name: string
  slug: string
  images: string[]
  price: number
  compare_at_price?: number
}

export default function FloatingCart({ 
  isOpen, 
  onClose,
  onCartUpdate
}: { 
  isOpen: boolean
  onClose: () => void
  onCartUpdate?: () => void
}) {
  const { data: session } = useSession()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [recommendedProducts] = useState<RecommendedProduct[]>([
    {
      id: "3",
      name: "Sweet Mango Chutney",
      slug: "sweet-mango-chutney",
      images: ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&q=80"],
      price: 279,
      compare_at_price: 349
    },
    {
      id: "4",
      name: "Premium Gift Box", 
      slug: "premium-gift-box",
      images: ["https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=200&q=80"],
      price: 1299,
      compare_at_price: 1599
    }
  ])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch cart items
  useEffect(() => {
    if (isOpen && session) {
      fetchCartItems()
    }
  }, [isOpen, session])

  const fetchCartItems = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        setCartItems(data.cartItems || [])
      } else {
        toast.error('Failed to load cart items')
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
      toast.error('Failed to load cart')
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(itemId)
      return
    }

    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item_id: itemId, quantity: newQuantity })
      })

      if (response.ok) {
        const data = await response.json()
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId ? data.cartItem : item
          )
        )
        onCartUpdate?.()
        toast.success("Cart updated!")
      } else {
        toast.error("Failed to update cart")
      }
    } catch (error) {
      console.error('Error updating quantity:', error)
      toast.error("Failed to update cart")
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart?item_id=${itemId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
        onCartUpdate?.()
        toast.success("Item removed from cart")
      } else {
        toast.error("Failed to remove item")
      }
    } catch (error) {
      console.error('Error removing item:', error)
      toast.error("Failed to remove item")
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + (item.variant.price * item.quantity), 0)
  const savings = cartItems.reduce((total, item) => {
    const originalPrice = item.variant.compare_at_price || item.variant.price
    return total + ((originalPrice - item.variant.price) * item.quantity)
  }, 0)
  
  const shippingCost = subtotal >= 500 ? 0 : 50
  const total = subtotal + shippingCost

  if (!session) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-8 text-center">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Sign in to view cart</h3>
                <p className="text-gray-600 mb-6">
                  Please sign in to access your shopping cart and continue with your purchase.
                </p>
                <Link href="/auth/signin">
                  <Button className="w-full">Sign In</Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50"
        >
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart ({cartItems.length})</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
                  <p className="text-gray-500">Start adding some delicious pickles!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center space-x-3 p-3 border rounded-lg"
                      >
                        {/* Product Image */}
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link 
                            href={`/products/${item.product.slug}`}
                            onClick={onClose}
                            className="text-sm font-medium text-gray-900 hover:text-orange-600 line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-gray-500 mt-1">
                            {item.variant.name}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-sm font-medium text-gray-900">
                              {formatPrice(item.variant.price)}
                            </span>
                            {item.variant.compare_at_price && (
                              <span className="text-xs text-gray-500 line-through ml-1">
                                {formatPrice(item.variant.compare_at_price)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end space-y-2">
                          <div className="flex items-center border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 py-1 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}

              {/* Upselling Section */}
              {cartItems.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Gift className="h-4 w-4 mr-2 text-orange-500" />
                    You might also like
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {recommendedProducts.map((product) => (
                      <div key={product.id} className="border rounded-lg p-3">
                        <div className="relative w-full h-24 mb-2">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <h4 className="text-xs font-medium text-gray-900 line-clamp-1 mb-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <span className="text-sm font-medium text-gray-900">
                              {formatPrice(product.price)}
                            </span>
                            {product.compare_at_price && (
                              <span className="text-xs text-gray-500 line-through">
                                {formatPrice(product.compare_at_price)}
                              </span>
                            )}
                          </div>
                          <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="border-t p-4 bg-gray-50">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>You Save</span>
                      <span className="font-medium">-{formatPrice(savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/cart" onClick={onClose}>
                  <Button className="w-full mb-2 bg-orange-600 hover:bg-orange-700">
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={onClose}>
                  <Button variant="outline" className="w-full">
                    Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}