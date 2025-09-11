export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  phone?: string
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description?: string
  short_description?: string
  category_id: string
  featured_image?: string
  gallery: string[]
  is_active: boolean
  is_featured: boolean
  meta_title?: string
  meta_description?: string
  ingredients?: string
  nutritional_info: Record<string, any>
  origin_story?: string
  sort_order: number
  created_at: string
  updated_at: string
  category?: Category
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  weight: string
  price: number
  compare_at_price: number
  sku?: string
  stock_quantity: number
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  type: 'shipping' | 'billing'
  full_name: string
  phone: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  order_number: string
  user_id: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
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
  tracking_number?: string
  shiprocket_order_id?: string
  notes?: string
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id: string
  quantity: number
  price: number
  total: number
  created_at: string
  product?: Product
  variant?: ProductVariant
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  variant_id: string
  quantity: number
  created_at: string
  updated_at: string
  product?: Product
  variant?: ProductVariant
}

export interface Blog {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  featured_image?: string
  author_id: string
  is_published: boolean
  published_at?: string
  meta_title?: string
  meta_description?: string
  tags: string[]
  reading_time: number
  recipe_info: Record<string, any>
  created_at: string
  updated_at: string
  author?: User
}

export interface Page {
  id: string
  title: string
  slug: string
  content?: string
  is_published: boolean
  meta_title?: string
  meta_description?: string
  created_at: string
  updated_at: string
}

export interface Settings {
  id: string
  key: string
  value: Record<string, any>
  created_at: string
  updated_at: string
}