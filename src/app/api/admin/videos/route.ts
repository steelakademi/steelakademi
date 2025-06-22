import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = search ? {
      OR: [
        { title: { contains: search } },
        { description: { contains: search } }
      ]
    } : {}

    const [videos, total] = await Promise.all([
      prisma.video.findMany({
        where,
        select: {
          id: true,
          title: true,
          description: true,
          url: true,
          thumbnail: true,
          duration: true,
          category: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              views: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.video.count({ where })
    ])

    const videosWithStats = videos.map(video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      url: video.url,
      thumbnail: video.thumbnail,
      duration: video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : '00:00',
      category: video.category,
      status: video.isActive ? 'published' : 'draft',
      views: video._count.views,
      createdAt: video.createdAt.toISOString().split('T')[0]
    }))

    return NextResponse.json({
      videos: videosWithStats,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Admin videos error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, url, thumbnail, duration, category, isActive } = body

    const video = await prisma.video.create({
      data: {
        title,
        description,
        url,
        thumbnail,
        duration: duration ? parseInt(duration) : null,
        category,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(video)
  } catch (error) {
    console.error('Admin video create error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const body = await request.json()
    const { id, title, description, url, thumbnail, duration, category, isActive } = body

    const video = await prisma.video.update({
      where: { id },
      data: {
        title,
        description,
        url,
        thumbnail,
        duration: duration ? parseInt(duration) : null,
        category,
        isActive
      }
    })

    return NextResponse.json(video)
  } catch (error) {
    console.error('Admin video update error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Yetkisiz erişim' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const videoId = searchParams.get('videoId')

    if (!videoId) {
      return NextResponse.json({ error: 'Video ID gerekli' }, { status: 400 })
    }

    await prisma.video.delete({
      where: { id: videoId }
    })

    return NextResponse.json({ message: 'Video silindi' })
  } catch (error) {
    console.error('Admin video delete error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
} 