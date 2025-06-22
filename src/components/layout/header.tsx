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
  return (
    <header className="bg-steel-800 border-b border-steel-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">Steel Akademi</div>
          <nav className="text-steel-300">
            <a href="/" className="hover:text-white px-3 py-2">Ana Sayfa</a>
            <a href="/videos" className="hover:text-white px-3 py-2">Videolar</a>
            <a href="/blog" className="hover:text-white px-3 py-2">Blog</a>
            <a href="/contact" className="hover:text-white px-3 py-2">İletişim</a>
          </nav>
        </div>
      </div>
    </header>
  )
} 