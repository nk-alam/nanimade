import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

// Mock data store (in production, this would be in a database)
let analyticsSettings = {
  googleAnalytics: {
    trackingId: process.env.NEXT_PUBLIC_GA_ID || '',
    enabled: !!process.env.NEXT_PUBLIC_GA_ID
  },
  googleSearchConsole: {
    verificationCode: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
    enabled: !!process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  },
  facebookPixel: {
    pixelId: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '',
    enabled: !!process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
  }
}

// GET /api/analytics - Get analytics settings
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only allow admin users to access analytics settings
    if (!session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(analyticsSettings)
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/analytics - Update analytics settings
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await request.json()
    
    // Update analytics settings
    analyticsSettings = {
      ...analyticsSettings,
      ...data
    }

    // In a real implementation, you would also update environment variables
    // This is just a mock implementation for demonstration

    return NextResponse.json({ success: true, settings: analyticsSettings })
  } catch (error) {
    console.error('Analytics save error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}