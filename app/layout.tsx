import './globals.css'
import type { Metadata } from 'next'
import { Quicksand, Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NaniMade - Authentic Handmade Pickles from Malda',
    template: '%s | NaniMade'
  },
  description: 'Discover authentic handmade pickles crafted with traditional recipes from Malda, the mango city of India. Premium quality pickles made with love and care.',
  keywords: ['pickles', 'mango pickles', 'handmade', 'traditional', 'Malda', 'authentic', 'Indian food'],
  authors: [{ name: 'NaniMade' }],
  creator: 'NaniMade',
  publisher: 'NaniMade',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nanimade.com',
    siteName: 'NaniMade',
    title: 'NaniMade - Authentic Handmade Pickles from Malda',
    description: 'Discover authentic handmade pickles crafted with traditional recipes from Malda, the mango city of India.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NaniMade Pickles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NaniMade - Authentic Handmade Pickles from Malda',
    description: 'Discover authentic handmade pickles crafted with traditional recipes from Malda, the mango city of India.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_ID,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${quicksand.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}