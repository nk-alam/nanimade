'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  X, 
  AlertCircle 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ContentPage {
  id: string
  title: string
  slug: string
  content: string
  metaTitle: string
  metaDescription: string
  createdAt: string
  updatedAt: string
  published: boolean
}

const initialPages: ContentPage[] = [
  {
    id: '1',
    title: 'Terms of Service',
    slug: 'terms',
    content: 'Terms of service content...',
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
    content: 'Privacy policy content...',
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
    content: 'About us content...',
    metaTitle: 'About Us - NaniMade',
    metaDescription: 'Learn about NaniMade',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    published: true
  }
]

export default function ContentManagement() {
  const [pages, setPages] = useState<ContentPage[]>(initialPages)
  const [editingPage, setEditingPage] = useState<ContentPage | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleCreatePage = () => {
    const newPage: ContentPage = {
      id: Date.now().toString(),
      title: '',
      slug: '',
      content: '',
      metaTitle: '',
      metaDescription: '',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      published: false
    }
    setEditingPage(newPage)
    setIsCreating(true)
  }

  const handleEditPage = (page: ContentPage) => {
    setEditingPage({ ...page })
    setIsCreating(false)
  }

  const handleSavePage = () => {
    if (!editingPage) return

    if (isCreating) {
      setPages([...pages, editingPage])
    } else {
      setPages(pages.map(page => page.id === editingPage.id ? editingPage : page))
    }

    setEditingPage(null)
    setIsCreating(false)
  }

  const handleDeletePage = (id: string) => {
    setPages(pages.filter(page => page.id !== id))
  }

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              Content Management
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your website pages and content
            </p>
          </div>
          <Button onClick={handleCreatePage} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New Page
          </Button>
        </div>
      </div>

      {editingPage ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {isCreating ? 'Create New Page' : 'Edit Page'}
                </CardTitle>
                <Button variant="outline" onClick={() => setEditingPage(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Page Title
                  </label>
                  <Input
                    value={editingPage.title}
                    onChange={(e) => setEditingPage({...editingPage, title: e.target.value})}
                    placeholder="Enter page title"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    URL Slug
                  </label>
                  <Input
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({...editingPage, slug: e.target.value})}
                    placeholder="page-url-slug"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <Textarea
                  value={editingPage.content}
                  onChange={(e) => setEditingPage({...editingPage, content: e.target.value})}
                  placeholder="Enter page content..."
                  rows={10}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">SEO Settings</h3>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Meta Title
                  </label>
                  <Input
                    value={editingPage.metaTitle}
                    onChange={(e) => setEditingPage({...editingPage, metaTitle: e.target.value})}
                    placeholder="Enter meta title"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Meta Description
                  </label>
                  <Textarea
                    value={editingPage.metaDescription}
                    onChange={(e) => setEditingPage({...editingPage, metaDescription: e.target.value})}
                    placeholder="Enter meta description"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingPage.published}
                    onChange={(e) => setEditingPage({...editingPage, published: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Publish this page</span>
                </label>
                
                <div className="space-x-3">
                  <Button variant="outline" onClick={() => setEditingPage(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSavePage} className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Page
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Pages</CardTitle>
                <div className="relative w-full sm:w-auto">
                  <Input
                    placeholder="Search pages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredPages.length > 0 ? (
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Title
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            URL
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Updated
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredPages.map((page) => (
                          <tr key={page.id} className="hover:bg-gray-50">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {page.title}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              /{page.slug}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                page.published 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {page.published ? 'Published' : 'Draft'}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {page.updatedAt}
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEditPage(page)}
                                  className="text-orange-600 hover:text-orange-900"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletePage(page.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No pages found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new page.
                  </p>
                  <div className="mt-6">
                    <Button onClick={handleCreatePage}>
                      <Plus className="h-4 w-4 mr-2" />
                      New Page
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Content Management Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-1">SEO Best Practices</h3>
                <p className="text-sm text-blue-700">
                  Keep meta titles under 60 characters and descriptions under 160 characters for optimal search visibility.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-900 mb-1">URL Structure</h3>
                <p className="text-sm text-green-700">
                  Use descriptive, keyword-rich slugs that clearly indicate the page content.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-900 mb-1">Content Updates</h3>
                <p className="text-sm text-purple-700">
                  Regularly update your content to keep it fresh and relevant for both users and search engines.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}