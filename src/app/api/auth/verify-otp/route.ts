import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit, createAPIResponse, createErrorResponse } from '@/lib/security'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    
    // Check rate limit
    const rateLimit = checkRateLimit(ip, '/api/auth/verify-otp')
    if (!rateLimit.allowed) {
      return createErrorResponse('Too many verification attempts. Please try again later.', 429)
    }

    const { email, otp, type = 'verification' } = await request.json()

    if (!email || !otp || !type) {
      return createErrorResponse('Email, OTP, and type are required', 400)
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      return createErrorResponse('OTP must be 6 digits', 400)
    }

    // Find valid OTP
    const { data: otpRecord, error: otpError } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('email', email)
      .eq('code', otp)
      .eq('type', type)
      .eq('used', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (otpError || !otpRecord) {
      return createErrorResponse('Invalid or expired OTP', 400)
    }

    // Mark OTP as used
    const { error: updateError } = await supabase
      .from('otp_codes')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('id', otpRecord.id)

    if (updateError) {
      console.error('OTP update error:', updateError)
      return createErrorResponse('Failed to verify OTP', 500)
    }

    // Handle different OTP types
    switch (type) {
      case 'verification':
        // Mark user as verified
        const { error: userUpdateError } = await supabase
          .from('users')
          .update({ email_verified: true, verified_at: new Date().toISOString() })
          .eq('email', email)

        if (userUpdateError) {
          console.error('User verification error:', userUpdateError)
        }

        return createAPIResponse({
          message: 'Email verified successfully',
          verified: true
        })

      case 'password_reset':
        // Generate password reset token
        const resetToken = require('crypto').randomBytes(32).toString('hex')
        const resetExpiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

        const { error: tokenError } = await supabase
          .from('password_reset_tokens')
          .insert({
            email,
            token: resetToken,
            expires_at: resetExpiresAt.toISOString(),
            used: false,
            created_at: new Date().toISOString()
          })

        if (tokenError) {
          console.error('Reset token error:', tokenError)
          return createErrorResponse('Failed to generate reset token', 500)
        }

        return createAPIResponse({
          message: 'OTP verified. You can now reset your password.',
          reset_token: resetToken
        })

      case 'login':
        // For OTP-based login, return success
        return createAPIResponse({
          message: 'OTP verified successfully',
          verified: true,
          login_verified: true
        })

      default:
        return createErrorResponse('Invalid OTP type', 400)
    }

  } catch (error) {
    console.error('Verify OTP error:', error)
    return createErrorResponse('Internal server error', 500)
  }
}