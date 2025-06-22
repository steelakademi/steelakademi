'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

export function useAuth() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      return result
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: {
    name: string
    email: string
    password: string
    branch?: string
    salesSource?: string
  }) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Kayıt sırasında hata oluştu')
      }

      return data
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    signOut({ callbackUrl: '/' })
  }

  return {
    session,
    status,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!session,
    user: session?.user
  }
} 