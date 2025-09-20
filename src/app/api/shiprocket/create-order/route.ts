import { NextRequest, NextResponse } from 'next/server'
import { shiprocketService, createShiprocketOrder } from '@/lib/shiprocket'
import { auth } from '@/lib/auth'

// POST /api/shiprocket/create-order - Create a Shiprocket order
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only allow admin users to create orders
    if (!session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { order, user } = await request.json()

    if (!order || !user) {
      return NextResponse.json(
        { error: 'Order and user data are required' },
        { status: 400 }
      )
    }

    // Transform order data to Shiprocket format
    const shipmentData = createShiprocketOrder(order, user)

    // Create order in Shiprocket
    const shiprocketResponse = await shiprocketService.createOrder(shipmentData)

    return NextResponse.json({
      success: true,
      shiprocketOrderId: shiprocketResponse.order_id,
      awbNumber: shiprocketResponse.awb_number,
      shipmentId: shiprocketResponse.shipment_id,
      courierName: shiprocketResponse.courier_name,
      courierId: shiprocketResponse.courier_id
    })
  } catch (error: any) {
    console.error('Shiprocket order creation error:', error)
    
    // Handle specific Shiprocket errors
    if (error.message?.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Failed to authenticate with Shiprocket API' },
        { status: 500 }
      )
    }
    
    if (error.message?.includes('Order creation failed')) {
      return NextResponse.json(
        { error: 'Failed to create order in Shiprocket' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}