"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingCart, 
  Eye,
  Heart,
  Grid,
  List,
  SlidersHorizontal
} from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { Product, ProductVariant } from "@/types/database"

interface ProductWithVariants extends Product {
  variants: ProductVariant[]
}

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Best Rating" },
]

const CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "mango-pickles", name: "Mango Pickles" },
  { id: "mixed-pickles", name: "Mixed Pickles" },
  { id: "seasonal-pickles", name: "Seasonal Pickles" },
  { id: "gift-sets", name: "Gift Sets" },
]

// Mock data - replace with API call
const mockProducts: ProductWithVariants[] = [
  {
    id: "1",
    name: "Traditional Mango Pickle",
    slug: "traditional-mango-pickle",
    description: "Authentic Malda mango pickle made with traditional spices and methods passed down through generations.",
    short_description: "Classic Malda mango pickle with authentic spices",
    category_id: "mango-pickles",
    images: ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80"],
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
    ]
  },
  // Add more mock products...
  {
    id: "2",
    name: "Spicy Mixed Pickle",
    slug: "spicy-mixed-pickle", 
    description: "A fiery blend of seasonal vegetables pickled with aromatic spices for the perfect kick.",
    short_description: "Fiery blend of vegetables and authentic spices",
    category_id: "mixed-pickles",
    images: ["https://images.unsplash.com/photo-1609501676725-7186f529ada5?w=500&q=80"],
    base_price: 329,
    compare_at_price: 429,
    sku: "MP-002",
    stock_quantity: 30,
    low_stock_threshold: 10,
    weight: 250,
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
    variants: [
      { 
        id: "4", 
        name: "250g", 
        price: 329, 
        weight: 250,
        product_id: "2",
        sku: "MP-002-250",
        stock_quantity: 30,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01"
      },
      { 
        id: "5", 
        name: "500g", 
        price: 599, 
        weight: 500,
        product_id: "2",
        sku: "MP-002-500",
        stock_quantity: 20,
        is_active: true,
        created_at: "2024-01-01",
        updated_at: "2024-01-01"
      }
    ]
  }
]

interface ProductCardProps {
  product: ProductWithVariants
  viewMode: 'grid' | 'list'
}

function ProductCard({ product, viewMode }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discountPercentage = selectedVariant.compare_at_price 
    ? Math.round(((selectedVariant.compare_at_price - selectedVariant.price) / selectedVariant.compare_at_price) * 100)
    : 0

  const rating = 4.8 // Mock rating
  const reviewsCount = 127 // Mock reviews count

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <div className="relative w-48 h-48 flex-shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
            {discountPercentage > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                {discountPercentage}% OFF
              </span>
            )}
          </div>
          
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between h-full">
              <div className="space-y-2 flex-1">
                <h3 className="text-xl font-bold text-gray-900 hover:text-orange-600 transition-colors">
                  <Link href={`/products/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>
                
                <p className="text-gray-600">{product.short_description}</p>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(rating) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {rating} ({reviewsCount} reviews)
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-2 py-1 text-xs rounded border transition-colors ${
                        selectedVariant.id === variant.id
                          ? 'bg-orange-600 text-white border-orange-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-orange-600'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between items-end ml-6">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>

                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(selectedVariant.price)}
                    </span>
                    {selectedVariant.compare_at_price && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(selectedVariant.compare_at_price)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/products/${product.slug}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {discountPercentage}% OFF
          </span>
        )}

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md transition-all hover:bg-white"
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link href={`/products/${product.slug}`} className="flex-1">
            <Button size="sm" variant="secondary" className="w-full bg-white/90 backdrop-blur-sm hover:bg-white">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </Link>
          <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      <CardContent className="p-3 md:p-4 space-y-3 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[2.5rem] md:min-h-[3rem]">
            <Link href={`/products/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          
          <p className="text-xs md:text-sm text-gray-600 line-clamp-3 mt-1 min-h-[3rem] md:min-h-[3.5rem]">
            {product.short_description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 md:h-4 md:w-4 ${
                  i < Math.floor(rating) 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 whitespace-nowrap">
            {rating} ({reviewsCount})
          </span>
        </div>

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
                </button>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              {selectedVariant.weight}g jar
            </div>
          </div>
        )}

        <div className="space-y-2 mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base md:text-lg font-bold text-gray-900">
                {formatPrice(selectedVariant.price)}
              </span>
              {selectedVariant.compare_at_price && (
                <span className="text-xs md:text-sm text-gray-500 line-through">
                  {formatPrice(selectedVariant.compare_at_price)}
                </span>
              )}
            </div>
          </div>
          {discountPercentage > 0 && (
            <div className="flex justify-end">
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Save ₹{(selectedVariant.compare_at_price || 0) - selectedVariant.price}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<ProductWithVariants[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<ProductWithVariants[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [isLoading, setIsLoading] = useState(false)

  // Filter and sort products
  useEffect(() => {
    let filtered = products

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category_id === selectedCategory)
    }

    // Filter by price range
    filtered = filtered.filter(product => {
      const minPrice = Math.min(...product.variants.map(v => v.price))
      return minPrice >= priceRange[0] && minPrice <= priceRange[1]
    })

    // Sort products
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "price-low":
        filtered.sort((a, b) => {
          const aMin = Math.min(...a.variants.map(v => v.price))
          const bMin = Math.min(...b.variants.map(v => v.price))
          return aMin - bMin
        })
        break
      case "price-high":
        filtered.sort((a, b) => {
          const aMax = Math.max(...a.variants.map(v => v.price))
          const bMax = Math.max(...b.variants.map(v => v.price))
          return bMax - aMax
        })
        break
      case "featured":
      default:
        filtered.sort((a, b) => {
          if (a.is_featured && !b.is_featured) return -1
          if (!a.is_featured && b.is_featured) return 1
          return 0
        })
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, sortBy, priceRange])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our authentic collection of handcrafted pickles, made with traditional recipes from the heart of Malda.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
                
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-orange-50 border'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setPriceRange([0, 2000])
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6' 
              : 'space-y-4'
          }`}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductCard product={product} viewMode={viewMode} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}