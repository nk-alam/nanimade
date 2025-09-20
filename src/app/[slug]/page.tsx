import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'

// Mock data - in production, this would come from an API
const contentPages = [
  {
    id: '1',
    title: 'Terms of Service',
    slug: 'terms',
    content: `<h1>Terms of Service</h1>
<p>Last updated: January 15, 2024</p>

<h2>1. Introduction</h2>
<p>Welcome to NaniMade ("we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website and services.</p>

<h2>2. Use of Our Services</h2>
<p>You agree to use our services only for lawful purposes and in accordance with these Terms.</p>

<h2>3. Orders and Payments</h2>
<p>All orders are subject to product availability and acceptance by NaniMade.</p>

<h2>4. Shipping and Delivery</h2>
<p>We strive to deliver your orders promptly through our trusted shipping partners.</p>

<h2>5. Returns and Refunds</h2>
<p>Please refer to our Refund Policy for information on returns and refunds.</p>`,
    metaTitle: 'Terms of Service - NaniMade',
    metaDescription: 'Read our terms of service for using NaniMade products and services.',
  },
  {
    id: '2',
    title: 'Privacy Policy',
    slug: 'privacy',
    content: `<h1>Privacy Policy</h1>
<p>Last updated: January 15, 2024</p>

<h2>1. Information We Collect</h2>
<p>We collect information you provide directly to us, such as when you create an account or place an order.</p>

<h2>2. How We Use Your Information</h2>
<p>We use your information to provide, maintain, and improve our services.</p>

<h2>3. Information Sharing</h2>
<p>We do not sell or rent your personal information to third parties.</p>

<h2>4. Data Security</h2>
<p>We implement appropriate security measures to protect your personal information.</p>`,
    metaTitle: 'Privacy Policy - NaniMade',
    metaDescription: 'Learn how NaniMade protects your privacy and personal information.',
  },
  {
    id: '3',
    title: 'About Us',
    slug: 'about',
    content: `<h1>About NaniMade</h1>

<h2>Our Story</h2>
<p>NaniMade was born from a grandmother's secret pickle recipe passed down through generations. What started as a family tradition has now become our passion to share with pickle lovers everywhere.</p>

<h2>Our Mission</h2>
<p>We're on a mission to bring authentic, homemade taste to every household. Each jar of our pickles is crafted with the same love and care that goes into making them at home.</p>

<h2>Quality Commitment</h2>
<p>Using only the finest ingredients sourced directly from Malda, the mango capital of India, we ensure every bite delivers the authentic flavor you crave.</p>`,
    metaTitle: 'About Us - NaniMade',
    metaDescription: 'Discover the story behind NaniMade and our passion for authentic homemade pickles.',
  }
]

// Generate static params for all content pages
export async function generateStaticParams() {
  return contentPages.map((page) => ({
    slug: page.slug,
  }))
}

// Generate metadata for each page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = contentPages.find((p) => p.slug === params.slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
  }
}

export default function ContentPage({ params }: { params: { slug: string } }) {
  const page = contentPages.find((p) => p.slug === params.slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">{page.title}</h1>
                <div 
                  dangerouslySetInnerHTML={{ __html: page.content }} 
                  className="space-y-4"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}