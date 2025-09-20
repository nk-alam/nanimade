"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react"

interface SocialLink {
  id: string
  platform: string
  url: string
}

interface QuickLink {
  id: string
  label: string
  url: string
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [footerSettings, setFooterSettings] = useState({
    copyrightText: `© ${currentYear} NaniMade. All rights reserved.`,
    socialLinks: [
      { id: "1", platform: "Facebook", url: "#" },
      { id: "2", platform: "Instagram", url: "#" },
      { id: "3", platform: "Twitter", url: "#" }
    ],
    quickLinks: [
      { id: "1", label: "Privacy Policy", url: "/privacy" },
      { id: "2", label: "Terms of Service", url: "/terms" },
      { id: "3", label: "Refund Policy", url: "/refund-policy" },
      { id: "4", label: "Shipping Policy", url: "/shipping-policy" }
    ]
  })

  // Load footer settings from API
  useEffect(() => {
    const fetchFooterSettings = async () => {
      try {
        const response = await fetch('/api/appearance')
        if (response.ok) {
          const data = await response.json()
          setFooterSettings(data.footer)
        }
      } catch (error) {
        console.error('Failed to fetch footer settings:', error)
      }
    }

    fetchFooterSettings()
  }, [])

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-orange-600">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Stay Updated with NaniMade</h3>
              <p className="text-orange-100">Get the latest recipes, offers, and pickle stories delivered to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 bg-white text-gray-900 rounded-r-none"
              />
              <Button className="bg-gray-900 hover:bg-gray-800 rounded-l-none">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">NaniMade</h2>
                <p className="text-sm text-gray-400">Authentic Malda Pickles</p>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              Bringing you the authentic taste of Malda&apos;s finest mangoes in every jar. 
              Our handcrafted pickles are made with traditional recipes passed down through generations.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">Malda, West Bengal, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm text-gray-300">info@nanimade.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {footerSettings.socialLinks.map((link) => (
                <Link 
                  key={link.id} 
                  href={link.url} 
                  className="bg-gray-800 p-2 rounded-full hover:bg-orange-600 transition-colors"
                >
                  {link.platform === 'Facebook' && <Facebook className="h-4 w-4" />}
                  {link.platform === 'Instagram' && <Instagram className="h-4 w-4" />}
                  {link.platform === 'Twitter' && <Twitter className="h-4 w-4" />}
                  {!['Facebook', 'Instagram', 'Twitter'].includes(link.platform) && (
                    <span className="text-xs">{link.platform.charAt(0)}</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerSettings.quickLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.url} className="text-gray-300 hover:text-orange-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/products/mango-pickles" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Mango Pickles</Link></li>
              <li><Link href="/products/mixed-pickles" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Mixed Pickles</Link></li>
              <li><Link href="/products/seasonal-pickles" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Seasonal Pickles</Link></li>
              <li><Link href="/products/gift-sets" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Gift Sets</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Returns</Link></li>
              <li><Link href="/size-guide" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">Size Guide</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-orange-400 transition-colors text-sm">FAQ</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-gray-400">
              <span>{footerSettings.copyrightText}</span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-sm text-gray-400 mr-2">We accept:</span>
              <div className="flex space-x-2">
                <div className="bg-white rounded px-2 py-1 text-xs font-semibold text-gray-900">Razorpay</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-semibold text-gray-900">UPI</div>
                <div className="bg-white rounded px-2 py-1 text-xs font-semibold text-gray-900">Cards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}