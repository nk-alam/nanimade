import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FunnelIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Layout from '@/components/Layout'
import ProductCard from '@/components/Product/ProductCard'
import { supabase } from '@/lib/supabase'
import { Product, Category } from '@/types'

interface ProductsPageProps {
  products: Product[]
  categories: Category[]
  totalProducts: number
  currentPage: number
  totalPages: number
}

const ProductsPage = ({ 
  products: initialProducts, 
  categories, 
  totalProducts, 
  currentPage, 
  totalPages 
}: ProductsPageProps) => {
  const router = useRouter()
  const [products, setProducts] = useState(initialProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: router.query.category as string || '',
    minPrice: '',
    maxPrice: '',
    sortBy: router.query.sort as string || 'name',
    search: router.query.search as string || '',
  })

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'created_at', label: 'Newest First' },
    { value: 'featured', label: 'Featured' },
  ]

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (filters.search !== (router.query.search || '')) {
        applyFilters()
      }
    }, 500)

    return () => clearTimeout(delayedSearch)
  }, [filters.search])

  const applyFilters = async () => {
    setIsLoading(true)
    
    const queryParams = new URLSearchParams()
    if (filters.category) queryParams.set('category', filters.category)
    if (filters.minPrice) queryParams.set('minPrice', filters.minPrice)
    if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice)
    if (filters.sortBy) queryParams.set('sort', filters.sortBy)
    if (filters.search) queryParams.set('search', filters.search)
    
    router.push(`/products?${queryParams.toString()}`, undefined, { shallow: true })
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      search: '',
    })
    router.push('/products', undefined, { shallow: true })
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    if (key !== 'search') {
      applyFilters()
    }
  }

  return (
    <Layout 
      title="Premium Handmade Pickles - Shop Online"
      description="Discover our collection of authentic handmade pickles from Malda. Premium quality mango pickles, mixed pickles, and seasonal specialties."
      keywords="mango pickle, handmade pickle, malda pickle, buy pickle online, authentic pickle"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Premium Handmade Pickles
            </h1>
            <p className="text-gray-600">
              Discover authentic flavors from the mango orchards of Malda
            </p>
          </div>
          
          <div className="mt-4 lg:mt-0 flex items-center space-x-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:w-64 space-y-6"
              >
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden p-1 hover:bg-gray-100 rounded"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Category</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value=""
                          checked={filters.category === ''}
                          onChange={(e) => handleFilterChange('category', e.target.value)}
                          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">All Categories</span>
                      </label>
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={category.slug}
                            checked={filters.category === category.slug}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Sort By</h4>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 text-sm text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-600">
                Showing {products.length} of {totalProducts} products
              </p>
              
              <div className="hidden lg:flex items-center space-x-4">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-orange-500 focus:border-orange-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🥭</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      {currentPage > 1 && (
                        <button
                          onClick={() => router.push(`/products?page=${currentPage - 1}`)}
                          className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Previous
                        </button>
                      )}
                      
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 2 && page <= currentPage + 2)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => router.push(`/products?page=${page}`)}
                              className={`px-3 py-2 text-sm border rounded-md ${
                                page === currentPage
                                  ? 'bg-orange-600 text-white border-orange-600'
                                  : 'text-gray-500 hover:text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          )
                        } else if (
                          page === currentPage - 3 ||
                          page === currentPage + 3
                        ) {
                          return (
                            <span key={page} className="px-2 py-2 text-sm text-gray-400">
                              ...
                            </span>
                          )
                        }
                        return null
                      })}
                      
                      {currentPage < totalPages && (
                        <button
                          onClick={() => router.push(`/products?page=${currentPage + 1}`)}
                          className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                          Next
                        </button>
                      )}
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = parseInt(query.page as string) || 1
  const limit = 12
  const offset = (page - 1) * limit

  try {
    let productsQuery = supabase
      .from('products')
      .select(`
        *,
        category:categories(name, slug),
        variants:product_variants(*)
      `)
      .eq('is_active', true)

    // Apply filters
    if (query.category) {
      const { data: category } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', query.category)
        .single()
      
      if (category) {
        productsQuery = productsQuery.eq('category_id', category.id)
      }
    }

    if (query.search) {
      productsQuery = productsQuery.or(
        `name.ilike.%${query.search}%,description.ilike.%${query.search}%,short_description.ilike.%${query.search}%`
      )
    }

    if (query.minPrice) {
      productsQuery = productsQuery.gte('price', parseFloat(query.minPrice as string))
    }

    if (query.maxPrice) {
      productsQuery = productsQuery.lte('price', parseFloat(query.maxPrice as string))
    }

    // Apply sorting
    const sortBy = query.sort as string || 'name'
    switch (sortBy) {
      case 'name_desc':
        productsQuery = productsQuery.order('name', { ascending: false })
        break
      case 'price_asc':
        productsQuery = productsQuery.order('price', { ascending: true })
        break
      case 'price_desc':
        productsQuery = productsQuery.order('price', { ascending: false })
        break
      case 'created_at':
        productsQuery = productsQuery.order('created_at', { ascending: false })
        break
      case 'featured':
        productsQuery = productsQuery.order('is_featured', { ascending: false }).order('name')
        break
      default:
        productsQuery = productsQuery.order('name', { ascending: true })
    }

    // Get total count
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    // Get paginated results
    const { data: products, error } = await productsQuery
      .range(offset, offset + limit - 1)

    if (error) throw error

    // Get categories
    const { data: categories } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('name')

    const totalPages = Math.ceil((count || 0) / limit)

    return {
      props: {
        products: products || [],
        categories: categories || [],
        totalProducts: count || 0,
        currentPage: page,
        totalPages,
      },
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        products: [],
        categories: [],
        totalProducts: 0,
        currentPage: 1,
        totalPages: 1,
      },
    }
  }
}

export default ProductsPage