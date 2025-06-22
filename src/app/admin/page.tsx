'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { 
  Activity, BarChart3, Bell, BookOpen, Users, Video, MessageCircle, Settings,
  Plus, Edit, Trash2, Eye, Search, Filter, Download, Upload, Calendar, Clock,
  Award, Target, TrendingUp, UserCheck, UserX, Mail, Phone, MapPin
} from 'lucide-react'

// Dashboard Bileşeni
function DashboardTab() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVideos: 0,
    totalBlogs: 0,
    totalQuestions: 0,
    activeUsers: 0,
    totalPoints: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Stats fetch error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
        <div className="text-steel-300">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>
      
      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-steel-400 text-sm">Toplam Kullanıcı</p>
              <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
            </div>
            <Users className="h-8 w-8 text-[#C1966B]" />
          </div>
        </div>

        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-steel-400 text-sm">Toplam Video</p>
              <p className="text-3xl font-bold text-white">{stats.totalVideos}</p>
            </div>
            <Video className="h-8 w-8 text-[#C1966B]" />
          </div>
        </div>

        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-steel-400 text-sm">Toplam Blog</p>
              <p className="text-3xl font-bold text-white">{stats.totalBlogs}</p>
            </div>
            <BookOpen className="h-8 w-8 text-[#C1966B]" />
          </div>
        </div>

        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-steel-400 text-sm">Aktif Kullanıcı</p>
              <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
            </div>
            <UserCheck className="h-8 w-8 text-[#C1966B]" />
          </div>
        </div>

        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-steel-400 text-sm">Toplam Soru</p>
              <p className="text-3xl font-bold text-white">{stats.totalQuestions}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-[#C1966B]" />
          </div>
        </div>

        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-steel-400 text-sm">Toplam Puan</p>
              <p className="text-3xl font-bold text-white">{stats.totalPoints.toLocaleString()}</p>
            </div>
            <Award className="h-8 w-8 text-[#C1966B]" />
          </div>
        </div>
      </div>

      {/* Son Aktiviteler */}
      <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
        <h3 className="text-xl font-semibold text-white mb-4">Son Aktiviteler</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-steel-300">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Yeni kullanıcı kaydoldu: Ahmet Yılmaz</span>
            <span className="text-steel-500 text-sm">2 dakika önce</span>
          </div>
          <div className="flex items-center space-x-3 text-steel-300">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Yeni video eklendi: "Çelik Yapıların Temelleri"</span>
            <span className="text-steel-500 text-sm">15 dakika önce</span>
          </div>
          <div className="flex items-center space-x-3 text-steel-300">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Yeni blog yazısı: "Modern Çelik Konstrüksiyon"</span>
            <span className="text-steel-500 text-sm">1 saat önce</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Kullanıcı Yönetimi Bileşeni
function UsersTab() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [currentPage, searchTerm])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/users?page=${currentPage}&search=${searchTerm}`)
      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Users fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setCurrentPage(1)
    fetchUsers()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleUserDelete = async (userId: string) => {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          fetchUsers()
        }
      } catch (error) {
        console.error('User delete error:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Kullanıcı Yönetimi</h2>
        <div className="text-steel-300">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Kullanıcı Yönetimi</h2>
      
      {/* Arama ve Filtreler */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-steel-400" />
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-steel-700 border border-steel-600 rounded-md text-white placeholder-steel-400 focus:outline-none focus:border-[#C1966B]"
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-[#C1966B] text-black rounded-md hover:bg-[#B0855A] transition-colors"
        >
          Ara
        </button>
      </div>

      {/* Kullanıcı Listesi */}
      <div className="bg-steel-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-steel-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-300 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-300 uppercase tracking-wider">
                  E-posta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-300 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-300 uppercase tracking-wider">
                  Puan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-300 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-300 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-steel-700">
              {users.map((user: any) => (
                <tr key={user.id} className="hover:bg-steel-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-[#C1966B] rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-sm">
                          {user.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">{user.name}</div>
                        <div className="text-sm text-steel-400">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-steel-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'ADMIN' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-steel-300">
                    {user.points || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      Aktif
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-[#C1966B] hover:text-[#B0855A]">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-500 hover:text-blue-400">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleUserDelete(user.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-[#C1966B] text-black'
                  : 'bg-steel-700 text-steel-300 hover:bg-steel-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Video Yönetimi Bileşeni
function VideosTab() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchVideos()
  }, [currentPage])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/videos?page=${currentPage}`)
      if (response.ok) {
        const data = await response.json()
        setVideos(data.videos)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Videos fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleVideoDelete = async (videoId: string) => {
    if (confirm('Bu videoyu silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/videos/${videoId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          fetchVideos()
        }
      } catch (error) {
        console.error('Video delete error:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Video Yönetimi</h2>
        <div className="text-steel-300">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Video Yönetimi</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#C1966B] text-black rounded-md hover:bg-[#B0855A] transition-colors">
          <Plus className="h-4 w-4" />
          <span>Yeni Video Ekle</span>
        </button>
      </div>

      {/* Video Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video: any) => (
          <div key={video.id} className="bg-steel-800 rounded-lg overflow-hidden border border-steel-700">
            <div className="aspect-video bg-steel-700 flex items-center justify-center">
              <Video className="h-12 w-12 text-steel-500" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
              <p className="text-steel-400 text-sm mb-3">{video.description}</p>
              <div className="flex items-center justify-between text-sm text-steel-500 mb-3">
                <span>{video.duration}</span>
                <span>{video.views} görüntüleme</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-1 bg-[#C1966B] text-black rounded text-sm hover:bg-[#B0855A] transition-colors">
                  Düzenle
                </button>
                <button 
                  onClick={() => handleVideoDelete(video.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-[#C1966B] text-black'
                  : 'bg-steel-700 text-steel-300 hover:bg-steel-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Blog Yönetimi Bileşeni
function BlogsTab() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchBlogs()
  }, [currentPage])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/blogs?page=${currentPage}`)
      if (response.ok) {
        const data = await response.json()
        setBlogs(data.blogs)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Blogs fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleBlogDelete = async (blogId: string) => {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      try {
        const response = await fetch(`/api/admin/blogs/${blogId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          fetchBlogs()
        }
      } catch (error) {
        console.error('Blog delete error:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Blog Yönetimi</h2>
        <div className="text-steel-300">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Blog Yönetimi</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#C1966B] text-black rounded-md hover:bg-[#B0855A] transition-colors">
          <Plus className="h-4 w-4" />
          <span>Yeni Blog Ekle</span>
        </button>
      </div>

      {/* Blog Listesi */}
      <div className="space-y-4">
        {blogs.map((blog: any) => (
          <div key={blog.id} className="bg-steel-800 rounded-lg p-4 border border-steel-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{blog.title}</h3>
                <p className="text-steel-400 text-sm mb-3">{blog.excerpt}</p>
                <div className="flex items-center space-x-4 text-sm text-steel-500">
                  <span>{blog.author}</span>
                  <span>{blog.publishedAt}</span>
                  <span>{blog.readTime} dk okuma</span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="px-3 py-1 bg-[#C1966B] text-black rounded text-sm hover:bg-[#B0855A] transition-colors">
                  Düzenle
                </button>
                <button 
                  onClick={() => handleBlogDelete(blog.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-[#C1966B] text-black'
                  : 'bg-steel-700 text-steel-300 hover:bg-steel-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Soru-Cevap Yönetimi Bileşeni
function QuestionsTab() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchQuestions()
  }, [currentPage])

  const fetchQuestions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/questions?page=${currentPage}`)
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Questions fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Soru-Cevap Yönetimi</h2>
        <div className="text-steel-300">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Soru-Cevap Yönetimi</h2>

      {/* Soru Listesi */}
      <div className="space-y-4">
        {questions.map((question: any) => (
          <div key={question.id} className="bg-steel-800 rounded-lg p-4 border border-steel-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{question.title}</h3>
                <p className="text-steel-400 text-sm mb-3">{question.content}</p>
                <div className="flex items-center space-x-4 text-sm text-steel-500">
                  <span>{question.author}</span>
                  <span>{question.createdAt}</span>
                  <span>{question.answers?.length || 0} cevap</span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="px-3 py-1 bg-[#C1966B] text-black rounded text-sm hover:bg-[#B0855A] transition-colors">
                  Görüntüle
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-[#C1966B] text-black'
                  : 'bg-steel-700 text-steel-300 hover:bg-steel-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Duyuru Yönetimi Bileşeni
function AnnouncementsTab() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchAnnouncements()
  }, [currentPage])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/announcements?page=${currentPage}`)
      if (response.ok) {
        const data = await response.json()
        setAnnouncements(data.announcements)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Announcements fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Duyuru Yönetimi</h2>
        <div className="text-steel-300">Yükleniyor...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Duyuru Yönetimi</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#C1966B] text-black rounded-md hover:bg-[#B0855A] transition-colors">
          <Plus className="h-4 w-4" />
          <span>Yeni Duyuru Ekle</span>
        </button>
      </div>

      {/* Duyuru Listesi */}
      <div className="space-y-4">
        {announcements.map((announcement: any) => (
          <div key={announcement.id} className="bg-steel-800 rounded-lg p-4 border border-steel-700">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">{announcement.title}</h3>
                <p className="text-steel-400 text-sm mb-3">{announcement.content}</p>
                <div className="flex items-center space-x-4 text-sm text-steel-500">
                  <span>{announcement.createdAt}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    announcement.priority === 'HIGH' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="px-3 py-1 bg-[#C1966B] text-black rounded text-sm hover:bg-[#B0855A] transition-colors">
                  Düzenle
                </button>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sayfalama */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md ${
                currentPage === page
                  ? 'bg-[#C1966B] text-black'
                  : 'bg-steel-700 text-steel-300 hover:bg-steel-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Ayarlar Bileşeni
function SettingsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Sistem Ayarları</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Genel Ayarlar */}
        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <h3 className="text-lg font-semibold text-white mb-4">Genel Ayarlar</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-steel-300 mb-2">
                Site Adı
              </label>
              <input
                type="text"
                defaultValue="Steel Akademi"
                className="w-full px-3 py-2 bg-steel-700 border border-steel-600 rounded-md text-white focus:outline-none focus:border-[#C1966B]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-steel-300 mb-2">
                Site Açıklaması
              </label>
              <textarea
                rows={3}
                defaultValue="Çelik yapılar ve konstrüksiyon eğitim platformu"
                className="w-full px-3 py-2 bg-steel-700 border border-steel-600 rounded-md text-white focus:outline-none focus:border-[#C1966B]"
              />
            </div>
            <button className="w-full px-4 py-2 bg-[#C1966B] text-black rounded-md hover:bg-[#B0855A] transition-colors">
              Ayarları Kaydet
            </button>
          </div>
        </div>

        {/* E-posta Ayarları */}
        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <h3 className="text-lg font-semibold text-white mb-4">E-posta Ayarları</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-steel-300 mb-2">
                SMTP Sunucu
              </label>
              <input
                type="text"
                defaultValue="smtp.gmail.com"
                className="w-full px-3 py-2 bg-steel-700 border border-steel-600 rounded-md text-white focus:outline-none focus:border-[#C1966B]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-steel-300 mb-2">
                E-posta Adresi
              </label>
              <input
                type="email"
                defaultValue="noreply@steelakademi.com"
                className="w-full px-3 py-2 bg-steel-700 border border-steel-600 rounded-md text-white focus:outline-none focus:border-[#C1966B]"
              />
            </div>
            <button className="w-full px-4 py-2 bg-[#C1966B] text-black rounded-md hover:bg-[#B0855A] transition-colors">
              E-posta Test Et
            </button>
          </div>
        </div>

        {/* Güvenlik Ayarları */}
        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <h3 className="text-lg font-semibold text-white mb-4">Güvenlik Ayarları</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-steel-300">İki Faktörlü Doğrulama</span>
              <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm">
                Aktif
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-steel-300">Otomatik Oturum Kapatma</span>
              <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm">
                Pasif
              </button>
            </div>
            <button className="w-full px-4 py-2 bg-[#C1966B] text-black rounded-md hover:bg-[#B0855A] transition-colors">
              Güvenlik Ayarlarını Güncelle
            </button>
          </div>
        </div>

        {/* Yedekleme */}
        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <h3 className="text-lg font-semibold text-white mb-4">Yedekleme</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-steel-300">Son Yedekleme</span>
              <span className="text-steel-400 text-sm">2 saat önce</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-steel-300">Yedekleme Boyutu</span>
              <span className="text-steel-400 text-sm">45.2 MB</span>
            </div>
            <button className="w-full px-4 py-2 bg-[#C1966B] text-black rounded-md hover:bg-[#B0855A] transition-colors">
              Manuel Yedekleme Oluştur
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Ana Admin Sayfası
export default function AdminPage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState('dashboard')

  // Yükleme durumu
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-steel-900 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  // Oturum kontrolü
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  // Tab tanımları
  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'users', name: 'Kullanıcılar', icon: Users },
    { id: 'videos', name: 'Videolar', icon: Video },
    { id: 'blogs', name: 'Bloglar', icon: BookOpen },
    { id: 'questions', name: 'Soru-Cevap', icon: MessageCircle },
    { id: 'announcements', name: 'Duyurular', icon: Bell },
    { id: 'settings', name: 'Ayarlar', icon: Settings }
  ]

  // Tab içeriğini render et
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />
      case 'users':
        return <UsersTab />
      case 'videos':
        return <VideosTab />
      case 'blogs':
        return <BlogsTab />
      case 'questions':
        return <QuestionsTab />
      case 'announcements':
        return <AnnouncementsTab />
      case 'settings':
        return <SettingsTab />
      default:
        return <DashboardTab />
    }
  }

  return (
    <div className="min-h-screen bg-steel-900">
      {/* Header */}
      <div className="bg-steel-800 border-b border-steel-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Paneli</h1>
              <p className="text-steel-300">Platform yönetimi ve içerik kontrolü</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-steel-300">
                <Activity className="h-5 w-5 text-[#C1966B]" />
                <span>Sistem Durumu: Aktif</span>
              </div>
              <div className="flex items-center space-x-2 text-steel-300">
                <Users className="h-5 w-5 text-[#C1966B]" />
                <span>Hoş geldin, {session.user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-8">
        {/* Menü */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#C1966B] text-black'
                  : 'bg-steel-800 text-steel-300 hover:bg-steel-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab İçeriği */}
        <div className="bg-steel-800 rounded-lg p-8 text-steel-200 shadow-lg">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
} 