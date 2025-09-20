import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { securityHeaders } from "@/lib/security"

export async function middleware(request: NextRequest) {
  // Apply security headers to all responses
  const response = NextResponse.next()
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  const session = await auth()
  const { pathname } = request.nextUrl

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
    
    if (!session.user.isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Protect user dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  // Protect checkout route
  if (pathname.startsWith('/checkout')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*', 
    '/dashboard/:path*', 
    '/checkout/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
}