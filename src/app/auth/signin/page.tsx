"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn, getSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react"
import toast from "react-hot-toast"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast.error("Invalid email or password")
      } else {
        toast.success("Welcome back!")
        router.push(callbackUrl)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl })
    } catch (error) {
      toast.error("Failed to sign in with Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block space-y-8"
        >
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">NaniMade</h1>
                <p className="text-gray-600">Authentic Malda Pickles</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back to the taste of tradition
              </h2>
              <p className="text-lg text-gray-600">
                Sign in to continue your pickle journey and explore our authentic collection 
                of handcrafted pickles from the heart of Malda.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">4.8★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-64 rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80"
              alt="Traditional pickle making"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Right Side - Sign In Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-4">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">NaniMade</h1>
                  <p className="text-sm text-gray-600">Authentic Malda Pickles</p>
                </div>
              </div>

              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Sign In
              </CardTitle>
              <p className="text-center text-gray-600">
                Enter your credentials to access your account
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google Sign In */}
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50"
              >
                <Image
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="mr-3"
                />
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12"
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <Link href="/auth/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-lg font-medium"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Signing in...
                    </div>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-orange-600 hover:text-orange-700 font-medium">
                  Sign up now
                </Link>
              </p>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-gray-500 mt-6">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-gray-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-gray-700">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}