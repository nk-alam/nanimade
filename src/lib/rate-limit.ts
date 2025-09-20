import { NextRequest } from 'next/server'

// Simple in-memory store for rate limiting
// In production, you should use Redis or a similar external store
class MemoryStore {
  private requests: Map<string, { count: number; resetTime: number }> = new Map()

  increment(key: string, limit: number, windowMs: number): { success: boolean; remaining: number } {
    const now = Date.now()
    const windowStart = now - windowMs
    
    // Clean up expired entries
    for (const [k, value] of this.requests.entries()) {
      if (value.resetTime < now) {
        this.requests.delete(k)
      }
    }
    
    const entry = this.requests.get(key) || { count: 0, resetTime: now + windowMs }
    
    // Reset count if window has passed
    if (entry.resetTime < now) {
      entry.count = 0
      entry.resetTime = now + windowMs
    }
    
    if (entry.count >= limit) {
      return { success: false, remaining: 0 }
    }
    
    entry.count++
    this.requests.set(key, entry)
    
    return { success: true, remaining: limit - entry.count }
  }
  
  resetKey(key: string) {
    this.requests.delete(key)
  }
}

const store = new MemoryStore()

interface RateLimitOptions {
  limit?: number
  windowMs?: number
  keyGenerator?: (req: NextRequest) => string
}

export function rateLimit(options: RateLimitOptions = {}) {
  const {
    limit = 100,
    windowMs = 15 * 60 * 1000, // 15 minutes
    keyGenerator = (req: NextRequest) => {
      // Get IP from headers (works with Vercel, Cloudflare, etc.)
      const forwarded = req.headers.get('x-forwarded-for')
      const ip = forwarded 
        ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0])
        : req.headers.get('x-real-ip') || 'anonymous'
      return ip || 'anonymous'
    }
  } = options

  return async function (req: NextRequest) {
    const key = keyGenerator(req)
    const { success, remaining } = store.increment(key, limit, windowMs)
    
    const headers = {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': new Date(Date.now() + windowMs).toISOString()
    }
    
    if (!success) {
      return {
        success: false,
        headers,
        message: 'Too many requests, please try again later.'
      }
    }
    
    return {
      success: true,
      headers
    }
  }
}