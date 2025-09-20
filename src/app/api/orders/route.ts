import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { withRateLimit, createSecureResponse, createSecureErrorResponse } from '@/lib/security'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await withRateLimit(request, 100, 15 * 60 * 1000) // 100 requests per 15 minutes
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Rate limit exceeded', 429)
    }

    // Require authentication
    const session = await auth()
    if (!session?.user?.id) {
      return createSecureErrorResponse('Authentication required', 401)
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset') || '0'
    
    let query = supabase
      .from('orders')
      .select(`
        *,
        user:users(id, name, email),
        items:order_items(*, product:products(name))
      `)
      .order('created_at', { ascending: false })

    // Only admins can see all orders, regular users can only see their own orders
    if (!session.user.isAdmin) {
      query = query.eq('user_id', session.user.id)
    }

    if (status) {
      query = query.eq('status', status)
    }

    if (limit) {
      const limitNum = parseInt(limit)
      if (limitNum > 100) {
        return createSecureErrorResponse('Limit cannot exceed 100', 400)
      }
      query = query.limit(limitNum)
    }

    const offsetNum = parseInt(offset)
    if (offsetNum > 0) {
      query = query.range(offsetNum, offsetNum + (limit ? parseInt(limit) - 1 : 9))
    }

    const { data: orders, error } = await query

    if (error) {
      console.error('Error fetching orders:', error)
      return createSecureErrorResponse('Failed to fetch orders', 500)
    }

    const response = NextResponse.json({ orders })
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (error) {
    console.error('API Error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}

// Admin-only endpoint to update order status
export async function PUT(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await withRateLimit(request, 30, 15 * 60 * 1000) // 30 requests per 15 minutes for PUT
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Rate limit exceeded', 429)
    }

    // Require authentication
    const session = await auth()
    if (!session?.user?.id) {
      return createSecureErrorResponse('Authentication required', 401)
    }

    // Require admin privileges
    if (!session.user.isAdmin) {
      return createSecureErrorResponse('Admin privileges required', 403)
    }

    const body = await request.json()
    
    if (!body.id) {
      return createSecureErrorResponse('Order ID is required', 400)
    }

    const { data: order, error } = await supabase
      .from('orders')
      .update({
        status: body.status,
        payment_status: body.payment_status,
        tracking_number: body.tracking_number,
        shiprocket_order_id: body.shiprocket_order_id,
        updated_at: new Date().toISOString()
      })
      .eq('id', body.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating order:', error)
      return createSecureErrorResponse('Failed to update order', 500)
    }

    if (!order) {
      return createSecureErrorResponse('Order not found', 404)
    }

    const response = NextResponse.json({ order })
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (error) {
    console.error('API Error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}