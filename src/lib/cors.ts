import { NextRequest, NextResponse } from 'next/server'
import { securityConfig } from './security.config'

// CORS middleware
export function corsMiddleware(request: NextRequest) {
  const origin = request.headers.get('origin')
  const isAllowedOrigin = origin && securityConfig.cors.allowedOrigins.includes(origin)
  
  const headers = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : securityConfig.cors.allowedOrigins[0],
    'Access-Control-Allow-Methods': securityConfig.cors.allowedMethods.join(', '),
    'Access-Control-Allow-Headers': securityConfig.cors.allowedHeaders.join(', '),
    'Access-Control-Allow-Credentials': securityConfig.cors.credentials.toString()
  }
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers
    })
  }
  
  return headers
}

// Apply CORS headers to response
export function applyCorsHeaders(response: NextResponse, corsHeaders: Record<string, string>) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}