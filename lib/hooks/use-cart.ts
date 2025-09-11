'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product, ProductVariant } from '@/lib/types'
import { supabase } from '@/lib/supabase'

interface CartStore {
  items: (CartItem & { product: Product; variant: ProductVariant })[]
  isLoading: boolean
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  clearCart: () => void
  syncWithServer: (userId?: string) => Promise<void>
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: async (product: Product, variant: ProductVariant, quantity = 1) => {
        set({ isLoading: true })
        
        try {
          const { data: session } = await supabase.auth.getSession()
          
          if (session?.user) {
            // User is logged in, sync with database
            const { data, error } = await supabase
              .from('cart_items')
              .upsert({
                user_id: session.user.id,
                product_id: product.id,
                variant_id: variant.id,
                quantity,
              })
              .select('*, product:products(*), variant:product_variants(*)')
              .single()

            if (!error && data) {
              const currentItems = get().items
              const existingIndex = currentItems.findIndex(
                item => item.product_id === product.id && item.variant_id === variant.id
              )

              if (existingIndex >= 0) {
                // Update existing item
                const updatedItems = [...currentItems]
                updatedItems[existingIndex] = data as any
                set({ items: updatedItems })
              } else {
                // Add new item
                set({ items: [...currentItems, data as any] })
              }
            }
          } else {
            // User not logged in, store locally
            const currentItems = get().items
            const existingIndex = currentItems.findIndex(
              item => item.product_id === product.id && item.variant_id === variant.id
            )

            if (existingIndex >= 0) {
              // Update existing item
              const updatedItems = [...currentItems]
              updatedItems[existingIndex].quantity += quantity
              set({ items: updatedItems })
            } else {
              // Add new item
              const newItem = {
                id: `local-${Date.now()}`,
                user_id: '',
                product_id: product.id,
                variant_id: variant.id,
                quantity,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                product,
                variant,
              }
              set({ items: [...currentItems, newItem] })
            }
          }
        } catch (error) {
          console.error('Error adding item to cart:', error)
        } finally {
          set({ isLoading: false })
        }
      },

      removeItem: async (itemId: string) => {
        set({ isLoading: true })
        
        try {
          const { data: session } = await supabase.auth.getSession()
          
          if (session?.user && !itemId.startsWith('local-')) {
            // Remove from database
            await supabase
              .from('cart_items')
              .delete()
              .eq('id', itemId)
          }

          // Remove from local state
          const currentItems = get().items
          const updatedItems = currentItems.filter(item => item.id !== itemId)
          set({ items: updatedItems })
        } catch (error) {
          console.error('Error removing item from cart:', error)
        } finally {
          set({ isLoading: false })
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          await get().removeItem(itemId)
          return
        }

        set({ isLoading: true })
        
        try {
          const { data: session } = await supabase.auth.getSession()
          
          if (session?.user && !itemId.startsWith('local-')) {
            // Update in database
            await supabase
              .from('cart_items')
              .update({ quantity })
              .eq('id', itemId)
          }

          // Update local state
          const currentItems = get().items
          const updatedItems = currentItems.map(item =>
            item.id === itemId ? { ...item, quantity } : item
          )
          set({ items: updatedItems })
        } catch (error) {
          console.error('Error updating cart quantity:', error)
        } finally {
          set({ isLoading: false })
        }
      },

      clearCart: () => {
        set({ items: [] })
      },

      syncWithServer: async (userId?: string) => {
        if (!userId) {
          const { data: session } = await supabase.auth.getSession()
          if (!session?.user) return
          userId = session.user.id
        }

        set({ isLoading: true })

        try {
          // Get cart items from server
          const { data, error } = await supabase
            .from('cart_items')
            .select(`
              *,
              product:products(*),
              variant:product_variants(*)
            `)
            .eq('user_id', userId)

          if (!error && data) {
            set({ items: data as any })
          }
        } catch (error) {
          console.error('Error syncing cart with server:', error)
        } finally {
          set({ isLoading: false })
        }
      },

      getTotalPrice: () => {
        const items = get().items
        return items.reduce((total, item) => total + (item.variant.price * item.quantity), 0)
      },

      getTotalItems: () => {
        const items = get().items
        return items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
)