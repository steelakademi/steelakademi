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
              <p className="text-steel-300">Uzman eğitmenler tarafından hazırlanan video eğitimler</p>
            </div>
            <div className="bg-steel-800 border border-steel-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Blog Yazıları</h3>
              <p className="text-steel-300">Sektör haberleri ve teknoloji ipuçları</p>
            </div>
            <div className="bg-steel-800 border border-steel-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Soru-Cevap</h3>
              <p className="text-steel-300">Uzmanlara sorularınızı sorun ve hızlı yanıtlar alın</p>
            </div>
            <div className="bg-steel-800 border border-steel-700 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-3">Duyurular</h3>
              <p className="text-steel-300">Şirket duyurularını takip edin ve güncel kalın</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 