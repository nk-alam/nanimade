import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { verifyRazorpayPayment } from '@/lib/razorpay'
import { supabase } from '@/lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const isValid = verifyRazorpayPayment(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature' })
    }

    // Update order status
    const { error } = await supabase
      .from('orders')
      .update({
        payment_status: 'paid',
        payment_id: razorpay_payment_id,
        status: 'confirmed',
      })
      .eq('id', orderId)
      .eq('user_id', session.user.id)

    if (error) {
      throw error
    }

    res.status(200).json({ message: 'Payment verified successfully' })
  } catch (error) {
    console.error('Payment verification error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}