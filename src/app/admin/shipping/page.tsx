'use client'

import { useState } from 'react'
import {
  Truck,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Upload
} from 'lucide-react'

interface ShippingMethod {
  id: string
  name: string
  description: string
  cost: number
  estimatedDays: string
  enabled: boolean
  freeShippingThreshold?: number
}

interface ShippingZone {
  id: string
  name: string
  countries: string[]
  methods: string[]
}

interface OrderTracking {
  orderId: string
  customerName: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  trackingNumber: string
  carrier: string
  shippedDate: string
  estimatedDelivery: string
}

export default function ShippingManagement() {
  const [activeTab, setActiveTab] = useState('methods')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data for shipping methods
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
    {
      id: '1',
      name: 'Standard Shipping',
      description: 'Delivered in 5-7 business days',
      cost: 50,
      estimatedDays: '5-7',
      enabled: true,
      freeShippingThreshold: 500
    },
    {
      id: '2',
      name: 'Express Shipping',
      description: 'Delivered in 2-3 business days',
      cost: 100,
      estimatedDays: '2-3',
      enabled: true
    },
    {
      id: '3',
      name: 'Same Day Delivery',
      description: 'Delivered within 24 hours',
      cost: 150,
      estimatedDays: '1',
      enabled: false
    }
  ])

  // Mock data for shipping zones
  const [shippingZones, setShippingZones] = useState<ShippingZone[]>([
    {
      id: '1',
      name: 'India',
      countries: ['India'],
      methods: ['Standard Shipping', 'Express Shipping']
    },
    {
      id: '2',
      name: 'International',
      countries: ['USA', 'UK', 'Canada', 'Australia'],
      methods: ['Express Shipping']
    }
  ])

  // Mock data for order tracking
  const [orderTracking, setOrderTracking] = useState<OrderTracking[]>([
    {
      orderId: 'ORD001',
      customerName: 'Rahul Sharma',
      status: 'shipped',
      trackingNumber: 'SH123456789IN',
      carrier: 'Shiprocket',
      shippedDate: '2024-01-15',
      estimatedDelivery: '2024-01-20'
    },
    {
      orderId: 'ORD002',
      customerName: 'Priya Singh',
      status: 'processing',
      trackingNumber: '',
      carrier: '',
      shippedDate: '',
      estimatedDelivery: ''
    },
    {
      orderId: 'ORD003',
      customerName: 'Amit Kumar',
      status: 'delivered',
      trackingNumber: 'SH987654321IN',
      carrier: 'Shiprocket',
      shippedDate: '2024-01-14',
      estimatedDelivery: '2024-01-18'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleShippingMethod = (id: string) => {
    setShippingMethods(methods => 
      methods.map(method => 
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    )
  }

  const deleteShippingMethod = (id: string) => {
    setShippingMethods(methods => methods.filter(method => method.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Truck className="h-6 w-6 text-orange-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Shipping Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Shipping Method
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('methods')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'methods'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Shipping Methods
            </button>
            <button
              onClick={() => setActiveTab('zones')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'zones'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Shipping Zones
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tracking'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Order Tracking
            </button>
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Shipping Methods Tab */}
        {activeTab === 'methods' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Shipping Methods</h3>
              <p className="mt-1 text-sm text-gray-500">Manage your shipping options and pricing</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estimated Delivery
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Free Shipping
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shippingMethods.map((method) => (
                    <tr key={method.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{method.name}</div>
                            <div className="text-sm text-gray-500">{method.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">₹{method.cost}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{method.estimatedDays} days</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {method.freeShippingThreshold ? `₹${method.freeShippingThreshold}` : 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${method.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {method.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => toggleShippingMethod(method.id)}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteShippingMethod(method.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
                  <span className="font-medium">3</span> results
                </div>
                <div className="flex space-x-2">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Zones Tab */}
        {activeTab === 'zones' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Shipping Zones</h3>
              <p className="mt-1 text-sm text-gray-500">Manage shipping zones and regions</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Zone
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Countries
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipping Methods
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shippingZones.map((zone) => (
                    <tr key={zone.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {zone.countries.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {zone.methods.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-orange-600 hover:text-orange-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Order Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Order Tracking</h3>
              <p className="mt-1 text-sm text-gray-500">Track and manage order shipments</p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tracking
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderTracking.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.orderId}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {order.trackingNumber ? (
                          <div>
                            <div className="text-sm text-gray-900">{order.trackingNumber}</div>
                            <div className="text-xs text-gray-500">{order.carrier}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Not shipped yet</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {order.shippedDate ? (
                          <div>
                            <div className="text-sm text-gray-900">Shipped: {order.shippedDate}</div>
                            <div className="text-xs text-gray-500">Est. Delivery: {order.estimatedDelivery}</div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-orange-600 hover:text-orange-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            <Package className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">1,186</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Delivery Time</p>
                <p className="text-2xl font-bold text-gray-900">4.2 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}