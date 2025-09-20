'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  TimeScale,
  RadialLinearScale,
  Filler
} from 'chart.js'
import { Bar, Line, Doughnut, PolarArea } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  AlertTriangle,
  Eye,
  Star,
  Calendar,
  Download,
  Settings,
  Bell,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  ShoppingCart,
  Globe,
  Smartphone,
  Facebook,
  Instagram,
  Chrome,
  MapPin,
  Target,
  Clock,
  Zap,
  TrendingDown
} from 'lucide-react'

// Register additional Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  TimeScale,
  RadialLinearScale,
  Filler
)

interface DashboardStats {
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalProducts: number
  revenueGrowth: number
  orderGrowth: number
  customerGrowth: number
  lowStockProducts: number
  pendingOrders: number
  completedOrders: number
  avgOrderValue: number
  conversionRate: number
}

interface RecentOrder {
  id: string
  customerName: string
  customerEmail: string
  amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  items: number
}

interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  image: string
  growth: number
}

interface SalesChannel {
  name: string
  sales: number
  revenue: number
  growth: number
  icon: React.ReactNode
  color: string
}

interface PerformanceMetric {
  name: string
  value: number
  change: number
  icon: React.ReactNode
  color: string
}

interface GeographicData {
  region: string
  sales: number
  revenue: number
  growth: number
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d')
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([])
  const [geographicData, setGeographicData] = useState<GeographicData[]>([])

