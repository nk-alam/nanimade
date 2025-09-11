'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ShoppingCart, Heart, Star, Truck, Shield, Leaf, Plus, Minus, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Product, ProductVariant, Category } from '@/lib/types'
import { useCart } from '@/lib/hooks/use-cart'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'

interface ProductWithVariants extends Product {
  variants: ProductVariant[]
  category: Category
}

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<ProductWithVariants | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<ProductWithVariants[]>([])
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isSticky, setIsSticky] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    if (slug) {
      fetchProduct()
    }
  }, [slug])

  useEffect(() => {
    if (product?.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0].id)
    }
  }, [product])

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          variants:product_variants(*),
          category:categories(*)
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error) throw error
      setProduct(data as ProductWithVariants)
      
      // Fetch related products
      if (data.category_id) {
        fetchRelatedProducts(data.category_id, data.id)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async (categoryId: string, productId: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          variants:product_variants(*),
          category:categories(*)
        `)
        .eq('category_id', categoryId)
        .eq('is_active', true)
        .neq('id', productId)
        .limit(4)

      if (error) throw error
      setRelatedProducts(data as ProductWithVariants[])
    } catch (error) {
      console.error('Error fetching related products:', error)
    }
  }

  const currentVariant = product?.variants?.find(v => v.id === selectedVariant)
  const hasDiscount = currentVariant && currentVariant.compare_at_price > currentVariant.price
  const discountPercentage = hasDiscount 
    ? Math.round(((currentVariant.compare_at_price - currentVariant.price) / currentVariant.compare_at_price) * 100)
    : 0

  const handleAddToCart = async () => {
    if (product && currentVariant) {
      await addItem(product, currentVariant, quantity)
      toast({
        title: "Added to cart!",
        description: `${quantity} x ${product.name} (${currentVariant.name}) added to your cart.`,
      })
    }
  }

  const handleBuyNow = async () => {
    if (product && currentVariant) {
      await addItem(product, currentVariant, quantity)
      // Redirect to checkout
      window.location.href = '/checkout'
    }
  }

  const images = product?.gallery && product.gallery.length > 0 
    ? [product.featured_image, ...product.gallery].filter(Boolean)
    : [product?.featured_image || 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg']

  if (loading) {
    return (
      <div className="min-h-screen bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-96 w-full mb-4" />
              <div className="flex space-x-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-20" />
                ))}
              </div>
            </div>
            <div>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/2 mb-6" />
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-orange-600">Products</Link>
            <span className="mx-2">/</span>
            <Link href={`/products?category=${product.category_id}`} className="hover:text-orange-600">
              {product.category?.name}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-96 bg-gray-100 rounded-lg overflow-hidden"
            >
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {hasDiscount && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </motion.div>
            
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold font-quicksand text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600">{product.short_description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">(4.8 out of 5 stars)</span>
              <span className="text-gray-600">128 reviews</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              {currentVariant && (
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{currentVariant.price}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₹{currentVariant.compare_at_price}
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        Save ₹{currentVariant.compare_at_price - currentVariant.price}
                      </Badge>
                    </>
                  )}
                </div>
              )}
              <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Size/Weight:</label>
                <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.variants.map((variant) => (
                      <SelectItem key={variant.id} value={variant.id}>
                        {variant.name} - {variant.weight} - ₹{variant.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Quantity:</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={currentVariant && quantity >= currentVariant.stock_quantity}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {currentVariant && (
                <p className="text-sm text-gray-600">
                  {currentVariant.stock_quantity} items available
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button
                  size="lg"
                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                  onClick={handleAddToCart}
                  disabled={!currentVariant || currentVariant.stock_quantity === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleBuyNow}
                  disabled={!currentVariant || currentVariant.stock_quantity === 0}
                >
                  Buy Now
                </Button>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-gray-600">On orders above ₹500</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Quality Assured</p>
                <p className="text-xs text-gray-600">100% authentic</p>
              </div>
              <div className="text-center">
                <Leaf className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Natural</p>
                <p className="text-xs text-gray-600">No preservatives</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description || 'No description available.'}
                  </p>
                  {product.origin_story && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Our Story</h3>
                      <p className="text-gray-700 leading-relaxed">
                        {product.origin_story}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ingredients" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.ingredients || 'Ingredients information not available.'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="nutrition" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Nutritional Information</h3>
                {product.nutritional_info && Object.keys(product.nutritional_info).length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.nutritional_info).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize">{key.replace('_', ' ')}:</span>
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-700">Nutritional information not available.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Customer Reviews</h3>
                <p className="text-gray-700">Reviews feature coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold font-quicksand text-gray-900 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedProduct.featured_image || 'https://images.pexels.com/photos/4198019/pexels-photo-4198019.jpeg'}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Link href={`/products/${relatedProduct.slug}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2">{relatedProduct.category?.name}</p>
                    {relatedProduct.variants && relatedProduct.variants.length > 0 && (
                      <p className="text-lg font-bold text-gray-900">
                        ₹{relatedProduct.variants[0].price}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add to Cart */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50 transition-transform duration-300 md:hidden ${
        isSticky ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600">{product.name}</p>
            {currentVariant && (
              <p className="text-lg font-bold text-gray-900">₹{currentVariant.price}</p>
            )}
          </div>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleAddToCart}
            disabled={!currentVariant || currentVariant.stock_quantity === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}