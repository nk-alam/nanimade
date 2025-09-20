import nodemailer from 'nodemailer'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Email templates
interface EmailTemplate {
  id: string
  name: string
  subject: string
  html: string
  variables: string[]
}

const emailTemplates: EmailTemplate[] = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    subject: 'Welcome to NaniMade - Authentic Malda Pickles!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to NaniMade</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="{{LOGO_URL}}" alt="NaniMade" style="height: 60px;">
              <h1 style="color: #ea580c; margin-top: 20px;">Welcome to NaniMade!</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 30px;">
              <h2>Hello {{USER_NAME}},</h2>
              <p>Thank you for joining the NaniMade family! We're excited to share our authentic Malda mango pickles with you.</p>
              
              <h3>What makes our pickles special:</h3>
              <ul>
                <li>🥭 Made from authentic Malda mangoes</li>
                <li>🏠 Traditional Bengali family recipes</li>
                <li>🌱 100% natural ingredients</li>
                <li>📦 Fresh, handmade in small batches</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{SHOP_URL}}" style="background: #ea580c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Start Shopping</a>
              </div>
              
              <p>Use code <strong>WELCOME10</strong> for 10% off your first order!</p>
            </div>
            
            <div style="text-align: center; font-size: 14px; color: #666;">
              <p>Follow us on social media:</p>
              <a href="{{FACEBOOK_URL}}" style="margin: 0 10px;">Facebook</a>
              <a href="{{INSTAGRAM_URL}}" style="margin: 0 10px;">Instagram</a>
              <a href="{{TWITTER_URL}}" style="margin: 0 10px;">Twitter</a>
            </div>
          </div>
        </body>
      </html>
    `,
    variables: ['USER_NAME', 'LOGO_URL', 'SHOP_URL', 'FACEBOOK_URL', 'INSTAGRAM_URL', 'TWITTER_URL']
  },
  {
    id: 'order_confirmation',
    name: 'Order Confirmation',
    subject: 'Order Confirmed - {{ORDER_NUMBER}}',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="{{LOGO_URL}}" alt="NaniMade" style="height: 60px;">
              <h1 style="color: #ea580c;">Order Confirmed!</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 10px;">
              <h2>Hi {{USER_NAME}},</h2>
              <p>Your order <strong>#{{ORDER_NUMBER}}</strong> has been confirmed and is being prepared with love!</p>
              
              <div style="border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 5px;">
                <h3>Order Details:</h3>
                <div>{{ORDER_ITEMS}}</div>
                <hr style="margin: 20px 0;">
                <div style="text-align: right;">
                  <strong>Total: ₹{{ORDER_TOTAL}}</strong>
                </div>
              </div>
              
              <p><strong>Delivery Address:</strong><br>{{DELIVERY_ADDRESS}}</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="{{TRACKING_URL}}" style="background: #ea580c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Track Your Order</a>
              </div>
              
              <p>We'll send you updates as your order progresses. Expected delivery: {{DELIVERY_DATE}}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    variables: ['USER_NAME', 'ORDER_NUMBER', 'ORDER_ITEMS', 'ORDER_TOTAL', 'DELIVERY_ADDRESS', 'TRACKING_URL', 'DELIVERY_DATE', 'LOGO_URL']
  },
  {
    id: 'newsletter',
    name: 'Newsletter Template',
    subject: '{{SUBJECT}}',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="{{LOGO_URL}}" alt="NaniMade" style="height: 60px;">
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 10px;">
              {{CONTENT}}
            </div>
            
            <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
              <p>You're receiving this because you subscribed to NaniMade updates.</p>
              <a href="{{UNSUBSCRIBE_URL}}">Unsubscribe</a>
            </div>
          </div>
        </body>
      </html>
    `,
    variables: ['SUBJECT', 'CONTENT', 'LOGO_URL', 'UNSUBSCRIBE_URL']
  },
  {
    id: 'otp',
    name: 'OTP Verification',
    subject: 'Your {{OTP_TYPE}} code for {{COMPANY_NAME}}',
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="{{LOGO_URL}}" alt="{{COMPANY_NAME}}" style="height: 60px;">
              <h1 style="color: #ea580c; margin-top: 20px;">Verification Code</h1>
            </div>
            
            <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; text-align: center;">
              <h2>Your verification code is:</h2>
              <div style="background: #ea580c; color: white; font-size: 32px; font-weight: bold; padding: 20px; border-radius: 8px; letter-spacing: 5px; margin: 20px 0;">
                {{OTP_CODE}}
              </div>
              <p>This code will expire in {{EXPIRES_IN}}.</p>
              <p>If you didn't request this code, please ignore this email.</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
              <p>This is an automated message, please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    variables: ['OTP_CODE', 'OTP_TYPE', 'COMPANY_NAME', 'LOGO_URL', 'EXPIRES_IN', 'USER_EMAIL']
  }
]

