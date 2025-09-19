import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        variants:product_variants(*),
        reviews:reviews(
          *,
          user:users(name, avatar_url)
        )
      `)
      .eq('slug', params.slug)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching product:', error)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    // Get related products
    const { data: relatedProducts } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*),
        variants:product_variants(*)
      `)
      .eq('category_id', product.category_id)
      .neq('id', product.id)
      .eq('is_active', true)
      .limit(4)

    return NextResponse.json({ 
      product: {
        ...product,
        related_products: relatedProducts || []
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}