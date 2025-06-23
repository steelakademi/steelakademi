'use client'

import { useState, useEffect } from 'react'
import { signIn, getProviders } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LoginPage() {
  const [providers, setProviders] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders()
      setProviders(response)
    }
    setUpProviders()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result.error) {
      setError('Giriş bilgileri hatalı. Lütfen tekrar deneyin.')
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-steel-900 flex items-center justify-center">
      <div className="bg-steel-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-steel-700">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Giriş Yap</h1>
        
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-steel-300 text-sm font-bold mb-2" htmlFor="email">
              E-posta
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 bg-steel-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1966B]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-steel-300 text-sm font-bold mb-2" htmlFor="password">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 bg-steel-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#C1966B]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#C1966B] hover:bg-[#B08A5F] text-black font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Giriş Yap
          </button>
        </form>

        {providers && Object.values(providers).some(p => p.id !== 'credentials') && (
            <>
                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-steel-600"></div>
                    <span className="flex-shrink mx-4 text-steel-400">veya</span>
                    <div className="flex-grow border-t border-steel-600"></div>
                </div>

                <div className="space-y-4">
                    {Object.values(providers).map((provider) => {
                        if (provider.id === 'credentials') return null
                        return (
                            <React.Fragment key={provider.id}>
                                <button
                                    onClick={() => signIn(provider.id, { callbackUrl: '/admin' })}
                                    className="w-full bg-steel-700 hover:bg-steel-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                                >
                                    {provider.name} ile Giriş Yap
                                </button>
                            </React.Fragment>
                        )
                    })}
                </div>
            </>
        )}
        
        <p className="text-center text-steel-400 mt-6 text-sm">
          Hesabın yok mu?{' '}
          <a href="/auth/register" className="text-[#C1966B] hover:underline">
            Kayıt Ol
          </a>
        </p>
      </div>
    </div>
  )
} 