// Email service configuration
class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || 'smtp.hostinger.com',
      port: parseInt(process.env.EMAIL_SERVER_PORT || '465'),
      secure: parseInt(process.env.EMAIL_SERVER_PORT || '465') === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false // For Hostinger compatibility
      }
    })
  }

  async sendEmail(to: string, templateId: string, variables: Record<string, string>) {
    try {
      const template = emailTemplates.find(t => t.id === templateId)
      if (!template) {
        throw new Error(`Template ${templateId} not found`)
      }

      let html = template.html
      let subject = template.subject

      // Replace variables in template
      Object.entries(variables).forEach(([key, value]) => {
        const placeholder = `{{${key}}}`
        html = html.replace(new RegExp(placeholder, 'g'), value)
        subject = subject.replace(new RegExp(placeholder, 'g'), value)
      })

      const mailOptions = {
        from: `"NaniMade" <${process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER}>`,
        to,
        subject,
        html,
      }

      const result = await this.transporter.sendMail(mailOptions)
      
      // Log email sent
      await this.logEmailSent(to, templateId, 'sent', result.messageId)
      
      return { success: true, messageId: result.messageId }
    } catch (error) {
      console.error('Email send error:', error)
      await this.logEmailSent(to, templateId, 'failed', undefined, error)
      throw error
    }
  }

  async sendWelcomeEmail(userEmail: string, userName: string) {
    return this.sendEmail(userEmail, 'welcome', {
      USER_NAME: userName,
      LOGO_URL: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
      SHOP_URL: `${process.env.NEXT_PUBLIC_APP_URL}/products`,
      FACEBOOK_URL: 'https://facebook.com/nanimade',
      INSTAGRAM_URL: 'https://instagram.com/nanimade',
      TWITTER_URL: 'https://twitter.com/nanimade',
    })
  }

  async sendOrderConfirmation(
    userEmail: string,
    userName: string,
    orderData: {
      orderNumber: string
      items: Array<{ name: string; quantity: number; price: number }>
      total: number
      deliveryAddress: string
      trackingUrl: string
      deliveryDate: string
    }
  ) {
    const orderItems = orderData.items
      .map(item => `<div>${item.name} x${item.quantity} - ₹${item.price}</div>`)
      .join('')

    return this.sendEmail(userEmail, 'order_confirmation', {
      USER_NAME: userName,
      ORDER_NUMBER: orderData.orderNumber,
      ORDER_ITEMS: orderItems,
      ORDER_TOTAL: orderData.total.toString(),
      DELIVERY_ADDRESS: orderData.deliveryAddress,
      TRACKING_URL: orderData.trackingUrl,
      DELIVERY_DATE: orderData.deliveryDate,
      LOGO_URL: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    })
  }

  async sendNewsletter(
    emails: string[],
    subject: string,
    content: string
  ) {
    const results = []
    
    for (const email of emails) {
      try {
        const result = await this.sendEmail(email, 'newsletter', {
          SUBJECT: subject,
          CONTENT: content,
          LOGO_URL: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
          UNSUBSCRIBE_URL: `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}`,
        })
        results.push({ email, success: true, messageId: result.messageId })
      } catch (error) {
        results.push({ email, success: false, error: (error as Error).message })
      }
    }
    
    return results
  }

  private async logEmailSent(
    email: string,
    templateId: string,
    status: 'sent' | 'failed',
    messageId?: string,
    error?: any
  ) {
    try {
      await supabase.from('email_logs').insert({
        email,
        template_id: templateId,
        status,
        message_id: messageId,
        error_message: error?.message,
        sent_at: new Date().toISOString(),
      })
    } catch (logError) {
      console.error('Failed to log email:', logError)
    }
  }
}