  // Mock data for demo - replace with actual API calls
  useEffect(() => {
    const fetchDashboardData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStats({
        totalOrders: 1247,
        totalRevenue: 89650,
        totalCustomers: 456,
        totalProducts: 28,
        revenueGrowth: 12.5,
        orderGrowth: 8.3,
        customerGrowth: 15.2,
        lowStockProducts: 3,
        pendingOrders: 23,
        completedOrders: 1186,
        avgOrderValue: 720,
        conversionRate: 3.2
      })

      setRecentOrders([
        {
          id: 'ORD001',
          customerName: 'Rahul Sharma',
          customerEmail: 'rahul@email.com',
          amount: 1299,
          status: 'pending',
          date: '2024-01-15',
          items: 3
        },
        {
          id: 'ORD002',
          customerName: 'Priya Singh',
          customerEmail: 'priya@email.com',
          amount: 2499,
          status: 'processing',
          date: '2024-01-15',
          items: 5
        },
        {
          id: 'ORD003',
          customerName: 'Amit Kumar',
          customerEmail: 'amit@email.com',
          amount: 899,
          status: 'shipped',
          date: '2024-01-14',
          items: 2
        },
        {
          id: 'ORD004',
          customerName: 'Sunita Das',
          customerEmail: 'sunita@email.com',
          amount: 1899,
          status: 'delivered',
          date: '2024-01-14',
          items: 4
        },
        {
          id: 'ORD005',
          customerName: 'Kavita Mehta',
          customerEmail: 'kavita@email.com',
          amount: 1599,
          status: 'processing',
          date: '2024-01-13',
          items: 3
        },
      ])

      setTopProducts([
        {
          id: '1',
          name: 'Classic Mango Pickle (500g)',
          sales: 342,
          revenue: 68400,
          image: '/api/placeholder/100/100',
          growth: 23.5
        },
        {
          id: '2',
          name: 'Spicy Mango Pickle (250g)',
          sales: 289,
          revenue: 43350,
          image: '/api/placeholder/100/100',
          growth: 18.2
        },
        {
          id: '3',
          name: 'Sweet Mango Pickle (1kg)',
          sales: 156,
          revenue: 46800,
          image: '/api/placeholder/100/100',
          growth: 12.8
        },
        {
          id: '4',
          name: 'Mixed Vegetable Pickle (500g)',
          sales: 98,
          revenue: 19600,
          image: '/api/placeholder/100/100',
          growth: 5.3
        },
      ])

      setPerformanceMetrics([
        {
          name: 'Avg. Session Duration',
          value: 4.2,
          change: 12.5,
          icon: <Clock className="h-5 w-5" />,
          color: 'text-blue-600'
        },
        {
          name: 'Bounce Rate',
          value: 32.4,
          change: -8.2,
          icon: <TrendingDown className="h-5 w-5" />,
          color: 'text-green-600'
        },
        {
          name: 'Page Views',
          value: 1247,
          change: 15.3,
          icon: <Eye className="h-5 w-5" />,
          color: 'text-purple-600'
        },
        {
          name: 'Conversion Rate',
          value: 3.2,
          change: 5.7,
          icon: <Target className="h-5 w-5" />,
          color: 'text-orange-600'
        }
      ])

      setGeographicData([
        { region: 'West Bengal', sales: 420, revenue: 31500, growth: 18.2 },
        { region: 'Delhi', sales: 280, revenue: 21000, growth: 12.5 },
        { region: 'Maharashtra', sales: 195, revenue: 14625, growth: 8.7 },
        { region: 'Tamil Nadu', sales: 165, revenue: 12375, growth: 15.3 },
        { region: 'Karnataka', sales: 120, revenue: 9000, growth: 6.4 },
      ])

      setLoading(false)
    }

    fetchDashboardData()
  }, [selectedTimeRange])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!session || !session.user?.isAdmin) {
    redirect('/auth/signin')
  }

  // Chart data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales (₹)',
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 40000, 38000, 45000],
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.2)',
        tension: 0.4,
      },
    ],
  }

  const ordersData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Orders',
        data: [23, 45, 38, 52, 48, 67, 59],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
      },
    ],
  }

  const categoryData = {
    labels: ['Mango Pickle', 'Mixed Pickle', 'Lemon Pickle', 'Garlic Pickle', 'Others'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(249, 115, 22, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(156, 163, 175, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  }

  // Revenue by product category
  const revenueByCategoryData = {
    labels: ['Mango Pickle', 'Mixed Pickle', 'Lemon Pickle', 'Garlic Pickle', 'Others'],
    datasets: [
      {
        label: 'Revenue (₹)',
        data: [45000, 25000, 15000, 10000, 5000],
        backgroundColor: [
          'rgba(249, 115, 22, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(156, 163, 175, 0.7)',
        ],
        borderColor: [
          'rgb(249, 115, 22)',
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(168, 85, 247)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 1,
      },
    ],
  }

  // Customer acquisition
  const customerAcquisitionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Customers',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Returning Customers',
        data: [8, 12, 10, 18, 15, 22],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        tension: 0.4,
      },
    ],
  }

  // Geographic distribution
  const geographicDataChart = {
    labels: geographicData.map(item => item.region),
    datasets: [
      {
        label: 'Sales',
        data: geographicData.map(item => item.sales),
        backgroundColor: [
          'rgba(249, 115, 22, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(156, 163, 175, 0.7)',
        ],
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  const polarChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
    },
  }

  const salesChannels: SalesChannel[] = [
    {
      name: 'Direct Website',
      sales: 1024,
      revenue: 76800,
      growth: 15.2,
      icon: <Globe className="h-5 w-5" />,
      color: 'text-blue-600'
    },
    {
      name: 'Google Ads',
      sales: 156,
      revenue: 11700,
      growth: 23.8,
      icon: <Chrome className="h-5 w-5" />,
      color: 'text-green-600'
    },
    {
      name: 'Facebook Ads',
      sales: 89,
      revenue: 6675,
      growth: 8.4,
      icon: <Facebook className="h-5 w-5" />,
      color: 'text-blue-500'
    },
    {
      name: 'Instagram',
      sales: 67,
      revenue: 5025,
      growth: 12.1,
      icon: <Instagram className="h-5 w-5" />,
      color: 'text-pink-600'
    },
  ]

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats?.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+{stats?.revenueGrowth}% from last month</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalOrders}</p>
                <p className="text-sm text-green-600">+{stats?.orderGrowth}% from last month</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalCustomers}</p>
                <p className="text-sm text-green-600">+{stats?.customerGrowth}% from last month</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.totalProducts}</p>
                <p className="text-sm text-red-600">{stats?.lowStockProducts} low stock</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}>
                  {metric.icon}
                </div>
                <div className={`flex items-center text-sm ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change >= 0 ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-gray-900">{metric.value}{metric.name.includes('Rate') || metric.name.includes('Duration') ? '%' : ''}{metric.name.includes('Duration') ? ' min' : ''}</p>
                <p className="text-sm text-gray-600">{metric.name}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500">Monthly</span>
              </div>
            </div>
            <Line data={salesData} options={chartOptions} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Orders</h3>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500">Last 7 days</span>
              </div>
            </div>
            <Bar data={ordersData} options={chartOptions} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue by Category</h3>
              <BarChart3 className="h-5 w-5 text-gray-500" />
            </div>
            <Bar data={revenueByCategoryData} options={chartOptions} />
          </motion.div>

          {/* Customer Acquisition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Customer Acquisition</h3>
              <Users className="h-5 w-5 text-gray-500" />
            </div>
            <Line data={customerAcquisitionData} options={chartOptions} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              <PieChart className="h-5 w-5 text-gray-500" />
            </div>
            <Doughnut data={categoryData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
          </motion.div>

          {/* Geographic Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Sales by Region</h3>
              <MapPin className="h-5 w-5 text-gray-500" />
            </div>
            <PolarArea data={geographicDataChart} options={polarChartOptions} />
          </motion.div>

          {/* Sales Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales Channels</h3>
              <button className="text-orange-600 hover:text-orange-700 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {salesChannels.map((channel, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${channel.color} bg-opacity-10`}>
                      {channel.icon}
                    </div>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{channel.name}</p>
                      <p className="text-sm text-gray-600">{channel.sales} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{channel.revenue.toLocaleString()}</p>
                    <p className="text-sm text-green-600">+{channel.growth}%</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Orders and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <button className="text-orange-600 hover:text-orange-700 font-medium">View All</button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {recentOrders.map((order, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{order.customerName}</p>
                      <p className="text-sm text-gray-500">{order.items} items • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{order.amount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="bg-white rounded-lg shadow"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                <button className="text-orange-600 hover:text-orange-700 font-medium">View All</button>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {topProducts.map((product, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.sales} sales</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">₹{product.revenue.toLocaleString()}</p>
                      <p className="text-sm text-green-600">+{product.growth}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="mt-8 bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Plus className="h-6 w-6 text-orange-600 mb-2" />
              <span className="text-sm font-medium">Add Product</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <ShoppingCart className="h-6 w-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium">Orders</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-6 w-6 text-green-600 mb-2" />
              <span className="text-sm font-medium">Customers</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="h-6 w-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium">Reports</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Settings className="h-6 w-6 text-gray-600 mb-2" />
              <span className="text-sm font-medium">Settings</span>
            </button>
            <button className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-6 w-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}