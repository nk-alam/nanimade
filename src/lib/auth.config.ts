import { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { supabaseAdmin } from "@/lib/supabase" // Use admin client
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
          // Get user from Supabase using admin client
          const { data: user, error } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single()

          if (error || !user) {
            console.log('User not found in database:', credentials.email)
            return null
          }

          console.log('User found in database during auth:', {
            id: user.id,
            email: user.email,
            email_verified: user.email_verified,
            hasPasswordHash: !!user.password_hash
          })

          // Check if email is verified
          if (!user.email_verified) {
            console.log('User email not verified:', user.email)
            throw new Error('Please verify your email before signing in')
          }

          // Handle OTP-based login
          if (credentials.password && (credentials.password as string).length === 6) {
            // This is an OTP login attempt
            // Verify OTP from database
            const { data: otpRecord, error: otpError } = await supabaseAdmin
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
              console.log('Invalid OTP attempt for user:', user.email)
              return null
            }

            // Mark OTP as used
            await supabaseAdmin
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
            console.log('Attempting password validation for user:', user.email)
            const isPasswordValid = await bcrypt.compare(
              credentials.password as string,
              user.password_hash || ''
            )

            console.log('Password validation result:', isPasswordValid)

            if (!isPasswordValid) {
              console.log('Invalid password for user:', user.email)
              return null
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.avatar_url,
            }
          }

          console.log('No valid authentication method for user:', user.email)
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
      console.log('JWT callback - token:', token, 'user:', user, 'account:', account);
      if (user) {
        token.id = user.id
        
        // Get user data from database to check admin status
        const { data: userData } = await supabaseAdmin
          .from('users')
          .select('is_admin')
          .eq('id', user.id)
          .single()
        
        token.isAdmin = userData?.is_admin || false
        console.log('JWT token updated with user data:', {
          id: token.id,
          isAdmin: token.isAdmin
        });
      }
      return token
    },
    async session({ session, token }) {
      console.log('Session callback - session:', session, 'token:', token);
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
          const { data: existingUser } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', user.email!)
            .single()

          if (!existingUser) {
            // Create new user
            const { error } = await supabaseAdmin
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
            const { error } = await supabaseAdmin
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