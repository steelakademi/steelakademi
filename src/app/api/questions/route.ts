import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

// GET - Tüm soruları getir
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    const where: any = {
      isActive: true
    }

    if (category && category !== 'all') {
      where.category = category
    }

    if (status && status !== 'all') {
      if (status === 'answered') {
        where.answers = {
          some: {}
        }
      } else if (status === 'open') {
        where.answers = {
          none: {}
        }
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ]
    }

    const questions = await prisma.question.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        answers: {
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
            createdAt: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(questions)
  } catch (error) {
    console.error('Questions fetch error:', error)
    return NextResponse.json(
      { error: 'Sorular yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST - Yeni soru ekle
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, content, category } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Başlık ve içerik gereklidir' },
        { status: 400 }
      )
    }

    const question = await prisma.question.create({
      data: {
        title,
        content,
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

    return NextResponse.json(question, { status: 201 })
  } catch (error) {
    console.error('Question creation error:', error)
    return NextResponse.json(
      { error: 'Soru oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
} 