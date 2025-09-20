import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { auth } from '@/lib/auth'

// GET /api/analytics - Get analytics data for dashboard
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only allow admin users to access analytics data
    if (!session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Fetch dashboard statistics
    const [ordersResult, productsResult, customersResult, analyticsResult] = await Promise.all([
      // Total orders and revenue
      supabase
        .from('orders')
        .select('id, total_amount, status, created_at'),
      
      // Total products
      supabase
        .from('products')
        .select('id, stock_quantity'),
      
      // Total customers
      supabase
        .from('users')
        .select('id, created_at'),
      
      // Analytics data (this would be from a real analytics service in production)
      supabase
        .from('analytics')
        .select('*')
        .order('date', { ascending: false })
        .limit(30)
    ])

    if (ordersResult.error || productsResult.error || customersResult.error || analyticsResult.error) {
      console.error('Analytics fetch errors:', {
        orders: ordersResult.error,
        products: productsResult.error,
        customers: customersResult.error,
        analytics: analyticsResult.error
      })
      return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
    }

    // Process statistics
    const totalOrders = ordersResult.data.length
    const totalRevenue = ordersResult.data.reduce((sum, order) => sum + (order.total_amount || 0), 0)
    const totalProducts = productsResult.data.length
    const lowStockProducts = productsResult.data.filter(p => p.stock_quantity < 10).length
    const totalCustomers = customersResult.data.length
    
    // Calculate recent growth (last 30 days vs previous 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const sixtyDaysAgo = new Date()
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60)
    
    const recentOrders = ordersResult.data.filter(order => 
      new Date(order.created_at) > thirtyDaysAgo
    )
    
    const previousOrders = ordersResult.data.filter(order => 
      new Date(order.created_at) > sixtyDaysAgo && new Date(order.created_at) <= thirtyDaysAgo
    )
    
    const recentCustomers = customersResult.data.filter(customer => 
      new Date(customer.created_at) > thirtyDaysAgo
    )
    
    const previousCustomers = customersResult.data.filter(customer => 
      new Date(customer.created_at) > sixtyDaysAgo && new Date(customer.created_at) <= thirtyDaysAgo
    )
    
    const recentRevenue = recentOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
    const previousRevenue = previousOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
    
    const revenueGrowth = previousRevenue > 0 
      ? ((recentRevenue - previousRevenue) / previousRevenue) * 100 
      : 100
    
    const orderGrowth = previousOrders.length > 0
      ? ((recentOrders.length - previousOrders.length) / previousOrders.length) * 100
      : 100
    
    const customerGrowth = previousCustomers.length > 0
      ? ((recentCustomers.length - previousCustomers.length) / previousCustomers.length) * 100
      : 100
    
    // Get pending orders
    const pendingOrders = ordersResult.data.filter(order => order.status === 'pending').length
    const completedOrders = ordersResult.data.filter(order => order.status === 'delivered').length
    
    // Calculate average order value
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
    
    // Get recent orders (last 5)
    const recentOrdersData = ordersResult.data
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
      .map(order => {
        // Get customer info for each order
        return {
          id: order.id,
          amount: order.total_amount,
          status: order.status,
          date: order.created_at
        }
      })
    
    // Get top products by sales (this would be more complex in a real implementation)
    const topProducts = productsResult.data
      .slice(0, 5)
      .map(product => ({
        id: product.id,
        sales: Math.floor(Math.random() * 1000), // Mock data
        revenue: Math.floor(Math.random() * 50000), // Mock data
        growth: Math.floor(Math.random() * 50) // Mock data
      }))
    
    // Get sales channels data (mock data for now)
    const salesChannels = [
      { name: 'Direct Website', sales: Math.floor(totalOrders * 0.7), revenue: Math.floor(totalRevenue * 0.7), growth: 15.2 },
      { name: 'Google Ads', sales: Math.floor(totalOrders * 0.15), revenue: Math.floor(totalRevenue * 0.15), growth: 23.8 },
      { name: 'Facebook Ads', sales: Math.floor(totalOrders * 0.1), revenue: Math.floor(totalRevenue * 0.1), growth: 8.4 },
      { name: 'Instagram', sales: Math.floor(totalOrders * 0.05), revenue: Math.floor(totalRevenue * 0.05), growth: 12.1 }
    ]
    
    // Get performance metrics (mock data for now)
    const performanceMetrics = [
      { name: 'Avg. Session Duration', value: 4.2, change: 12.5 },
      { name: 'Bounce Rate', value: 32.4, change: -8.2 },
      { name: 'Page Views', value: recentOrders.length * 3, change: 15.3 },
      { name: 'Conversion Rate', value: 3.2, change: 5.7 }
    ]
    
    // Get geographic data (mock data for now)
    const geographicData = [
      { region: 'West Bengal', sales: 420, revenue: 31500, growth: 18.2 },
      { region: 'Delhi', sales: 280, revenue: 21000, growth: 12.5 },
      { region: 'Maharashtra', sales: 195, revenue: 14625, growth: 8.7 },
      { region: 'Tamil Nadu', sales: 165, revenue: 12375, growth: 15.3 },
      { region: 'Karnataka', sales: 120, revenue: 9000, growth: 6.4 }
    ]

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue,
        totalCustomers,
        totalProducts,
        revenueGrowth,
        orderGrowth,
        customerGrowth,
        lowStockProducts,
        pendingOrders,
        completedOrders,
        avgOrderValue
      },
      recentOrders: recentOrdersData,
      topProducts,
      salesChannels,
      performanceMetrics,
      geographicData
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/analytics - Update analytics settings (keeping existing functionality)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await request.json()
    
    // In a real implementation, you would update environment variables or a settings table
    // This is just a mock implementation for demonstration

    return NextResponse.json({ success: true, settings: data })
  } catch (error) {
    console.error('Analytics save error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}