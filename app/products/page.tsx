'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Heart, Star, Eye, Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Product, ProductVariant, Category } from '@/lib/types'
import { useCart } from '@/lib/hooks/use-cart'
import { Skeleton } from '@/components/ui/skeleton'

interface ProductWithVariants extends Product {
  variants: ProductVariant[]
  category: Category
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductWithVariants[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')
  const [priceRange, setPriceRange] = useState<string>('all')
  const { addItem } = useCart()
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    const category = searchParams.get('category')
    if (category) {
      setSelectedCategory(category)
    }
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          variants:product_variants(*),
          category:categories(*)
        `)
        .eq('is_active', true)
        .order('sort_order')

      if (error) throw error
      setProducts(data as ProductWithVariants[])
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')

      if (error) throw error
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory
    
    const minPrice = product.variants?.reduce((min, variant) => 
      Math.min(min, variant.price), Infinity) || 0
    
    const matchesPrice = priceRange === 'all' ||
      (priceRange === 'under-200' && minPrice < 200) ||
      (priceRange === '200-500' && minPrice >= 200 && minPrice <= 500) ||
      (priceRange === 'above-500' && minPrice > 500)
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        const aMinPrice = a.variants?.reduce((min, v) => Math.min(min, v.price), Infinity) || 0
        const bMinPrice = b.variants?.reduce((min, v) => Math.min(min, v.price), Infinity) || 0
        return aMinPrice - bMinPrice
      case 'price-high':
        const aMaxPrice = a.variants?.reduce((max, v) => Math.max(max, v.price), 0) || 0
        const bMaxPrice = b.variants?.reduce((max, v) => Math.max(max, v.price), 0) || 0
        return bMaxPrice - aMaxPrice
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      default:
        return a.name.localeCompare(b.name)
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <Skeleton className="h-6 w-20" />
                </CardContent>
              </Card>
            ))}
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
          <h1 className="text-4xl font-bold font-quicksand text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600">
            Discover our authentic handmade pickles crafted with traditional recipes
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Filter */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-200">Under ₹200</SelectItem>
                <SelectItem value="200-500">₹200 - ₹500</SelectItem>
                <SelectItem value="above-500">Above ₹500</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index}
              onAddToCart={addItem}
            />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ 
  product, 
  index, 
  onAddToCart 
}: { 
  product: ProductWithVariants
  index: number
  onAddToCart: (product: Product, variant: ProductVariant, quantity?: number) => void
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

  const handleAddToCart = () => {
    if (currentVariant) {
      onAddToCart(product, currentVariant)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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

          {/* Category */}
          <p className="text-sm text-gray-500 mb-3">{product.category?.name}</p>

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
              onClick={handleAddToCart}
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