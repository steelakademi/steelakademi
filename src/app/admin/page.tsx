'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function AdminPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-steel-900 flex items-center justify-center">
        <div className="text-white">Yükleniyor...</div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'admin') {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-steel-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Paneli</h1>
        
        <div className="bg-steel-800 p-6 rounded-lg border border-steel-700">
          <h2 className="text-xl font-semibold text-white mb-4">Hoş Geldiniz</h2>
          <p className="text-steel-300">
            Bu admin paneli henüz geliştirme aşamasındadır.
          </p>
        </div>
      </div>
    </div>
  )
} 