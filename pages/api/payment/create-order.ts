import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { createRazorpayOrder } from '@/lib/razorpay'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const { amount, orderId } = req.body

    if (!amount || !orderId) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    const razorpayOrder = await createRazorpayOrder({
      amount: amount,
      currency: 'INR',
      receipt: `order_${orderId}`,
      notes: {
        orderId: orderId,
        userId: session.user.id,
      },
    })

    res.status(200).json({ razorpayOrder })
  } catch (error) {
    console.error('Payment order creation error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}