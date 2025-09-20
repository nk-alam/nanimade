'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Clock,
  ChefHat,
  Users,
  Star,
  Heart,
  Share2,
  Printer,
  Calendar,
  Tag,
  ArrowLeft,
  Check,
  Minus,
  Plus,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Send,
  Bookmark,
  AlertCircle,
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
    bio: string
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
    fiber?: number
    sugar?: number
  }
  rating: number
  reviews: number
  publishedAt: string
  likes: number
  views: number
  tips?: string[]
  variations?: string[]
}

interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  comment: string
  date: string
  helpful: number
  images?: string[]
}

export default function RecipeDetail() {
  const params = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [servings, setServings] = useState(4)
  const [checkedIngredients, setCheckedIngredients] = useState<boolean[]>([])
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([])
  const [userRating, setUserRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    const fetchRecipe = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - replace with actual API call
      const mockRecipe: Recipe = {
        id: '1',
        title: 'Traditional Malda Mango Pickle Recipe',
        slug: 'traditional-malda-mango-pickle-recipe',
        excerpt: 'Learn how to make authentic Malda mango pickle with this traditional family recipe passed down through generations.',
        content: `
          <p>This traditional Malda mango pickle recipe has been in our family for generations. The secret lies in using the perfect raw mangoes from Malda, West Bengal, known for their unique taste and texture.</p>
          
          <p>The key to a perfect mango pickle is the balance of spices and the quality of mustard oil. Make sure to use good quality, fresh spices for the best flavor.</p>
          
          <h3>About Malda Mangoes</h3>
          <p>Malda mangoes are special because of the region's unique soil and climate conditions. They have the perfect balance of sweetness and tartness that makes them ideal for pickling.</p>
        `,
        featuredImage: '/api/placeholder/800/500',
        author: {
          name: 'Nani Ma',
          avatar: '/api/placeholder/100/100',
          bio: 'Traditional cook with 40+ years of experience in authentic Bengali cuisine. Specializes in pickle making and preservation techniques.'
        },
        category: 'Traditional Recipes',
        tags: ['mango', 'pickle', 'malda', 'traditional', 'summer', 'bengali', 'authentic'],
        readTime: 8,
        difficulty: 'Medium',
        servings: 6,
        prepTime: 30,
        cookTime: 0,
        ingredients: [
          '2 kg raw Malda mangoes (firm and unblemished)',
          '200ml pure mustard oil',
          '100g black mustard seeds (coarsely ground)',
          '50g red chili powder (Kashmiri for color)',
          '30g turmeric powder',
          '20g fenugreek seeds (methi) powder',
          '15g nigella seeds (kalonji)',
          '2 tbsp salt (rock salt preferred)',
          '1 tsp hing (asafoetida)',
          '10-12 green chilies (slit lengthwise)'
        ],
        instructions: [
          'Wash the mangoes thoroughly and pat them completely dry. Any moisture can spoil the pickle.',
          'Cut mangoes into 1-inch pieces, discarding the pit. Make sure your knife and cutting board are completely clean and dry.',
          'In a large glass bowl, mix the mango pieces with salt and turmeric. Let it sit for 2 hours to draw out moisture.',
          'Heat mustard oil in a pan until it reaches smoking point, then let it cool completely. This removes the pungent taste.',
          'Dry roast fenugreek seeds and grind them to a fine powder. This adds a distinctive bitter note.',
          'In a large mixing bowl, combine ground mustard seeds, red chili powder, turmeric, fenugreek powder, nigella seeds, and hing.',
          'Add the cooled mustard oil to the spice mixture and mix well to form a paste.',
          'Drain any excess water from the salted mangoes and add them to the spice mixture.',
          'Add slit green chilies and mix everything gently but thoroughly.',
          'Transfer to a clean, dry glass jar with a tight-fitting lid.',
          'Keep the jar in sunlight for 3-4 days, mixing once daily with a clean, dry spoon.',
          'Store in a cool, dry place. The pickle will be ready to eat after a week and can last for up to a year.'
        ],
        nutrition: {
          calories: 85,
          protein: 2,
          carbs: 12,
          fat: 4,
          fiber: 3,
          sugar: 8
        },
        rating: 4.9,
        reviews: 156,
        publishedAt: '2024-01-15',
        likes: 342,
        views: 2847,
        tips: [
          'Always use completely dry utensils and containers to prevent spoilage',
          'The quality of mustard oil is crucial - use cold-pressed oil for best results',
          'Raw mangoes should be firm but not too hard',
          'Exposure to sunlight helps in the fermentation process',
          'Store in glass jars only, never use plastic containers'
        ],
        variations: [
          'Add jaggery for a sweet and spicy version',
          'Include garlic cloves for extra flavor',
          'Use a mix of mangoes and raw papayas',
          'Add curry leaves for South Indian style'
        ]
      }

      const mockReviews: Review[] = [
        {
          id: '1',
          author: 'Priya Sharma',
          avatar: '/api/placeholder/50/50',
          rating: 5,
          comment: 'Amazing recipe! Exactly like my grandmother used to make. The key is really in the quality of mustard oil.',
          date: '2024-01-20',
          helpful: 24,
          images: ['/api/placeholder/200/200']
        },
        {
          id: '2',
          author: 'Rajesh Kumar',
          avatar: '/api/placeholder/50/50',
          rating: 4,
          comment: 'Great detailed instructions. My first attempt at making pickle and it turned out wonderful!',
          date: '2024-01-18',
          helpful: 18
        },
        {
          id: '3',
          author: 'Meera Devi',
          avatar: '/api/placeholder/50/50',
          rating: 5,
          comment: 'This recipe brings back so many memories. Thank you for sharing this authentic version.',
          date: '2024-01-16',
          helpful: 31
        }
      ]

      setRecipe(mockRecipe)
      setReviews(mockReviews)
      setServings(mockRecipe.servings)
      setCheckedIngredients(new Array(mockRecipe.ingredients.length).fill(false))
      setCompletedSteps(new Array(mockRecipe.instructions.length).fill(false))
      setLoading(false)
    }

    if (params?.slug) {
      fetchRecipe()
    }
  }, [params?.slug])

  const adjustServings = (newServings: number) => {
    if (newServings > 0 && newServings <= 20) {
      setServings(newServings)
    }
  }

  const getAdjustedIngredient = (ingredient: string, originalServings: number) => {
    const ratio = servings / originalServings
    // Simple regex to find numbers and adjust them
    return ingredient.replace(/(\d+(?:\.\d+)?)\s*(kg|g|ml|l|tbsp|tsp|cup|cups)/g, (match, number, unit) => {
      const adjustedAmount = (parseFloat(number) * ratio).toFixed(1)
      return `${adjustedAmount} ${unit}`
    })
  }

  const toggleIngredient = (index: number) => {
    const newChecked = [...checkedIngredients]
    newChecked[index] = !newChecked[index]
    setCheckedIngredients(newChecked)
  }

  const toggleStep = (index: number) => {
    const newCompleted = [...completedSteps]
    newCompleted[index] = !newCompleted[index]
    setCompletedSteps(newCompleted)
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userRating > 0 && reviewText.trim()) {
      // Add review logic here
      console.log('Review submitted:', { rating: userRating, text: reviewText })
      setUserRating(0)
      setReviewText('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h1>
          <Link href="/recipes" className="text-orange-600 hover:text-orange-700">
            ← Back to Recipes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Recipe Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link
            href="/recipes"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <Image
                src={recipe.featuredImage}
                alt={recipe.title}
                width={600}
                height={400}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
              />
            </div>

            <div className="lg:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                  {recipe.category}
                </span>
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {recipe.difficulty}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {recipe.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {recipe.excerpt}
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <Clock className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Prep Time</div>
                  <div className="font-semibold">{recipe.prepTime}m</div>
                </div>
                <div className="text-center">
                  <ChefHat className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Difficulty</div>
                  <div className="font-semibold">{recipe.difficulty}</div>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 text-gray-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Servings</div>
                  <div className="font-semibold">{recipe.servings}</div>
                </div>
                <div className="text-center">
                  <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2 fill-current" />
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="font-semibold">{recipe.rating}/5</div>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Image
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{recipe.author.name}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(recipe.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  {recipe.likes + (isLiked ? 1 : 0)}
                </button>
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`} />
                  Save
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Share2 className="h-5 w-5" />
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Printer className="h-5 w-5" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Ingredients */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ingredients</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => adjustServings(servings - 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="mx-3 font-semibold">{servings} servings</span>
                  <button
                    onClick={() => adjustServings(servings + 1)}
                    className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center">
                    <button
                      onClick={() => toggleIngredient(index)}
                      className={`mr-3 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        checkedIngredients[index]
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'border-gray-300 hover:border-orange-500'
                      }`}
                    >
                      {checkedIngredients[index] && <Check className="h-3 w-3" />}
                    </button>
                    <span className={checkedIngredients[index] ? 'line-through text-gray-500' : ''}>
                      {getAdjustedIngredient(ingredient, recipe.servings)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructions */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
              <ol className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <button
                      onClick={() => toggleStep(index)}
                      className={`mr-4 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                        completedSteps[index]
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {completedSteps[index] ? <Check className="h-4 w-4" /> : index + 1}
                    </button>
                    <div className={`flex-1 ${completedSteps[index] ? 'text-gray-500' : ''}`}>
                      <p className={completedSteps[index] ? 'line-through' : ''}>{instruction}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Tips */}
            {recipe.tips && recipe.tips.length > 0 && (
              <section className="bg-orange-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
                  Chef's Tips
                </h3>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-600 mr-2">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Variations */}
            {recipe.variations && recipe.variations.length > 0 && (
              <section className="bg-blue-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Recipe Variations</h3>
                <ul className="space-y-2">
                  {recipe.variations.map((variation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span className="text-gray-700">{variation}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Reviews */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews ({recipe.reviews})
              </h2>

              {/* Add Review Form */}
              <form onSubmit={handleReviewSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setUserRating(star)}
                        className={`p-1 ${
                          star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Share your experience with this recipe..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={userRating === 0 || !reviewText.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{review.author}</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        {review.images && (
                          <div className="flex gap-2 mb-3">
                            {review.images.map((image, index) => (
                              <Image
                                key={index}
                                src={image}
                                alt="Review"
                                width={80}
                                height={80}
                                className="w-20 h-20 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <button className="flex items-center gap-1 hover:text-green-600">
                            <ThumbsUp className="h-4 w-4" />
                            Helpful ({review.helpful})
                          </button>
                          <button className="flex items-center gap-1 hover:text-red-600">
                            <ThumbsDown className="h-4 w-4" />
                            Not helpful
                          </button>
                          <button className="flex items-center gap-1 hover:text-orange-600">
                            <MessageCircle className="h-4 w-4" />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Nutrition Info */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nutrition Facts</h3>
              <div className="text-sm">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Calories</span>
                  <span className="font-semibold">{recipe.nutrition.calories}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Protein</span>
                  <span className="font-semibold">{recipe.nutrition.protein}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Carbs</span>
                  <span className="font-semibold">{recipe.nutrition.carbs}g</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span>Fat</span>
                  <span className="font-semibold">{recipe.nutrition.fat}g</span>
                </div>
                {recipe.nutrition.fiber && (
                  <div className="flex justify-between items-center py-2 border-b">
                    <span>Fiber</span>
                    <span className="font-semibold">{recipe.nutrition.fiber}g</span>
                  </div>
                )}
                {recipe.nutrition.sugar && (
                  <div className="flex justify-between items-center py-2">
                    <span>Sugar</span>
                    <span className="font-semibold">{recipe.nutrition.sugar}g</span>
                  </div>
                )}
              </div>
            </section>

            {/* Author Info */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About the Author</h3>
              <div className="flex items-center mb-4">
                <Image
                  src={recipe.author.avatar}
                  alt={recipe.author.name}
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">{recipe.author.name}</div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{recipe.author.bio}</p>
            </section>

            {/* Tags */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}