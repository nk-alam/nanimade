import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { withRateLimit, requireAuth, requireAdmin, validateAndSanitizeInput, createSecureResponse, createSecureErrorResponse } from '@/lib/security'

export async function GET(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await withRateLimit(request, 100, 15 * 60 * 1000) // 100 requests per 15 minutes
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Rate limit exceeded', 429)
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')
    
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        variants:product_variants(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (category) {
      query = query.eq('category_id', category)
    }

    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    if (limit) {
      const limitNum = parseInt(limit)
      if (limitNum > 100) {
        return createSecureErrorResponse('Limit cannot exceed 100', 400)
      }
      query = query.limit(limitNum)
    }

    const { data: products, error } = await query

    if (error) {
      console.error('Error fetching products:', error)
      return createSecureErrorResponse('Failed to fetch products', 500)
    }

    const response = NextResponse.json({ products })
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (error) {
    console.error('API Error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await withRateLimit(request, 20, 15 * 60 * 1000) // 20 requests per 15 minutes for POST
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Rate limit exceeded', 429)
    }

    // Require authentication
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      return createSecureErrorResponse(authResult.message || 'Authentication required', 401)
    }

    // Require admin privileges
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return createSecureErrorResponse('Admin privileges required', 403)
    }

    const body = await request.json()
    
    // Validate and sanitize input
    const sanitizedBody = validateAndSanitizeInput(body)
    
    const { data: product, error } = await supabase
      .from('products')
      .insert([sanitizedBody])
      .select()
      .single()

    if (error) {
      console.error('Error creating product:', error)
      return createSecureErrorResponse('Failed to create product', 500)
    }

    const response = NextResponse.json({ product }, { status: 201 })
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (error) {
    console.error('API Error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await withRateLimit(request, 30, 15 * 60 * 1000) // 30 requests per 15 minutes for PUT
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Rate limit exceeded', 429)
    }

    // Require authentication
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      return createSecureErrorResponse(authResult.message || 'Authentication required', 401)
    }

    // Require admin privileges
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return createSecureErrorResponse('Admin privileges required', 403)
    }

    const body = await request.json()
    
    // Validate and sanitize input
    const sanitizedBody = validateAndSanitizeInput(body)
    
    if (!sanitizedBody.id) {
      return createSecureErrorResponse('Product ID is required', 400)
    }

    const { data: product, error } = await supabase
      .from('products')
      .update(sanitizedBody)
      .eq('id', sanitizedBody.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating product:', error)
      return createSecureErrorResponse('Failed to update product', 500)
    }

    if (!product) {
      return createSecureErrorResponse('Product not found', 404)
    }

    const response = NextResponse.json({ product })
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (error) {
    console.error('API Error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResult = await withRateLimit(request, 10, 15 * 60 * 1000) // 10 requests per 15 minutes for DELETE
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Rate limit exceeded', 429)
    }

    // Require authentication
    const authResult = await requireAuth(request)
    if (!authResult.success) {
      return createSecureErrorResponse(authResult.message || 'Authentication required', 401)
    }

    // Require admin privileges
    const adminResult = await requireAdmin(request)
    if (!adminResult.success) {
      return createSecureErrorResponse('Admin privileges required', 403)
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return createSecureErrorResponse('Product ID is required', 400)
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting product:', error)
      return createSecureErrorResponse('Failed to delete product', 500)
    }

    const response = NextResponse.json({ message: 'Product deleted successfully' })
    Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (error) {
    console.error('API Error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}