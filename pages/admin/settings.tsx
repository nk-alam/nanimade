import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import AdminLayout from '@/components/Admin/Layout'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import {
  CogIcon,
  GlobeAltIcon,
  CreditCardIcon,
  TruckIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface SettingsProps {
  settings: Record<string, any>
}

const AdminSettings = ({ settings: initialSettings }: SettingsProps) => {
  const [settings, setSettings] = useState(initialSettings)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'seo', name: 'SEO & Analytics', icon: ChartBarIcon },
    { id: 'payment', name: 'Payment', icon: CreditCardIcon },
    { id: 'shipping', name: 'Shipping', icon: TruckIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const saveSettings = async () => {
    setIsLoading(true)
    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value: JSON.stringify(value),
      }))

      for (const update of updates) {
        await supabase
          .from('site_settings')
          .upsert(update, { onConflict: 'key' })
      }

      toast.success('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Name
        </label>
        <input
          type="text"
          value={settings.site_name || ''}
          onChange={(e) => handleSettingChange('site_name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Site Description
        </label>
        <textarea
          value={settings.site_description || ''}
          onChange={(e) => handleSettingChange('site_description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Email
          </label>
          <input
            type="email"
            value={settings.contact_email || ''}
            onChange={(e) => handleSettingChange('contact_email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <input
            type="tel"
            value={settings.contact_phone || ''}
            onChange={(e) => handleSettingChange('contact_phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Free Shipping Threshold (₹)
          </label>
          <input
            type="number"
            value={settings.shipping_free_threshold || ''}
            onChange={(e) => handleSettingChange('shipping_free_threshold', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Rate (%)
          </label>
          <input
            type="number"
            step="0.01"
            value={settings.tax_rate || ''}
            onChange={(e) => handleSettingChange('tax_rate', parseFloat(e.target.value) / 100)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  )

  const renderSEOSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Google Analytics ID
        </label>
        <input
          type="text"
          value={settings.google_analytics_id || ''}
          onChange={(e) => handleSettingChange('google_analytics_id', e.target.value)}
          placeholder="G-XXXXXXXXXX"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter your Google Analytics 4 Measurement ID
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Google Search Console Verification Code
        </label>
        <input
          type="text"
          value={settings.google_search_console_id || ''}
          onChange={(e) => handleSettingChange('google_search_console_id', e.target.value)}
          placeholder="google-site-verification=..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter the meta tag content for Google Search Console verification
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facebook Pixel ID
        </label>
        <input
          type="text"
          value={settings.facebook_pixel_id || ''}
          onChange={(e) => handleSettingChange('facebook_pixel_id', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Default Meta Description
        </label>
        <textarea
          value={settings.default_meta_description || ''}
          onChange={(e) => handleSettingChange('default_meta_description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
    </div>
  )

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Razorpay Key ID
        </label>
        <input
          type="text"
          value={settings.razorpay_key_id || ''}
          onChange={(e) => handleSettingChange('razorpay_key_id', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Your Razorpay Key ID (starts with rzp_)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Razorpay Key Secret
        </label>
        <input
          type="password"
          value={settings.razorpay_key_secret || ''}
          onChange={(e) => handleSettingChange('razorpay_key_secret', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Your Razorpay Key Secret (keep this secure)
        </p>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="cod_enabled"
          checked={settings.cod_enabled || false}
          onChange={(e) => handleSettingChange('cod_enabled', e.target.checked)}
          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
        />
        <label htmlFor="cod_enabled" className="ml-2 block text-sm text-gray-900">
          Enable Cash on Delivery
        </label>
      </div>
    </div>
  )

  const renderShippingSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shiprocket Email
        </label>
        <input
          type="email"
          value={settings.shiprocket_email || ''}
          onChange={(e) => handleSettingChange('shiprocket_email', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Shiprocket Password
        </label>
        <input
          type="password"
          value={settings.shiprocket_password || ''}
          onChange={(e) => handleSettingChange('shiprocket_password', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Shipping Rate (₹)
          </label>
          <input
            type="number"
            value={settings.default_shipping_rate || ''}
            onChange={(e) => handleSettingChange('default_shipping_rate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Express Shipping Rate (₹)
          </label>
          <input
            type="number"
            value={settings.express_shipping_rate || ''}
            onChange={(e) => handleSettingChange('express_shipping_rate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="require_email_verification"
          checked={settings.require_email_verification || false}
          onChange={(e) => handleSettingChange('require_email_verification', e.target.checked)}
          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
        />
        <label htmlFor="require_email_verification" className="ml-2 block text-sm text-gray-900">
          Require email verification for new accounts
        </label>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="enable_recaptcha"
          checked={settings.enable_recaptcha || false}
          onChange={(e) => handleSettingChange('enable_recaptcha', e.target.checked)}
          className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
        />
        <label htmlFor="enable_recaptcha" className="ml-2 block text-sm text-gray-900">
          Enable reCAPTCHA for forms
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Session Timeout (minutes)
        </label>
        <input
          type="number"
          value={settings.session_timeout || 60}
          onChange={(e) => handleSettingChange('session_timeout', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rate Limit (requests per minute)
        </label>
        <input
          type="number"
          value={settings.rate_limit || 100}
          onChange={(e) => handleSettingChange('rate_limit', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings()
      case 'seo':
        return renderSEOSettings()
      case 'payment':
        return renderPaymentSettings()
      case 'shipping':
        return renderShippingSettings()
      case 'security':
        return renderSecuritySettings()
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <AdminLayout title="Settings">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={saveSettings}
                  disabled={isLoading}
                  className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  try {
    const { data: settingsData } = await supabase
      .from('site_settings')
      .select('*')

    const settings = settingsData?.reduce((acc, setting) => {
      acc[setting.key] = JSON.parse(setting.value)
      return acc
    }, {} as Record<string, any>) || {}

    return {
      props: {
        settings,
      },
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    return {
      props: {
        settings: {},
      },
    }
  }
}

export default AdminSettings