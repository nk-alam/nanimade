'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Clock, Users, ChefHat, Search, Filter, Heart, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'

export default function RecipesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const recipes = [
    {
      id: 1,
      title: 'Traditional Mango Pickle Rice',
      slug: 'traditional-mango-pickle-rice',
      excerpt: 'A delicious and aromatic rice dish made with our signature mango pickle.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      category: 'Main Course',
      difficulty: 'Easy',
      cookTime: '30 mins',
      servings: 4,
      ingredients: ['Basmati Rice', 'NaniMade Mango Pickle', 'Onions', 'Spices'],
      featured: true
    },
    {
      id: 2,
      title: 'Pickle Paratha',
      slug: 'pickle-paratha',
      excerpt: 'Stuffed flatbread with spicy pickle filling - perfect for breakfast or lunch.',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg',
      category: 'Breakfast',
      difficulty: 'Medium',
      cookTime: '45 mins',
      servings: 6,
      ingredients: ['Wheat Flour', 'Mixed Pickle', 'Ghee', 'Yogurt'],
      featured: false
    },
    {
      id: 3,
      title: 'Pickle Fried Rice',
      slug: 'pickle-fried-rice',
      excerpt: 'Indo-Chinese fusion dish with the tangy twist of traditional pickles.',
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      category: 'Main Course',
      difficulty: 'Easy',
      cookTime: '20 mins',
      servings: 3,
      ingredients: ['Cooked Rice', 'Vegetables', 'Pickle', 'Soy Sauce'],
      featured: true
    },
    {
      id: 4,
      title: 'Pickle Chutney Sandwich',
      slug: 'pickle-chutney-sandwich',
      excerpt: 'Quick and tasty sandwich with homemade pickle chutney.',
      image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg',
      category: 'Snacks',
      difficulty: 'Easy',
      cookTime: '10 mins',
      servings: 2,
      ingredients: ['Bread', 'Pickle', 'Butter', 'Vegetables'],
      featured: false
    },
    {
      id: 5,
      title: 'Spicy Pickle Curry',
      slug: 'spicy-pickle-curry',
      excerpt: 'Rich and flavorful curry made with traditional pickle spices.',
      image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
      category: 'Main Course',
      difficulty: 'Hard',
      cookTime: '60 mins',
      servings: 5,
      ingredients: ['Vegetables', 'Pickle Masala', 'Coconut', 'Curry Leaves'],
      featured: false
    },
    {
      id: 6,
      title: 'Pickle Yogurt Dip',
      slug: 'pickle-yogurt-dip',
      excerpt: 'Refreshing dip perfect for snacks and appetizers.',
      image: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg',
      category: 'Appetizers',
      difficulty: 'Easy',
      cookTime: '5 mins',
      servings: 4,
      ingredients: ['Greek Yogurt', 'Pickle', 'Mint', 'Spices'],
      featured: true
    }
  ]

  const categories = ['all', 'Main Course', 'Breakfast', 'Snacks', 'Appetizers']
  const difficulties = ['all', 'Easy', 'Medium', 'Hard']

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || recipe.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const featuredRecipes = recipes.filter(recipe => recipe.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Badge className="mb-4 bg-white/20 text-white">Recipe Collection</Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-quicksand mb-6">
              Delicious Recipes with Our Pickles
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Discover amazing ways to use our authentic pickles in your cooking. 
              From traditional dishes to modern fusion recipes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-quicksand text-gray-900 mb-4">
              Featured Recipes
            </h2>
            <p className="text-lg text-gray-600">
              Our most popular and loved recipes by the community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-orange-500 text-white">Featured</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{recipe.category}</Badge>
                      <Badge variant={recipe.difficulty === 'Easy' ? 'default' : recipe.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="font-quicksand">{recipe.title}</CardTitle>
                    <p className="text-gray-600">{recipe.excerpt}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {recipe.servings} servings
                      </div>
                      <div className="flex items-center">
                        <ChefHat className="w-4 h-4 mr-1" />
                        {recipe.ingredients.length} ingredients
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/recipes/${recipe.slug}`} className="w-full">
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Recipe
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Recipes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold font-quicksand text-gray-900 mb-8 text-center">
              All Recipes
            </h2>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Difficulties" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty === 'all' ? 'All Difficulties' : difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline" className="flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredRecipes.length} of {recipes.length} recipes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{recipe.category}</Badge>
                      <Badge variant={recipe.difficulty === 'Easy' ? 'default' : recipe.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                        {recipe.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="font-quicksand">{recipe.title}</CardTitle>
                    <p className="text-gray-600 text-sm">{recipe.excerpt}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {recipe.servings}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/recipes/${recipe.slug}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        View Recipe
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredRecipes.length === 0 && (
            <div className="text-center py-12">
              <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold font-quicksand mb-4">
              Get New Recipes Weekly
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to our newsletter and never miss a delicious recipe!
            </p>
            <div className="max-w-md mx-auto flex gap-3">
              <Input
                placeholder="Enter your email"
                className="bg-white text-gray-900"
              />
              <Button className="bg-white text-orange-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}