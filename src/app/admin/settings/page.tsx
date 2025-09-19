'use client'

import { useState } from 'react'
import {
  Settings,
  Save,
  Mail,
  Bell,
  Shield,
  Database,
  Globe,
  Users,
  CreditCard,
  Truck,
  Image,
  Palette,
  Code,
  Key,
  Lock,
  User,
  Store,
  Phone,
  MapPin,
  Clock,
  Upload
} from 'lucide-react'

interface GeneralSettings {
  siteName: string
  siteEmail: string
  sitePhone: string
  address: string
  timezone: string
  currency: string
  language: string
}

interface EmailSettings {
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPassword: string
  fromEmail: string
  fromName: string
}

interface NotificationSettings {
  orderNotifications: boolean
  customerNotifications: boolean
  marketingNotifications: boolean
  emailNotifications: boolean
  smsNotifications: boolean
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteName: 'NaniMade Pickles',
    siteEmail: 'info@nanimade.com',
    sitePhone: '+91 9876543210',
    address: '123 Pickle Street, Malda, West Bengal, India',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    language: 'en'
  })

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUser: 'info@nanimade.com',
    smtpPassword: 'your-app-password',
    fromEmail: 'info@nanimade.com',
    fromName: 'NaniMade Team'
  })

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderNotifications: true,
    customerNotifications: true,
    marketingNotifications: false,
    emailNotifications: true,
    smsNotifications: false
  })

  const handleSaveSettings = () => {
    alert('Settings saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Settings className="h-6 w-6 text-orange-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
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
              <Store className="h-4 w-4 inline mr-2" />
              General
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'email'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Mail className="h-4 w-4 inline mr-2" />
              Email
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'notifications'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Bell className="h-4 w-4 inline mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="h-4 w-4 inline mr-2" />
              Security
            </button>
          </nav>
        </div>

        {/* General Settings Tab */}
        {activeTab === 'general' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure your store's basic information</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Name
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Email
                  </label>
                  <input
                    type="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={generalSettings.siteEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteEmail: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={generalSettings.sitePhone}
                    onChange={(e) => setGeneralSettings({...generalSettings, sitePhone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                  >
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                    <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Address
                </label>
                <textarea
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={generalSettings.currency}
                    onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                  >
                    <option value="INR">Indian Rupee (₹)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                    <option value="GBP">British Pound (£)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={generalSettings.language}
                    onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                  >
                    <option value="en">English</option>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Email Settings Tab */}
        {activeTab === 'email' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Email Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure your email server settings</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={emailSettings.smtpHost}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpHost: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Username
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={emailSettings.smtpUser}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUser: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    SMTP Password
                  </label>
                  <input
                    type="password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Email
                  </label>
                  <input
                    type="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={emailSettings.fromEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, fromEmail: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Name
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                    value={emailSettings.fromName}
                    onChange={(e) => setEmailSettings({...emailSettings, fromName: e.target.value})}
                  />
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Info className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Email Configuration Tips</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>For Gmail, use smtp.gmail.com with port 587</li>
                        <li>Use an app password instead of your regular password</li>
                        <li>Test your email configuration after saving</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure when and how you receive notifications</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Order Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications for new orders</p>
                  </div>
                  <button
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      orderNotifications: !notificationSettings.orderNotifications
                    })}
                    className={`${
                      notificationSettings.orderNotifications ? 'bg-orange-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notificationSettings.orderNotifications ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Customer Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications for new customer registrations</p>
                  </div>
                  <button
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      customerNotifications: !notificationSettings.customerNotifications
                    })}
                    className={`${
                      notificationSettings.customerNotifications ? 'bg-orange-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notificationSettings.customerNotifications ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Marketing Notifications</h4>
                    <p className="text-sm text-gray-500">Receive notifications for marketing campaigns</p>
                  </div>
                  <button
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      marketingNotifications: !notificationSettings.marketingNotifications
                    })}
                    className={`${
                      notificationSettings.marketingNotifications ? 'bg-orange-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notificationSettings.marketingNotifications ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                    <p className="text-sm text-gray-500">Send notifications via email</p>
                  </div>
                  <button
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: !notificationSettings.emailNotifications
                    })}
                    className={`${
                      notificationSettings.emailNotifications ? 'bg-orange-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notificationSettings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">SMS Notifications</h4>
                    <p className="text-sm text-gray-500">Send notifications via SMS</p>
                  </div>
                  <button
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      smsNotifications: !notificationSettings.smsNotifications
                    })}
                    className={`${
                      notificationSettings.smsNotifications ? 'bg-orange-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
                  >
                    <span
                      className={`${
                        notificationSettings.smsNotifications ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-medium text-gray-900 mb-4">Notification Preferences</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-500 mr-2" />
                      <h5 className="font-medium text-gray-900">Email</h5>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-green-500 mr-2" />
                      <h5 className="font-medium text-gray-900">SMS</h5>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 text-purple-500 mr-2" />
                      <h5 className="font-medium text-gray-900">Push</h5>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Receive push notifications in app</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Settings Tab */}
        {activeTab === 'security' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure your store's security settings</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="bg-yellow-50 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>Ensure all security settings are properly configured to protect your store and customer data.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">Authentication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 bg-orange-600 text-white rounded-md text-sm hover:bg-orange-700">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">Password Policy</p>
                        <p className="text-sm text-gray-500">Set requirements for strong passwords</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">API Security</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">API Keys</p>
                        <p className="text-sm text-gray-500">Manage your API keys and permissions</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
                        Manage
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">Rate Limiting</p>
                        <p className="text-sm text-gray-500">Prevent abuse of your APIs</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">Data Protection</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">SSL Certificate</p>
                        <p className="text-sm text-gray-500">Ensure all data is encrypted in transit</p>
                      </div>
                      <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">Data Backup</p>
                        <p className="text-sm text-gray-500">Regular automated backups of your data</p>
                      </div>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
                        Configure
                      </button>
                    </div>
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

// Simple Info icon component since it's not imported
function Info({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  )
}