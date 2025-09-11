export interface User {
  id: string
  email: string
  full_name?: string
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
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  price: number
  compare_price?: number
  cost_price?: number
  sku?: string
  barcode?: string
  weight?: number
  category_id: string
  images: string[]
  is_active: boolean
  is_featured: boolean
  inventory_quantity: number
  track_inventory: boolean
  allow_backorder: boolean
  meta_title?: string
  meta_description?: string
  seo_keywords: string[]
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
  compare_price?: number
  weight: number
  sku?: string
  inventory_quantity: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Address {
  id: string
  user_id: string
  name: string
  phone: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  pincode: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  order_number: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  total_amount: number
  subtotal: number
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  payment_method?: string
  payment_id?: string
  shipping_address: any
  billing_address: any
  tracking_number?: string
  notes?: string
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id?: string
  quantity: number
  price: number
  total: number
  product_name: string
  variant_name?: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  author_id: string
  category?: string
  tags: string[]
  is_published: boolean
  meta_title?: string
  meta_description?: string
  recipe_data?: RecipeData
  created_at: string
  updated_at: string
  published_at?: string
}

export interface RecipeData {
  prep_time?: string
  cook_time?: string
  total_time?: string
  servings?: number
  difficulty?: 'easy' | 'medium' | 'hard'
  ingredients?: string[]
  instructions?: string[]
  nutrition?: {
    calories?: number
    protein?: string
    carbs?: string
    fat?: string
  }
}

export interface SiteSettings {
  id: string
  key: string
  value: any
  created_at: string
  updated_at: string
}

export interface CartItem {
  product_id: string
  variant_id?: string
  quantity: number
  price: number
  product_name: string
  variant_name?: string
  image: string
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}

export interface Analytics {
  totalSales: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  salesData: { date: string; amount: number }[]
  topProducts: { name: string; sales: number }[]
  ordersByStatus: { status: string; count: number }[]
}