import { useState, useEffect } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  StarIcon,
  HeartIcon,
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import Layout from '@/components/Layout'
import ProductCard from '@/components/Product/ProductCard'
import { supabase } from '@/lib/supabase'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { Product, ProductVariant } from '@/types'
import { viewItem } from '@/lib/analytics'
import toast from 'react-hot-toast'

interface ProductPageProps {
  product: Product & {
    variants: ProductVariant[]
    category: { name: string; slug: string }
  }
  relatedProducts: Product[]
}

const ProductPage = ({ product, relatedProducts }: ProductPageProps) => {
  const router = useRouter()
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  )
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  const [showStickyCart, setShowStickyCart] = useState(false)

  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()

  const isInWishlist = wishlist.some(item => item.product_id === product.id)
  const currentPrice = selectedVariant?.price || product.price
  const comparePrice = selectedVariant?.compare_price || product.compare_price
  const discount = comparePrice ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100) : 0
  const currentStock = selectedVariant?.inventory_quantity || product.inventory_quantity

  useEffect(() => {
    // Track product view
    viewItem('INR', currentPrice, [{
      item_id: product.id,
      item_name: product.name,
      category: product.category?.name,
      price: currentPrice,
    }])

    // Sticky cart scroll handler
    const handleScroll = () => {
      const scrollY = window.scrollY
      setShowStickyCart(scrollY > 800)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [product, currentPrice])

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      variant_id: selectedVariant?.id || null,
      quantity,
      price: currentPrice,
      product_name: product.name,
      variant_name: selectedVariant?.name || null,
      image: product.images[0]
    })
    toast.success('Added to cart!')
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/checkout')
  }

  const handleWishlistToggle = async () => {
    setIsWishlistLoading(true)
    try {
      if (isInWishlist) {
        await removeFromWishlist(product.id)
      } else {
        await addToWishlist(product.id)
      }
    } finally {
      setIsWishlistLoading(false)
    }
  }

  if (router.isFallback) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout
      title={product.meta_title || product.name}
      description={product.meta_description || product.short_description}
      keywords={product.seo_keywords.join(', ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link href="/" className="text-gray-400 hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/products" className="ml-4 text-gray-400 hover:text-gray-500">
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="ml-4 text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-primary-500 ${
                      index === selectedImage ? 'ring-2 ring-primary-500' : ''
                    }`}
                  >
                    <span className="sr-only">Image {index + 1}</span>
                    <span className="absolute inset-0 rounded-md overflow-hidden">
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="w-full h-full object-center object-cover"
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main image */}
            <div className="w-full aspect-square">
              <motion.div
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative h-full w-full overflow-hidden rounded-lg bg-gray-100"
              >
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="w-full h-full object-center object-cover"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500 text-white">
                      -{discount}% OFF
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-500">4.8 out of 5 stars (124 reviews)</p>
            </div>

            {/* Price */}
            <div className="mt-4">
              <div className="flex items-center space-x-3">
                <p className="text-3xl font-bold text-gray-900">₹{currentPrice}</p>
                {comparePrice && comparePrice > currentPrice && (
                  <p className="text-xl text-gray-500 line-through">₹{comparePrice}</p>
                )}
                {discount > 0 && (
                  <p className="text-lg font-medium text-green-600">Save {discount}%</p>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">Inclusive of all taxes</p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="mt-2 flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-4 py-2 text-sm font-medium rounded-md border ${
                        selectedVariant?.id === variant.id
                          ? 'border-primary-600 bg-primary-50 text-primary-600'
                          : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {variant.name} - ₹{variant.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  className="p-2 rounded-md border border-gray-300 hover:bg-gray-50"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
                <span className="text-sm text-gray-500">
                  {currentStock > 0 ? `${currentStock} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={currentStock === 0}
                  className="flex-1 bg-primary-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlistToggle}
                  disabled={isWishlistLoading}
                  className="bg-white border border-gray-300 rounded-md py-3 px-3 flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-500"
                >
                  {isInWishlist ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6" />
                  )}
                </button>
              </div>
              <button
                onClick={handleBuyNow}
                disabled={currentStock === 0}
                className="w-full bg-orange-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center">
                  <TruckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Free shipping above ₹999</span>
                </div>
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">100% authentic products</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">7-day return policy</span>
                </div>
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm text-gray-600">Handmade with love</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <div className="mt-4 prose prose-sm text-gray-600">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart (Mobile) */}
      <AnimatePresence>
        {showStickyCart && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-gray-900">₹{currentPrice}</p>
                {comparePrice && comparePrice > currentPrice && (
                  <p className="text-sm text-gray-500 line-through">₹{comparePrice}</p>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  disabled={currentStock === 0}
                  className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 disabled:opacity-50"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={currentStock === 0}
                  className="bg-orange-600 text-white px-6 py-2 rounded-md font-medium hover:bg-orange-700 disabled:opacity-50"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: products } = await supabase
    .from('products')
    .select('slug')
    .eq('is_active', true)

  const paths = products?.map((product) => ({
    params: { slug: product.slug },
  })) || []

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string

  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        variants:product_variants(*)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error || !product) {
      return {
        notFound: true,
      }
    }

    // Fetch related products
    const { data: relatedProducts } = await supabase
      .from('products')
      .select(`
        *,
        variants:product_variants(*)
      `)
      .eq('category_id', product.category_id)
      .eq('is_active', true)
      .neq('id', product.id)
      .limit(4)

    return {
      props: {
        product,
        relatedProducts: relatedProducts || [],
      },
      revalidate: 3600, // Revalidate every hour
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    return {
      notFound: true,
    }
  }
}

export default ProductPage