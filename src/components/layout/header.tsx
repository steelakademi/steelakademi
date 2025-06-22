'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  BookOpen, 
  Video, 
  MessageSquare, 
  Bell, 
  BarChart3,
  FileText,
  HelpCircle,
  Search,
  ShoppingCart,
  Heart
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useNotifications } from '@/hooks/useNotifications'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, isAuthenticated, logout } = useAuth()
  const { notifications, unreadCount, markAsRead } = useNotifications()

  const navigation = [
    { name: 'Ana Sayfa', href: '/', icon: null },
    { name: 'Videolar', href: '/videos', icon: Video },
    { name: 'Blog', href: '/blog', icon: FileText },
    { name: 'Soru-Cevap', href: '/questions', icon: HelpCircle },
    { name: 'Duyurular', href: '/announcements', icon: Bell },
    { name: 'Raporlar', href: '/reports', icon: BarChart3 },
    { name: 'İletişim', href: '/contact', icon: MessageSquare },
  ]

  const userMenuItems = [
    { name: 'Profil', href: '/profile', icon: User },
    { name: 'Ayarlar', href: '/settings', icon: Settings },
    { name: 'Çıkış Yap', action: logout, icon: LogOut },
  ]

  // Admin kullanıcıları için farklı menü öğeleri
  const adminMenuItems = [
    { name: 'Admin Panel', href: '/admin', icon: Settings },
    { name: 'Profil', href: '/profile', icon: User },
    { name: 'Ayarlar', href: '/settings', icon: Settings },
    { name: 'Çıkış Yap', action: logout, icon: LogOut },
  ]

  // Kullanıcı rolüne göre menü öğelerini seç
  const currentUserMenuItems = user?.role === 'ADMIN' ? adminMenuItems : userMenuItems

  if (isAuthenticated && user?.role === 'ADMIN') {
    navigation.push({ name: 'Admin', href: '/admin', icon: Settings })
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Az önce'
    if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} saat önce`
    return `${Math.floor(diffInMinutes / 1440)} gün önce`
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality will be implemented later
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="bg-steel-800 border-b border-steel-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Sol taraf */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Steel Akademi Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Search Bar - Orta */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-steel-400" />
                <input
                  type="text"
                  placeholder="Kurs, video veya blog ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-steel-700 border border-steel-600 rounded-lg text-white placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Right Side - User Menu / Auth Buttons */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <>
                {/* Favorites */}
                <button className="p-2 text-steel-300 hover:text-white transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </button>

                {/* Cart */}
                <button className="p-2 text-steel-300 hover:text-white transition-colors duration-200">
                  <ShoppingCart className="h-5 w-5" />
                </button>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
                    className="relative p-2 text-steel-300 hover:text-white transition-colors duration-200"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {isNotificationMenuOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-steel-700 rounded-lg shadow-lg border border-steel-600 max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-steel-600">
                        <h3 className="text-white font-semibold">Bildirimler</h3>
                      </div>
                      <div className="py-1">
                        {notifications.length === 0 ? (
                          <div className="px-4 py-3 text-steel-400 text-sm">
                            Bildirim bulunmuyor
                          </div>
                        ) : (
                          notifications.slice(0, 10).map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-steel-600 transition-colors duration-200 cursor-pointer ${
                                !notification.isRead ? 'bg-steel-600/50' : ''
                              }`}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  !notification.isRead ? 'bg-[#C1966B]' : 'bg-steel-500'
                                }`} />
                                <div className="flex-1">
                                  <div className="text-white text-sm font-medium">
                                    {notification.title}
                                  </div>
                                  <div className="text-steel-300 text-xs mt-1">
                                    {notification.message}
                                  </div>
                                  <div className="text-steel-400 text-xs mt-2">
                                    {formatTimeAgo(notification.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-steel-300 hover:text-white transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-[#C1966B] rounded-full flex items-center justify-center">
                      <span className="text-black font-bold text-sm">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium">
                      {user?.name || 'Kullanıcı'}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-steel-700 rounded-lg shadow-lg border border-steel-600">
                      <div className="py-1">
                        {currentUserMenuItems.map((item) => (
                          <div key={item.name}>
                            {item.action ? (
                              <button
                                onClick={item.action}
                                className="w-full flex items-center px-4 py-2 text-sm text-steel-300 hover:bg-steel-600 hover:text-white transition-colors duration-200"
                              >
                                {item.icon && <item.icon className="h-4 w-4 mr-3" />}
                                {item.name}
                              </button>
                            ) : (
                              <Link
                                href={item.href!}
                                className="flex items-center px-4 py-2 text-sm text-steel-300 hover:bg-steel-600 hover:text-white transition-colors duration-200"
                              >
                                {item.icon && <item.icon className="h-4 w-4 mr-3" />}
                                {item.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-steel-300 hover:text-white">
                    Giriş Yap
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-[#C1966B] hover:bg-[#B08A5F] text-black">
                    Üye Ol
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-steel-300 hover:text-white hover:bg-steel-700 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar & Navigation */}
        <div className="md:hidden border-t border-steel-700">
          <div className="py-3">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-steel-400" />
                <input
                  type="text"
                  placeholder="Kurs, video veya blog ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-steel-700 border border-steel-600 rounded-lg text-white placeholder-steel-400 focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {isMenuOpen && (
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-steel-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 