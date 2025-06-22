'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  Star
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { isAuthenticated, user, status } = useAuth()
  const router = useRouter()

  // Eğer kullanıcı giriş yapmamışsa ana sayfaya yönlendir
  useEffect(() => {
    if (status === 'loading') return
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, status, router])

  // Eğer kullanıcı admin ise admin paneline yönlendir
  useEffect(() => {
    if (status === 'loading') return
    if (isAuthenticated && user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [isAuthenticated, user, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-steel-900 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Admin kullanıcıları için yönlendirme sırasında loading göster
  if (user?.role === 'ADMIN') {
    return (
      <div className="min-h-screen bg-steel-900 flex items-center justify-center">
        <div className="text-white">Admin paneline yönlendiriliyor...</div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Toplam Puan',
      value: user?.points || 0,
      icon: Award,
      color: 'text-yellow-400',
      description: 'Kazandığınız toplam puan'
    },
    {
      title: 'İzlenen Video',
      value: '12',
      icon: Play,
      color: 'text-blue-400',
      description: 'Bu ay izlediğiniz video sayısı'
    },
    {
      title: 'Okunan Blog',
      value: '8',
      icon: BookOpen,
      color: 'text-green-400',
      description: 'Bu ay okuduğunuz blog sayısı'
    },
    {
      title: 'Aktif Gün',
      value: '15',
      icon: Clock,
      color: 'text-purple-400',
      description: 'Bu ay aktif olduğunuz gün sayısı'
    }
  ]

  const recentActivities = [
    {
      type: 'video',
      title: 'Çelik Üretim Teknikleri',
      description: 'Video izleme tamamlandı',
      points: 50,
      time: '2 saat önce',
      icon: Play
    },
    {
      type: 'blog',
      title: 'Sürdürülebilir Çelik Üretimi',
      description: 'Blog yazısı okundu',
      points: 25,
      time: '1 gün önce',
      icon: BookOpen
    },
    {
      type: 'question',
      title: 'Paslanmaz Çelik Özellikleri',
      description: 'Soru soruldu',
      points: 10,
      time: '2 gün önce',
      icon: MessageSquare
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

  const achievements = [
    {
      title: 'İlk Adım',
      description: 'İlk video eğitimini tamamladın',
      icon: CheckCircle,
      achieved: true,
      color: 'text-green-400'
    },
    {
      title: 'Blog Okuyucu',
      description: '10 blog yazısı okudun',
      icon: BookOpen,
      achieved: true,
      color: 'text-blue-400'
    },
    {
      title: 'Soru Sorgu',
      description: 'İlk sorunu sordun',
      icon: MessageSquare,
      achieved: true,
      color: 'text-purple-400'
    },
    {
      title: 'Puan Avcısı',
      description: '1000 puan topladın',
      icon: Award,
      achieved: false,
      color: 'text-gray-400'
    }
  ]

  return (
    <div className="min-h-screen bg-steel-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hoş geldin, {user?.name || 'Kullanıcı'}!
          </h1>
          <p className="text-steel-300">
            Steel Akademi'de öğrenmeye devam edin ve puanlarınızı artırın.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-steel-800 border-steel-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-steel-300">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-steel-400 mt-1">{stat.description}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-steel-700`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="bg-steel-800 border-steel-700">
              <CardHeader>
                <CardTitle className="text-white">Hızlı İşlemler</CardTitle>
                <CardDescription className="text-steel-300">
                  Sık kullandığınız özelliklere hızlı erişim
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Button variant="ghost" className="w-full justify-start p-4 h-auto bg-steel-700 hover:bg-steel-600">
                      <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                        <action.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-white">{action.title}</div>
                        <div className="text-sm text-steel-300">{action.description}</div>
                      </div>
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card className="bg-steel-800 border-steel-700">
              <CardHeader>
                <CardTitle className="text-white">Son Aktiviteler</CardTitle>
                <CardDescription className="text-steel-300">
                  Son yaptığınız işlemler ve kazandığınız puanlar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-steel-700">
                      <div className="p-2 rounded-lg bg-steel-600">
                        <activity.icon className="h-5 w-5 text-[#C1966B]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{activity.title}</div>
                        <div className="text-sm text-steel-300">{activity.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-[#C1966B]">+{activity.points} puan</div>
                        <div className="text-xs text-steel-400">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8">
          <Card className="bg-steel-800 border-steel-700">
            <CardHeader>
              <CardTitle className="text-white">Başarılar</CardTitle>
              <CardDescription className="text-steel-300">
                Kazandığınız rozetler ve başarılar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${achievement.achieved ? 'border-[#C1966B] bg-steel-700' : 'border-steel-600 bg-steel-700/50'}`}>
                    <div className="flex items-center space-x-3">
                      <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                      <div>
                        <div className={`font-medium ${achievement.achieved ? 'text-white' : 'text-steel-400'}`}>
                          {achievement.title}
                        </div>
                        <div className="text-sm text-steel-400">{achievement.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 