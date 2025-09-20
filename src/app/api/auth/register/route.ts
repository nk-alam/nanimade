import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { withRateLimit, createSecureResponse, createSecureErrorResponse } from '@/lib/security'
import bcrypt from 'bcryptjs'
import { emailService } from '@/lib/email'

// Check if environment variables are set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase environment variables not set')
}

const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseServiceKey || 'placeholder_key'
)

export async function POST(request: NextRequest) {
  try {
    // Check rate limit - allow 10 registrations per hour for testing
    const rateLimitResult = await withRateLimit(request, 10, 60 * 60 * 1000) // 10 registrations per hour
    if (!rateLimitResult.success) {
      return createSecureErrorResponse(rateLimitResult.message || 'Too many registration attempts. Please try again later.', 429)
    }

    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return createSecureErrorResponse('Name, email, and password are required', 400)
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return createSecureErrorResponse('Valid email is required', 400)
    }

    if (password.length < 6) {
      return createSecureErrorResponse('Password must be at least 6 characters', 400)
    }

    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return createSecureErrorResponse('User with this email already exists', 409)
    }

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows returned
      console.error('User fetch error:', fetchError)
      return createSecureErrorResponse('Failed to check user existence', 500)
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // First, create user in Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
    })

    if (authError) {
      console.error('Auth user creation error:', authError)
      return createSecureErrorResponse('Failed to create user account', 500)
    }

    // Create user in database (without email verification)
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        id: authUser.user.id, // Use the ID from auth
        name,
        email,
        password_hash: passwordHash,
        email_verified: false,
        is_admin: email === process.env.ADMIN_EMAIL,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      console.error('User creation error:', insertError)
      // If database insert fails, delete the auth user to keep things consistent
      await supabase.auth.admin.deleteUser(authUser.user.id)
      return createSecureErrorResponse('Failed to create user: ' + insertError.message, 500)
    }

    // Generate OTP for email verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store OTP in database
    const { error: otpError } = await supabase
      .from('otp_codes')
      .insert({
        email,
        code: otp,
        type: 'verification',
        expires_at: expiresAt.toISOString(),
        used: false,
        created_at: new Date().toISOString()
      })

    if (otpError) {
      console.error('OTP insert error:', otpError)
      // Don't fail the registration if OTP fails, but log it
    }

    // Send verification email with OTP
    try {
      console.log('Attempting to send OTP email to:', email)
      console.log('Email config check:', {
        serverUser: process.env.EMAIL_SERVER_USER,
        serverPassword: process.env.EMAIL_SERVER_PASSWORD ? '****' : 'NOT SET',
        serverHost: process.env.EMAIL_SERVER_HOST,
        fromEmail: process.env.EMAIL_FROM
      })
      
      // Check if email service is properly configured
      if (process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD) {
        await emailService.sendEmail(email, 'otp', {
          USER_EMAIL: email,
          OTP_CODE: otp,
          OTP_TYPE: 'verification',
          EXPIRES_IN: '10 minutes',
          LOGO_URL: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
          COMPANY_NAME: 'NaniMade'
        })
        console.log('OTP email sent successfully to:', email)
      } else {
        console.warn('Email service not configured - skipping email send')
        console.log('Missing config details:', {
          EMAIL_SERVER_USER: !!process.env.EMAIL_SERVER_USER,
          EMAIL_SERVER_PASSWORD: !!process.env.EMAIL_SERVER_PASSWORD,
          EMAIL_SERVER_HOST: !!process.env.EMAIL_SERVER_HOST,
          EMAIL_FROM: !!process.env.EMAIL_FROM
        })
      }
    } catch (emailError) {
      console.error('Welcome email error:', emailError)
      // Don't fail the registration if email fails, but log it
    }

    return createSecureResponse({
      message: 'User created successfully. Please check your email for verification.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      redirect: `/auth/verify-email?email=${encodeURIComponent(email)}`
    })

  } catch (error) {
    console.error('Registration error:', error)
    return createSecureErrorResponse('Internal server error: ' + (error as Error).message, 500)
  }
}