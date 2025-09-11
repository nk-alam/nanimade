'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Product, ProductVariant } from '@/lib/types'
import { useCart } from '@/lib/hooks/use-cart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProductWithVariants extends Product {
  variants: ProductVariant[]
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductWithVariants[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          variants:product_variants(*)
        `)
        .eq('is_featured', true)
        .eq('is_active', true)
        .order('sort_order')
        .limit(8)

      if (error) throw error
      setProducts(data as ProductWithVariants[])
    } catch (error) {
      console.error('Error fetching featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (product: Product, variantId: string) => {
    const variant = product.variants?.find(v => v.id === variantId)
    if (variant) {
      await addItem(product, variant)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4" />
                <div className="bg-gray-200 h-4 rounded mb-2" />
                <div className="bg-gray-200 h-4 rounded w-2/3 mb-4" />
                <div className="bg-gray-200 h-8 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-quicksand text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular handmade pickles, crafted with love and traditional recipes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 px-8 py-3">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ 
  product, 
  index, 
  onAddToCart 
}: { 
  product: ProductWithVariants
  index: number
  onAddToCart: (product: Product, variantId: string) => void
}) {
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].id)
    }
  }, [product.variants])

  const currentVariant = product.variants?.find(v => v.id === selectedVariant)
  const hasDiscount = currentVariant && currentVariant.compare_at_price > currentVariant.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card 
        className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Product Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.featured_image || 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg'}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3">
              {hasDiscount && (
                <Badge className="bg-red-500 text-white mb-2">
                  {Math.round(((currentVariant.compare_at_price - currentVariant.price) / currentVariant.compare_at_price) * 100)}% OFF
                </Badge>
              )}
              {product.is_featured && (
                <Badge className="bg-orange-500 text-white">Featured</Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                <Heart className="w-4 h-4" />
              </Button>
              <Link href={`/products/${product.slug}`}>
                <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                  <Eye className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-600">(128 reviews)</span>
          </div>

          {/* Product Name */}
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-orange-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 1 && (
            <div className="mb-3">
              <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                <SelectTrigger className="w-full h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.variants.map((variant) => (
                    <SelectItem key={variant.id} value={variant.id}>
                      {variant.name} - {variant.weight}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            {currentVariant && (
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-gray-900">
                  ₹{currentVariant.price}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{currentVariant.compare_at_price}
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex w-full space-x-2">
            <Button
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              onClick={() => currentVariant && onAddToCart(product, currentVariant.id)}
              disabled={!currentVariant || currentVariant.stock_quantity === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Link href={`/products/${product.slug}`} className="flex-1">
              <Button variant="outline" className="w-full">
                Buy Now
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}