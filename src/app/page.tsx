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
            <a href="/videos" className="bg-[#C1966B] hover:bg-[#B08A5F] text-black px-6 py-3 rounded-lg font-medium">
              Video Eğitimleri İzle
            </a>
            <a href="/auth/register" className="border border-steel-600 text-white hover:bg-steel-700 px-6 py-3 rounded-lg font-medium">
              Ücretsiz Üye Ol
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-steel-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">0</div>
              <div className="text-steel-300">Aktif Üye</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">0</div>
              <div className="text-steel-300">Video Eğitim</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">0</div>
              <div className="text-steel-300">Blog Yazısı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">%95</div>
              <div className="text-steel-300">Başarı Oranı</div>
            </div>
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
            <div className="bg-steel-800 border border-steel-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Video Eğitimler</h3>
              <p className="text-steel-300">Uzman eğitmenler tarafından hazırlanan video eğitimler ile kendinizi geliştirin.</p>
            </div>
            <div className="bg-steel-800 border border-steel-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Blog Yazıları</h3>
              <p className="text-steel-300">Sektör haberleri, teknoloji ve ipuçları ile güncel kalın.</p>
            </div>
            <div className="bg-steel-800 border border-steel-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Soru-Cevap</h3>
              <p className="text-steel-300">Uzmanlara sorularınızı sorun ve hızlı yanıtlar alın.</p>
            </div>
            <div className="bg-steel-800 border border-steel-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Duyurular</h3>
              <p className="text-steel-300">Şirket duyurularını takip edin ve güncel kalın.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="py-16 bg-steel-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Hızlı Erişim</h2>
            <p className="text-steel-300">Platform özelliklerine hızlıca erişin</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a href="/videos" className="bg-blue-500 hover:bg-blue-600 p-6 rounded-lg text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Video İzle</h3>
              <p className="text-blue-100">Yeni video eğitimlerini keşfedin</p>
            </a>
            <a href="/blog" className="bg-green-500 hover:bg-green-600 p-6 rounded-lg text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Blog Oku</h3>
              <p className="text-green-100">Güncel blog yazılarını okuyun</p>
            </a>
            <a href="/questions" className="bg-purple-500 hover:bg-purple-600 p-6 rounded-lg text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Soru Sor</h3>
              <p className="text-purple-100">Uzmanlara sorularınızı sorun</p>
            </a>
            <a href="/announcements" className="bg-orange-500 hover:bg-orange-600 p-6 rounded-lg text-white text-center">
              <h3 className="text-xl font-semibold mb-2">Duyurular</h3>
              <p className="text-orange-100">Şirket duyurularını takip edin</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 