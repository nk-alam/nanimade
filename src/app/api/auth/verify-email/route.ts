import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { withRateLimit, createSecureResponse, createSecureErrorResponse } from '@/lib/security'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await withRateLimit(request, 5, 15 * 60 * 1000) // 5 requests per 15 minutes
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Too many verification attempts. Please try again later.', 429)
    }

    const { email, otp } = await request.json()

    if (!email || !otp) {
      return createSecureErrorResponse('Email and OTP are required', 400)
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      return createSecureErrorResponse('OTP must be 6 digits', 400)
    }

    // Find valid OTP for email verification
    const { data: otpRecord, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', otp)
      .eq('type', 'verification')
      .eq('used', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (otpError || !otpRecord) {
      return createSecureErrorResponse('Invalid or expired OTP', 400)
    }

    // Mark OTP as used
    const { error: updateError } = await supabase
      .from('otp_codes')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('id', otpRecord.id)

    if (updateError) {
      console.error('OTP update error:', updateError)
      return createSecureErrorResponse('Failed to verify OTP', 500)
    }

    // Mark user as verified
    const { error: userUpdateError } = await supabase
      .from('users')
      .update({ 
        email_verified: true, 
        verified_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('email', email)

    if (userUpdateError) {
      console.error('User verification error:', userUpdateError)
      return createSecureErrorResponse('Failed to verify user', 500)
    }

    return createSecureResponse({
      message: 'Email verified successfully',
      verified: true
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}