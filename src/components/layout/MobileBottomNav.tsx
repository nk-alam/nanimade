"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { 
  Home, 
  Search, 
  ShoppingBag, 
  User, 
  Heart,
  Package
} from "lucide-react"
import { motion } from "framer-motion"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  adminOnly?: boolean
}

export default function MobileBottomNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [cartItemsCount, setCartItemsCount] = useState(0)

  // Load cart items count from API
  useEffect(() => {
    const fetchCartItemsCount = async () => {
      if (!session) {
        setCartItemsCount(0)
        return
      }
      
      try {
        const response = await fetch('/api/cart')
        if (response.ok) {
          const data = await response.json()
          const count = data.cartItems?.reduce((total: number, item: any) => total + item.quantity, 0) || 0
          setCartItemsCount(count)
        }
      } catch (error) {
        console.error('Failed to fetch cart items count:', error)
        setCartItemsCount(0)
      }
    }

    fetchCartItemsCount()
  }, [session])

  const navItems: NavItem[] = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Shop', href: '/products', icon: Package },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Wishlist', href: '/wishlist', icon: Heart },
    { name: 'Account', href: session ? '/dashboard' : '/auth/signin', icon: User },
  ]

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40"
    >
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors ${
                isActive 
                  ? 'text-orange-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className={`h-5 w-5 mb-1 ${isActive ? 'text-orange-600' : 'text-gray-400'}`} />
              <span className={`${isActive ? 'font-medium' : ''}`}>{item.name}</span>
            </Link>
          )
        })}
      </div>
      
      {/* Cart Floating Button */}
      <Link 
        href="/cart"
        className="absolute -top-6 right-4 bg-orange-600 text-white rounded-full p-3 shadow-lg hover:bg-orange-700 transition-colors"
      >
        <ShoppingBag className="h-6 w-6" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItemsCount}
          </span>
        )}
      </Link>
    </motion.div>
  )
}