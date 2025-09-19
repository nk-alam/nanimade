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
        if (!credentials?.email || !credentials?.password) {
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

          // Verify password (you'll need to store hashed passwords)
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
        } catch (error) {
          console.error('Auth error:', error)
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
                is_admin: user.email === process.env.ADMIN_EMAIL
              })

            if (error) {
              console.error('Error creating user:', error)
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
}