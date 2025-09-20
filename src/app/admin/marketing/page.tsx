'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Megaphone,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Calendar,
  User,
  TrendingUp,
  BarChart3,
  Mail,
  Gift,
  Percent,
  Copy,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Coupon {
  id: string
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minOrderValue: number
  usageLimit: number
  usedCount: number
  startDate: string
  endDate: string
  active: boolean
}

interface EmailCampaign {
  id: string
  name: string
  subject: string
  recipients: number
  sentDate: string
  openRate: number
  clickRate: number
  status: 'draft' | 'scheduled' | 'sent'
}

const initialCoupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 500,
    usageLimit: 100,
    usedCount: 25,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    active: true
  },
  {
    id: '2',
    code: 'PICKLE20',
    discountType: 'fixed',
    discountValue: 200,
    minOrderValue: 1000,
    usageLimit: 50,
    usedCount: 12,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    active: true
  }
]

const initialCampaigns: EmailCampaign[] = [
  {
    id: '1',
    name: 'New Year Special Offer',
    subject: '50% Off on All Pickles - New Year Special!',
    recipients: 1250,
    sentDate: '2024-01-01',
    openRate: 32.5,
    clickRate: 15.2,
    status: 'sent'
  },
  {
    id: '2',
    name: 'Valentine\'s Day Promo',
    subject: 'Spread Love with Homemade Pickles',
    recipients: 1420,
    sentDate: '2024-02-14',
    openRate: 28.7,
    clickRate: 12.3,
    status: 'sent'
  },
  {
    id: '3',
    name: 'Summer Sale',
    subject: 'Beat the Heat with Our Cool Pickles',
    recipients: 0,
    sentDate: '',
    openRate: 0,
    clickRate: 0,
    status: 'draft'
  }
]

