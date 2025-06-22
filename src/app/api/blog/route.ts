import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

// GET - Tüm blog yazılarını getir
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
        { content: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } }
      ]
    }

    const blogPosts = await prisma.blogPost.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(blogPosts)
  } catch (error) {
    console.error('Blog posts fetch error:', error)
    return NextResponse.json(
      { error: 'Blog yazıları yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST - Yeni blog yazısı ekle (sadece admin ve moderator)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user || !['ADMIN', 'MODERATOR'].includes(session.user.role)) {
      return NextResponse.json(
        { error: 'Bu işlem için yetkiniz yok' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { title, content, excerpt, category } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Başlık ve içerik gereklidir' },
        { status: 400 }
      )
    }

    const blogPost = await prisma.blogPost.create({
      data: {
        title,
        content,
        excerpt,
        category,
        authorId: session.user.id,
        isActive: true
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(blogPost, { status: 201 })
  } catch (error) {
    console.error('Blog post creation error:', error)
    return NextResponse.json(
      { error: 'Blog yazısı oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
} 