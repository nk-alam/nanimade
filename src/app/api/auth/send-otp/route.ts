import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { emailService } from '@/lib/email'
import { withRateLimit, createSecureResponse, createSecureErrorResponse } from '@/lib/security'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    const rateLimitResult = await withRateLimit(request, 5, 15 * 60 * 1000) // 5 requests per 15 minutes
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Too many OTP requests. Please try again later.', 429)
    }

    const { email, type = 'verification' } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return createSecureErrorResponse('Valid email is required', 400)
    }

    if (!['verification', 'password_reset', 'login'].includes(type)) {
      return createSecureErrorResponse('Invalid OTP type', 400)
    }

    // Generate OTP
    const otp = generateOTP()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store OTP in database
    const { error: insertError } = await supabase
      .from('otp_codes')
      .insert({
        email,
        code: otp,
        type,
        expires_at: expiresAt.toISOString(),
        used: false,
        created_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('OTP insert error:', insertError)
      return createSecureErrorResponse('Failed to generate OTP', 500)
    }

    // Send OTP via email
    try {
      await emailService.sendEmail(email, 'otp', {
        USER_EMAIL: email,
        OTP_CODE: otp,
        OTP_TYPE: type,
        EXPIRES_IN: '10 minutes',
        LOGO_URL: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
        COMPANY_NAME: 'NaniMade'
      })
    } catch (emailError) {
      console.error('OTP email error:', emailError)
      // Don't fail the request if email fails, but log it
    }

    return createSecureResponse({
      message: 'OTP sent successfully',
      expires_at: expiresAt.toISOString()
    })

  } catch (error) {
    console.error('Send OTP error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}