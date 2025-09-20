// Shiprocket API integration
interface ShiprocketConfig {
  email: string
  password: string
  baseUrl: string
}

interface ShipmentData {
  order_id: string
  order_date: string
  pickup_location: string
  billing_customer_name: string
  billing_last_name: string
  billing_address: string
  billing_address_2?: string
  billing_city: string
  billing_pincode: string
  billing_state: string
  billing_country: string
  billing_email: string
  billing_phone: string
  shipping_is_billing: boolean
  shipping_customer_name?: string
  shipping_last_name?: string
  shipping_address?: string
  shipping_address_2?: string
  shipping_city?: string
  shipping_pincode?: string
  shipping_state?: string
  shipping_country?: string
  shipping_email?: string
  shipping_phone?: string
  order_items: Array<{
    name: string
    sku: string
    units: number
    selling_price: number
    discount?: number
    tax?: number
    hsn?: number
  }>
  payment_method: string
  sub_total: number
  length: number
  breadth: number
  height: number
  weight: number
}

interface TrackingResponse {
  tracking_data: {
    track_status: number
    shipment_status: string
    shipment_track: Array<{
      date: string
      status: string
      activity: string
      location: string
    }>
    shipment_track_activities: Array<{
      date: string
      status: string
      activity: string
      location: string
    }>
  }
}

export class ShiprocketService {
  private config: ShiprocketConfig
  private token: string | null = null
  private tokenExpiry: Date | null = null

  constructor(config: ShiprocketConfig) {
    this.config = config
  }

  async authenticate(): Promise<string> {
    if (this.token && this.tokenExpiry && new Date() < this.tokenExpiry) {
      if (!this.token) {
        throw new Error('Authentication failed - no token received')
      }
      return this.token
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/external/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.config.email,
          password: this.config.password,
        }),
      })

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`)
      }

      const data = await response.json()
      this.token = data.token
      this.tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      if (!this.token) {
        throw new Error('Authentication failed - no token received')
      }
      return this.token
    } catch (error) {
      console.error('Shiprocket authentication error:', error)
      throw error
    }
  }

  async createOrder(shipmentData: ShipmentData): Promise<any> {
    const token = await this.authenticate()

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/external/orders/create/adhoc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(shipmentData),
      })

      if (!response.ok) {
        throw new Error(`Order creation failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Shiprocket order creation error:', error)
      throw error
    }
  }

  async trackShipment(awb: string): Promise<TrackingResponse> {
    const token = await this.authenticate()

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/external/courier/track/awb/${awb}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Tracking failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Shiprocket tracking error:', error)
      throw error
    }
  }

  async getServiceability(pickupPostcode: string, deliveryPostcode: string, weight: number): Promise<any> {
    const token = await this.authenticate()

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/external/courier/serviceability`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Serviceability check failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Shiprocket serviceability error:', error)
      throw error
    }
  }

  async cancelOrder(orderId: string): Promise<any> {
    const token = await this.authenticate()

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/external/orders/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ids: [orderId],
        }),
      })

      if (!response.ok) {
        throw new Error(`Order cancellation failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Shiprocket cancellation error:', error)
      throw error
    }
  }

  async getOrders(page = 1, perPage = 10): Promise<any> {
    const token = await this.authenticate()

    try {
      const response = await fetch(`${this.config.baseUrl}/v1/external/orders?page=${page}&per_page=${perPage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Get orders failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Shiprocket get orders error:', error)
      throw error
    }
  }
}

// Initialize Shiprocket service
export const shiprocketService = new ShiprocketService({
  email: process.env.SHIPROCKET_EMAIL || '',
  password: process.env.SHIPROCKET_PASSWORD || '',
  baseUrl: 'https://apiv2.shiprocket.in',
})

// Helper function to create Shiprocket order from our order data
export function createShiprocketOrder(order: any, user: any): ShipmentData {
  return {
    order_id: order.id,
    order_date: order.created_at,
    pickup_location: 'Primary', // This should be configured in Shiprocket dashboard
    billing_customer_name: user.first_name || user.name?.split(' ')[0] || 'Customer',
    billing_last_name: user.last_name || user.name?.split(' ')[1] || '',
    billing_address: order.billing_address?.street || '',
    billing_address_2: order.billing_address?.street2 || '',
    billing_city: order.billing_address?.city || '',
    billing_pincode: order.billing_address?.postal_code || '',
    billing_state: order.billing_address?.state || '',
    billing_country: order.billing_address?.country || 'India',
    billing_email: user.email || '',
    billing_phone: order.billing_address?.phone || '',
    shipping_is_billing: !order.shipping_address,
    shipping_customer_name: order.shipping_address?.first_name || undefined,
    shipping_last_name: order.shipping_address?.last_name || undefined,
    shipping_address: order.shipping_address?.street || undefined,
    shipping_address_2: order.shipping_address?.street2 || undefined,
    shipping_city: order.shipping_address?.city || undefined,
    shipping_pincode: order.shipping_address?.postal_code || undefined,
    shipping_state: order.shipping_address?.state || undefined,
    shipping_country: order.shipping_address?.country || undefined,
    shipping_email: order.shipping_address?.email || undefined,
    shipping_phone: order.shipping_address?.phone || undefined,
    order_items: order.items.map((item: any) => ({
      name: item.product_name,
      sku: item.product_sku || item.product_id,
      units: item.quantity,
      selling_price: item.price,
      discount: item.discount || 0,
      tax: item.tax || 0,
      hsn: 2008, // HSN code for pickles
    })),
    payment_method: order.payment_method === 'cod' ? 'COD' : 'Prepaid',
    sub_total: order.subtotal,
    length: 15, // Default package dimensions (cm)
    breadth: 10,
    height: 8,
    weight: order.items.reduce((total: number, item: any) => {
      // Estimate weight based on quantity and product type
      const weightPerUnit = item.product_name.includes('1kg') ? 1 : 
                           item.product_name.includes('500g') ? 0.5 : 0.25
      return total + (item.quantity * weightPerUnit)
    }, 0.2), // Add 200g for packaging
  }
}

export default ShiprocketService