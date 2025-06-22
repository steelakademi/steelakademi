'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, User, Mail, Lock, Building, TrendingUp, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    branch: '',
    salesSource: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()
  const { register, isLoading } = useAuth()

  const branches = [
    'İstanbul Merkez',
    'Ankara Şube',
    'İzmir Şube',
    'Bursa Şube',
    'Antalya Şube',
    'Adana Şube'
  ]

  const salesSources = [
    'Web Sitesi',
    'Sosyal Medya',
    'Referans',
    'Reklam',
    'Fuar',
    'Diğer'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Tüm alanları doldurun')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      return
    }

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        branch: formData.branch || undefined,
        salesSource: formData.salesSource || undefined
      })

      setSuccess('Hesabınız başarıyla oluşturuldu! Giriş yapabilirsiniz.')
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        branch: '',
        salesSource: ''
      })

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt sırasında hata oluştu')
    }
  }

  return (
    <div className="min-h-screen bg-steel-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[#C1966B] rounded-lg flex items-center justify-center mb-4">
            <span className="text-black font-bold text-xl">S</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Üye Ol</h2>
          <p className="mt-2 text-steel-300">
            Steel Akademi'ye katılın
          </p>
        </div>

        <Card className="bg-steel-800 border-steel-700">
          <CardHeader>
            <CardTitle className="text-white">Hesap Bilgileri</CardTitle>
            <CardDescription className="text-steel-300">
              Bilgilerinizi girin ve hesap oluşturun
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center space-x-2 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center space-x-2 p-3 bg-green-900/20 border border-green-700 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 text-sm">{success}</span>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-steel-300 mb-2">
                  Ad Soyad
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-steel-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white placeholder-steel-400"
                    placeholder="Ad Soyad"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-steel-300 mb-2">
                  E-posta Adresi
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-steel-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white placeholder-steel-400"
                    placeholder="ornek@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="branch" className="block text-sm font-medium text-steel-300 mb-2">
                  Şube
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-steel-400" />
                  </div>
                  <select
                    id="branch"
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white"
                  >
                    <option value="">Şube seçin</option>
                    {branches.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="salesSource" className="block text-sm font-medium text-steel-300 mb-2">
                  Satış Kaynağı
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <TrendingUp className="h-5 w-5 text-steel-400" />
                  </div>
                  <select
                    id="salesSource"
                    name="salesSource"
                    value={formData.salesSource}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white"
                  >
                    <option value="">Kaynak seçin</option>
                    {salesSources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-steel-300 mb-2">
                  Şifre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-steel-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white placeholder-steel-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-steel-400 hover:text-steel-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-steel-400 hover:text-steel-300" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-steel-300 mb-2">
                  Şifre Tekrar
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-steel-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white placeholder-steel-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-steel-400 hover:text-steel-300" />
                    ) : (
                      <Eye className="h-5 w-5 text-steel-400 hover:text-steel-300" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#C1966B] hover:bg-[#B08A5F] text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {isLoading ? 'Hesap oluşturuluyor...' : 'Üye Ol'}
                </Button>
              </div>

              <div className="text-center">
                <span className="text-steel-300">Zaten hesabınız var mı? </span>
                <Link href="/auth/login" className="text-[#C1966B] hover:text-[#B08A5F] font-medium">
                  Giriş yapın
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 