import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  product_id: string
  variant_id: string | null
  quantity: number
  price: number
  product_name: string
  variant_name: string | null
  image: string
}

interface CartStore {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeFromCart: (productId: string, variantId?: string | null) => void
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (newItem) => {
        const { cart } = get()
        const existingItemIndex = cart.findIndex(
          item => item.product_id === newItem.product_id && item.variant_id === newItem.variant_id
        )
        
        if (existingItemIndex !== -1) {
          const updatedCart = [...cart]
          updatedCart[existingItemIndex].quantity += newItem.quantity || 1
          set({ cart: updatedCart })
        } else {
          set({ cart: [...cart, { ...newItem, quantity: newItem.quantity || 1 }] })
        }
      },
      
      removeFromCart: (productId, variantId = null) => {
        const { cart } = get()
        const updatedCart = cart.filter(
          item => !(item.product_id === productId && item.variant_id === variantId)
        )
        set({ cart: updatedCart })
      },
      
      updateQuantity: (productId, variantId, quantity) => {
        const { cart } = get()
        if (quantity <= 0) {
          get().removeFromCart(productId, variantId)
          return
        }
        
        const updatedCart = cart.map(item =>
          item.product_id === productId && item.variant_id === variantId
            ? { ...item, quantity }
            : item
        )
        set({ cart: updatedCart })
      },
      
      clearCart: () => set({ cart: [] }),
      
      getTotalPrice: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getTotalItems: () => {
        const { cart } = get()
        return cart.reduce((total, item) => total + item.quantity, 0)
      }
    }),
    {
      name: 'nanimade-cart'
    }
  )
)