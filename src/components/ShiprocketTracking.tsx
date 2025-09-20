"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Truck, 
  Package, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  Clock, 
  XCircle,
  Loader2
} from 'lucide-react'

interface TrackingActivity {
  date: string
  status: string
  activity: string
  location: string
}

interface TrackingData {
  tracking_data: {
    track_status: number
    shipment_status: string
    shipment_track: TrackingActivity[]
    shipment_track_activities: TrackingActivity[]
  }
}

interface ShiprocketTrackingProps {
  awb: string
  orderId?: string
}

export default function ShiprocketTracking({ awb, orderId }: ShiprocketTrackingProps) {
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/shiprocket/tracking?awb=${awb}`)
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch tracking data')
        }
        
        const data = await response.json()
        setTrackingData(data)
      } catch (err: any) {
        console.error('Tracking error:', err)
        setError(err.message || 'Failed to load tracking information')
      } finally {
        setLoading(false)
      }
    }

    if (awb) {
      fetchTrackingData()
    }
  }, [awb])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
        <span className="ml-2 text-gray-600">Loading tracking information...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
          <XCircle className="h-5 w-5 text-red-600 mr-2" />
          <span className="text-red-800 font-medium">Error</span>
        </div>
        <p className="text-red-700 mt-1">{error}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-3 text-red-700 border-red-300 hover:bg-red-100"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    )
  }

  if (!trackingData) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg text-center">
        <Package className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">No tracking information available</p>
      </div>
    )
  }

  const activities = trackingData.tracking_data.shipment_track_activities || []
  const currentStatus = trackingData.tracking_data.shipment_status || 'Unknown'

  const getStatusIcon = (status: string) => {
    if (status.toLowerCase().includes('delivered')) {
      return <CheckCircle className="h-4 w-4" />
    } else if (status.toLowerCase().includes('shipped') || status.toLowerCase().includes('transit')) {
      return <Truck className="h-4 w-4" />
    } else if (status.toLowerCase().includes('pending') || status.toLowerCase().includes('processing')) {
      return <Clock className="h-4 w-4" />
    }
    return <Package className="h-4 w-4" />
  }

  const getStatusColor = (status: string) => {
    if (status.toLowerCase().includes('delivered')) {
      return 'bg-green-100 text-green-800'
    } else if (status.toLowerCase().includes('shipped') || status.toLowerCase().includes('transit')) {
      return 'bg-blue-100 text-blue-800'
    } else if (status.toLowerCase().includes('pending') || status.toLowerCase().includes('processing')) {
      return 'bg-orange-100 text-orange-800'
    }
    return 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Shipment Status</span>
              {orderId && (
                <span className="text-sm font-normal text-gray-600">
                  Order #{orderId}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${getStatusColor(currentStatus)}`}>
                  {getStatusIcon(currentStatus)}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{currentStatus}</h3>
                  <p className="text-sm text-gray-600">AWB: {awb}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last updated</p>
                <p className="font-medium">
                  {activities.length > 0 
                    ? new Date(activities[0].date).toLocaleDateString() 
                    : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tracking Timeline */}
      {activities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Tracking Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex">
                    <div className="flex flex-col items-center mr-4">
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                      {index !== activities.length - 1 && (
                        <div className="w-0.5 h-full bg-orange-300 mt-1"></div>
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{activity.status}</h3>
                        <span className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.activity}</p>
                      {activity.location && (
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          {activity.location}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Shipment Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Shipment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tracking Number</p>
                <p className="font-medium">{awb}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(currentStatus)}`}>
                  {getStatusIcon(currentStatus)}
                  <span className="ml-1">{currentStatus}</span>
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Activities</p>
                <p className="font-medium">{activities.length} updates</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Update</p>
                <p className="font-medium">
                  {activities.length > 0 
                    ? new Date(activities[0].date).toLocaleString() 
                    : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}