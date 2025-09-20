'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Save, 
  Eye, 
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface AnalyticsSettings {
  googleAnalytics: {
    trackingId: string
    enabled: boolean
  }
  googleSearchConsole: {
    verificationCode: string
    enabled: boolean
  }
  facebookPixel: {
    pixelId: string
    enabled: boolean
  }
}

export default function AnalyticsSettingsPage() {
  const [settings, setSettings] = useState<AnalyticsSettings>({
    googleAnalytics: {
      trackingId: '',
      enabled: false
    },
    googleSearchConsole: {
      verificationCode: '',
      enabled: false
    },
    facebookPixel: {
      pixelId: '',
      enabled: false
    }
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testResults, setTestResults] = useState<Record<string, { success: boolean; message: string } | null>>({})

  // Load analytics settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/analytics')
        if (response.ok) {
          const data = await response.json()
          setSettings(data)
        }
      } catch (error) {
        console.error('Failed to fetch analytics settings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert('Analytics settings saved successfully!')
      } else {
        alert('Failed to save analytics settings')
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('An error occurred while saving settings')
    } finally {
      setSaving(false)
    }
  }

  const handleTestConnection = async (service: string) => {
    setTestResults(prev => ({ ...prev, [service]: null }))
    
    try {
      // Simulate testing connection
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Random success/failure for demo purposes
      const success = Math.random() > 0.3
      
      const messages: Record<string, string> = {
        googleAnalytics: success 
          ? 'Successfully connected to Google Analytics' 
          : 'Failed to connect to Google Analytics. Please check your Tracking ID.',
        googleSearchConsole: success 
          ? 'Successfully verified with Google Search Console' 
          : 'Failed to verify with Google Search Console. Please check your verification code.',
        facebookPixel: success 
          ? 'Successfully connected to Facebook Pixel' 
          : 'Failed to connect to Facebook Pixel. Please check your Pixel ID.'
      }
      
      setTestResults(prev => ({
        ...prev,
        [service]: {
          success,
          message: messages[service]
        }
      }))
      
      if (!success) {
        alert(messages[service])
      }
    } catch (error) {
      const messages: Record<string, string> = {
        googleAnalytics: 'An error occurred while testing Google Analytics connection',
        googleSearchConsole: 'An error occurred while testing Google Search Console verification',
        facebookPixel: 'An error occurred while testing Facebook Pixel connection'
      }
      
      setTestResults(prev => ({
        ...prev,
        [service]: {
          success: false,
          message: messages[service]
        }
      }))
      
      alert(messages[service])
    }
  }

  const getConnectionStatus = (service: string) => {
    const serviceSettings = settings[service as keyof AnalyticsSettings];
    const isEnabled = serviceSettings.enabled;
    
    let hasCredentials = false;
    if (service === 'googleAnalytics' && 'trackingId' in serviceSettings) {
      hasCredentials = !!serviceSettings.trackingId;
    } else if (service === 'googleSearchConsole' && 'verificationCode' in serviceSettings) {
      hasCredentials = !!serviceSettings.verificationCode;
    } else if (service === 'facebookPixel' && 'pixelId' in serviceSettings) {
      hasCredentials = !!serviceSettings.pixelId;
    }
    
    if (!isEnabled) return 'disabled';
    if (!hasCredentials) return 'incomplete';
    return 'connected';
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'incomplete':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2" />
              Analytics & SEO Settings
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Configure analytics and search engine optimization tools
            </p>
          </div>
          <Button onClick={handleSave} disabled={saving} className="flex items-center">
            {saving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Google Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    Google Analytics 4
                    <span className="ml-2">
                      {getStatusIcon(getConnectionStatus('googleAnalytics'))}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">Track website traffic and user behavior</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => handleTestConnection('googleAnalytics')}
                  disabled={!settings.googleAnalytics.enabled || !settings.googleAnalytics.trackingId}
                  variant="outline"
                  size="sm"
                >
                  Test
                </Button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.googleAnalytics.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      googleAnalytics: {
                        ...settings.googleAnalytics,
                        enabled: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {settings.googleAnalytics.enabled && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="ga-tracking-id" className="block text-sm font-medium text-gray-700 mb-2">
                    Measurement ID
                  </Label>
                  <Input
                    id="ga-tracking-id"
                    value={settings.googleAnalytics.trackingId}
                    onChange={(e) => setSettings({
                      ...settings,
                      googleAnalytics: {
                        ...settings.googleAnalytics,
                        trackingId: e.target.value
                      }
                    })}
                    placeholder="G-XXXXXXXXXX"
                    className="max-w-md"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Your Google Analytics 4 Measurement ID (starts with G-)
                  </p>
                </div>

                {testResults.googleAnalytics && (
                  <div className={`p-3 rounded-lg ${
                    testResults.googleAnalytics.success 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center">
                      {testResults.googleAnalytics.success ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      )}
                      <span className={`text-sm font-medium ${
                        testResults.googleAnalytics.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {testResults.googleAnalytics.message}
                      </span>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Setup Instructions</h4>
                  <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                    <li>Go to <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Analytics</a></li>
                    <li>Create a new property or select an existing one</li>
                    <li>Choose &quot;Web&quot; as your platform</li>
                    <li>Copy the Measurement ID (starts with G&quot;-) and paste it above</li>
                    <li>Enable the integration and save settings</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Google Search Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-4">
                  <svg className="h-6 w-6 text-green-600" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    Google Search Console
                    <span className="ml-2">
                      {getStatusIcon(getConnectionStatus('googleSearchConsole'))}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">Monitor search performance and indexing</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => handleTestConnection('googleSearchConsole')}
                  disabled={!settings.googleSearchConsole.enabled || !settings.googleSearchConsole.verificationCode}
                  variant="outline"
                  size="sm"
                >
                  Test
                </Button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.googleSearchConsole.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      googleSearchConsole: {
                        ...settings.googleSearchConsole,
                        enabled: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>

            {settings.googleSearchConsole.enabled && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gsc-verification" className="block text-sm font-medium text-gray-700 mb-2">
                    Site Verification Code
                  </Label>
                  <Textarea
                    id="gsc-verification"
                    value={settings.googleSearchConsole.verificationCode}
                    onChange={(e) => setSettings({
                      ...settings,
                      googleSearchConsole: {
                        ...settings.googleSearchConsole,
                        verificationCode: e.target.value
                      }
                    })}
                    placeholder="meta tag content value"
                    rows={3}
                    className="max-w-md"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    HTML tag verification code from Search Console
                  </p>
                </div>

                {testResults.googleSearchConsole && (
                  <div className={`p-3 rounded-lg ${
                    testResults.googleSearchConsole.success 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center">
                      {testResults.googleSearchConsole.success ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      )}
                      <span className={`text-sm font-medium ${
                        testResults.googleSearchConsole.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {testResults.googleSearchConsole.message}
                      </span>
                    </div>
                  </div>
                )}

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Setup Instructions</h4>
                  <ol className="list-decimal list-inside text-sm text-green-800 space-y-1">
                    <li>Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="underline">Google Search Console</a></li>
                    <li>Add your property (website URL)</li>
                    <li>Choose &quot;HTML tag&quot; verification method</li>
                    <li>Copy the content value from the meta tag and paste it above</li>
                    <li>Enable the integration and save settings</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Facebook Pixel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-4">
                  <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    Facebook Pixel
                    <span className="ml-2">
                      {getStatusIcon(getConnectionStatus('facebookPixel'))}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600">Track conversions and optimize ads</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => handleTestConnection('facebookPixel')}
                  disabled={!settings.facebookPixel.enabled || !settings.facebookPixel.pixelId}
                  variant="outline"
                  size="sm"
                >
                  Test
                </Button>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.facebookPixel.enabled}
                    onChange={(e) => setSettings({
                      ...settings,
                      facebookPixel: {
                        ...settings.facebookPixel,
                        enabled: e.target.checked
                      }
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            {settings.facebookPixel.enabled && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fb-pixel-id" className="block text-sm font-medium text-gray-700 mb-2">
                    Pixel ID
                  </Label>
                  <Input
                    id="fb-pixel-id"
                    value={settings.facebookPixel.pixelId}
                    onChange={(e) => setSettings({
                      ...settings,
                      facebookPixel: {
                        ...settings.facebookPixel,
                        pixelId: e.target.value
                      }
                    })}
                    placeholder="XXXXXXXXXXXXXXX"
                    className="max-w-md"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Your Facebook Pixel ID
                  </p>
                </div>

                {testResults.facebookPixel && (
                  <div className={`p-3 rounded-lg ${
                    testResults.facebookPixel.success 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center">
                      {testResults.facebookPixel.success ? (
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 mr-2" />
                      )}
                      <span className={`text-sm font-medium ${
                        testResults.facebookPixel.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {testResults.facebookPixel.message}
                      </span>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Setup Instructions</h4>
                  <ol className="list-decimal list-inside text-sm text-blue-800 space-y-1">
                    <li>Go to <a href="https://www.facebook.com/events_manager2/" target="_blank" rel="noopener noreferrer" className="underline">Facebook Events Manager</a></li>
                    <li>Create a new Pixel or select an existing one</li>
                    <li>Copy the Pixel ID and paste it above</li>
                    <li>Enable the integration and save settings</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}