'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Play, 
  BookOpen, 
  MessageSquare, 
  Bell, 
  BarChart3, 
  Award, 
  Clock, 
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  Star,
  ArrowRight,
  Video,
  FileText,
  HelpCircle
} from 'lucide-react'

export default function HomePage() {
  const [stats, setStats] = useState([
    { label: 'Aktif Üye', value: '0', icon: Users },
    { label: 'Video Eğitim', value: '0', icon: Play },
    { label: 'Blog Yazısı', value: '0', icon: BookOpen },
    { label: 'Başarı Oranı', value: '%0', icon: Award }
  ])

  const [recentVideos, setRecentVideos] = useState([])
  const [recentBlogs, setRecentBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // İstatistikleri getir
        const statsResponse = await fetch('/api/admin/stats')
        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats([
            { label: 'Aktif Üye', value: statsData.activeUsers?.toString() || '0', icon: Users },
            { label: 'Video Eğitim', value: statsData.totalVideos?.toString() || '0', icon: Play },
            { label: 'Blog Yazısı', value: statsData.totalBlogs?.toString() || '0', icon: BookOpen },
            { label: 'Başarı Oranı', value: '%95', icon: Award }
          ])
        }

        // Son videoları getir
        const videosResponse = await fetch('/api/videos?limit=3')
        if (videosResponse.ok) {
          const videosData = await videosResponse.json()
          setRecentVideos(videosData.slice(0, 3))
        }

        // Son blog yazılarını getir
        const blogsResponse = await fetch('/api/blog?limit=3')
        if (blogsResponse.ok) {
          const blogsData = await blogsResponse.json()
          setRecentBlogs(blogsData.slice(0, 3))
        }
      } catch (error) {
        console.error('Veri yükleme hatası:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const features = [
    {
      icon: Video,
      title: 'Video Eğitimler',
      description: 'Uzman eğitmenler tarafından hazırlanan video eğitimler ile kendinizi geliştirin.',
      href: '/videos'
    },
    {
      icon: FileText,
      title: 'Blog Yazıları',
      description: 'Sektör haberleri, teknoloji ve ipuçları ile güncel kalın.',
      href: '/blog'
    },
    {
      icon: HelpCircle,
      title: 'Soru-Cevap',
      description: 'Uzmanlara sorularınızı sorun ve hızlı yanıtlar alın.',
      href: '/questions'
    },
    {
      icon: Bell,
      title: 'Duyurular',
      description: 'Şirket duyurularını takip edin ve güncel kalın.',
      href: '/announcements'
    }
  ]

  const quickActions = [
    {
      title: 'Video İzle',
      description: 'Yeni video eğitimlerini keşfedin',
      icon: Play,
      href: '/videos',
      color: 'bg-blue-500'
    },
    {
      title: 'Blog Oku',
      description: 'Güncel blog yazılarını okuyun',
      icon: BookOpen,
      href: '/blog',
      color: 'bg-green-500'
    },
    {
      title: 'Soru Sor',
      description: 'Uzmanlara sorularınızı sorun',
      icon: MessageSquare,
      href: '/questions',
      color: 'bg-purple-500'
    },
    {
      title: 'Duyurular',
      description: 'Şirket duyurularını takip edin',
      icon: Bell,
      href: '/announcements',
      color: 'bg-orange-500'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-steel-900 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-steel-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-steel-800 to-steel-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Steel Akademi'ye Hoş Geldiniz
          </h1>
          <p className="text-xl text-steel-300 mb-8 max-w-3xl mx-auto">
            Şirket şubelerine özel eğitim platformu. Video eğitimler, blog yazıları, 
            soru-cevap sistemi ve daha fazlası ile kendinizi geliştirin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/videos">
              <Button size="lg" className="bg-[#C1966B] hover:bg-[#B08A5F] text-black">
                <Play className="mr-2 h-5 w-5" />
                Video Eğitimleri İzle
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="border-steel-600 text-white hover:bg-steel-700">
                Ücretsiz Üye Ol
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-steel-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-lg bg-steel-700">
                    <stat.icon className="h-8 w-8 text-[#C1966B]" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-steel-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Platform Özellikleri</h2>
            <p className="text-steel-300 max-w-2xl mx-auto">
              Steel Akademi ile eğitim ve gelişim süreçlerinizi kolaylaştırın
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-steel-800 border-steel-700 hover:border-[#C1966B] transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="p-3 rounded-lg bg-steel-700">
                      <feature.icon className="h-8 w-8 text-[#C1966B]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-steel-300 mb-4">{feature.description}</p>
                  <Link href={feature.href}>
                    <Button variant="ghost" className="text-[#C1966B] hover:text-white p-0">
                      Detayları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Content Section */}
      <div className="py-16 bg-steel-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent Videos */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Son Video Eğitimler</h3>
                <Link href="/videos">
                  <Button variant="ghost" className="text-[#C1966B] hover:text-white">
                    Tümünü Gör
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentVideos.length > 0 ? (
                  recentVideos.map((video: any) => (
                    <Card key={video.id} className="bg-steel-700 border-steel-600">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-12 bg-steel-600 rounded flex items-center justify-center">
                            <Play className="h-6 w-6 text-[#C1966B]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{video.title}</h4>
                            <p className="text-steel-300 text-sm">{video.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Video className="h-12 w-12 text-steel-600 mx-auto mb-4" />
                    <p className="text-steel-400">Henüz video eğitimi bulunmuyor</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Blogs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Son Blog Yazıları</h3>
                <Link href="/blog">
                  <Button variant="ghost" className="text-[#C1966B] hover:text-white">
                    Tümünü Gör
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentBlogs.length > 0 ? (
                  recentBlogs.map((blog: any) => (
                    <Card key={blog.id} className="bg-steel-700 border-steel-600">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-12 bg-steel-600 rounded flex items-center justify-center">
                            <FileText className="h-6 w-6 text-[#C1966B]" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium">{blog.title}</h4>
                            <p className="text-steel-300 text-sm">{blog.excerpt}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-steel-600 mx-auto mb-4" />
                    <p className="text-steel-400">Henüz blog yazısı bulunmuyor</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Hızlı İşlemler</h2>
            <p className="text-steel-300">
              Sık kullandığınız özelliklere hızlı erişim
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="bg-steel-800 border-steel-700 hover:border-[#C1966B] transition-all hover:transform hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      <action.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{action.title}</h3>
                    <p className="text-steel-300">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-steel-800 to-steel-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-steel-300 mb-8 max-w-2xl mx-auto">
            Steel Akademi'ye üye olun ve eğitim süreçlerinizi hızlandırın. 
            Video eğitimler, blog yazıları ve daha fazlası sizi bekliyor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-[#C1966B] hover:bg-[#B08A5F] text-black">
                Ücretsiz Üye Ol
              </Button>
            </Link>
            <Link href="/videos">
              <Button size="lg" variant="outline" className="border-steel-600 text-white hover:bg-steel-700">
                Eğitimleri Keşfet
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 