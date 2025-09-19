'use client'

import { useState } from 'react'
import {
  Globe,
  Search,
  FileText,
  Image,
  Link,
  Tag,
  BarChart3,
  Settings,
  Save,
  Eye,
  Code,
  Hash,
  Calendar,
  User,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Plus,
  Trash2,
  Download
} from 'lucide-react'

interface SeoSettings {
  siteTitle: string
  siteDescription: string
  siteKeywords: string
  siteAuthor: string
  siteLanguage: string
  favicon: string
  ogImage: string
  twitterHandle: string
  facebookAppId: string
  googleAnalyticsId: string
  googleSearchConsoleId: string
  robotsTxt: string
  sitemapPriority: string
  canonicalUrl: string
}

interface MetaTag {
  id: string
  name: string
  content: string
}

interface RedirectRule {
  id: string
  from: string
  to: string
  type: '301' | '302'
}

export default function SeoManagement() {
  const [activeTab, setActiveTab] = useState('general')
  const [seoSettings, setSeoSettings] = useState<SeoSettings>({
    siteTitle: 'NaniMade - Authentic Homemade Pickles',
    siteDescription: 'Discover the authentic taste of homemade pickles crafted by grandmothers with love. Experience the traditional flavors of Malda\'s finest mango pickles.',
    siteKeywords: 'pickle, homemade, authentic, Malda, mango, traditional, grandmother, recipe',
    siteAuthor: 'NaniMade',
    siteLanguage: 'en',
    favicon: '/favicon.ico',
    ogImage: '/images/og-image.jpg',
    twitterHandle: '@NaniMade',
    facebookAppId: '1234567890',
    googleAnalyticsId: 'GA-XXXXXXXXX-X',
    googleSearchConsoleId: 'GSC-XXXXXXXXX',
    robotsTxt: 'User-agent: *\nAllow: /\n\nSitemap: https://nanimade.com/sitemap.xml',
    sitemapPriority: '0.8',
    canonicalUrl: 'https://nanimade.com'
  })

  const [metaTags, setMetaTags] = useState<MetaTag[]>([
    { id: '1', name: 'theme-color', content: '#FFA500' },
    { id: '2', name: 'mobile-web-app-capable', content: 'yes' }
  ])

  const [redirectRules, setRedirectRules] = useState<RedirectRule[]>([
    { id: '1', from: '/old-pickles', to: '/products/mango-pickle', type: '301' },
    { id: '2', from: '/recipes-old', to: '/blog', type: '301' }
  ])

  const [newMetaTag, setNewMetaTag] = useState({ name: '', content: '' })
  const [newRedirect, setNewRedirect] = useState({ from: '', to: '', type: '301' as '301' | '302' })

  const handleSaveSettings = () => {
    alert('SEO settings saved successfully!')
  }

  const addMetaTag = () => {
    if (newMetaTag.name && newMetaTag.content) {
      setMetaTags([...metaTags, { 
        id: Date.now().toString(), 
        name: newMetaTag.name, 
        content: newMetaTag.content 
      }])
      setNewMetaTag({ name: '', content: '' })
    }
  }

  const removeMetaTag = (id: string) => {
    setMetaTags(metaTags.filter(tag => tag.id !== id))
  }

  const addRedirectRule = () => {
    if (newRedirect.from && newRedirect.to) {
      setRedirectRules([...redirectRules, { 
        id: Date.now().toString(), 
        from: newRedirect.from, 
        to: newRedirect.to,
        type: newRedirect.type
      }])
      setNewRedirect({ from: '', to: '', type: '301' })
    }
  }

  const removeRedirectRule = (id: string) => {
    setRedirectRules(redirectRules.filter(rule => rule.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Globe className="h-6 w-6 text-orange-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">SEO Management</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleSaveSettings}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'general'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              General Settings
            </button>
            <button
              onClick={() => setActiveTab('meta')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'meta'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Meta Tags
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'social'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Social Media
            </button>
            <button
              onClick={() => setActiveTab('redirects')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'redirects'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Redirects
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">General SEO Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">Configure your site's basic SEO information</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Title
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      value={seoSettings.siteTitle}
                      onChange={(e) => setSeoSettings({...seoSettings, siteTitle: e.target.value})}
                    />
                    <p className="mt-1 text-sm text-gray-500">The title that appears in search results</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Site Description
                    </label>
                    <textarea
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      value={seoSettings.siteDescription}
                      onChange={(e) => setSeoSettings({...seoSettings, siteDescription: e.target.value})}
                    />
                    <p className="mt-1 text-sm text-gray-500">A brief description of your site for search engines</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Keywords
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      value={seoSettings.siteKeywords}
                      onChange={(e) => setSeoSettings({...seoSettings, siteKeywords: e.target.value})}
                    />
                    <p className="mt-1 text-sm text-gray-500">Comma-separated keywords for your site</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site Author
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        value={seoSettings.siteAuthor}
                        onChange={(e) => setSeoSettings({...seoSettings, siteAuthor: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Site Language
                      </label>
                      <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        value={seoSettings.siteLanguage}
                        onChange={(e) => setSeoSettings({...seoSettings, siteLanguage: e.target.value})}
                      >
                        <option value="en">English</option>
                        <option value="hi">Hindi</option>
                        <option value="bn">Bengali</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Favicon
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                          value={seoSettings.favicon}
                          onChange={(e) => setSeoSettings({...seoSettings, favicon: e.target.value})}
                        />
                        <button className="ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                          <Image className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        OG Image
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                          value={seoSettings.ogImage}
                          onChange={(e) => setSeoSettings({...seoSettings, ogImage: e.target.value})}
                        />
                        <button className="ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                          <Image className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Canonical URL
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      value={seoSettings.canonicalUrl}
                      onChange={(e) => setSeoSettings({...seoSettings, canonicalUrl: e.target.value})}
                    />
                    <p className="mt-1 text-sm text-gray-500">The primary URL for your website</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Preview</h3>
                </div>
                <div className="p-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-blue-600 text-sm mb-1">https://nanimade.com</div>
                    <div className="text-xl text-blue-800 font-medium mb-1">{seoSettings.siteTitle}</div>
                    <div className="text-gray-600 text-sm">{seoSettings.siteDescription}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">SEO Tips</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2">Keep title under 60 characters</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2">Description should be 150-160 characters</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2">Use unique titles for each page</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2">Include keywords naturally</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Meta Tags Tab */}
        {activeTab === 'meta' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Custom Meta Tags</h3>
                  <p className="mt-1 text-sm text-gray-500">Add custom meta tags to improve SEO</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tag Name
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        placeholder="e.g., theme-color"
                        value={newMetaTag.name}
                        onChange={(e) => setNewMetaTag({...newMetaTag, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Content
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        placeholder="e.g., #FFA500"
                        value={newMetaTag.content}
                        onChange={(e) => setNewMetaTag({...newMetaTag, content: e.target.value})}
                      />
                    </div>
                  </div>
                  <button
                    onClick={addMetaTag}
                    className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Meta Tag
                  </button>

                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 mb-4">Existing Meta Tags</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Content
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {metaTags.map((tag) => (
                            <tr key={tag.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {tag.name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {tag.content}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => removeMetaTag(tag.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Common Meta Tags</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-orange-500">•</div>
                      <p className="ml-2"><strong>theme-color:</strong> Sets the theme color for mobile browsers</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-orange-500">•</div>
                      <p className="ml-2"><strong>viewport:</strong> Controls the viewport for responsive design</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-orange-500">•</div>
                      <p className="ml-2"><strong>robots:</strong> Controls how search engines crawl your site</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-orange-500">•</div>
                      <p className="ml-2"><strong>author:</strong> Specifies the author of the document</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Social Media Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">Configure social media integration</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter Handle
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">@</span>
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-8 rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        value={seoSettings.twitterHandle.replace('@', '')}
                        onChange={(e) => setSeoSettings({...seoSettings, twitterHandle: `@${e.target.value}`})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Facebook App ID
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      value={seoSettings.facebookAppId}
                      onChange={(e) => setSeoSettings({...seoSettings, facebookAppId: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        OG Title
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        placeholder="Default: Site Title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        OG Description
                      </label>
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        placeholder="Default: Site Description"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OG Image
                    </label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        value={seoSettings.ogImage}
                        onChange={(e) => setSeoSettings({...seoSettings, ogImage: e.target.value})}
                      />
                      <button className="ml-2 px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                        <Image className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-md font-medium text-gray-900 mb-3">Social Media Preview</h4>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-3">
                          <div className="text-sm font-medium text-blue-600">nanimade.com</div>
                          <div className="text-xs text-gray-500">Twitter · 2h</div>
                        </div>
                      </div>
                      <div className="text-gray-900 font-medium mb-2">Discover the authentic taste of homemade pickles crafted by grandmothers with love.</div>
                      <div className="flex space-x-2">
                        <Twitter className="h-4 w-4 text-blue-400" />
                        <Facebook className="h-4 w-4 text-blue-600" />
                        <Linkedin className="h-4 w-4 text-blue-700" />
                        <Instagram className="h-4 w-4 text-pink-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Social Media Tips</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2">Use high-quality OG images (1200x630px)</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2">Keep OG titles under 60 characters</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2">OG descriptions should be 155-160 characters</p>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                      <p className="ml-2">Include social sharing buttons on product pages</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Redirects Tab */}
        {activeTab === 'redirects' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">URL Redirects</h3>
              <p className="mt-1 text-sm text-gray-500">Manage 301 and 302 redirects for your site</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From URL
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    placeholder="/old-page"
                    value={newRedirect.from}
                    onChange={(e) => setNewRedirect({...newRedirect, from: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To URL
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    placeholder="/new-page"
                    value={newRedirect.to}
                    onChange={(e) => setNewRedirect({...newRedirect, to: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Redirect Type
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={newRedirect.type}
                    onChange={(e) => setNewRedirect({...newRedirect, type: e.target.value as '301' | '302'})}
                  >
                    <option value="301">301 (Permanent)</option>
                    <option value="302">302 (Temporary)</option>
                  </select>
                </div>
              </div>
              <button
                onClick={addRedirectRule}
                className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Redirect
              </button>

              <div className="mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Existing Redirects</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          From
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          To
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {redirectRules.map((rule) => (
                        <tr key={rule.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {rule.from}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {rule.to}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              rule.type === '301' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {rule.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => removeRedirectRule(rule.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Analytics Integration</h3>
                  <p className="mt-1 text-sm text-gray-500">Connect your analytics services</p>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Google Analytics ID
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      placeholder="GA-XXXXXXXXX-X"
                      value={seoSettings.googleAnalyticsId}
                      onChange={(e) => setSeoSettings({...seoSettings, googleAnalyticsId: e.target.value})}
                    />
                    <p className="mt-1 text-sm text-gray-500">Found in your Google Analytics property settings</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Google Search Console ID
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                      placeholder="GSC-XXXXXXXXX"
                      value={seoSettings.googleSearchConsoleId}
                      onChange={(e) => setSeoSettings({...seoSettings, googleSearchConsoleId: e.target.value})}
                    />
                    <p className="mt-1 text-sm text-gray-500">Found in your Google Search Console property settings</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Robots.txt Content
                    </label>
                    <textarea
                      rows={6}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm font-mono text-sm"
                      value={seoSettings.robotsTxt}
                      onChange={(e) => setSeoSettings({...seoSettings, robotsTxt: e.target.value})}
                    />
                    <p className="mt-1 text-sm text-gray-500">Control how search engines crawl your site</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sitemap Priority
                      </label>
                      <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                        value={seoSettings.sitemapPriority}
                        onChange={(e) => setSeoSettings({...seoSettings, sitemapPriority: e.target.value})}
                      >
                        <option value="1.0">1.0 (Highest)</option>
                        <option value="0.9">0.9</option>
                        <option value="0.8">0.8 (Default)</option>
                        <option value="0.7">0.7</option>
                        <option value="0.6">0.6</option>
                        <option value="0.5">0.5 (Lowest)</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <button className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                        <Download className="h-4 w-4 mr-2" />
                        Download Sitemap
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white shadow rounded-lg mb-6">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Analytics Status</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Google Analytics</p>
                          <p className="text-sm text-gray-500">Connected</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Google Search Console</p>
                          <p className="text-sm text-gray-500">Connected</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-5 w-5 text-green-500">✓</div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Sitemap</p>
                          <p className="text-sm text-gray-500">Generated</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">SEO Tools</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                      <span>Generate Sitemap</span>
                      <Code className="h-4 w-4" />
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                      <span>Check Robots.txt</span>
                      <FileText className="h-4 w-4" />
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100">
                      <span>SEO Audit</span>
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}