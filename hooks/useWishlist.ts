import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'
import { useSession } from 'next-auth/react'
import { WishlistItem } from '@/types'
import toast from 'react-hot-toast'

interface WishlistStore {
  wishlist: WishlistItem[]
  isLoading: boolean
  fetchWishlist: (userId: string) => Promise<void>
  addToWishlist: (productId: string) => Promise<void>
  removeFromWishlist: (productId: string) => Promise<void>
  clearWishlist: () => void
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlist: [],
      isLoading: false,

      fetchWishlist: async (userId: string) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase
            .from('wishlists')
            .select(`
              *,
              product:products (
                id,
                name,
                slug,
                price,
                compare_price,
                images,
                is_active
              )
            `)
            .eq('user_id', userId)

          if (error) throw error
          set({ wishlist: data || [] })
        } catch (error) {
          console.error('Error fetching wishlist:', error)
          toast.error('Failed to load wishlist')
        } finally {
          set({ isLoading: false })
        }
      },

      addToWishlist: async (productId: string) => {
        const { data: session } = await supabase.auth.getSession()
        if (!session?.session?.user) {
          toast.error('Please login to add items to wishlist')
          return
        }

        try {
          const { data, error } = await supabase
            .from('wishlists')
            .insert({
              user_id: session.session.user.id,
              product_id: productId,
            })
            .select()
            .single()

          if (error) throw error

          const { wishlist } = get()
          set({ wishlist: [...wishlist, data] })
          toast.success('Added to wishlist')
        } catch (error) {
          console.error('Error adding to wishlist:', error)
          toast.error('Failed to add to wishlist')
        }
      },

      removeFromWishlist: async (productId: string) => {
        const { data: session } = await supabase.auth.getSession()
        if (!session?.session?.user) return

        try {
          const { error } = await supabase
            .from('wishlists')
            .delete()
            .eq('user_id', session.session.user.id)
            .eq('product_id', productId)

          if (error) throw error

          const { wishlist } = get()
          set({ wishlist: wishlist.filter(item => item.product_id !== productId) })
          toast.success('Removed from wishlist')
        } catch (error) {
          console.error('Error removing from wishlist:', error)
          toast.error('Failed to remove from wishlist')
        }
      },

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: 'nanimade-wishlist',
    }
  )
)