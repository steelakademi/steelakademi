import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    // Veritabanından gerçek istatistikleri al
    const [
      totalUsers,
      totalVideos,
      totalBlogPosts,
      totalQuestions,
      totalPoints
    ] = await Promise.all([
      prisma.user.count(),
      prisma.video.count(),
      prisma.blogPost.count(),
      prisma.question.count(),
      prisma.user.aggregate({
        _sum: { points: true }
      })
    ])

    // Aktif kullanıcı sayısı (son 30 günde giriş yapan)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const activeUsers = await prisma.user.count({
      where: {
        sessions: {
          some: {
            expires: {
              gte: thirtyDaysAgo
            }
          }
        }
      }
    })

    const stats = {
      totalUsers,
      totalVideos,
      totalBlogs: totalBlogPosts,
      totalQuestions,
      activeUsers,
      totalPoints: totalPoints._sum.points || 0
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
} 