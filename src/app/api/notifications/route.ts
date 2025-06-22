import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { sendEmail, sendBulkEmail } from '@/lib/email'

// GET - Kullanıcının bildirimlerini getir
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    return NextResponse.json(notifications)
  } catch (error) {
    console.error('Notifications fetch error:', error)
    return NextResponse.json(
      { error: 'Bildirimler yüklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// POST - Yeni bildirim oluştur ve e-posta gönder
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
    const { type, title, message, targetUsers, sendEmail: shouldSendEmail } = body

    if (!type || !title || !message) {
      return NextResponse.json(
        { error: 'Tip, başlık ve mesaj gereklidir' },
        { status: 400 }
      )
    }

    // Bildirim oluştur
    const notification = await prisma.notification.create({
      data: {
        type,
        title,
        message,
        userId: session.user.id,
        isRead: false
      }
    })

    // E-posta gönderme
    if (shouldSendEmail && targetUsers && targetUsers.length > 0) {
      const users = await prisma.user.findMany({
        where: {
          id: { in: targetUsers }
        },
        select: {
          id: true,
          email: true,
          name: true
        }
      })

      const emails = users.map(user => user.email)
      
      // E-posta şablonunu belirle
      let emailTemplate: string
      switch (type) {
        case 'video':
          emailTemplate = 'newVideo'
          break
        case 'blog':
          emailTemplate = 'newBlog'
          break
        case 'announcement':
          emailTemplate = 'newAnnouncement'
          break
        case 'question':
          emailTemplate = 'questionAnswered'
          break
        default:
          emailTemplate = 'newAnnouncement'
      }

      // Toplu e-posta gönder
      await sendBulkEmail(emails, emailTemplate as any, {
        title,
        userName: users[0]?.name || 'Kullanıcı'
      })
    }

    return NextResponse.json(notification, { status: 201 })
  } catch (error) {
    console.error('Notification creation error:', error)
    return NextResponse.json(
      { error: 'Bildirim oluşturulurken hata oluştu' },
      { status: 500 }
    )
  }
} 