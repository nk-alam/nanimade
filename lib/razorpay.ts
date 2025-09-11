import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export interface RazorpayOrderData {
  amount: number
  currency: string
  receipt: string
  notes?: Record<string, string>
}

export const createRazorpayOrder = async (orderData: RazorpayOrderData) => {
  try {
    const order = await razorpay.orders.create({
      amount: orderData.amount * 100, // Convert to paise
      currency: orderData.currency,
      receipt: orderData.receipt,
      notes: orderData.notes,
    })
    return order
  } catch (error) {
    console.error('Razorpay order creation failed:', error)
    throw error
  }
}

export const verifyRazorpayPayment = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) => {
  const crypto = require('crypto')
  const body = razorpayOrderId + '|' + razorpayPaymentId
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest('hex')
  
  return expectedSignature === razorpaySignature
}