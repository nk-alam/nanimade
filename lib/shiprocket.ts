import axios from 'axios'

const SHIPROCKET_BASE_URL = 'https://apiv2.shiprocket.in/v1/external'

class ShiprocketAPI {
  private token: string | null = null
  private tokenExpiry: Date | null = null

  async authenticate() {
    if (this.token && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.token
    }

    try {
      const response = await axios.post(`${SHIPROCKET_BASE_URL}/auth/login`, {
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      })

      this.token = response.data.token
      this.tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      return this.token
    } catch (error) {
      console.error('Shiprocket authentication failed:', error)
      throw error
    }
  }

  async createOrder(orderData: any) {
    const token = await this.authenticate()
    
    try {
      const response = await axios.post(
        `${SHIPROCKET_BASE_URL}/orders/create/adhoc`,
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Shiprocket order creation failed:', error)
      throw error
    }
  }

  async trackOrder(awbCode: string) {
    const token = await this.authenticate()
    
    try {
      const response = await axios.get(
        `${SHIPROCKET_BASE_URL}/courier/track/awb/${awbCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Shiprocket tracking failed:', error)
      throw error
    }
  }

  async getServiceability(pickup_postcode: string, delivery_postcode: string, weight: number) {
    const token = await this.authenticate()
    
    try {
      const response = await axios.get(
        `${SHIPROCKET_BASE_URL}/courier/serviceability/`,
        {
          params: {
            pickup_postcode,
            delivery_postcode,
            weight,
            cod: 1,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return response.data
    } catch (error) {
      console.error('Shiprocket serviceability check failed:', error)
      throw error
    }
  }
}

export const shiprocket = new ShiprocketAPI()