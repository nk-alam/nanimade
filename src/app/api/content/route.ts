import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

// Mock data store (in production, this would be in a database)
let contentPages: any[] = [
  {
    id: '1',
    title: 'Terms of Service',
    slug: 'terms',
    content: '# Terms of Service\n\nWelcome to NaniMade...',
    metaTitle: 'Terms of Service - NaniMade',
    metaDescription: 'Read our terms of service',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    published: true
  },
  {
    id: '2',
    title: 'Privacy Policy',
    slug: 'privacy',
    content: '# Privacy Policy\n\nYour privacy is important to us...',
    metaTitle: 'Privacy Policy - NaniMade',
    metaDescription: 'Read our privacy policy',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    published: true
  },
  {
    id: '3',
    title: 'About Us',
    slug: 'about',
    content: '# About NaniMade\n\nWe make delicious pickles...',
    metaTitle: 'About Us - NaniMade',
    metaDescription: 'Learn about NaniMade',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    published: true
  }
]

// GET /api/content - Get all content pages
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only allow admin users to access all content
    if (!session.user.isAdmin) {
      // For non-admin users, only return published pages
      return NextResponse.json(contentPages.filter(page => page.published))
    }

    return NextResponse.json(contentPages)
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/content - Create or update a content page
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await request.json()
    
    if (data.id) {
      // Update existing page
      contentPages = contentPages.map(page => 
        page.id === data.id ? { ...data, updatedAt: new Date().toISOString().split('T')[0] } : page
      )
    } else {
      // Create new page
      const newPage = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      }
      contentPages.push(newPage)
    }

    return NextResponse.json({ success: true, pages: contentPages })
  } catch (error) {
    console.error('Content save error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/content/:id - Delete a content page
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const id = params.id
    contentPages = contentPages.filter(page => page.id !== id)

    return NextResponse.json({ success: true, pages: contentPages })
  } catch (error) {
    console.error('Content delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}