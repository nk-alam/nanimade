import { NextRequest } from 'next/server'
import { createSecureResponse } from '@/lib/security'

export async function GET(request: NextRequest) {
  return createSecureResponse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ? 'SET' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV,
  })
}