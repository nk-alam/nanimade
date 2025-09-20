"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { motion, AnimatePresence } from "framer-motion"
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Check,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap,
  Clock,
  Award,
  Users,
  Sparkles,
  Leaf,
  Crown
} from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { Product, ProductVariant } from "@/types/database"
import toast from "react-hot-toast"

// Mock data - replace with API call
const mockProduct = {
  id: "1",
  name: "Traditional Mango Pickle",
  slug: "traditional-mango-pickle",
  description: `Our Traditional Mango Pickle is a testament to the authentic flavors of Malda, West Bengal. Made with hand-picked mangoes from the finest orchards, this pickle embodies generations of traditional recipe-making expertise.

Each jar contains carefully selected mango pieces that are sun-dried to perfection and blended with our secret spice mix. The process takes over 48 hours, ensuring that every piece absorbs the rich flavors of mustard oil, turmeric, red chili, and other aromatic spices.

Perfect as a side dish with rice, roti, or paratha, this pickle adds the perfect tangy and spicy kick to any meal. No artificial preservatives or colors are used - just pure, natural ingredients that have been trusted for generations.`,
  short_description: "Classic Malda mango pickle with authentic spices",
  category_id: "mango-pickles",
  images: [
    "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80",
    "https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=800&q=80",
    "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=800&q=80"
  ],
  base_price: 299,
  compare_at_price: 399,
  sku: "MP-001",
  stock_quantity: 50,
  low_stock_threshold: 10,
  weight: 250,
  is_featured: true,
  is_active: true,
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
  meta_title: "Traditional Mango Pickle | NaniMade",
  meta_description: "Authentic Malda mango pickle made with traditional recipes",
  variants: [
    { 
      id: "1", 
      name: "250g", 
      price: 299, 
      compare_at_price: 399, 
      weight: 250,
      product_id: "1",
      sku: "MP-001-250",
      stock_quantity: 50,
      is_active: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    { 
      id: "2", 
      name: "500g", 
      price: 549, 
      compare_at_price: 699, 
      weight: 500,
      product_id: "1",
      sku: "MP-001-500",
      stock_quantity: 30,
      is_active: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    },
    { 
      id: "3", 
      name: "1kg", 
      price: 999, 
      compare_at_price: 1299, 
      weight: 1000,
      product_id: "1",
      sku: "MP-001-1000",
      stock_quantity: 20,
      is_active: true,
      created_at: "2024-01-01",
      updated_at: "2024-01-01"
    }
  ],
  reviews: [
    {
      id: "1",
      user: { name: "Priya Sharma", avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face" },
      rating: 5,
      title: "Absolutely authentic!",
      content: "This pickle tastes exactly like my grandmother's homemade pickle. The quality is exceptional and the delivery was prompt.",
      created_at: "2024-01-10",
      is_verified: true
    },
    {
      id: "2", 
      user: { name: "Rajesh Kumar", avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" },
      rating: 5,
      title: "Perfect with meals",
      content: "Great taste and perfect spice level. Goes well with rice and roti.",
      created_at: "2024-01-08",
      is_verified: true
    }
  ],
  related_products: [
    {
      id: "2",
      name: "Spicy Mixed Pickle", 
      slug: "spicy-mixed-pickle",
      images: ["https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=300&q=80"],
      base_price: 329,
      compare_at_price: 429
    }
  ]
}

export default function ProductPage() {
  const params = useParams()
  const [product] = useState(mockProduct)
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showStickyCart, setShowStickyCart] = useState(false)

  const discountPercentage = selectedVariant.compare_at_price 
    ? Math.round(((selectedVariant.compare_at_price - selectedVariant.price) / selectedVariant.compare_at_price) * 100)
    : 0

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length

  // Handle sticky cart visibility
  useEffect(() => {
    const handleScroll = () => {
      const productSection = document.getElementById('product-details')
      if (productSection) {
        const rect = productSection.getBoundingClientRect()
        setShowStickyCart(rect.bottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success(`Added ${quantity} × ${product.name} (${selectedVariant.name}) to cart!`)
    } catch (error) {
      toast.error("Failed to add to cart. Please try again.")
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleBuyNow = async () => {
    await handleAddToCart()
    // Redirect to checkout
    window.location.href = '/checkout'
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Breadcrumb */}
      <div className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <span className="text-orange-300">→</span>
            <Link href="/products" className="hover:text-orange-600 transition-colors">Products</Link>
            <span className="text-orange-300">→</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12" id="product-details">
          {/* Product Images */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-2xl group">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
              
              {/* Elegant Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:shadow-xl"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:shadow-xl"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </motion.button>
                </>
              )}

              {/* Premium Badges */}
              <div className="absolute top-6 left-6 space-y-3">
                {discountPercentage > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    {discountPercentage}% OFF
                  </motion.span>
                )}
                {product.is_featured && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  >
                    <Crown className="h-4 w-4 mr-1" />
                    Bestseller
                  </motion.span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-6 right-6 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:shadow-xl"
                >
                  <Heart className={`h-5 w-5 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'}`} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 hover:shadow-xl"
                >
                  <Share2 className="h-5 w-5 text-gray-600 hover:text-orange-600 transition-colors" />
                </motion.button>
              </div>

              {/* Quality Assurance Badge */}
              <motion.div 
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Leaf className="h-4 w-4" />
                  <span className="text-sm font-bold">100% Natural</span>
                </div>
              </motion.div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-3 transition-all duration-300 ${
                      selectedImageIndex === index 
                        ? 'border-orange-500 shadow-lg shadow-orange-200' 
                        : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {selectedImageIndex === index && (
                      <div className="absolute inset-0 bg-orange-500/20" />
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="space-y-4">
              {/* Heritage Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium border border-amber-200"
              >
                <Clock className="h-4 w-4 mr-2" />
                Traditional Recipe Since 1952
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight"
              >
                {product.name}
                <span className="block text-base md:text-lg font-normal text-orange-600 mt-1">
                  Made with Nani's Love ❤️
                </span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(averageRating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-base font-medium text-gray-900">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{product.reviews.length} reviews</span>
                </div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-base text-gray-700 leading-relaxed"
              >
                {product.short_description}
              </motion.p>
            </div>

            {/* Price Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 rounded-xl border border-orange-100"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(selectedVariant.price)}
                  </span>
                  {selectedVariant.compare_at_price && (
                    <div className="space-y-1">
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(selectedVariant.compare_at_price)}
                      </span>
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                        Save ₹{selectedVariant.compare_at_price - selectedVariant.price}!
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Inclusive of all taxes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Free shipping on orders above ₹500</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Variant Selection - Badge Style */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3"
            >
              <label className="text-base font-semibold text-gray-900">
                Choose Your Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const variantDiscount = variant.compare_at_price 
                    ? Math.round(((variant.compare_at_price - variant.price) / variant.compare_at_price) * 100)
                    : 0
                  
                  return (
                    <motion.button
                      key={variant.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                        selectedVariant.id === variant.id
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600 shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{variant.name}</span>
                        <span className="text-sm font-bold">
                          {formatPrice(variant.price)}
                        </span>
                        {variantDiscount > 0 && (
                          <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${
                            selectedVariant.id === variant.id 
                              ? 'bg-white text-orange-600' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {variantDiscount}% OFF
                          </span>
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
              <div className="text-sm text-gray-500">
                {selectedVariant.weight}g jar
              </div>
            </motion.div>

            {/* Quantity Selection */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-3"
            >
              <label className="text-base font-semibold text-gray-900">Quantity</label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </motion.button>
                  <span className="px-4 py-2 font-bold text-base text-gray-900 min-w-[40px] text-center">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-orange-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={quantity >= selectedVariant.stock_quantity}
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </motion.button>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <span className="text-sm">
                    {selectedVariant.stock_quantity > 10 
                      ? `✓ ${selectedVariant.stock_quantity} in stock` 
                      : `⚠️ Only ${selectedVariant.stock_quantity} left!`
                    }
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart || selectedVariant.stock_quantity === 0}
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isAddingToCart ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Adding to Cart...
                    </div>
                  ) : (
                    <>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart • {formatPrice(selectedVariant.price * quantity)}
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={handleBuyNow}
                  variant="outline"
                  className="flex-1 border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white h-12 text-base font-semibold transition-all duration-300"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Buy Now
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                <div className="text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full mb-2 group-hover:bg-blue-100 transition-colors">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-xs font-medium text-gray-900">Free Shipping</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-green-50 rounded-full mb-2 group-hover:bg-green-100 transition-colors">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-xs font-medium text-gray-900">100% Natural</div>
                </div>
                <div className="text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-orange-50 rounded-full mb-2 group-hover:bg-orange-100 transition-colors">
                    <RotateCcw className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-xs font-medium text-gray-900">Easy Returns</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Product Description */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                <Sparkles className="h-6 w-6 text-orange-600 mr-2" />
                Nani's Story & Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    Made with Love
                  </h3>
                  <div className="prose prose-lg text-gray-700">
                    {product.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-3 flex items-center">
                      <Award className="h-5 w-5 mr-2" />
                      Heritage Recipe
                    </h4>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      This recipe has been in our family for over 70 years, passed down from our beloved Nani. 
                      Every jar contains the same love and care that made our family gatherings special.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                      <Leaf className="h-5 w-5 mr-2" />
                      Natural Ingredients
                    </h4>
                    <p className="text-green-800 text-sm leading-relaxed">
                      Hand-picked Malda mangoes, pure mustard oil, organic spices, and traditional methods. 
                      No artificial preservatives, colors, or chemicals.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer Reviews */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Family Says</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {product.reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Image
                        src={review.user.avatar_url}
                        alt={review.user.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                          {review.is_verified && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < review.rating 
                                    ? 'fill-yellow-400 text-yellow-400' 
                                    : 'text-gray-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {new Date(review.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                        <p className="text-gray-700 leading-relaxed">{review.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sticky Add to Cart & Variation Selector (Mobile) */}
      <AnimatePresence>
        {showStickyCart && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-xl z-50 md:hidden"
          >
            {/* Variation Selector */}
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="flex items-center space-x-2 overflow-x-auto">
                <span className="text-xs text-gray-600 whitespace-nowrap">Size:</span>
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedVariant.id === variant.id
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-orange-100'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Add to Cart Section */}
            <div className="p-3">
              <div className="flex items-center space-x-3">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate">{product.name}</h3>
                  <p className="text-orange-600 font-bold text-sm">
                    {formatPrice(selectedVariant.price)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-2 text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1"
                      disabled={quantity >= selectedVariant.stock_quantity}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <Button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    {isAddingToCart ? (
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                    ) : (
                      <>
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}