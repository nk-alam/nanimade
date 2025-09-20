"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  LogOut,
  Package,
  Settings
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import FloatingCart from "@/components/cart/FloatingCart"

interface CartItem {
  id: string
  quantity: number
}

interface NavItem {
  id: string
  label: string
  url: string
}

export default function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [headerSettings, setHeaderSettings] = useState({
    logoText: "NaniMade",
    navItems: [
      { id: "1", label: "Home", url: "/" },
      { id: "2", label: "Products", url: "/products" },
      { id: "3", label: "Recipes", url: "/blog" },
      { id: "4", label: "About", url: "/about" },
      { id: "5", label: "Contact", url: "/contact" },
    ]
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Load cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!session) return
      
      try {
        const response = await fetch('/api/cart')
        if (response.ok) {
          const data = await response.json()
          setCartItems(data.cartItems || [])
        }
      } catch (error) {
        console.error('Failed to fetch cart items:', error)
      }
    }

    fetchCartItems()
  }, [session])

  // Load header settings from API
  useEffect(() => {
    const fetchHeaderSettings = async () => {
      try {
        const response = await fetch('/api/appearance')
        if (response.ok) {
          const data = await response.json()
          // Check if data has header property
          if (data.header) {
            setHeaderSettings(data.header)
          }
        } else if (response.status === 401 || response.status === 403) {
          // Use default settings if unauthorized
          console.log('Unauthorized to fetch appearance settings, using defaults')
        }
      } catch (error) {
        console.error('Failed to fetch header settings:', error)
        // Use default settings on error
      }
    }

    fetchHeaderSettings()
  }, [])

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-200",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white"
      )}>
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="hidden md:flex items-center justify-between py-2 text-sm text-gray-600 border-b">
            <div className="flex items-center space-x-4">
              <span>📞 +91 9876543210</span>
              <span>✉️ info@nanimade.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>🚚 Free shipping on orders above ₹500</span>
              {session?.user.isAdmin && (
                <Link href="/admin" className="hover:text-orange-600 transition-colors">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          {/* Main header */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{headerSettings.logoText}</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Authentic Malda Pickles</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {headerSettings.navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for pickles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <button onClick={() => setIsCartOpen(true)} className="relative">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemsCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {cartItemsCount}
                    </motion.span>
                  )}
                </Button>
              </button>

              {/* User Menu */}
              {session ? (
                <div className="relative group">
                  <Button variant="ghost" size="icon">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>

                  {/* Dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b">
                        <p className="font-medium text-gray-900">{session.user.name}</p>
                        <p className="text-sm text-gray-500">{session.user.email}</p>
                      </div>
                      <Link href="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Package className="h-4 w-4 mr-2" />
                        My Orders
                      </Link>
                      <Link href="/dashboard/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="h-4 w-4 mr-2" />
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for pickles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t bg-white"
            >
              <nav className="container mx-auto px-4 py-4 space-y-4">
                {headerSettings.navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="block text-gray-700 hover:text-orange-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {!session && (
                  <div className="pt-4 border-t">
                    <Link href="/auth/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">Sign In</Button>
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating Cart */}
      <FloatingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCartUpdate={() => {
          // Refresh cart items when cart is updated
          const fetchCartItems = async () => {
            if (!session) return
            
            try {
              const response = await fetch('/api/cart')
              if (response.ok) {
                const data = await response.json()
                setCartItems(data.cartItems || [])
              }
            } catch (error) {
              console.error('Failed to fetch cart items:', error)
            }
          }

          fetchCartItems()
        }}
      />
    </>
  )
}