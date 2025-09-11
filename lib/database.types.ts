export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string
          phone: string
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string
          avatar_url?: string
          phone?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string
          phone?: string
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          image_url: string
          is_active: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string
          image_url?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          image_url?: string
          is_active?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          short_description: string
          category_id: string
          featured_image: string
          gallery: Json
          is_active: boolean
          is_featured: boolean
          meta_title: string
          meta_description: string
          ingredients: string
          nutritional_info: Json
          origin_story: string
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string
          short_description?: string
          category_id?: string
          featured_image?: string
          gallery?: Json
          is_active?: boolean
          is_featured?: boolean
          meta_title?: string
          meta_description?: string
          ingredients?: string
          nutritional_info?: Json
          origin_story?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          short_description?: string
          category_id?: string
          featured_image?: string
          gallery?: Json
          is_active?: boolean
          is_featured?: boolean
          meta_title?: string
          meta_description?: string
          ingredients?: string
          nutritional_info?: Json
          origin_story?: string
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}