// Newsletter subscription management
export class NewsletterService {
  async subscribe(email: string, firstName?: string, source?: string) {
    try {
      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('id, status')
        .eq('email', email)
        .single()

      if (existing) {
        if (existing.status === 'subscribed') {
          return { success: false, message: 'Email already subscribed' }
        } else {
          // Reactivate subscription
          await supabase
            .from('newsletter_subscribers')
            .update({ status: 'subscribed', updated_at: new Date().toISOString() })
            .eq('id', existing.id)
        }
      } else {
        // New subscription
        await supabase.from('newsletter_subscribers').insert({
          email,
          first_name: firstName,
          status: 'subscribed',
          source: source || 'website',
          subscribed_at: new Date().toISOString(),
        })
      }

      // Send welcome email if provided name
      if (firstName) {
        const emailService = new EmailService()
        await emailService.sendWelcomeEmail(email, firstName)
      }

      return { success: true, message: 'Successfully subscribed to newsletter' }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      return { success: false, message: 'Failed to subscribe' }
    }
  }

  async unsubscribe(email: string) {
    try {
      await supabase
        .from('newsletter_subscribers')
        .update({ status: 'unsubscribed', updated_at: new Date().toISOString() })
        .eq('email', email)

      return { success: true, message: 'Successfully unsubscribed' }
    } catch (error) {
      console.error('Newsletter unsubscribe error:', error)
      return { success: false, message: 'Failed to unsubscribe' }
    }
  }

  async getSubscribers(status = 'subscribed') {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('email, first_name, subscribed_at')
        .eq('status', status)

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Get subscribers error:', error)
      return { success: false, data: [] }
    }
  }
}

// Email campaign management
export class CampaignService {
  async createCampaign(
    name: string,
    subject: string,
    content: string,
    scheduledAt?: Date
  ) {
    try {
      const { data, error } = await supabase
        .from('email_campaigns')
        .insert({
          name,
          subject,
          content,
          status: scheduledAt ? 'scheduled' : 'draft',
          scheduled_at: scheduledAt?.toISOString(),
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) throw error
      return { success: true, data }
    } catch (error) {
      console.error('Create campaign error:', error)
      return { success: false, error }
    }
  }

  async sendCampaign(campaignId: string) {
    try {
      // Get campaign details
      const { data: campaign, error: campaignError } = await supabase
        .from('email_campaigns')
        .select('*')
        .eq('id', campaignId)
        .single()

      if (campaignError) throw campaignError

      // Get subscribers
      const newsletterService = new NewsletterService()
      const subscribersResult = await newsletterService.getSubscribers()

      if (!subscribersResult.success) {
        throw new Error('Failed to get subscribers')
      }

      const emails = subscribersResult.data.map((sub: any) => sub.email)

      // Send emails
      const emailService = new EmailService()
      const results = await emailService.sendNewsletter(
        emails,
        campaign.subject,
        campaign.content
      )

      // Update campaign status
      await supabase
        .from('email_campaigns')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
          recipients_count: emails.length,
          success_count: results.filter(r => r.success).length,
          failed_count: results.filter(r => !r.success).length,
        })
        .eq('id', campaignId)

      return { success: true, results }
    } catch (error) {
      console.error('Send campaign error:', error)
      
      // Update campaign status to failed
      await supabase
        .from('email_campaigns')
        .update({ status: 'failed' })
        .eq('id', campaignId)

      return { success: false, error }
    }
  }
}

export const emailService = new EmailService()
export const newsletterService = new NewsletterService()
export const campaignService = new CampaignService()

export default {
  EmailService,
  NewsletterService,
  CampaignService,
  emailTemplates,
  emailService,
  newsletterService,
  campaignService,
}