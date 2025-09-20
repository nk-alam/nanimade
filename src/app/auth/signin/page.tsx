'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/"
  const message = searchParams?.get("message") || ""
  
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  })
  const [showOTP, setShowOTP] = useState(false)
  const [isSendingOTP, setIsSendingOTP] = useState(false)

  useEffect(() => {
    if (message) {
      toast.info(message)
    }
  }, [message])

  const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        // Check if it's an email verification error
        if (result.error.includes('verify your email')) {
          toast.error(result.error)
          // Redirect to verification page
          router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`)
        } else {
          toast.error(result.error)
        }
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl })
    } catch (error) {
      toast.error('Failed to sign in with Google')
      setIsLoading(false)
    }
  }

  const handleSendOTP = async () => {
    if (!formData.email) {
      toast.error('Please enter your email')
      return
    }

    setIsSendingOTP(true)
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, type: 'login' })
      })

      const data = await response.json()
      
      if (response.ok) {
        setShowOTP(true)
        toast.success('OTP sent to your email')
      } else {
        toast.error(data.error || 'Failed to send OTP')
      }
    } catch (error) {
      toast.error('Failed to send OTP')
    } finally {
      setIsSendingOTP(false)
    }
  }

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          otp: formData.otp,
          type: 'login'
        })
      })

      const data = await response.json()
      
      if (response.ok && data.verified) {
        // Sign in the user
        const result = await signIn('credentials', {
          email: formData.email,
          otp: formData.otp,
          redirect: false,
        })

        if (result?.error) {
          toast.error(result.error)
        } else {
          router.push(callbackUrl)
          router.refresh()
        }
      } else {
        toast.error(data.error || 'Invalid OTP')
      }
    } catch (error) {
      toast.error('Failed to verify OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error('Please enter your email first')
      return
    }

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, type: 'password_reset' })
      })

      const data = await response.json()
      
      if (response.ok) {
        toast.success('Password reset instructions sent to your email')
        router.push('/auth/forgot-password')
      } else {
        toast.error(data.error || 'Failed to send reset instructions')
      }
    } catch (error) {
      toast.error('Failed to send reset instructions')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-orange-600">Welcome Back</CardTitle>
          <CardDescription>Sign in to your NaniMade account</CardDescription>
        </CardHeader>
        <CardContent>
          {showOTP ? (
            <form onSubmit={handleOTPVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  maxLength={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={() => setShowOTP(false)}
              >
                Back to Email
              </Button>
            </form>
          ) : (
            <>
              <form onSubmit={handleEmailPasswordSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleSendOTP} 
                  className="w-full" 
                  variant="outline"
                  disabled={isSendingOTP || !formData.email}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {isSendingOTP ? 'Sending OTP...' : 'Sign in with OTP'}
                </Button>
                
                <Button 
                  onClick={handleGoogleSignIn} 
                  className="w-full" 
                  variant="outline"
                  disabled={isLoading}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="text-orange-600 hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-sm text-center text-gray-600">
            <button 
              onClick={handleForgotPassword}
              className="text-orange-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}