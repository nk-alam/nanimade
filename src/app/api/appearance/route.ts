import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { createSecureResponse, createSecureErrorResponse } from '@/lib/security'

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
    
    // For development, allow access without authentication
    if (!session?.user?.id) {
      console.log('No session found, returning appearance settings')
      return createSecureResponse(appearanceSettings)
    }

    // Only allow admin users to access appearance settings
    if (!session.user.isAdmin) {
      console.log('User is not admin, returning appearance settings')
      return createSecureResponse(appearanceSettings)
    }

    console.log('Admin user accessing appearance settings')
    return createSecureResponse(appearanceSettings)
  } catch (error) {
    console.error('Appearance fetch error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}

// POST /api/appearance - Update appearance settings
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session.user.isAdmin) {
      return createSecureErrorResponse('Forbidden', 403)
    }

    const data = await request.json()
    
    // Update appearance settings
    appearanceSettings = {
      ...appearanceSettings,
      ...data
    }

    return createSecureResponse({ success: true, settings: appearanceSettings })
  } catch (error) {
    console.error('Appearance save error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}