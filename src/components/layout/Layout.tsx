"use client"

import { SessionProvider } from "next-auth/react"
import { Toaster } from "react-hot-toast"
import Header from "./Header"
import Footer from "./Footer"
import MobileBottomNav from "./MobileBottomNav"
import { Analytics } from "@/lib/analytics"

interface LayoutProps {
  children: React.ReactNode
  session?: any
}

export default function Layout({ children, session }: LayoutProps) {
  return (
    <SessionProvider session={session}>
      <div className="min-h-screen flex flex-col">
        <Analytics />
        <Header />
        <main className="flex-1 pb-16 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10B981',
              },
            },
            error: {
              style: {
                background: '#EF4444',
              },
            },
          }}
        />
      </div>
    </SessionProvider>
  )
}