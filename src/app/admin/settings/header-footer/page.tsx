'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  Save,
  Eye,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  Plus,
  Trash2,
  ImageIcon,
  LinkIcon,
} from 'lucide-react'

interface HeaderFooterSettings {
  header: {
    logo: string
    logoText: string
    navigation: Array<{
      id: string
      label: string
      href: string
    }>
    announcement: {
      enabled: boolean
      text: string
      bgColor: string
      textColor: string
    }
  }
  footer: {
    companyInfo: {
      name: string
      description: string
      address: string
      phone: string
      email: string
    }
    socialMedia: Array<{
      platform: string
      url: string
    }>
    copyright: string
  }
}

export default function HeaderFooterSettings() {
  const [settings, setSettings] = useState<HeaderFooterSettings>({
    header: {
      logo: '/logo.png',
      logoText: 'NaniMade',
      navigation: [
        { id: '1', label: 'Home', href: '/' },
        { id: '2', label: 'Products', href: '/products' },
        { id: '3', label: 'Recipes', href: '/recipes' },
        { id: '4', label: 'About', href: '/about' },
        { id: '5', label: 'Contact', href: '/contact' },
      ],
      announcement: {
        enabled: true,
        text: 'Free shipping on orders over ₹500! 🚚',
        bgColor: '#ea580c',
        textColor: '#ffffff'
      }
    },
    footer: {
      companyInfo: {
        name: 'NaniMade',
        description: 'Authentic Malda mango pickles made with traditional Bengali recipes.',
        address: 'Malda District, West Bengal, India 732101',
        phone: '+91-9876543210',
        email: 'contact@nanimade.com'
      },
      socialMedia: [
        { platform: 'Facebook', url: 'https://facebook.com/nanimade' },
        { platform: 'Instagram', url: 'https://instagram.com/nanimade' },
        { platform: 'Twitter', url: 'https://twitter.com/nanimade' }
      ],
      copyright: '© 2024 NaniMade. All rights reserved.'
    }
  })

  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [activeTab, setActiveTab] = useState<'header' | 'footer'>('header')

  const saveSettings = async () => {
    setLoading(true)
    try {
      localStorage.setItem('header_footer_settings', JSON.stringify(settings))
      
      // Save to database in production
      const response = await fetch('/api/admin/settings/header-footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      toast.success('Settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const addNavigationItem = () => {
    const newItem = {
      id: Date.now().toString(),
      label: 'New Link',
      href: '/'
    }
    setSettings(prev => ({
      ...prev,
      header: {
        ...prev.header,
        navigation: [...prev.header.navigation, newItem]
      }
    }))
  }

  const removeNavigationItem = (id: string) => {
    setSettings(prev => ({
      ...prev,
      header: {
        ...prev.header,
        navigation: prev.header.navigation.filter(item => item.id !== id)
      }
    }))
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Layout className="h-6 w-6 mr-2" />
              Header & Footer Customization
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Customize your website's header and footer appearance
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreview('desktop')}
                className={`p-2 rounded ${preview === 'desktop' ? 'bg-white shadow' : ''}`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreview('tablet')}
                className={`p-2 rounded ${preview === 'tablet' ? 'bg-white shadow' : ''}`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreview('mobile')}
                className={`p-2 rounded ${preview === 'mobile' ? 'bg-white shadow' : ''}`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={saveSettings}
              disabled={loading}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Settings Panel */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('header')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'header'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Header Settings
            </button>
            <button
              onClick={() => setActiveTab('footer')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'footer'
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Footer Settings
            </button>
          </div>

          {/* Header Settings */}
          {activeTab === 'header' && (
            <div className="space-y-6">
              {/* Logo Settings */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Logo & Branding
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={settings.header.logo}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        header: { ...prev.header, logo: e.target.value }
                      }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo Text
                    </label>
                    <input
                      type="text"
                      value={settings.header.logoText}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        header: { ...prev.header, logoText: e.target.value }
                      }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Settings */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <LinkIcon className="h-5 w-5 mr-2" />
                    Navigation Menu
                  </h3>
                  <button
                    onClick={addNavigationItem}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Link
                  </button>
                </div>
                <div className="space-y-3">
                  {settings.header.navigation.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          setSettings(prev => ({
                            ...prev,
                            header: {
                              ...prev.header,
                              navigation: prev.header.navigation.map(nav =>
                                nav.id === item.id ? { ...nav, label: e.target.value } : nav
                              )
                            }
                          }))
                        }}
                        placeholder="Label"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => {
                          setSettings(prev => ({
                            ...prev,
                            header: {
                              ...prev.header,
                              navigation: prev.header.navigation.map(nav =>
                                nav.id === item.id ? { ...nav, href: e.target.value } : nav
                              )
                            }
                          }))
                        }}
                        placeholder="URL"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                      <button
                        onClick={() => removeNavigationItem(item.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcement Bar */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Announcement Bar</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.header.announcement.enabled}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        header: {
                          ...prev.header,
                          announcement: { ...prev.header.announcement, enabled: e.target.checked }
                        }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
                </div>
                {settings.header.announcement.enabled && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Announcement Text
                      </label>
                      <input
                        type="text"
                        value={settings.header.announcement.text}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          header: {
                            ...prev.header,
                            announcement: { ...prev.header.announcement, text: e.target.value }
                          }
                        }))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Background Color
                        </label>
                        <input
                          type="color"
                          value={settings.header.announcement.bgColor}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            header: {
                              ...prev.header,
                              announcement: { ...prev.header.announcement, bgColor: e.target.value }
                            }
                          }))}
                          className="w-full h-10 rounded-md border-gray-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Text Color
                        </label>
                        <input
                          type="color"
                          value={settings.header.announcement.textColor}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            header: {
                              ...prev.header,
                              announcement: { ...prev.header.announcement, textColor: e.target.value }
                            }
                          }))}
                          className="w-full h-10 rounded-md border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Settings */}
          {activeTab === 'footer' && (
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={settings.footer.companyInfo.name}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          companyInfo: { ...prev.footer.companyInfo, name: e.target.value }
                        }
                      }))}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={settings.footer.companyInfo.description}
                      onChange={(e) => setSettings(prev => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          companyInfo: { ...prev.footer.companyInfo, description: e.target.value }
                        }
                      }))}
                      rows={3}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={settings.footer.companyInfo.phone}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            companyInfo: { ...prev.footer.companyInfo, phone: e.target.value }
                          }
                        }))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={settings.footer.companyInfo.email}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          footer: {
                            ...prev.footer,
                            companyInfo: { ...prev.footer.companyInfo, email: e.target.value }
                          }
                        }))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Copyright</h3>
                <input
                  type="text"
                  value={settings.footer.copyright}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    footer: { ...prev.footer, copyright: e.target.value }
                  }))}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Live Preview
            </h3>
            <span className="text-sm text-gray-500 capitalize">{preview} View</span>
          </div>
          
          <div className={`border rounded-lg overflow-hidden ${
            preview === 'mobile' ? 'max-w-sm mx-auto' : 
            preview === 'tablet' ? 'max-w-2xl mx-auto' : 'w-full'
          }`}>
            {/* Header Preview */}
            {settings.header.announcement.enabled && (
              <div 
                className="text-center py-2 px-4 text-sm"
                style={{ 
                  backgroundColor: settings.header.announcement.bgColor,
                  color: settings.header.announcement.textColor 
                }}
              >
                {settings.header.announcement.text}
              </div>
            )}
            
            <div className="bg-white border-b px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={settings.header.logo} alt="Logo" className="h-8 w-8 mr-2" />
                  <span className="font-bold text-lg">{settings.header.logoText}</span>
                </div>
                {preview !== 'mobile' && (
                  <nav className="hidden md:flex space-x-6">
                    {settings.header.navigation.slice(0, 5).map((item) => (
                      <span key={item.id} className="text-sm text-gray-600">{item.label}</span>
                    ))}
                  </nav>
                )}
                <button className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-gray-50 p-8 text-center">
              <p className="text-gray-600">Page content would appear here</p>
            </div>

            {/* Footer Preview */}
            <div className="bg-gray-900 text-white p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">{settings.footer.companyInfo.name}</h4>
                  <p className="text-sm text-gray-300 mb-2">{settings.footer.companyInfo.description}</p>
                  <p className="text-sm text-gray-300">{settings.footer.companyInfo.phone}</p>
                  <p className="text-sm text-gray-300">{settings.footer.companyInfo.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Follow Us</h4>
                  <div className="space-y-1">
                    {settings.footer.socialMedia.map((social, index) => (
                      <div key={index} className="text-sm text-gray-300">{social.platform}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-sm text-gray-300">{settings.footer.copyright}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}