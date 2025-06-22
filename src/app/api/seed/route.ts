import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST() {
  try {
    // Admin kullanıcısı oluştur
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@steelakademi.com' },
      update: {},
      create: {
        email: 'admin@steelakademi.com',
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN',
        emailVerified: new Date()
      },
    })

    // Örnek video ekle
    const video = await prisma.video.upsert({
      where: { id: 'sample-video-1' },
      update: {},
      create: {
        id: 'sample-video-1',
        title: 'Steel Akademi\'ye Hoş Geldiniz',
        description: 'Bu video Steel Akademi platformuna hoş geldiniz mesajıdır.',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        thumbnail: '/logo.png',
        duration: 120,
        category: 'GENEL'
      },
    })

    // Örnek blog post ekle
    const blogPost = await prisma.blogPost.upsert({
      where: { id: 'sample-blog-1' },
      update: {},
      create: {
        id: 'sample-blog-1',
        title: 'Steel Akademi Başlangıç Rehberi',
        content: 'Steel Akademi platformuna hoş geldiniz! Bu yazıda platformun temel özelliklerini öğreneceksiniz.',
        excerpt: 'Platform kullanım rehberi',
        category: 'GENEL',
        authorId: admin.id
      },
    })

    // Örnek duyuru ekle
    const announcement = await prisma.announcement.upsert({
      where: { id: 'sample-announcement-1' },
      update: {},
      create: {
        id: 'sample-announcement-1',
        title: 'Platform Açıldı!',
        content: 'Steel Akademi platformu başarıyla açıldı. Tüm kullanıcılarımıza hoş geldiniz!',
        authorId: admin.id,
        priority: 'HIGH'
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Seed data başarıyla oluşturuldu',
      data: {
        admin: { id: admin.id, email: admin.email, name: admin.name },
        video: { id: video.id, title: video.title },
        blogPost: { id: blogPost.id, title: blogPost.title },
        announcement: { id: announcement.id, title: announcement.title }
      }
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { success: false, error: 'Seed işlemi başarısız oldu' },
      { status: 500 }
    )
  }
} 