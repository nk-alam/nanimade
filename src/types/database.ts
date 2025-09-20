export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar_url?: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  name: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  pincode: string
  phone: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  parent_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description: string
  category_id: string
  images: string[]
  base_price: number
  compare_at_price?: number
  sku: string
  stock_quantity: number
  low_stock_threshold: number
  weight: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  meta_title?: string
  meta_description?: string
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
  category?: Category
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  price: number
  compare_at_price?: number
  sku: string
  stock_quantity: number
  weight: number
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  variant_id?: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
  variant?: ProductVariant
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method: string
  payment_id?: string
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  total_amount: number
  currency: string
  shipping_address: Address
  billing_address: Address
  items: OrderItem[]
  tracking_number?: string
  shiprocket_order_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id?: string
  quantity: number
  price: number
  total: number
  created_at: string
  product?: Product
  variant?: ProductVariant
}

export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  author_id: string
  category: string
  tags: string[]
  meta_title?: string
  meta_description?: string
  is_published: boolean
  published_at?: string
  created_at: string
  updated_at: string
  author?: User
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  title: string
  content: string
  is_verified: boolean
  is_approved: boolean
  created_at: string
  updated_at: string
  user?: User
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minimum_amount?: number
  maximum_discount?: number
  usage_limit?: number
  used_count: number
  starts_at: string
  expires_at: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: string
  key: string
  value: string
  type: 'text' | 'textarea' | 'image' | 'boolean' | 'number'
  created_at: string
  updated_at: string
}

export interface Analytics {
  id: string
  date: string
  page_views: number
  unique_visitors: number
  bounce_rate: number
  avg_session_duration: number
  revenue: number
  orders_count: number
  conversion_rate: number
  traffic_sources: Record<string, number>
  top_products: Record<string, number>
  created_at: string
}