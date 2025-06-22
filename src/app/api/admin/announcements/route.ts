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
        { content: { contains: search } }
      ]
    } : {}

    const [announcements, total] = await Promise.all([
      prisma.announcement.findMany({
        where,
        select: {
          id: true,
          title: true,
          content: true,
          isActive: true,
          priority: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.announcement.count({ where })
    ])

    const announcementsWithAuthor = announcements.map(announcement => ({
      id: announcement.id,
      title: announcement.title,
      content: announcement.content,
      status: announcement.isActive ? 'active' : 'inactive',
      priority: announcement.priority,
      author: announcement.author.name || announcement.author.email,
      authorId: announcement.author.id,
      date: announcement.createdAt.toISOString().split('T')[0],
      createdAt: announcement.createdAt
    }))

    return NextResponse.json({
      announcements: announcementsWithAuthor,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Admin announcements error:', error)
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
    const { title, content, isActive, priority } = body

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        isActive: isActive !== undefined ? isActive : true,
        priority: priority || 'NORMAL',
        authorId: session.user.id
      }
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('Admin announcement create error:', error)
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
    const { id, title, content, isActive, priority } = body

    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        title,
        content,
        isActive,
        priority
      }
    })

    return NextResponse.json(announcement)
  } catch (error) {
    console.error('Admin announcement update error:', error)
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
    const announcementId = searchParams.get('announcementId')

    if (!announcementId) {
      return NextResponse.json({ error: 'Duyuru ID gerekli' }, { status: 400 })
    }

    await prisma.announcement.delete({
      where: { id: announcementId }
    })

    return NextResponse.json({ message: 'Duyuru silindi' })
  } catch (error) {
    console.error('Admin announcement delete error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
} 