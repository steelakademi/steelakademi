'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart3, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Calendar,
  FileText,
  TrendingUp,
  Target,
  PieChart,
  ArrowRight,
  User
} from 'lucide-react'

export default function ReportsPage() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports')
        if (response.ok) {
          const data = await response.json()
          setReports(data)
        }
      } catch (error) {
        console.error('Raporlar yüklenirken hata:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const types = [
    { value: 'all', label: 'Tümü' },
    { value: 'performance', label: 'Performans' },
    { value: 'training', label: 'Eğitim' },
    { value: 'sales', label: 'Satış' },
    { value: 'analytics', label: 'Analitik' }
  ]

  const filteredReports = reports.filter((report: any) => {
    const matchesType = selectedType === 'all' || report.type === selectedType
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (report.description && report.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesType && matchesSearch
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance':
        return <BarChart3 className="h-6 w-6" />
      case 'training':
        return <FileText className="h-6 w-6" />
      case 'sales':
        return <TrendingUp className="h-6 w-6" />
      case 'analytics':
        return <PieChart className="h-6 w-6" />
      default:
        return <Target className="h-6 w-6" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance':
        return 'text-blue-400'
      case 'training':
        return 'text-green-400'
      case 'sales':
        return 'text-purple-400'
      case 'analytics':
        return 'text-orange-400'
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
              <h1 className="text-3xl font-bold text-white mb-2">Raporlar</h1>
              <p className="text-steel-300">
                Performans raporları ve analitik veriler
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-steel-300">
                <BarChart3 className="h-5 w-5 text-[#C1966B]" />
                <span>Toplam Rapor: {reports.length}</span>
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
                  placeholder="Raporlarda ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-steel-700 border border-steel-600 rounded-lg text-white placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-steel-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 bg-steel-700 border border-steel-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent"
              >
                {types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reports */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          {filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report: any) => (
                <Card key={report.id} className="bg-steel-800 border-steel-700 hover:border-[#C1966B] transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-steel-700 ${getTypeColor(report.type)}`}>
                        {getTypeIcon(report.type)}
                      </div>
                      <span className={`text-xs font-medium ${getTypeColor(report.type)}`}>
                        {report.type || 'Genel'}
                      </span>
                    </div>
                    <CardTitle className="text-white text-lg line-clamp-2">
                      {report.title}
                    </CardTitle>
                    <CardDescription className="text-steel-300 line-clamp-3">
                      {report.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-steel-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-3 w-3" />
                        <span>{report.author || 'Sistem'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(report.lastUpdated)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-steel-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{report.views || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{report.downloads || 0}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          report.status === 'active' 
                            ? 'bg-green-900/20 text-green-400' 
                            : 'bg-yellow-900/20 text-yellow-400'
                        }`}>
                          {report.status === 'active' ? 'Aktif' : 'Taslak'}
                        </span>
                        <Link href={`/reports/${report.id}`}>
                          <Button variant="ghost" className="text-[#C1966B] hover:text-white">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-steel-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Rapor Bulunamadı</h3>
              <p className="text-steel-400">
                {searchQuery || selectedType !== 'all' 
                  ? 'Arama kriterlerinize uygun rapor bulunamadı.'
                  : 'Henüz rapor bulunmuyor.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 