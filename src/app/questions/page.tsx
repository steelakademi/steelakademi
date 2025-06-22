'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MessageSquare, 
  Search, 
  Filter, 
  User, 
  Clock, 
  Eye, 
  ThumbsUp,
  CheckCircle,
  Plus,
  ArrowRight
} from 'lucide-react'

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions')
        if (response.ok) {
          const data = await response.json()
          setQuestions(data)
        }
      } catch (error) {
        console.error('Sorular yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const categories = [
    { value: 'all', label: 'Tümü' },
    { value: 'technical', label: 'Teknik' },
    { value: 'sales', label: 'Satış' },
    { value: 'product', label: 'Ürün' },
    { value: 'general', label: 'Genel' }
  ]

  const filteredQuestions = questions.filter((question: any) => {
    const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory
    const matchesSearch = question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (question.content && question.content.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered':
        return 'text-green-400'
      case 'open':
        return 'text-yellow-400'
      case 'closed':
        return 'text-red-400'
      default:
        return 'text-steel-400'
    }
  }

  const getStatusText = (question: any) => {
    if (question.answers && question.answers.length > 0) {
      const hasAcceptedAnswer = question.answers.some((answer: any) => answer.isAccepted)
      return hasAcceptedAnswer ? 'answered' : 'open'
    }
    return 'open'
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
              <h1 className="text-3xl font-bold text-white mb-2">Soru-Cevap</h1>
              <p className="text-steel-300">
                Uzmanlara sorularınızı sorun ve hızlı yanıtlar alın
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-steel-300">
                <MessageSquare className="h-5 w-5 text-[#C1966B]" />
                <span>Toplam Soru: {questions.length}</span>
              </div>
              <Link href="/questions/new">
                <Button className="bg-[#C1966B] hover:bg-[#B08A5F] text-black">
                  <Plus className="mr-2 h-4 w-4" />
                  Soru Sor
                </Button>
              </Link>
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
                  placeholder="Sorularda ara..."
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

      {/* Questions */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {filteredQuestions.length > 0 ? (
            <div className="space-y-6">
              {filteredQuestions.map((question: any) => {
                const status = getStatusText(question)
                return (
                  <Card key={question.id} className="bg-steel-800 border-steel-700 hover:border-[#C1966B] transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Status Indicator */}
                        <div className="flex flex-col items-center space-y-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                          <div className="text-center text-sm text-steel-400">
                            <div className="font-medium">{question.answers?.length || 0}</div>
                            <div>cevap</div>
                          </div>
                        </div>

                        {/* Question Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-[#C1966B] font-medium uppercase tracking-wide">
                                {question.category || 'Genel'}
                              </span>
                              <span className={`text-xs font-medium ${getStatusColor(status)}`}>
                                {status === 'answered' ? 'Yanıtlandı' : 
                                 status === 'open' ? 'Açık' : 'Kapalı'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-steel-400 text-sm">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(question.createdAt)}</span>
                            </div>
                          </div>

                          <Link href={`/questions/${question.id}`}>
                            <h3 className="text-lg font-semibold text-white mb-2 hover:text-[#C1966B] transition-colors cursor-pointer">
                              {question.title}
                            </h3>
                          </Link>

                          <p className="text-steel-300 mb-4 line-clamp-2">
                            {question.content}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-steel-400">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{question.author?.name || 'Anonim'}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{question.views || 0}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <ThumbsUp className="h-3 w-3" />
                                <span>{question.votes || 0}</span>
                              </div>
                            </div>

                            <Link href={`/questions/${question.id}`}>
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
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-16 w-16 text-steel-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Soru Bulunamadı</h3>
              <p className="text-steel-400 mb-6">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Arama kriterlerinize uygun soru bulunamadı.'
                  : 'Henüz soru bulunmuyor.'
                }
              </p>
              <Link href="/questions/new">
                <Button className="bg-[#C1966B] hover:bg-[#B08A5F] text-black">
                  <Plus className="mr-2 h-4 w-4" />
                  İlk Soruyu Sor
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 