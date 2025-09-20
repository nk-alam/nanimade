import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { withRateLimit, createSecureResponse, createSecureErrorResponse } from '@/lib/security'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await withRateLimit(request, 5, 15 * 60 * 1000) // 5 requests per 15 minutes
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Too many reset attempts. Please try again later.', 429)
    }

    const { token, password } = await request.json()

    if (!token || !password) {
      return createSecureErrorResponse('Token and password are required', 400)
    }

    if (password.length < 6) {
      return createSecureErrorResponse('Password must be at least 6 characters', 400)
    }

    // Find valid reset token
    const { data: resetToken, error: tokenError } = await supabase
      .from('password_reset_tokens')
      .select('*')
      .eq('token', token)
      .eq('used', false)
      .gte('expires_at', new Date().toISOString())
      .single()

    if (tokenError || !resetToken) {
      return createSecureErrorResponse('Invalid or expired reset token', 400)
    }

    // Hash new password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Update user's password
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        password_hash: passwordHash,
        updated_at: new Date().toISOString()
      })
      .eq('email', resetToken.email)

    if (updateError) {
      console.error('Password update error:', updateError)
      return createSecureErrorResponse('Failed to reset password', 500)
    }

    // Mark reset token as used
    const { error: tokenUpdateError } = await supabase
      .from('password_reset_tokens')
      .update({ 
        used: true, 
        used_at: new Date().toISOString() 
      })
      .eq('id', resetToken.id)

    if (tokenUpdateError) {
      console.error('Token update error:', tokenUpdateError)
      // Don't fail the request if token update fails, but log it
    }

    return createSecureResponse({
      message: 'Password reset successfully'
    })

  } catch (error) {
    console.error('Password reset error:', error)
    return createSecureErrorResponse('Internal server error', 500)
  }
}