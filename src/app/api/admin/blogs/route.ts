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
        { content: { contains: search } },
        { excerpt: { contains: search } }
      ]
    } : {}

    const [blogs, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        select: {
          id: true,
          title: true,
          content: true,
          excerpt: true,
          isActive: true,
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
      prisma.blogPost.count({ where })
    ])

    const blogsWithAuthor = blogs.map(blog => ({
      id: blog.id,
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      status: blog.isActive ? 'published' : 'draft',
      author: blog.author.name || blog.author.email,
      authorId: blog.author.id,
      date: blog.createdAt.toISOString().split('T')[0],
      createdAt: blog.createdAt
    }))

    return NextResponse.json({
      blogs: blogsWithAuthor,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Admin blogs error:', error)
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
    const { title, content, excerpt, isActive } = body

    const blog = await prisma.blogPost.create({
      data: {
        title,
        content,
        excerpt,
        isActive: isActive !== undefined ? isActive : true,
        authorId: session.user.id
      }
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Admin blog create error:', error)
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
    const { id, title, content, excerpt, isActive } = body

    const blog = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        content,
        excerpt,
        isActive
      }
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Admin blog update error:', error)
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
    const blogId = searchParams.get('blogId')

    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID gerekli' }, { status: 400 })
    }

    await prisma.blogPost.delete({
      where: { id: blogId }
    })

    return NextResponse.json({ message: 'Blog silindi' })
  } catch (error) {
    console.error('Admin blog delete error:', error)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
} 