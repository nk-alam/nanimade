import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { supabase } from "@/lib/supabase"
import bcrypt from "bcryptjs"

export const authConfig: NextAuthConfig = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email) {
          return null
        }

        try {
          // Get user from Supabase
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single()

          if (error || !user) {
            return null
          }

          // Check if email is verified
          if (!user.email_verified) {
            throw new Error('Please verify your email before signing in')
          }

          // Handle OTP-based login
          if (credentials.password && (credentials.password as string).length === 6) {
            // This is an OTP login attempt
            // Verify OTP from database
            const { data: otpRecord, error: otpError } = await supabase
              .from('otp_codes')
              .select('*')
              .eq('email', credentials.email)
              .eq('code', credentials.password)
              .eq('type', 'login')
              .eq('used', false)
              .gte('expires_at', new Date().toISOString())
              .order('created_at', { ascending: false })
              .limit(1)
              .single()

            if (otpError || !otpRecord) {
              return null
            }

            // Mark OTP as used
            await supabase
              .from('otp_codes')
              .update({ used: true, used_at: new Date().toISOString() })
              .eq('id', otpRecord.id)

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.avatar_url,
            }
          }

          // Handle password-based login
          if (credentials.password && user.password_hash) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password as string,
              user.password_hash || ''
            )

            if (!isPasswordValid) {
              return null
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.avatar_url,
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          if (error instanceof Error && error.message === 'Please verify your email before signing in') {
            throw error
          }
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        
        // Get user data from database to check admin status
        const { data: userData } = await supabase
          .from('users')
          .select('is_admin')
          .eq('id', user.id)
          .single()
        
        token.isAdmin = userData?.is_admin || false
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          // Check if user already exists
          const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('email', user.email!)
            .single()

          if (!existingUser) {
            // Create new user
            const { error } = await supabase
              .from('users')
              .insert({
                id: user.id,
                email: user.email!,
                name: user.name || '',
                avatar_url: user.image,
                email_verified: true, // Google users are automatically verified
                is_admin: user.email === process.env.ADMIN_EMAIL,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              })

            if (error) {
              console.error('Error creating user:', error)
              return false
            }
          } else if (!existingUser.email_verified) {
            // If existing Google user somehow isn't verified, update them
            const { error } = await supabase
              .from('users')
              .update({
                email_verified: true,
                updated_at: new Date().toISOString()
              })
              .eq('id', existingUser.id)

            if (error) {
              console.error('Error updating user:', error)
              return false
            }
          }
        } catch (error) {
          console.error('Sign in error:', error)
          return false
        }
      }
      return true
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  trustHost: true,
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser && account?.provider === "google") {
        // Send welcome email for new Google users
        try {
          // Implementation for sending welcome email
          console.log('New Google user signed in:', user.email)
        } catch (error) {
          console.error('Error sending welcome email:', error)
        }
      }
    }
  }
}