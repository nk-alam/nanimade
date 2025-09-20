import { NextRequest, NextResponse } from 'next/server'
import { ShiprocketService } from '@/lib/shiprocket'

// POST /api/shiprocket/test - Test Shiprocket API connection
export async function POST(request: NextRequest) {
  try {
    const { shiprocket_email, shiprocket_password } = await request.json()

    if (!shiprocket_email || !shiprocket_password) {
      return NextResponse.json(
        { error: 'Shiprocket email and password are required' },
        { status: 400 }
      )
    }

    // Create a temporary Shiprocket service instance with provided credentials
    const tempService = new ShiprocketService({
      email: shiprocket_email,
      password: shiprocket_password,
      baseUrl: 'https://apiv2.shiprocket.in',
    })

    // Test authentication
    await tempService.authenticate()

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully connected to Shiprocket API' 
    })
  } catch (error: any) {
    console.error('Shiprocket test error:', error)
    
    if (error.message?.includes('Authentication failed')) {
      return NextResponse.json(
        { error: 'Invalid Shiprocket credentials' },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to connect to Shiprocket API' },
      { status: 500 }
    )
  }
}