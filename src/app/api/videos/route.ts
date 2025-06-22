import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

// GET - Tüm videoları getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    const where: any = {
      isActive: true
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const videos = await prisma.video.findMany({
      where,
      include: {
        views: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Add view count to each video
    const videosWithViewCount = videos.map(video => ({
      ...video,
      viewCount: video.views.length
    }))

    return NextResponse.json(videosWithViewCount)
  } catch (error) {
    console.error('Videos fetch error:', error)
    return NextResponse.json(
      { error: 'Videolar yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST - Yeni video ekle (sadece admin)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, description, url, thumbnail, duration, category } = body

    if (!title || !url) {
      return NextResponse.json(
        { error: 'Başlık ve URL gereklidir' },
        { status: 400 }
      )
    }

    const video = await prisma.video.create({
      data: {
        title,
        description,
        url,
        thumbnail,
        duration,
        category,
        isActive: true
      }
    })

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error('Video creation error:', error)
    return NextResponse.json(
      { error: 'Video oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
} 