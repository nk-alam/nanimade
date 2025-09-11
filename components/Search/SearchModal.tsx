import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition, Combobox } from '@headlessui/react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Product } from '@/types'
import { motion } from 'framer-motion'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const searchProducts = async () => {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('products')
          .select(`
            id,
            name,
            slug,
            price,
            compare_price,
            images,
            short_description,
            category:categories(name)
          `)
          .eq('is_active', true)
          .or(`name.ilike.%${query}%,short_description.ilike.%${query}%`)
          .limit(10)

        if (error) throw error
        setResults(data || [])
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSelect = (product: Product) => {
    router.push(`/products/${product.slug}`)
    onClose()
    setQuery('')
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox onChange={handleSelect}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search products..."
                    onChange={(event) => setQuery(event.target.value)}
                    value={query}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-500"
                    onClick={onClose}
                  >
                    <XMarkIcon aria-hidden="true" />
                  </button>
                </div>

                {(query || results.length > 0) && (
                  <Combobox.Options className="max-h-80 scroll-py-2 divide-y divide-gray-100 overflow-y-auto">
                    {isLoading ? (
                      <div className="px-6 py-14 text-center text-sm text-gray-500">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                        <p className="mt-2">Searching...</p>
                      </div>
                    ) : results.length === 0 && query ? (
                      <div className="px-6 py-14 text-center text-sm text-gray-500">
                        <MagnifyingGlassIcon className="mx-auto h-6 w-6 text-gray-400" />
                        <p className="mt-2">No products found for "{query}"</p>
                      </div>
                    ) : (
                      <div className="p-2">
                        {results.map((product) => (
                          <Combobox.Option
                            key={product.id}
                            value={product}
                            className={({ active }) =>
                              `relative cursor-pointer select-none rounded-md px-3 py-2 ${
                                active ? 'bg-primary-50 text-primary-900' : 'text-gray-900'
                              }`
                            }
                          >
                            {({ active }) => (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center space-x-3"
                              >
                                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md">
                                  <Image
                                    src={product.images[0] || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'}
                                    alt={product.name}
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-sm font-medium ${active ? 'text-primary-900' : 'text-gray-900'}`}>
                                    {product.name}
                                  </p>
                                  <p className={`text-sm ${active ? 'text-primary-700' : 'text-gray-500'}`}>
                                    ₹{product.price}
                                    {product.compare_price && product.compare_price > product.price && (
                                      <span className="ml-2 line-through text-gray-400">
                                        ₹{product.compare_price}
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </Combobox.Option>
                        ))}
                      </div>
                    )}
                  </Combobox.Options>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SearchModal