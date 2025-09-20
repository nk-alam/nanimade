import { NextRequest, NextResponse } from 'next/server'
import { shiprocketService } from '@/lib/shiprocket'
import { auth } from '@/lib/auth'

// GET /api/shiprocket/tracking?awb=123456789 - Get tracking information for an AWB number
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const awb = searchParams.get('awb')

    if (!awb) {
      return NextResponse.json(
        { error: 'AWB number is required' },
        { status: 400 }
      )
    }

    // Check if user is authenticated (for user dashboard access)
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // In a real implementation, you would verify that the user has access to this tracking information
    // For now, we'll allow all authenticated users to track any shipment

    const trackingData = await shiprocketService.trackShipment(awb)
    
    return NextResponse.json(trackingData)
  } catch (error: any) {
    console.error('Shiprocket tracking error:', error)
    
    // Handle specific Shiprocket errors
    if (error.message?.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Failed to authenticate with Shiprocket API' },
        { status: 500 }
      )
    }
    
    if (error.message?.includes('Tracking failed')) {
      return NextResponse.json(
        { error: 'Failed to retrieve tracking information' },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}