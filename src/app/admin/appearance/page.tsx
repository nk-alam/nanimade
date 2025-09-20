'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Palette, 
  Save, 
  Upload, 
  Eye, 
  Smartphone, 
  Monitor,
  Menu,
  X,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface HeaderConfig {
  logoText: string
  navItems: Array<{ id: string; label: string; url: string }>
}

interface FooterConfig {
  copyrightText: string
  socialLinks: Array<{ id: string; platform: string; url: string }>
  quickLinks: Array<{ id: string; label: string; url: string }>
}

export default function AppearanceSettings() {
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header')
  const [isSaving, setIsSaving] = useState(false)
  
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
    logoText: 'NaniMade',
    navItems: [
      { id: '1', label: 'Home', url: '/' },
      { id: '2', label: 'Products', url: '/products' },
      { id: '3', label: 'About', url: '/about' },
      { id: '4', label: 'Contact', url: '/contact' }
    ]
  })
  
  const [footerConfig, setFooterConfig] = useState<FooterConfig>({
    copyrightText: '© 2024 NaniMade. All rights reserved.',
    socialLinks: [
      { id: '1', platform: 'Facebook', url: 'https://facebook.com/nanimade' },
      { id: '2', platform: 'Instagram', url: 'https://instagram.com/nanimade' }
    ],
    quickLinks: [
      { id: '1', label: 'Terms', url: '/terms' },
      { id: '2', label: 'Privacy', url: '/privacy' },
      { id: '3', label: 'Shipping', url: '/shipping-policy' }
    ]
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // In a real implementation, this would save to your database
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Settings saved successfully!')
    } catch (error) {
      alert('Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  const addNavItem = () => {
    setHeaderConfig({
      ...headerConfig,
      navItems: [
        ...headerConfig.navItems,
        { id: Date.now().toString(), label: '', url: '' }
      ]
    })
  }

  const updateNavItem = (id: string, field: 'label' | 'url', value: string) => {
    setHeaderConfig({
      ...headerConfig,
      navItems: headerConfig.navItems.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    })
  }

  const removeNavItem = (id: string) => {
    setHeaderConfig({
      ...headerConfig,
      navItems: headerConfig.navItems.filter(item => item.id !== id)
    })
  }

  const addSocialLink = () => {
    setFooterConfig({
      ...footerConfig,
      socialLinks: [
        ...footerConfig.socialLinks,
        { id: Date.now().toString(), platform: '', url: '' }
      ]
    })
  }

  const updateSocialLink = (id: string, field: 'platform' | 'url', value: string) => {
    setFooterConfig({
      ...footerConfig,
      socialLinks: footerConfig.socialLinks.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    })
  }

  const removeSocialLink = (id: string) => {
    setFooterConfig({
      ...footerConfig,
      socialLinks: footerConfig.socialLinks.filter(item => item.id !== id)
    })
  }

  const addQuickLink = () => {
    setFooterConfig({
      ...footerConfig,
      quickLinks: [
        ...footerConfig.quickLinks,
        { id: Date.now().toString(), label: '', url: '' }
      ]
    })
  }

  const updateQuickLink = (id: string, field: 'label' | 'url', value: string) => {
    setFooterConfig({
      ...footerConfig,
      quickLinks: footerConfig.quickLinks.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    })
  }

  const removeQuickLink = (id: string) => {
    setFooterConfig({
      ...footerConfig,
      quickLinks: footerConfig.quickLinks.filter(item => item.id !== id)
    })
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Palette className="h-6 w-6 mr-2" />
              Appearance Settings
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Customize your website&apos;s header and footer
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving} className="flex items-center">
            {isSaving ? (
              <>
                <div className="h-4 w-4 mr-2 rounded-full border-2 border-white border-t-transparent animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('header')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'header'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Header
          </button>
          <button
            onClick={() => setActiveTab('footer')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'footer'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Footer
          </button>
        </nav>
      </div>

      {activeTab === 'header' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Header Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Logo Text
                </label>
                <Input
                  value={headerConfig.logoText}
                  onChange={(e) => setHeaderConfig({...headerConfig, logoText: e.target.value})}
                  placeholder="Enter logo text"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Navigation Items</h3>
                  <Button onClick={addNavItem} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {headerConfig.navItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Input
                        value={item.label}
                        onChange={(e) => updateNavItem(item.id, 'label', e.target.value)}
                        placeholder="Label"
                        className="flex-1"
                      />
                      <Input
                        value={item.url}
                        onChange={(e) => updateNavItem(item.id, 'url', e.target.value)}
                        placeholder="URL"
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => removeNavItem(item.id)}
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Header Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-orange-600">
                    {headerConfig.logoText}
                  </div>
                  <div className="hidden md:flex items-center space-x-6">
                    {headerConfig.navItems.map((item) => (
                      <a 
                        key={item.id} 
                        href={item.url} 
                        className="text-gray-600 hover:text-orange-600"
                      >
                        {item.label}
                      </a>
                    ))}
                    <Button size="sm">Sign In</Button>
                  </div>
                  <Button variant="outline" size="sm" className="md:hidden">
                    <Menu className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Footer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Copyright Text
                </label>
                <Input
                  value={footerConfig.copyrightText}
                  onChange={(e) => setFooterConfig({...footerConfig, copyrightText: e.target.value})}
                  placeholder="Enter copyright text"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
                  <Button onClick={addSocialLink} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {footerConfig.socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center space-x-3">
                      <Input
                        value={link.platform}
                        onChange={(e) => updateSocialLink(link.id, 'platform', e.target.value)}
                        placeholder="Platform"
                        className="flex-1"
                      />
                      <Input
                        value={link.url}
                        onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                        placeholder="URL"
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => removeSocialLink(link.id)}
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Quick Links</h3>
                  <Button onClick={addQuickLink} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {footerConfig.quickLinks.map((link) => (
                    <div key={link.id} className="flex items-center space-x-3">
                      <Input
                        value={link.label}
                        onChange={(e) => updateQuickLink(link.id, 'label', e.target.value)}
                        placeholder="Label"
                        className="flex-1"
                      />
                      <Input
                        value={link.url}
                        onChange={(e) => updateQuickLink(link.id, 'url', e.target.value)}
                        placeholder="URL"
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => removeQuickLink(link.id)}
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-900"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Footer Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 bg-gray-900 text-white">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-orange-400 mb-4">
                      {headerConfig.logoText}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Authentic homemade pickles made with love and traditional recipes.
                    </p>
                    <div className="flex space-x-4">
                      {footerConfig.socialLinks.map((link) => (
                        <a 
                          key={link.id} 
                          href={link.url} 
                          className="text-gray-400 hover:text-white"
                        >
                          {link.platform}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                      {footerConfig.quickLinks.map((link) => (
                        <li key={link.id}>
                          <a href={link.url} className="text-gray-400 hover:text-white">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Contact</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>Email: info@nanimade.com</li>
                      <li>Phone: +91 9876543210</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 mt-8 pt-6 text-gray-400 text-sm">
                  {footerConfig.copyrightText}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}