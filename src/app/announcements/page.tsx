'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Bell, 
  Search, 
  Filter, 
  User, 
  Clock, 
  Eye, 
  AlertTriangle,
  Info,
  CheckCircle,
  Calendar,
  ArrowRight
} from 'lucide-react'

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('/api/announcements')
        if (response.ok) {
          const data = await response.json()
          setAnnouncements(data)
        }
      } catch (error) {
        console.error('Duyurular yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  const categories = [
    { value: 'all', label: 'Tümü' },
    { value: 'maintenance', label: 'Bakım' },
    { value: 'training', label: 'Eğitim' },
    { value: 'event', label: 'Etkinlik' },
    { value: 'update', label: 'Güncelleme' },
    { value: 'general', label: 'Genel' }
  ]

  const filteredAnnouncements = announcements.filter((announcement: any) => {
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory
    const matchesSearch = announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (announcement.content && announcement.content.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-400" />
      case 'low':
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return <Info className="h-4 w-4 text-steel-400" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400'
      case 'medium':
        return 'text-yellow-400'
      case 'low':
        return 'text-green-400'
      default:
        return 'text-steel-400'
    }
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
              <h1 className="text-3xl font-bold text-white mb-2">Duyurular</h1>
              <p className="text-steel-300">
                Şirket duyurularını takip edin ve güncel kalın
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-steel-300">
                <Bell className="h-5 w-5 text-[#C1966B]" />
                <span>Toplam Duyuru: {announcements.length}</span>
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
                  placeholder="Duyurularda ara..."
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

      {/* Announcements */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {filteredAnnouncements.length > 0 ? (
            <div className="space-y-6">
              {filteredAnnouncements.map((announcement: any) => (
                <Card key={announcement.id} className="bg-steel-800 border-steel-700 hover:border-[#C1966B] transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Priority Indicator */}
                      <div className="flex flex-col items-center space-y-2">
                        {getPriorityIcon(announcement.priority)}
                        <div className="text-center text-sm text-steel-400">
                          <div className={`font-medium ${getPriorityColor(announcement.priority)}`}>
                            {announcement.priority === 'high' ? 'Yüksek' :
                             announcement.priority === 'medium' ? 'Orta' : 'Düşük'}
                          </div>
                          <div>öncelik</div>
                        </div>
                      </div>

                      {/* Announcement Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-[#C1966B] font-medium uppercase tracking-wide">
                              {announcement.category || 'Genel'}
                            </span>
                            {announcement.isRead ? (
                              <span className="text-xs text-green-400 font-medium">Okundu</span>
                            ) : (
                              <span className="text-xs text-yellow-400 font-medium">Yeni</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 text-steel-400 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(announcement.createdAt)}</span>
                          </div>
                        </div>

                        <Link href={`/announcements/${announcement.id}`}>
                          <h3 className="text-lg font-semibold text-white mb-2 hover:text-[#C1966B] transition-colors cursor-pointer">
                            {announcement.title}
                          </h3>
                        </Link>

                        <p className="text-steel-300 mb-4 line-clamp-3">
                          {announcement.content}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-steel-400">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{announcement.author || 'Sistem'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{announcement.views || 0}</span>
                            </div>
                            {announcement.expiryDate && (
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>Son: {formatDate(announcement.expiryDate)}</span>
                              </div>
                            )}
                          </div>

                          <Link href={`/announcements/${announcement.id}`}>
                            <Button variant="ghost" className="text-[#C1966B] hover:text-white">
                              Detayları Gör
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-steel-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Duyuru Bulunamadı</h3>
              <p className="text-steel-400">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Arama kriterlerinize uygun duyuru bulunamadı.'
                  : 'Henüz duyuru bulunmuyor.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 