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

// DELETE /api/content/:id - Delete a content page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id || !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
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