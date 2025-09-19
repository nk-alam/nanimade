"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Star, ShoppingCart, Eye, Heart } from "lucide-react"
import { formatPrice } from "@/lib/utils"

// Mock data - replace with real data from Supabase
const featuredProducts = [
  {
    id: "1",
    name: "Traditional Mango Pickle",
    slug: "traditional-mango-pickle",
    short_description: "Classic Malda mango pickle with authentic spices",
    images: ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80"],
    base_price: 299,
    compare_at_price: 399,
    rating: 4.8,
    reviews_count: 127,
    is_featured: true,
    variants: [
      { id: "1", name: "250g", price: 299, weight: 250 },
      { id: "2", name: "500g", price: 549, weight: 500 },
      { id: "3", name: "1kg", price: 999, weight: 1000 }
    ]
  },
  {
    id: "2", 
    name: "Spicy Mixed Pickle",
    slug: "spicy-mixed-pickle",
    short_description: "Fiery blend of vegetables and authentic spices",
    images: ["https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=500&q=80"],
    base_price: 329,
    compare_at_price: 429,
    rating: 4.7,
    reviews_count: 98,
    is_featured: true,
    variants: [
      { id: "1", name: "250g", price: 329, weight: 250 },
      { id: "2", name: "500g", price: 599, weight: 500 }
    ]
  },
  {
    id: "3",
    name: "Sweet Mango Chutney", 
    slug: "sweet-mango-chutney",
    short_description: "Sweet and tangy mango chutney perfect for meals",
    images: ["https://images.unsplash.com/photo-1575932444877-5106bee2a599?w=500&q=80"],
    base_price: 279,
    compare_at_price: 349,
    rating: 4.9,
    reviews_count: 156,
    is_featured: true,
    variants: [
      { id: "1", name: "250g", price: 279, weight: 250 },
      { id: "2", name: "500g", price: 499, weight: 500 }
    ]
  },
  {
    id: "4",
    name: "Premium Gift Box",
    slug: "premium-gift-box", 
    short_description: "Curated selection of our finest pickles",
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80"],
    base_price: 1299,
    compare_at_price: 1599,
    rating: 5.0,
    reviews_count: 73,
    is_featured: true,
    variants: [
      { id: "1", name: "Gift Set", price: 1299, weight: 1000 }
    ]
  }
]

interface ProductCardProps {
  product: typeof featuredProducts[0]
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discountPercentage = product.compare_at_price 
    ? Math.round(((product.compare_at_price - selectedVariant.price) / product.compare_at_price) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="h-full flex flex-col"
    >
      <Card 
        className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                {discountPercentage}% OFF
              </span>
            )}
            {product.is_featured && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md transition-all hover:bg-white"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            className="absolute bottom-3 left-3 right-3 flex gap-2"
          >
            <Link href={`/products/${product.slug}`} className="flex-1">
              <Button size="sm" variant="secondary" className="w-full bg-white/90 backdrop-blur-sm hover:bg-white text-xs md:text-sm">
                <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                <span className="hidden sm:inline">View</span>
              </Button>
            </Link>
            <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700 text-xs md:text-sm">
              <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1" />
              <span className="hidden sm:inline">Add</span>
            </Button>
          </motion.div>
        </div>

        <CardContent className="p-3 md:p-4 space-y-3 flex-1 flex flex-col">
          {/* Product Title */}
          <div className="flex-1">
            <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[2.5rem] md:min-h-[3rem]">
              {product.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-600 line-clamp-3 mt-1 min-h-[3rem] md:min-h-[3.5rem]">
              {product.short_description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 md:h-4 md:w-4 ${
                    i < Math.floor(product.rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 whitespace-nowrap">
              {product.rating} ({product.reviews_count})
            </span>
          </div>

          {/* Variant Selection */}
          {product.variants.length > 1 && (
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 block">Choose Size:</label>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`relative px-2.5 py-1.5 text-xs font-medium rounded-lg border-2 transition-all duration-200 min-w-[50px] text-center ${
                      selectedVariant.id === variant.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-600 shadow-md transform scale-105 z-10'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700'
                    }`}
                  >
                    <span className="relative z-10">{variant.name}</span>
                    {selectedVariant.id === variant.id && (
                      <motion.div
                        layoutId={`selected-variant-${product.id}`}
                        className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-md"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                {selectedVariant.weight}g jar
              </div>
            </div>
          )}

          {/* Price */}
          <div className="space-y-2 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base md:text-lg font-bold text-gray-900">
                  {formatPrice(selectedVariant.price)}
                </span>
                {product.compare_at_price && (
                  <span className="text-xs md:text-sm text-gray-500 line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
              </div>
            </div>
            {discountPercentage > 0 && (
              <div className="flex justify-end">
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Save ₹{product.compare_at_price - selectedVariant.price}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved pickles, carefully crafted with the finest ingredients 
            and traditional recipes from Malda.
          </p>
        </motion.div>

        {/* Products Grid - 2 on mobile, 3 on tablet, 4 on PC */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/products">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}