'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('E-posta ve şifre gereklidir')
      return
    }

    try {
      const result = await login(email, password)
      if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş sırasında hata oluştu')
    }
  }

  return (
    <div className="min-h-screen bg-steel-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-[#C1966B] rounded-lg flex items-center justify-center mb-4">
            <span className="text-black font-bold text-xl">S</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Giriş Yap</h2>
          <p className="mt-2 text-steel-300">
            Hesabınıza giriş yapın
          </p>
        </div>

        <Card className="bg-steel-800 border-steel-700">
          <CardHeader>
            <CardTitle className="text-white">Hesap Bilgileri</CardTitle>
            <CardDescription className="text-steel-300">
              E-posta ve şifrenizi girin
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
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white placeholder-steel-400"
                    placeholder="ornek@email.com"
                  />
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
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#C1966B] focus:ring-[#C1966B] border-steel-600 rounded bg-steel-700"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-steel-300">
                    Beni hatırla
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/auth/forgot-password" className="text-[#C1966B] hover:text-[#B08A5F]">
                    Şifremi unuttum
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#C1966B] hover:bg-[#B08A5F] text-black font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                </Button>
              </div>

              <div className="text-center">
                <span className="text-steel-300">Hesabınız yok mu? </span>
                <Link href="/auth/register" className="text-[#C1966B] hover:text-[#B08A5F] font-medium">
                  Üye olun
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 