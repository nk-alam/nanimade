import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { HeartIcon, StarIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { Product, ProductVariant } from '@/types'

interface ProductCardProps {
  product: Product & {
    variants?: ProductVariant[]
  }
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  )
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  
  const { addToCart } = useCart()
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()
  
  const isInWishlist = wishlist.some(item => item.product_id === product.id)
  
  const currentPrice = selectedVariant?.price || product.price
  const comparePrice = selectedVariant?.compare_price || product.compare_price
  const discount = comparePrice ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100) : 0

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      variant_id: selectedVariant?.id || null,
      quantity: 1,
      price: currentPrice,
      product_name: product.name,
      variant_name: selectedVariant?.name || null,
      image: product.images[0]
    })
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

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.images[0] || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </span>
          )}
          {product.is_featured && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
        >
          {isInWishlist ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400 hover:text-red-500" />
          )}
        </button>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
            ))}
          </div>
          <span className="text-sm text-gray-500">(4.8)</span>
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    selectedVariant?.id === variant.id
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-orange-600'
                  }`}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900">
              ₹{currentPrice}
            </span>
            {comparePrice && comparePrice > currentPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{comparePrice}
              </span>
            )}
          </div>
          
          {/* Weight */}
          {(selectedVariant?.weight || product.weight) && (
            <span className="text-sm text-gray-600">
              {selectedVariant?.weight || product.weight}g
            </span>
          )}
        </div>

        {/* Short Description */}
        {product.short_description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Buy Now Button */}
        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-100 text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Add to Cart
          </button>
          <Link
            href={`/products/${product.slug}?buyNow=true`}
            className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors text-center"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard