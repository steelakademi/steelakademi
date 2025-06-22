'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  User, 
  Mail, 
  Building, 
  TrendingUp, 
  Award, 
  Clock, 
  Edit, 
  Save,
  X,
  Shield,
  Calendar,
  MapPin
} from 'lucide-react'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    branch: user?.branch || '',
    salesSource: user?.salesSource || ''
  })

  const handleSave = async () => {
    // TODO: Implement profile update API
    console.log('Profile update:', formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      branch: user?.branch || '',
      salesSource: user?.salesSource || ''
    })
    setIsEditing(false)
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
      title: 'Seviye',
      value: Math.floor((user?.points || 0) / 100) + 1,
      icon: Shield,
      color: 'text-blue-400',
      description: 'Mevcut seviyeniz'
    },
    {
      title: 'Üyelik',
      value: 'Aktif',
      icon: Calendar,
      color: 'text-green-400',
      description: 'Üyelik durumunuz'
    },
    {
      title: 'Şube',
      value: user?.branch || 'Belirtilmemiş',
      icon: MapPin,
      color: 'text-purple-400',
      description: 'Çalıştığınız şube'
    }
  ]

  const recentAchievements = [
    {
      title: 'İlk Adım',
      description: 'İlk video eğitimini tamamladın',
      date: '2 gün önce',
      points: 50
    },
    {
      title: 'Blog Okuyucu',
      description: '10 blog yazısı okudun',
      date: '1 hafta önce',
      points: 100
    },
    {
      title: 'Soru Sorgu',
      description: 'İlk sorunu sordun',
      date: '2 hafta önce',
      points: 25
    }
  ]

  return (
    <div className="min-h-screen bg-steel-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profil</h1>
          <p className="text-steel-300">
            Hesap bilgilerinizi görüntüleyin ve düzenleyin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card className="bg-steel-800 border-steel-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Kişisel Bilgiler</CardTitle>
                    <CardDescription className="text-steel-300">
                      Hesap bilgilerinizi güncelleyin
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-[#C1966B] text-[#C1966B] hover:bg-[#C1966B] hover:text-black"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Düzenle
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSave}
                        className="bg-[#C1966B] hover:bg-[#B08A5F] text-black"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Kaydet
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        <X className="h-4 w-4 mr-2" />
                        İptal
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-steel-300 mb-2">
                      Ad Soyad
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 border border-steel-600 rounded-lg bg-steel-700 text-white focus:outline-none focus:ring-2 focus:ring-[#C1966B]"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-steel-700 rounded-lg">
                        <User className="h-5 w-5 text-[#C1966B]" />
                        <span className="text-white">{user?.name || 'Belirtilmemiş'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-steel-300 mb-2">
                      E-posta
                    </label>
                    <div className="flex items-center space-x-3 p-3 bg-steel-700 rounded-lg">
                      <Mail className="h-5 w-5 text-[#C1966B]" />
                      <span className="text-white">{user?.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-steel-300 mb-2">
                      Şube
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.branch}
                        onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                        className="w-full p-3 border border-steel-600 rounded-lg bg-steel-700 text-white focus:outline-none focus:ring-2 focus:ring-[#C1966B]"
                      >
                        <option value="">Şube seçin</option>
                        <option value="İstanbul Merkez">İstanbul Merkez</option>
                        <option value="Ankara Şube">Ankara Şube</option>
                        <option value="İzmir Şube">İzmir Şube</option>
                        <option value="Bursa Şube">Bursa Şube</option>
                        <option value="Antalya Şube">Antalya Şube</option>
                        <option value="Adana Şube">Adana Şube</option>
                      </select>
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-steel-700 rounded-lg">
                        <Building className="h-5 w-5 text-[#C1966B]" />
                        <span className="text-white">{user?.branch || 'Belirtilmemiş'}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-steel-300 mb-2">
                      Satış Kaynağı
                    </label>
                    {isEditing ? (
                      <select
                        value={formData.salesSource}
                        onChange={(e) => setFormData({ ...formData, salesSource: e.target.value })}
                        className="w-full p-3 border border-steel-600 rounded-lg bg-steel-700 text-white focus:outline-none focus:ring-2 focus:ring-[#C1966B]"
                      >
                        <option value="">Kaynak seçin</option>
                        <option value="Web Sitesi">Web Sitesi</option>
                        <option value="Sosyal Medya">Sosyal Medya</option>
                        <option value="Referans">Referans</option>
                        <option value="Reklam">Reklam</option>
                        <option value="Fuar">Fuar</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                    ) : (
                      <div className="flex items-center space-x-3 p-3 bg-steel-700 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-[#C1966B]" />
                        <span className="text-white">{user?.salesSource || 'Belirtilmemiş'}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-steel-300 mb-2">
                    Rol
                  </label>
                  <div className="flex items-center space-x-3 p-3 bg-steel-700 rounded-lg">
                    <Shield className="h-5 w-5 text-[#C1966B]" />
                    <span className="text-white capitalize">
                      {user?.role === 'ADMIN' ? 'Yönetici' : 
                       user?.role === 'MODERATOR' ? 'Moderatör' : 'Üye'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Achievements */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="bg-steel-800 border-steel-700">
              <CardHeader>
                <CardTitle className="text-white">İstatistikler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-steel-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      <div>
                        <div className="text-sm font-medium text-white">{stat.title}</div>
                        <div className="text-xs text-steel-400">{stat.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-steel-800 border-steel-700">
              <CardHeader>
                <CardTitle className="text-white">Son Başarılar</CardTitle>
                <CardDescription className="text-steel-300">
                  Kazandığınız son rozetler
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="p-3 bg-steel-700 rounded-lg border border-[#C1966B]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-white">{achievement.title}</div>
                      <div className="text-sm text-[#C1966B] font-medium">+{achievement.points} puan</div>
                    </div>
                    <div className="text-sm text-steel-300 mb-1">{achievement.description}</div>
                    <div className="text-xs text-steel-400">{achievement.date}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 