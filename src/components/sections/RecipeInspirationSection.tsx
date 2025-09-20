"use client"

import React, { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Clock, Users, ChefHat, Star, Play, BookOpen, Utensils, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const recipeCategories = [
  {
    id: "traditional",
    name: "Traditional Recipes",
    description: "Time-honored recipes passed down through generations",
    icon: BookOpen,
    color: "from-orange-500 to-red-500",
    count: 12
  },
  {
    id: "modern",
    name: "Modern Fusion",
    description: "Contemporary dishes with a traditional twist",
    icon: ChefHat,
    color: "from-purple-500 to-pink-500",
    count: 8
  },
  {
    id: "quick",
    name: "Quick & Easy",
    description: "Delicious meals ready in under 30 minutes",
    icon: Clock,
    color: "from-green-500 to-emerald-500",
    count: 15
  },
  {
    id: "family",
    name: "Family Favorites",
    description: "Crowd-pleasing recipes loved by all ages",
    icon: Heart,
    color: "from-blue-500 to-indigo-500",
    count: 10
  }
]

const featuredRecipes = [
  {
    id: "1",
    title: "Traditional Mango Pickle Rice Bowl",
    description: "A wholesome meal combining aromatic basmati rice with our signature mango pickle, fresh vegetables, and homemade yogurt.",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    cookTime: "25 mins",
    difficulty: "Easy",
    servings: 4,
    rating: 4.9,
    category: "Traditional",
    ingredients: ["Basmati Rice", "Mango Pickle", "Yogurt", "Vegetables"],
    isVideo: true
  },
  {
    id: "2", 
    title: "Spicy Pickle Stuffed Paratha",
    description: "Flaky, buttery parathas stuffed with our spicy mixed pickle blend, served with cooling mint chutney.",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80",
    cookTime: "40 mins",
    difficulty: "Medium",
    servings: 6,
    rating: 4.8,
    category: "Traditional",
    ingredients: ["Wheat Flour", "Mixed Pickle", "Ghee", "Mint"],
    isVideo: false
  },
  {
    id: "3",
    title: "Pickle-Crusted Fish Curry",
    description: "Fresh fish marinated with our tangy pickle spices, cooked in rich coconut curry with aromatic herbs.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80", 
    cookTime: "35 mins",
    difficulty: "Medium",
    servings: 4,
    rating: 4.7,
    category: "Modern Fusion",
    ingredients: ["Fish", "Coconut Milk", "Pickle Spices", "Herbs"],
    isVideo: true
  },
  {
    id: "4",
    title: "Sweet Mango Chutney Cheesecake",
    description: "A delightful fusion dessert featuring our sweet mango chutney swirled into creamy cheesecake with graham crust.",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=600&q=80",
    cookTime: "2 hours",
    difficulty: "Hard",
    servings: 8,
    rating: 4.9,
    category: "Modern Fusion",
    ingredients: ["Cream Cheese", "Mango Chutney", "Graham Crackers", "Cream"],
    isVideo: false
  }
]

interface RecipeCardProps {
  recipe: typeof featuredRecipes[0]
  index: number
}

function RecipeCard({ recipe, index }: RecipeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const difficultyColor = {
    Easy: "text-green-600 bg-green-50",
    Medium: "text-yellow-600 bg-yellow-50", 
    Hard: "text-red-600 bg-red-50"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card 
        className="group relative overflow-hidden hover:shadow-xl transition-all duration-500 bg-white h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Recipe Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Video Play Button */}
          {recipe.isVideo && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-white transition-colors cursor-pointer">
                <Play className="h-8 w-8 text-orange-600 fill-current" />
              </div>
            </motion.div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              {recipe.category}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute top-4 right-4 flex items-center bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            {recipe.rating}
          </div>

          {/* Recipe Stats */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {recipe.cookTime}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {recipe.servings}
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColor[recipe.difficulty as keyof typeof difficultyColor]}`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Recipe Title */}
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
            {recipe.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {recipe.description}
          </p>

          {/* Ingredients Preview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Key Ingredients:</h4>
            <div className="flex flex-wrap gap-1">
              {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                <span key={i} className="bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-xs">
                  {ingredient}
                </span>
              ))}
              {recipe.ingredients.length > 3 && (
                <span className="text-gray-500 text-xs self-center">
                  +{recipe.ingredients.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Link href={`/recipes/${recipe.id}`} className="flex-1">
              <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                <BookOpen className="h-4 w-4 mr-2" />
                View Recipe
              </Button>
            </Link>
            <Button size="sm" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function RecipeInspirationSection() {
  const [activeCategory, setActiveCategory] = useState("traditional")
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const filteredRecipes = featuredRecipes.filter(recipe => 
    recipe.category.toLowerCase().includes(activeCategory) || activeCategory === "all"
  )

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
            <Utensils className="h-4 w-4 mr-2" />
            Recipe Inspiration
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Cook with Our
            <span className="text-orange-600"> Pickles</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover delicious ways to use our artisanal pickles in everyday cooking. 
            From traditional recipes to modern fusion dishes, let our flavors inspire your culinary journey.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {recipeCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              onClick={() => setActiveCategory(category.id)}
              className={`relative group px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-500 shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeCategory === category.id ? 'bg-white/20' : 'bg-orange-100'
                }`}>
                  {React.createElement(category.icon, { 
                    className: `h-4 w-4 ${activeCategory === category.id ? 'text-white' : 'text-orange-600'}` 
                  })}
                </div>
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className={`text-xs ${activeCategory === category.id ? 'text-orange-100' : 'text-gray-500'}`}>
                    {category.count} recipes
                  </div>
                </div>
              </div>
              
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl -z-10"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Recipes Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
        >
          {featuredRecipes.slice(0, 4).map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} />
          ))}
        </motion.div>

        {/* Recipe Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg mb-12"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">45+</h3>
                <p className="text-gray-600">Recipe Collection</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">12+</h3>
                <p className="text-gray-600">Expert Chefs</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
                <p className="text-gray-600">Recipe Lovers</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Cooking?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our complete recipe collection and discover new ways to enjoy our artisanal pickles 
            in your everyday meals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recipes">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                View All Recipes
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                Shop Ingredients
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}