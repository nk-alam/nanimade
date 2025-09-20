import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        product:products(*),
        variant:product_variants(*)
      `)
      .eq('user_id', session.user.id)

    if (error) {
      console.error('Error fetching cart:', error)
      return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
    }

    return NextResponse.json({ cartItems })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { product_id, variant_id, quantity } = await request.json()

    // Check if item already exists in cart
    const { data: existingItem } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('product_id', product_id)
      .eq('variant_id', variant_id || null)
      .single()

    if (existingItem) {
      // Update existing item
      const { data: updatedItem, error } = await supabase
        .from('cart_items')
        .update({ 
          quantity: existingItem.quantity + quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingItem.id)
        .select(`
          *,
          product:products(*),
          variant:product_variants(*)
        `)
        .single()

      if (error) {
        console.error('Error updating cart item:', error)
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
      }

      return NextResponse.json({ cartItem: updatedItem })
    } else {
      // Create new cart item
      const { data: newItem, error } = await supabase
        .from('cart_items')
        .insert([{
          user_id: session.user.id,
          product_id,
          variant_id,
          quantity
        }])
        .select(`
          *,
          product:products(*),
          variant:product_variants(*)
        `)
        .single()

      if (error) {
        console.error('Error adding to cart:', error)
        return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 })
      }

      return NextResponse.json({ cartItem: newItem }, { status: 201 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { item_id, quantity } = await request.json()

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', item_id)
        .eq('user_id', session.user.id)

      if (error) {
        console.error('Error removing cart item:', error)
        return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    } else {
      // Update quantity
      const { data: updatedItem, error } = await supabase
        .from('cart_items')
        .update({ 
          quantity,
          updated_at: new Date().toISOString()
        })
        .eq('id', item_id)
        .eq('user_id', session.user.id)
        .select(`
          *,
          product:products(*),
          variant:product_variants(*)
        `)
        .single()

      if (error) {
        console.error('Error updating cart item:', error)
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
      }

      return NextResponse.json({ cartItem: updatedItem })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const item_id = searchParams.get('item_id')

    if (!item_id) {
      return NextResponse.json({ error: 'Item ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', item_id)
      .eq('user_id', session.user.id)

    if (error) {
      console.error('Error removing cart item:', error)
      return NextResponse.json({ error: 'Failed to remove item' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}