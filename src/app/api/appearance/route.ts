import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

// Mock data store (in production, this would be in a database)
let appearanceSettings = {
  header: {
    logoText: 'NaniMade',
    navItems: [
      { id: '1', label: 'Home', url: '/' },
      { id: '2', label: 'Products', url: '/products' },
      { id: '3', label: 'About', url: '/about' },
      { id: '4', label: 'Contact', url: '/contact' }
    ]
  },
  footer: {
    copyrightText: '© 2024 NaniMade. All rights reserved.',
    socialLinks: [
      { id: '1', platform: 'Facebook', url: 'https://facebook.com/nanimade' },
      { id: '2', platform: 'Instagram', url: 'https://instagram.com/nanimade' }
    ],
    quickLinks: [
      { id: '1', label: 'Terms', url: '/terms' },
      { id: '2', label: 'Privacy', url: '/privacy' },
      { id: '3', label: 'Shipping', url: '/shipping-policy' }
    ]
  }
}

// GET /api/appearance - Get appearance settings
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only allow admin users to access appearance settings
    if (!session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(appearanceSettings)
  } catch (error) {
    console.error('Appearance fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/appearance - Update appearance settings
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await request.json()
    
    // Update appearance settings
    appearanceSettings = {
      ...appearanceSettings,
      ...data
    }

    return NextResponse.json({ success: true, settings: appearanceSettings })
  } catch (error) {
    console.error('Appearance save error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}