import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  HeartIcon,
  MapPinIcon,
  UserGroupIcon,
  TruckIcon,
  ShieldCheckIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import Layout from '@/components/Layout'

const About = () => {
  const values = [
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: "Made with Love",
      description: "Every jar is crafted with care using traditional family recipes passed down through generations."
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "100% Natural",
      description: "We use only the finest natural ingredients with no artificial preservatives or chemicals."
    },
    {
      icon: <MapPinIcon className="h-8 w-8" />,
      title: "From Malda",
      description: "Sourced directly from the mango orchards of Malda, known as the mango capital of India."
    },
    {
      icon: <UserGroupIcon className="h-8 w-8" />,
      title: "Family Tradition",
      description: "Our recipes have been perfected over decades by our grandmother (Nani) and her family."
    }
  ]

  const timeline = [
    {
      year: "1960s",
      title: "The Beginning",
      description: "Our grandmother started making pickles for family and friends in her small kitchen in Malda."
    },
    {
      year: "1980s",
      title: "Local Recognition",
      description: "Word spread about our authentic flavors, and we began selling at local markets."
    },
    {
      year: "2000s",
      title: "Expanding Reach",
      description: "We started supplying to stores across West Bengal, maintaining our traditional methods."
    },
    {
      year: "2020",
      title: "Going Digital",
      description: "Launched NaniMade to bring our authentic pickles to customers across India."
    }
  ]

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      description: "Third-generation pickle maker carrying forward the family tradition."
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg",
      description: "Ensures every jar meets our quality standards and reaches you fresh."
    },
    {
      name: "Amit Das",
      role: "Quality Manager",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      description: "Oversees the entire production process to maintain authenticity."
    }
  ]

  return (
    <Layout 
      title="Our Story - Authentic Pickles from Malda"
      description="Learn about NaniMade's journey from a small kitchen in Malda to bringing authentic handmade pickles to your doorstep. Discover our family tradition and values."
      keywords="about nanimade, malda pickles, authentic pickle story, family tradition, handmade pickles"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Our Story Begins with
              <span className="text-orange-600 block">Nani's Kitchen</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed"
            >
              From the mango orchards of Malda to your dining table, every jar of NaniMade pickle 
              carries the love, tradition, and authentic flavors that have been perfected over generations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-orange-600 text-white text-lg font-semibold rounded-full hover:bg-orange-700 transition-colors"
              >
                Shop Our Pickles
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-orange-600 text-orange-600 text-lg font-semibold rounded-full hover:bg-orange-600 hover:text-white transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  The Heart of Malda in Every Jar
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    NaniMade was born from a simple yet profound love for authentic flavors. 
                    Our journey began in the 1960s when our grandmother (Nani) started making 
                    pickles in her small kitchen in Malda, West Bengal.
                  </p>
                  <p>
                    Malda, known as the mango capital of India, provided the perfect setting 
                    for our pickle-making tradition. The region's unique climate and soil 
                    produce some of the world's finest mangoes, which form the heart of our recipes.
                  </p>
                  <p>
                    What started as a family tradition has now grown into a mission to bring 
                    authentic, handmade pickles to food lovers across India. Every jar is 
                    still made using the same traditional methods and secret recipes that 
                    our Nani perfected over decades.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                    alt="Traditional pickle making"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-orange-600 text-white p-6 rounded-xl shadow-lg">
                  <div className="text-3xl font-bold">60+</div>
                  <div className="text-sm">Years of Tradition</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Our Values & Commitment
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600"
              >
                What makes NaniMade special
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-orange-600">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Our Journey Through Time
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600"
              >
                From humble beginnings to nationwide delivery
              </motion.p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-md border border-orange-100">
                      <div className="text-orange-600 font-bold text-lg mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white shadow-md"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Meet Our Team
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600"
              >
                The people behind your favorite pickles
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <div className="text-orange-600 font-medium mb-3">
                      {member.role}
                    </div>
                    <p className="text-gray-600">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Taste the Tradition?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-orange-100 mb-8"
            >
              Experience the authentic flavors of Malda with our handmade pickles. 
              Each jar is a testament to our family's dedication to quality and tradition.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 text-lg font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About