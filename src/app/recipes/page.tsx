'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Clock,
  ChefHat,
  Users,
  Star,
  Search,
  Filter,
  Calendar,
  Tag,
  ArrowRight,
  Heart,
  Share2,
  BookOpen,
  Utensils,
} from 'lucide-react'

interface Recipe {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  author: {
    name: string
    avatar: string
  }
  category: string
  tags: string[]
  readTime: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  servings: number
  prepTime: number
  cookTime: number
  ingredients: string[]
  instructions: string[]
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  rating: number
  reviews: number
  publishedAt: string
  likes: number
  views: number
}

export default function RecipeBlog() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [featuredRecipe, setFeaturedRecipe] = useState<Recipe | null>(null)

  // Mock data - replace with actual API calls
  useEffect(() => {
    const fetchRecipes = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockRecipes: Recipe[] = [
        {
          id: '1',
          title: 'Traditional Malda Mango Pickle Recipe',
          slug: 'traditional-malda-mango-pickle-recipe',
          excerpt: 'Learn how to make authentic Malda mango pickle with this traditional family recipe passed down through generations.',
          content: 'Full recipe content here...',
          featuredImage: '/api/placeholder/600/400',
          author: {
            name: 'Nani Ma',
            avatar: '/api/placeholder/50/50'
          },
          category: 'Traditional Recipes',
          tags: ['mango', 'pickle', 'malda', 'traditional', 'summer'],
          readTime: 8,
          difficulty: 'Medium',
          servings: 6,
          prepTime: 30,
          cookTime: 0,
          ingredients: [
            '2 kg raw Malda mangoes',
            '200g mustard oil',
            '100g mustard seeds',
            '50g red chili powder',
            '30g turmeric powder',
            '20g fenugreek seeds',
            'Salt to taste'
          ],
          instructions: [
            'Wash and dry the mangoes completely',
            'Cut mangoes into small pieces',
            'Mix all spices with oil',
            'Combine mangoes with spice mixture',
            'Store in airtight jar',
            'Let it marinate for 3-4 days'
          ],
          nutrition: {
            calories: 85,
            protein: 2,
            carbs: 12,
            fat: 4
          },
          rating: 4.9,
          reviews: 156,
          publishedAt: '2024-01-15',
          likes: 342,
          views: 2847
        },
        {
          id: '2',
          title: 'Spicy Mango Pickle with Extra Heat',
          slug: 'spicy-mango-pickle-extra-heat',
          excerpt: 'For those who love extra spice! This fiery mango pickle recipe will add a kick to any meal.',
          content: 'Full recipe content here...',
          featuredImage: '/api/placeholder/600/400',
          author: {
            name: 'Chef Priya',
            avatar: '/api/placeholder/50/50'
          },
          category: 'Spicy Recipes',
          tags: ['mango', 'spicy', 'hot', 'chili', 'pickle'],
          readTime: 6,
          difficulty: 'Easy',
          servings: 4,
          prepTime: 20,
          cookTime: 5,
          ingredients: [
            '1.5 kg raw mangoes',
            '150g mustard oil',
            '80g red chili powder',
            '40g black mustard seeds',
            '25g turmeric powder',
            '10g hing (asafoetida)',
            'Salt to taste'
          ],
          instructions: [
            'Prepare mangoes by cutting into pieces',
            'Heat oil and add mustard seeds',
            'Mix all dry spices',
            'Combine everything and mix well',
            'Store in sterilized jar'
          ],
          nutrition: {
            calories: 92,
            protein: 2.5,
            carbs: 11,
            fat: 4.5
          },
          rating: 4.7,
          reviews: 89,
          publishedAt: '2024-01-12',
          likes: 234,
          views: 1923
        },
        {
          id: '3',
          title: 'Sweet and Tangy Mango Pickle',
          slug: 'sweet-tangy-mango-pickle',
          excerpt: 'Perfect balance of sweet and tangy flavors in this delightful mango pickle recipe.',
          content: 'Full recipe content here...',
          featuredImage: '/api/placeholder/600/400',
          author: {
            name: 'Rahul Sharma',
            avatar: '/api/placeholder/50/50'
          },
          category: 'Sweet Recipes',
          tags: ['mango', 'sweet', 'tangy', 'jaggery', 'family'],
          readTime: 10,
          difficulty: 'Hard',
          servings: 8,
          prepTime: 45,
          cookTime: 15,
          ingredients: [
            '2.5 kg raw mangoes',
            '300g jaggery',
            '200g mustard oil',
            '50g tamarind paste',
            '40g mustard seeds',
            '30g red chili powder',
            'Salt to taste'
          ],
          instructions: [
            'Cut mangoes and salt them overnight',
            'Melt jaggery with little water',
            'Prepare spice mixture',
            'Cook everything together',
            'Cool and store properly'
          ],
          nutrition: {
            calories: 110,
            protein: 1.8,
            carbs: 18,
            fat: 4.2
          },
          rating: 4.8,
          reviews: 203,
          publishedAt: '2024-01-10',
          likes: 445,
          views: 3421
        },
        {
          id: '4',
          title: 'Quick 15-Minute Instant Mango Pickle',
          slug: 'quick-instant-mango-pickle',
          excerpt: 'No waiting time! Enjoy delicious mango pickle in just 15 minutes with this quick recipe.',
          content: 'Full recipe content here...',
          featuredImage: '/api/placeholder/600/400',
          author: {
            name: 'Sunita Das',
            avatar: '/api/placeholder/50/50'
          },
          category: 'Quick Recipes',
          tags: ['mango', 'quick', 'instant', 'easy', '15-minutes'],
          readTime: 4,
          difficulty: 'Easy',
          servings: 3,
          prepTime: 10,
          cookTime: 5,
          ingredients: [
            '1 kg ripe mangoes',
            '100g mustard oil',
            '30g mustard seeds',
            '20g red chili powder',
            '15g turmeric',
            'Salt to taste'
          ],
          instructions: [
            'Cut mangoes into pieces',
            'Heat oil in pan',
            'Add mustard seeds',
            'Mix spices and mangoes',
            'Cook for 5 minutes',
            'Ready to serve!'
          ],
          nutrition: {
            calories: 78,
            protein: 2.2,
            carbs: 9,
            fat: 3.8
          },
          rating: 4.6,
          reviews: 127,
          publishedAt: '2024-01-08',
          likes: 298,
          views: 2156
        }
      ]
      
      setRecipes(mockRecipes)
      setFeaturedRecipe(mockRecipes[0])
      setLoading(false)
    }

    fetchRecipes()
  }, [])

  const categories = ['all', 'Traditional Recipes', 'Spicy Recipes', 'Sweet Recipes', 'Quick Recipes']
  const difficulties = ['all', 'Easy', 'Medium', 'Hard']

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200"></div>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Recipe */}
      {featuredRecipe && (
        <section className="relative h-96 lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={featuredRecipe.featuredImage}
              alt={featuredRecipe.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="inline-block px-3 py-1 bg-orange-600 text-white text-sm rounded-full mb-4">
                  Featured Recipe
                </span>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                  {featuredRecipe.title}
                </h1>
                <p className="text-xl mb-6">
                  {featuredRecipe.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{featuredRecipe.readTime} min read</span>
                  </div>
                  <div className="flex items-center">
                    <ChefHat className="h-5 w-5 mr-2" />
                    <span>{featuredRecipe.difficulty}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{featuredRecipe.servings} servings</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-yellow-400 fill-current" />
                    <span>{featuredRecipe.rating} ({featuredRecipe.reviews} reviews)</span>
                  </div>
                </div>
                <Link
                  href={`/recipes/${featuredRecipe.slug}`}
                  className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Read Recipe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pickle Recipes & Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover authentic pickle recipes, cooking tips, and stories from our kitchen to yours.
              Learn the art of traditional pickle making with our step-by-step guides.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes, ingredients, techniques..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'all' ? 'All Levels' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe, index) => (
            <motion.article
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={recipe.featuredImage}
                  alt={recipe.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(recipe.difficulty)}`}>
                    {recipe.difficulty}
                  </span>
                </div>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                    {recipe.category}
                  </span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(recipe.publishedAt).toLocaleDateString()}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {recipe.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {recipe.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{recipe.readTime}m</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{recipe.servings}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 text-yellow-400 fill-current" />
                      <span>{recipe.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={recipe.author.avatar}
                      alt={recipe.author.name}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-700">by {recipe.author.name}</span>
                  </div>
                  <Link
                    href={`/recipes/${recipe.slug}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                    {recipe.tags.length > 3 && (
                      <span className="text-xs text-gray-500">+{recipe.tags.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
          </div>
        )}
      </section>

      {/* Newsletter Subscription */}
      <section className="bg-orange-50 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Utensils className="mx-auto h-12 w-12 text-orange-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Get New Recipes Delivered to Your Inbox
          </h3>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and never miss a delicious recipe or cooking tip!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
            <button className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}