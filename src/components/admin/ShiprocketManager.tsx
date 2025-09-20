"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Truck, 
  Settings, 
  Key, 
  Save, 
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function ShiprocketManager() {
  const [settings, setSettings] = useState({
    email: process.env.NEXT_PUBLIC_SHIPROCKET_EMAIL || '',
    password: '',
    enabled: false
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // In a real implementation, this would save to your database
      // For now, we'll just simulate the save
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message (in a real app, you would use a toast notification)
      setTestResult({
        success: true,
        message: "Shiprocket settings have been updated successfully."
      })
    } catch (error) {
      setTestResult({
        success: false,
        message: "Failed to save settings. Please try again."
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestConnection = async () => {
    setIsTesting(true)
    setTestResult(null)
    
    try {
      // In a real implementation, this would test the Shiprocket API connection
      // For now, we'll simulate the test
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate random success/failure for demo purposes
      const success = Math.random() > 0.3
      
      setTestResult({
        success,
        message: success 
          ? "Successfully connected to Shiprocket API" 
          : "Failed to connect to Shiprocket API. Please check your credentials."
      })
    } catch (error) {
      setTestResult({
        success: false,
        message: "An error occurred while testing the connection"
      })
    } finally {
      setIsTesting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            Shiprocket Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Enable Shiprocket</h3>
              <p className="text-sm text-gray-600">
                Enable Shiprocket integration for order fulfillment and tracking
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.enabled}
                onChange={(e) => setSettings({...settings, enabled: e.target.checked})}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
            </label>
          </div>

          {settings.enabled && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Shiprocket Email
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      value={settings.email}
                      onChange={(e) => setSettings({...settings, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    API Password
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={settings.password}
                      onChange={(e) => setSettings({...settings, password: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                  Setup Instructions
                </label>
                <Textarea
                  id="instructions"
                  rows={4}
                  value={`1. Create an account at https://shiprocket.in/
2. Get your API credentials from the dashboard
3. Enter your email and password above
4. Test the connection to verify credentials
5. Enable Shiprocket integration`}
                  readOnly
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleSaveSettings} 
                  disabled={isSaving}
                  className="flex items-center"
                >
                  {isSaving ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isSaving ? "Saving..." : "Save Settings"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleTestConnection} 
                  disabled={isTesting || !settings.email || !settings.password}
                  className="flex items-center"
                >
                  {isTesting ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Settings className="h-4 w-4 mr-2" />
                  )}
                  {isTesting ? "Testing..." : "Test Connection"}
                </Button>
              </div>

              {testResult && (
                <div className={`p-4 rounded-lg border ${
                  testResult.success 
                    ? "bg-green-50 border-green-200" 
                    : "bg-red-50 border-red-200"
                }`}>
                  <div className="flex items-center">
                    {testResult.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    )}
                    <span className={`font-medium ${
                      testResult.success ? "text-green-800" : "text-red-800"
                    }`}>
                      {testResult.success ? "Connection Successful" : "Connection Failed"}
                    </span>
                  </div>
                  <p className={`mt-1 text-sm ${
                    testResult.success ? "text-green-700" : "text-red-700"
                  }`}>
                    {testResult.message}
                  </p>
                </div>
              )}
            </div>
          )}

          {!settings.enabled && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-gray-700">
                  Shiprocket integration is currently disabled. Enable it to start using shipping and tracking features.
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Shiprocket Features Info */}
      <Card>
        <CardHeader>
          <CardTitle>Shiprocket Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Truck className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Order Fulfillment</h3>
              <p className="text-sm text-gray-600">
                Automatically create shipments and generate AWB numbers for orders
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Settings className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Real-time Tracking</h3>
              <p className="text-sm text-gray-600">
                Provide customers with real-time shipment tracking information
              </p>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <RefreshCw className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">Return Management</h3>
              <p className="text-sm text-gray-600">
                Handle return requests and process refunds through Shiprocket
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}