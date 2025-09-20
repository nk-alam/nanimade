"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { formatDate } from "@/lib/utils"

// Mock blog data - replace with real data from Supabase
const blogPosts = [
  {
    id: "1",
    title: "Traditional Mango Pickle Recipe: A Step-by-Step Guide",
    slug: "traditional-mango-pickle-recipe",
    excerpt: "Learn how to make authentic Malda-style mango pickle at home with our traditional family recipe that has been passed down for generations.",
    content: "",
    featured_image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
    author: {
      name: "Grandmother Nani",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    },
    category: "Recipes",
    tags: ["mango pickle", "traditional", "recipe", "malda"],
    published_at: new Date("2024-01-15"),
    read_time: 8
  },
  {
    id: "2",
    title: "Health Benefits of Fermented Pickles: Why They're Good for You",
    slug: "health-benefits-fermented-pickles",
    excerpt: "Discover the amazing health benefits of fermented pickles and how they can boost your digestive health and overall wellbeing.",
    content: "",
    featured_image: "https://images.unsplash.com/photo-1609501676725-7186f529ada5?w=600&q=80",
    author: {
      name: "Dr. Nutritionist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face"
    },
    category: "Health",
    tags: ["health", "fermentation", "probiotics", "nutrition"],
    published_at: new Date("2024-01-10"),
    read_time: 6
  },
  {
    id: "3",
    title: "The Art of Mango Selection: How We Choose the Best Mangoes",
    slug: "art-of-mango-selection",
    excerpt: "Go behind the scenes to learn about our rigorous mango selection process and what makes Malda mangoes so special for pickle making.",
    content: "",
    featured_image: "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=600&q=80",
    author: {
      name: "Farmers Team",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
    },
    category: "Process",
    tags: ["mangoes", "selection", "quality", "malda"],
    published_at: new Date("2024-01-05"),
    read_time: 10
  }
]

interface BlogCardProps {
  post: typeof blogPosts[0]
  index: number
}

function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
        {/* Featured Image */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
          
          {/* Read Time */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            <Clock className="h-3 w-3 inline mr-1" />
            {post.read_time} min read
          </div>
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-gray-600 line-clamp-3">
            {post.excerpt}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
          
          {/* Meta Info */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{post.author.name}</div>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(post.published_at)}
                </div>
              </div>
            </div>
            
            <Link href={`/blog/${post.slug}`}>
              <Button variant="ghost" size="sm" className="group/btn">
                Read More
                <ArrowRight className="h-3 w-3 ml-1 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function BlogSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Recipes & Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of traditional recipes, health tips, and stories 
            from the heart of Malda's pickle-making heritage.
          </p>
        </motion.div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Card className="overflow-hidden shadow-xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-square md:aspect-auto">
                  <Image
                    src={blogPosts[0].featured_image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-600 text-white px-3 py-2 rounded-full text-sm font-medium">
                      Featured Recipe
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded">
                        {blogPosts[0].category}
                      </span>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {blogPosts[0].read_time} min read
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {blogPosts[0].title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {blogPosts[0].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image
                            src={blogPosts[0].author.avatar}
                            alt={blogPosts[0].author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{blogPosts[0].author.name}</div>
                          <div className="text-sm text-gray-500">
                            {formatDate(blogPosts[0].published_at)}
                          </div>
                        </div>
                      </div>
                      
                      <Link href={`/blog/${blogPosts[0].slug}`}>
                        <Button className="bg-orange-600 hover:bg-orange-700">
                          Read Recipe
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Blog Grid */}
        {blogPosts.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {blogPosts.slice(1).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want More Recipes & Tips?
          </h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive recipes, cooking tips, 
            and stories from our kitchen to yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog">
              <Button variant="outline" size="lg" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                View All Recipes
              </Button>
            </Link>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Subscribe to Newsletter
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}