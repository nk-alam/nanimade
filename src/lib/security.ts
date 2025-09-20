import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from './rate-limit'

// Security headers to add to all responses
export const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';"
}

// Apply security headers to response
export function applySecurityHeaders(response: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export function isValidPassword(password: string): boolean {
  // At least 8 characters, one uppercase, one lowercase, one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

// Sanitize input to prevent XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

// Validate and sanitize user input
export function validateAndSanitizeInput(data: Record<string, any>): Record<string, any> {
  const sanitizedData: Record<string, any> = {}
  
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitizedData[key] = sanitizeInput(value)
    } else {
      sanitizedData[key] = value
    }
  }
  
  return sanitizedData
}

// Rate limiting middleware for API routes
export async function withRateLimit(
  req: NextRequest,
  limit: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
) {
  // Skip rate limiting in development mode
  if (process.env.NODE_ENV === 'development') {
    // In development, use a much higher limit to avoid blocking tests
    limit = limit * 10;
  }
  
  const rateLimiter = rateLimit({
    limit,
    windowMs,
    keyGenerator: (req) => {
      // Get IP from headers (works with Vercel, Cloudflare, etc.)
      const forwarded = req.headers.get('x-forwarded-for')
      const ip = forwarded 
        ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0])
        : req.headers.get('x-real-ip') || 'anonymous'
      return ip || 'anonymous'
    }
  })
  
  return await rateLimiter(req)
}

// Authentication middleware for API routes
export async function requireAuth(request: NextRequest) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return {
      success: false,
      message: 'Authentication required'
    }
  }
  
  // Here you would validate the JWT token
  // For now, we'll just check if it exists
  // In a real implementation, you would verify the token with your auth service
  
  return {
    success: true,
    message: 'Authenticated'
  }
}

// Admin authorization middleware
export async function requireAdmin(request: NextRequest) {
  const authResult = await requireAuth(request)
  
  if (!authResult.success) {
    return authResult
  }
  
  // Here you would check if the user is an admin
  // For now, we'll just return success
  // In a real implementation, you would verify admin privileges
  
  return {
    success: true,
    message: 'Admin authorized'
  }
}

// Validate request origin for CSRF protection
export function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  
  if (!origin) return true // Allow requests without origin (e.g., same-origin)
  
  // Allow localhost for development
  if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
    return true
  }
  
  // Check if origin matches host
  return origin.includes(host || '')
}

// Create a secure API response
export function createSecureResponse(data: any, status: number = 200) {
  const response = NextResponse.json(data, { status })
  return applySecurityHeaders(response)
}

// Create a secure error response
export function createSecureErrorResponse(message: string, status: number = 400) {
  const response = NextResponse.json({ error: message }, { status })
  return applySecurityHeaders(response)
}
