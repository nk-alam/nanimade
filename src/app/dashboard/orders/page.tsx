"use client"

import { useState, useEffect } from "react"
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
  CheckCircle,
  Search,
  Filter,
  Download
} from "lucide-react"
import { formatPrice, formatDate } from "@/lib/utils"
import ShiprocketTracking from "@/components/ShiprocketTracking"

interface Order {
  id: string
  order_number: string
  status: string
  total_amount: number
  created_at: string
  items_count: number
  estimated_delivery?: string
  image: string
  awb_number?: string // Shiprocket AWB number
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

// Mock data - replace with actual API calls
const mockOrders: Order[] = [
  {
    id: "1",
    order_number: "NM2024001",
    status: "delivered",
    total_amount: 648,
    created_at: "2024-01-15",
    items_count: 2,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=100&q=80",
    awb_number: "1234567890" // Example AWB number
  },
  {
    id: "2",
    order_number: "NM2024002", 
    status: "shipped",
    total_amount: 329,
    created_at: "2024-01-20",
    items_count: 1,
    estimated_delivery: "2024-01-25",
    image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=100&q=80",
    awb_number: "0987654321" // Example AWB number
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

export default function OrdersPage() {
  const { data: session } = useSession()
  const [orders] = useState<Order[]>(mockOrders)
  const [addresses] = useState<Address[]>(mockAddresses)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredOrders = orders.filter(order => 
    order.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalOrders = orders.length
  const totalSpent = orders.reduce((total, order) => total + order.total_amount, 0)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Orders
              </h1>
              <p className="text-gray-600">
                Track your orders and view order history
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search orders..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Orders */}
            {!selectedOrder ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <div 
                            key={order.id} 
                            className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => setSelectedOrder(order)}
                          >
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
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              /* Order Details with Tracking */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Order Details</CardTitle>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedOrder(null)}
                      >
                        Back to Orders
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-gray-900">Order #{selectedOrder.order_number}</h3>
                          <p className="text-sm text-gray-600">
                            Placed on {formatDate(new Date(selectedOrder.created_at))}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                            {getStatusIcon(selectedOrder.status)}
                            <span className="ml-1">{selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Shiprocket Tracking */}
                    {selectedOrder.awb_number ? (
                      <ShiprocketTracking 
                        awb={selectedOrder.awb_number} 
                        orderId={selectedOrder.order_number} 
                      />
                    ) : (
                      <div className="p-8 text-center bg-gray-50 rounded-lg">
                        <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Tracking Information Not Available</h3>
                        <p className="text-gray-600 mb-4">
                          Tracking information will be available once your order is shipped.
                        </p>
                        <Button variant="outline">Check Again</Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
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
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Another Order
                  </Button>
                  <Link href="/products">
                    <Button className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Addresses */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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
        </div>
      </div>
    </div>
  )
}