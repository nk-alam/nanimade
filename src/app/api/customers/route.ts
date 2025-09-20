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

    // Only admins can access customer data
    if (!session.user.isAdmin) {
      return createSecureErrorResponse('Admin privileges required', 403)
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const offset = searchParams.get('offset') || '0'
    const search = searchParams.get('search')
    
    let query = supabase
      .from('users')
      .select(`
        *,
        orders:orders(count, total_amount),
        addresses:addresses(count)
      `)
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
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

    const { data: customers, error } = await query

    if (error) {
      console.error('Error fetching customers:', error)
      return createSecureErrorResponse('Failed to fetch customers', 500)
    }

    // Process customer data to add computed fields
    const processedCustomers = customers.map(customer => {
      const totalOrders = customer.orders?.length || 0
      const totalSpent = customer.orders?.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0) || 0
      const addressCount = customer.addresses?.length || 0
      
      return {
        ...customer,
        totalOrders,
        totalSpent,
        addressCount,
        // Remove sensitive data
        password_hash: undefined
      }
    })

    const response = NextResponse.json({ customers: processedCustomers })
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (error) {
    console.error('API Error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}

// Admin-only endpoint to update customer status
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
      return createSecureErrorResponse('Customer ID is required', 400)
    }

    const { data: customer, error } = await supabase
      .from('users')
      .update({
        is_admin: body.is_admin,
        updated_at: new Date().toISOString()
      })
      .eq('id', body.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating customer:', error)
      return createSecureErrorResponse('Failed to update customer', 500)
    }

    if (!customer) {
      return createSecureErrorResponse('Customer not found', 404)
    }

    const response = NextResponse.json({ customer })
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (error) {
    console.error('API Error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}