'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Play, 
  Clock, 
  User, 
  Eye, 
  Star, 
  Filter, 
  Search,
  Award,
  ArrowRight
} from 'lucide-react'

export default function VideosPage() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos')
        if (response.ok) {
          const data = await response.json()
          setVideos(data)
        }
      } catch (error) {
        console.error('Videolar yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [])

  const categories = [
    { value: 'all', label: 'Tümü' },
    { value: 'sales', label: 'Satış' },
    { value: 'product', label: 'Ürün' },
    { value: 'customer', label: 'Müşteri' },
    { value: 'technical', label: 'Teknik' }
  ]

  const filteredVideos = videos.filter((video: any) => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (video.description && video.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatDuration = (seconds: number) => {
    if (!seconds) return '00:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
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
              <h1 className="text-3xl font-bold text-white mb-2">Video Eğitimler</h1>
              <p className="text-steel-300">
                Uzman eğitmenler tarafından hazırlanan video eğitimler
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-steel-300">
                <Play className="h-5 w-5 text-[#C1966B]" />
                <span>Toplam Video: {videos.length}</span>
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
                  placeholder="Video eğitimlerinde ara..."
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

      {/* Videos */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video: any) => (
                <Card key={video.id} className="bg-steel-800 border-steel-700 hover:border-[#C1966B] transition-colors">
                  <div className="relative">
                    <div className="aspect-video bg-steel-700 rounded-t-lg flex items-center justify-center">
                      <Play className="h-12 w-12 text-[#C1966B]" />
                    </div>
                    <div className="absolute top-2 left-2 bg-[#C1966B] text-black px-2 py-1 rounded text-sm font-medium">
                      {video.category || 'Genel'}
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {formatDuration(video.duration)}
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white text-lg line-clamp-2">
                      {video.title}
                    </CardTitle>
                    <CardDescription className="text-steel-300 line-clamp-2">
                      {video.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-steel-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span>{video.instructor || 'Anonim'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-3 w-3" />
                        <span>{video.views || 0}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-[#C1966B]" />
                        <span className="text-[#C1966B] font-medium">{video.points || 0} puan</span>
                      </div>
                      <Link href={`/videos/${video.id}`}>
                        <Button className="bg-[#C1966B] hover:bg-[#B08A5F] text-black">
                          <Play className="mr-2 h-4 w-4" />
                          İzle
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Play className="h-16 w-16 text-steel-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Video Bulunamadı</h3>
              <p className="text-steel-400">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Arama kriterlerinize uygun video bulunamadı.'
                  : 'Henüz video eğitimi bulunmuyor.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 