export default function MarketingManagement() {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons)
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(initialCampaigns)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [isCreatingCoupon, setIsCreatingCoupon] = useState(false)
  const [activeTab, setActiveTab] = useState<'coupons' | 'email' | 'analytics'>('coupons')
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null)

  const handleCreateCoupon = () => {
    const newCoupon: Coupon = {
      id: Date.now().toString(),
      code: '',
      discountType: 'percentage',
      discountValue: 0,
      minOrderValue: 0,
      usageLimit: 100,
      usedCount: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      active: true
    }
    setEditingCoupon(newCoupon)
    setIsCreatingCoupon(true)
  }

  const handleEditCoupon = (coupon: Coupon) => {
    setEditingCoupon({ ...coupon })
    setIsCreatingCoupon(false)
  }

  const handleSaveCoupon = () => {
    if (!editingCoupon) return

    if (isCreatingCoupon) {
      setCoupons([...coupons, editingCoupon])
    } else {
      setCoupons(coupons.map(coupon => coupon.id === editingCoupon.id ? editingCoupon : coupon))
    }

    setEditingCoupon(null)
    setIsCreatingCoupon(false)
  }

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter(coupon => coupon.id !== id))
  }

  const handleToggleCouponStatus = (id: string) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === id ? { ...coupon, active: !coupon.active } : coupon
    ))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCoupon(text)
    setTimeout(() => setCopiedCoupon(null), 2000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Megaphone className="h-6 w-6 mr-2" />
              Marketing Management
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage coupons, email campaigns, and promotions
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('coupons')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'coupons'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Coupons & Discounts
          </button>
          <button
            onClick={() => setActiveTab('email')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'email'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Email Campaigns
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'analytics'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Analytics
          </button>
        </nav>
      </div>

      {activeTab === 'coupons' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Coupon Management</h2>
            <Button onClick={handleCreateCoupon} className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Coupon
            </Button>
          </div>

          {editingCoupon ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {isCreatingCoupon ? 'Create New Coupon' : 'Edit Coupon'}
                  </CardTitle>
                  <Button variant="outline" onClick={() => setEditingCoupon(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Coupon Code
                    </label>
                    <Input
                      value={editingCoupon.code}
                      onChange={(e) => setEditingCoupon({...editingCoupon, code: e.target.value.toUpperCase()})}
                      placeholder="Enter coupon code"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Discount Type
                    </label>
                    <select
                      value={editingCoupon.discountType}
                      onChange={(e) => setEditingCoupon({...editingCoupon, discountType: e.target.value as 'percentage' | 'fixed'})}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Discount Value
                    </label>
                    <Input
                      type="number"
                      value={editingCoupon.discountValue}
                      onChange={(e) => setEditingCoupon({...editingCoupon, discountValue: Number(e.target.value)})}
                      placeholder="Enter discount value"
                    />
                    <p className="text-sm text-gray-500">
                      {editingCoupon.discountType === 'percentage' ? 'Percentage off (e.g., 10 for 10%)' : 'Fixed amount off (e.g., 200 for ₹200)'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Minimum Order Value
                    </label>
                    <Input
                      type="number"
                      value={editingCoupon.minOrderValue}
                      onChange={(e) => setEditingCoupon({...editingCoupon, minOrderValue: Number(e.target.value)})}
                      placeholder="Enter minimum order value"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Usage Limit
                    </label>
                    <Input
                      type="number"
                      value={editingCoupon.usageLimit}
                      onChange={(e) => setEditingCoupon({...editingCoupon, usageLimit: Number(e.target.value)})}
                      placeholder="Enter usage limit"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Active Period
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={editingCoupon.startDate}
                        onChange={(e) => setEditingCoupon({...editingCoupon, startDate: e.target.value})}
                      />
                      <Input
                        type="date"
                        value={editingCoupon.endDate}
                        onChange={(e) => setEditingCoupon({...editingCoupon, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingCoupon.active}
                      onChange={(e) => setEditingCoupon({...editingCoupon, active: e.target.checked})}
                      className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Coupon is active</span>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-x-3">
                    <Button variant="outline" onClick={() => setEditingCoupon(null)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveCoupon} className="flex items-center">
                      <Save className="h-4 w-4 mr-2" />
                      Save Coupon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Coupon
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{coupon.code}</span>
                            <button
                              onClick={() => copyToClipboard(coupon.code)}
                              className="ml-2 text-gray-400 hover:text-gray-600"
                            >
                              {copiedCoupon === coupon.code ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          Min. order: ₹{coupon.minOrderValue}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {coupon.discountType === 'percentage' 
                            ? `${coupon.discountValue}% off` 
                            : `₹${coupon.discountValue} off`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {coupon.usedCount} / {coupon.usageLimit}
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full" 
                            style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{coupon.startDate}</div>
                        <div>to {coupon.endDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${coupon.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {coupon.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditCoupon(coupon)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteCoupon(coupon.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleToggleCouponStatus(coupon.id)}
                            className={`p-1 ${coupon.active ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'email' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Email Campaigns</h2>
            <Button className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.recipients > 0 ? `${campaign.recipients.toLocaleString()} recipients` : 'Not sent'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {campaign.status === 'sent' ? (
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">Open:</span>
                            <span className="font-medium">{campaign.openRate}%</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="text-gray-500 mr-2">Click:</span>
                            <span className="font-medium">{campaign.clickRate}%</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No data</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {campaign.sentDate || 'Not scheduled'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-lg font-medium text-gray-900">Marketing Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹45,231</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Coupon Usage</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">37</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Email Open Rate</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.5%</div>
                <p className="text-xs text-muted-foreground">+3.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Coupon Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{coupon.code}</div>
                      <div className="text-sm text-gray-500">
                        {coupon.discountType === 'percentage' 
                          ? `${coupon.discountValue}% off` 
                          : `₹${coupon.discountValue} off`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{coupon.usedCount} uses</div>
                      <div className="text-sm text-gray-500">
                        {Math.round((coupon.usedCount / coupon.usageLimit) * 100)}% utilization
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}