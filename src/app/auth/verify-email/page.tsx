"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Mail, CheckCircle, AlertCircle } from "lucide-react"
import toast from "react-hot-toast"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    // Get email from search params or localStorage
    const emailParam = searchParams?.get("email") || ""
    setEmail(emailParam)
    
    // If no email parameter, redirect to signup
    if (!emailParam) {
      router.push("/auth/signup")
    }
  }, [searchParams, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast.error("Email is required")
      return
    }

    if (!/^[0-9]{6}$/.test(otp)) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, type: 'verification' })
      })

      const data = await response.json()

      if (response.ok) {
        setIsVerified(true)
        toast.success("Email verified successfully!")
      } else {
        setError(data.error || "Failed to verify email")
        toast.error(data.error || "Failed to verify email")
      }
      
    } catch (error) {
      setError("Something went wrong. Please try again.")
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0 text-center">
            <CardHeader>
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Email Verified!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-gray-600">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
              <Button 
                onClick={() => router.push("/auth/signin")}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-lg font-medium"
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Verify Your Email
            </CardTitle>
            <p className="text-gray-600">
              We've sent a 6-digit code to <span className="font-medium">{email}</span>. Please enter it below.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="flex items-center p-3 bg-red-50 text-red-700 rounded-lg">
                <AlertCircle className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Verification Code</label>
                <Input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-12 text-center text-xl tracking-widest"
                  maxLength={6}
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-lg font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Verifying...
                  </div>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>
            
            <div className="text-center text-sm text-gray-600">
              <p>Didn't receive the code?</p>
              <Button 
                variant="link" 
                className="text-orange-600 hover:text-orange-700 p-0 h-auto"
                onClick={() => router.push("/auth/signup")}
              >
                Resend code or try a different email
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}