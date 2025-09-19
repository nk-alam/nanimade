"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { 
  Package, 
  MapPin, 
  User, 
  Heart, 
  Settings,
  ShoppingCart,
  Star,
  Clock,
  Truck,
  ChevronRight,
  Plus,
  MoreHorizontal,
  CheckCircle
} from "lucide-react"
import { formatPrice, formatDate } from "@/lib/utils"

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  items_count: number
  estimated_delivery?: string
  image: string
}

interface Address {
  id: string
  name: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  pincode: string
  phone: string
  is_default: boolean
}

interface WishlistItem {
  id: string
  product: {
    id: string
    name: string
    slug: string
    price: number
    compare_at_price?: number
    images: string[]
  }
}

// Mock data
const mockOrders: Order[] = [
  {
    id: "1",
    order_number: "NM2024001",
    status: "delivered",
    total_amount: 648,
    created_at: "2024-01-15",
    items_count: 2,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=100&q=80"
  },
  {
    id: "2",
    order_number: "NM2024002", 
    status: "shipped",
    total_amount: 329,
    created_at: "2024-01-20",
    items_count: 1,
    estimated_delivery: "2024-01-25",
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=100&q=80"
  },
  {
    id: "3",
    order_number: "NM2024003",
    status: "processing",
    total_amount: 899,
    created_at: "2024-01-22",
    items_count: 3,
    estimated_delivery: "2024-01-28",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=100&q=80"
  }
]

const mockAddresses: Address[] = [
  {
    id: "1",
    name: "Home",
    address_line_1: "123 Main Street",
    address_line_2: "Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra", 
    pincode: "400001",
    phone: "+91 9876543210",
    is_default: true
  },
  {
    id: "2",
    name: "Office",
    address_line_1: "456 Business Center",
    address_line_2: "Floor 3",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400002", 
    phone: "+91 9876543210",
    is_default: false
  }
]

const mockWishlist: WishlistItem[] = [
  {
    id: "1",
    product: {
      id: "2",
      name: "Spicy Mixed Pickle",
      slug: "spicy-mixed-pickle",
      price: 329,
      compare_at_price: 429,
      images: ["https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=200&q=80"]
    }
  },
  {
    id: "2",
    product: {
      id: "3",
      name: "Sweet Mango Chutney",
      slug: "sweet-mango-chutney",
      price: 279,
      compare_at_price: 349,
      images: ["https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200&q=80"]
    }
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'shipped':
      return 'bg-blue-100 text-blue-800'
    case 'processing':
      return 'bg-orange-100 text-orange-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />
    case 'shipped':
      return <Truck className="h-4 w-4" />
    case 'processing':
      return <Clock className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [orders] = useState<Order[]>(mockOrders)
  const [addresses] = useState<Address[]>(mockAddresses)
  const [wishlist] = useState<WishlistItem[]>(mockWishlist)

  const recentOrders = orders.slice(0, 3)
  const totalOrders = orders.length
  const totalSpent = orders.reduce((total, order) => total + order.total_amount, 0)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session?.user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600">
            Manage your orders, addresses, and account settings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">{formatPrice(totalSpent)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Wishlist Items</p>
                    <p className="text-2xl font-bold text-gray-900">{wishlist.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Heart className="h-6 w-6 text-pink-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Orders</CardTitle>
                  <Link href="/dashboard/orders">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <Image
                          src={order.image}
                          alt="Order"
                          width={60}
                          height={60}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-medium text-gray-900">
                              Order #{order.order_number}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {order.items_count} item{order.items_count !== 1 ? 's' : ''} • {formatPrice(order.total_amount)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Ordered on {formatDate(new Date(order.created_at))}
                          </p>
                          {order.estimated_delivery && (
                            <p className="text-xs text-blue-600">
                              Expected delivery: {formatDate(new Date(order.estimated_delivery))}
                            </p>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Addresses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Delivery Addresses
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-gray-900">{address.name}</h3>
                          {address.is_default && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {address.address_line_1}
                          {address.address_line_2 && `, ${address.address_line_2}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-sm text-gray-600">📞 {address.phone}</p>
                        <div className="flex space-x-2 mt-3">
                          <Button variant="outline" size="sm">Edit</Button>
                          {!address.is_default && (
                            <Button variant="outline" size="sm">Set as Default</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/dashboard/orders" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="h-4 w-4 mr-2" />
                      View All Orders
                    </Button>
                  </Link>
                  <Link href="/dashboard/profile" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                  <Link href="/dashboard/wishlist" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      My Wishlist
                    </Button>
                  </Link>
                  <Link href="/dashboard/settings" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Wishlist Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Wishlist
                  </CardTitle>
                  <Link href="/dashboard/wishlist">
                    <Button variant="ghost" size="sm">
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {wishlist.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={50}
                          height={50}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 text-sm truncate">
                            {item.product.name}
                          </h3>
                          <div className="flex items-center space-x-1">
                            <span className="font-bold text-sm">{formatPrice(item.product.price)}</span>
                            {item.product.compare_at_price && (
                              <span className="text-xs text-gray-500 line-through">
                                {formatPrice(item.product.compare_at_price)}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          Add to Cart
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-medium text-orange-900 mb-2">Loyal Customer</h3>
                    <p className="text-sm text-orange-700 mb-4">
                      You're one order away from earning ₹100 cashback!
                    </p>
                    <Link href="/products">
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}