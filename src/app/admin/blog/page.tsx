'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Calendar,
  User,
  Tag,
  Image as ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  published: boolean
  featured: boolean
  categories: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
  imageUrl: string
}

const initialPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Secret to Perfect Mango Pickle',
    slug: 'secret-perfect-mango-pickle',
    excerpt: 'Discover the traditional techniques that make our mango pickles so special.',
    content: 'Full blog content here...',
    author: 'NaniMade Team',
    published: true,
    featured: true,
    categories: ['Recipes', 'Tips'],
    tags: ['mango', 'pickle', 'recipe'],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    imageUrl: '/api/placeholder/400/200'
  },
  {
    id: '2',
    title: 'Health Benefits of Homemade Pickles',
    slug: 'health-benefits-homemade-pickles',
    excerpt: 'Learn why homemade pickles are better for your digestive system.',
    content: 'Full blog content here...',
    author: 'Dr. Sharma',
    published: true,
    featured: false,
    categories: ['Health', 'Nutrition'],
    tags: ['health', 'digestion', 'probiotics'],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    imageUrl: '/api/placeholder/400/200'
  },
  {
    id: '3',
    title: 'Our Grandmother\'s Pickle Recipe',
    slug: 'grandmothers-pickle-recipe',
    excerpt: 'The story behind our family recipe passed down through generations.',
    content: 'Full blog content here...',
    author: 'Meera Das',
    published: false,
    featured: false,
    categories: ['Story', 'Heritage'],
    tags: ['family', 'tradition', 'story'],
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    imageUrl: '/api/placeholder/400/200'
  }
]

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: 'NaniMade Team',
      published: false,
      featured: false,
      categories: [],
      tags: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      imageUrl: '/api/placeholder/400/200'
    }
    setEditingPost(newPost)
    setIsCreating(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost({ ...post })
    setIsCreating(false)
  }

  const handleSavePost = () => {
    if (!editingPost) return

    if (isCreating) {
      setPosts([...posts, editingPost])
    } else {
      setPosts(posts.map(post => post.id === editingPost.id ? editingPost : post))
    }

    setEditingPost(null)
    setIsCreating(false)
  }

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const handlePublishToggle = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, published: !post.published, updatedAt: new Date().toISOString().split('T')[0] } : post
    ))
  }

  const handleFeatureToggle = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, featured: !post.featured, updatedAt: new Date().toISOString().split('T')[0] } : post
    ))
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const categories = ['all', ...new Set(posts.flatMap(post => post.categories))]

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FileText className="h-6 w-6 mr-2" />
              Blog Management
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Create and manage your blog posts
            </p>
          </div>
          <Button onClick={handleCreatePost} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add New Post
          </Button>
        </div>
      </div>

      {editingPost ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {isCreating ? 'Create New Post' : 'Edit Post'}
                </CardTitle>
                <Button variant="outline" onClick={() => setEditingPost(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Post Title
                  </label>
                  <Input
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    placeholder="Enter post title"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    URL Slug
                  </label>
                  <Input
                    value={editingPost.slug}
                    onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})}
                    placeholder="post-url-slug"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Excerpt
                </label>
                <Textarea
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                  placeholder="Enter a short excerpt..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Content
                </label>
                <Textarea
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  placeholder="Enter post content..."
                  rows={10}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <Input
                    value={editingPost.author}
                    onChange={(e) => setEditingPost({...editingPost, author: e.target.value})}
                    placeholder="Author name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Categories
                  </label>
                  <Input
                    value={editingPost.categories.join(', ')}
                    onChange={(e) => setEditingPost({...editingPost, categories: e.target.value.split(', ').filter(Boolean)})}
                    placeholder="Category1, Category2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <Input
                  value={editingPost.tags.join(', ')}
                  onChange={(e) => setEditingPost({...editingPost, tags: e.target.value.split(', ').filter(Boolean)})}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingPost.published}
                    onChange={(e) => setEditingPost({...editingPost, published: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Publish this post</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingPost.featured}
                    onChange={(e) => setEditingPost({...editingPost, featured: e.target.checked})}
                    className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Feature this post</span>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-x-3">
                  <Button variant="outline" onClick={() => setEditingPost(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSavePost} className="flex items-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Post
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
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}
                  >
                    <FileText className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400'}`}
                  >
                    <Filter className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      {post.featured && (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 truncate">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {post.categories.map((category, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {category}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span>{post.updatedAt}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditPost(post)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handlePublishToggle(post.id)}
                          className={`p-1 ${post.published ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Posts List View */
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Post
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categories
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{post.title}</div>
                            <div className="text-sm text-gray-500">{post.excerpt.substring(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {post.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {post.categories.map((category, idx) => (
                            <span key={idx} className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              {category}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.updatedAt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {post.published ? 'Published' : 'Draft'}
                          </span>
                          {post.featured && (
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditPost(post)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handlePublishToggle(post.id)}
                            className={`p-1 ${post.published ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'}`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No posts found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || selectedCategory !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first blog post'}
              </p>
              <div className="mt-6">
                <Button onClick={handleCreatePost}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}