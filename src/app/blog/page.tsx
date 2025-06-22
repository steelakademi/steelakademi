'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BookOpen, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Eye,
  Calendar,
  ArrowRight
} from 'lucide-react'

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (response.ok) {
          const data = await response.json()
          setBlogPosts(data)
        }
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const categories = [
    { value: 'all', label: 'Tümü' },
    { value: 'industry', label: 'Sektör' },
    { value: 'technology', label: 'Teknoloji' },
    { value: 'tips', label: 'İpuçları' },
    { value: 'company', label: 'Şirket' }
  ]

  const filteredPosts = blogPosts.filter((post: any) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-steel-900 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-steel-900">
      {/* Header */}
      <div className="bg-steel-800 border-b border-steel-700 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Blog Yazıları</h1>
              <p className="text-steel-300">
                Sektör haberleri, teknoloji ve ipuçları
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-steel-300">
                <BookOpen className="h-5 w-5 text-[#C1966B]" />
                <span>Toplam Yazı: {blogPosts.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="py-6 bg-steel-800 border-b border-steel-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-steel-400" />
                <input
                  type="text"
                  placeholder="Blog yazılarında ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-steel-700 border border-steel-600 rounded-lg text-white placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-steel-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-steel-700 border border-steel-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post: any) => (
                <Card key={post.id} className="bg-steel-800 border-steel-700 hover:border-[#C1966B] transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#C1966B] font-medium uppercase tracking-wide">
                        {post.category || 'Genel'}
                      </span>
                      <div className="flex items-center space-x-2 text-steel-400 text-sm">
                        <Clock className="h-3 w-3" />
                        <span>5 dk</span>
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-steel-300 mb-4 line-clamp-3">
                      {post.excerpt || post.content?.substring(0, 150) + '...'}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm text-steel-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span>{post.author?.name || 'Anonim'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>

                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" className="text-[#C1966B] hover:text-white p-0">
                        Devamını Oku
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-steel-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Blog Yazısı Bulunamadı</h3>
              <p className="text-steel-400">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Arama kriterlerinize uygun blog yazısı bulunamadı.'
                  : 'Henüz blog yazısı bulunmuyor.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 