import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import AdminLayout from '@/components/Admin/Layout'
import { supabase } from '@/lib/supabase'
import { Analytics } from '@/types'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import {
  CurrencyRupeeIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  TrendingUpIcon,
  TrendingDownIcon,
} from '@heroicons/react/24/outline'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

interface DashboardProps {
  analytics: Analytics
}

const AdminDashboard = ({ analytics }: DashboardProps) => {
  const [timeRange, setTimeRange] = useState('7d')

  const stats = [
    {
      name: 'Total Sales',
      value: `₹${analytics.totalSales.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'increase',
      icon: CurrencyRupeeIcon,
    },
    {
      name: 'Total Orders',
      value: analytics.totalOrders.toLocaleString(),
      change: '+8.2%',
      changeType: 'increase',
      icon: ClipboardDocumentListIcon,
    },
    {
      name: 'Total Customers',
      value: analytics.totalCustomers.toLocaleString(),
      change: '+15.3%',
      changeType: 'increase',
      icon: UserGroupIcon,
    },
    {
      name: 'Total Products',
      value: analytics.totalProducts.toLocaleString(),
      change: '+2.1%',
      changeType: 'increase',
      icon: ShoppingBagIcon,
    },
  ]

  const salesChartData = {
    labels: analytics.salesData.map(item => item.date),
    datasets: [
      {
        label: 'Sales',
        data: analytics.salesData.map(item => item.amount),
        borderColor: 'rgb(249, 115, 22)',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        tension: 0.4,
      },
    ],
  }

  const topProductsData = {
    labels: analytics.topProducts.map(item => item.name),
    datasets: [
      {
        label: 'Sales',
        data: analytics.topProducts.map(item => item.sales),
        backgroundColor: [
          'rgba(249, 115, 22, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(253, 186, 116, 0.8)',
          'rgba(254, 215, 170, 0.8)',
          'rgba(255, 237, 213, 0.8)',
        ],
      },
    ],
  }

  const orderStatusData = {
    labels: analytics.ordersByStatus.map(item => item.status),
    datasets: [
      {
        data: analytics.ordersByStatus.map(item => item.count),
        backgroundColor: [
          '#10B981',
          '#F59E0B',
          '#3B82F6',
          '#EF4444',
          '#8B5CF6',
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
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
            >
              <dt>
                <div className="absolute rounded-md bg-primary-500 p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.changeType === 'increase' ? (
                    <TrendingUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
                  ) : (
                    <TrendingDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
                  )}
                  <span className="sr-only">
                    {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  {item.change}
                </p>
              </dd>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Sales Overview</h3>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border-gray-300 rounded-md"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
              <Line data={salesChartData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Order Status</h3>
              <Doughnut data={orderStatusData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white overflow-hidden shadow rounded-lg lg:col-span-2"
          >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
              <Bar data={topProductsData} options={chartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white shadow overflow-hidden sm:rounded-md"
        >
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest orders from customers</p>
          </div>
          <ul className="divide-y divide-gray-200">
            {/* This would be populated with actual recent orders */}
            <li className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600">#1001</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Rahul Sharma</div>
                    <div className="text-sm text-gray-500">2 items • ₹599</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Delivered
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  try {
    // Fetch analytics data
    const { data: orders } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    const { data: customers } = await supabase
      .from('profiles')
      .select('id')
      .eq('role', 'user')

    const { data: products } = await supabase
      .from('products')
      .select('id')
      .eq('is_active', true)

    const analytics: Analytics = {
      totalSales: orders?.reduce((sum, order) => sum + order.total_amount, 0) || 0,
      totalOrders: orders?.length || 0,
      totalCustomers: customers?.length || 0,
      totalProducts: products?.length || 0,
      salesData: [], // This would be calculated based on date ranges
      topProducts: [], // This would be calculated from order items
      ordersByStatus: [
        { status: 'pending', count: orders?.filter(o => o.status === 'pending').length || 0 },
        { status: 'confirmed', count: orders?.filter(o => o.status === 'confirmed').length || 0 },
        { status: 'shipped', count: orders?.filter(o => o.status === 'shipped').length || 0 },
        { status: 'delivered', count: orders?.filter(o => o.status === 'delivered').length || 0 },
        { status: 'cancelled', count: orders?.filter(o => o.status === 'cancelled').length || 0 },
      ],
    }

    return {
      props: {
        analytics,
      },
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return {
      props: {
        analytics: {
          totalSales: 0,
          totalOrders: 0,
          totalCustomers: 0,
          totalProducts: 0,
          salesData: [],
          topProducts: [],
          ordersByStatus: [],
        },
      },
    }
  }
}

export default AdminDashboard