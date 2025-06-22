import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

type Props = {
  params: Promise<{ id: string }>
}

export async function POST(
  request: NextRequest,
  { params }: Props
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Giriş yapmanız gerekiyor' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { progress } = body

    // Video var mı kontrol et
    const video = await prisma.video.findUnique({
      where: { id }
    })

    if (!video) {
      return NextResponse.json(
        { error: 'Video bulunamadı' },
        { status: 404 }
      )
    }

    // Kullanıcının bu videoyu daha önce izleyip izlemediğini kontrol et
    const existingView = await prisma.videoView.findUnique({
      where: {
        userId_videoId: {
          userId: session.user.id,
          videoId: id
        }
      }
    })

    let points = 0
    let videoView

    if (existingView) {
      // Mevcut izleme kaydını güncelle
      videoView = await prisma.videoView.update({
        where: {
          userId_videoId: {
            userId: session.user.id,
            videoId: id
          }
        },
        data: {
          progress,
          watchedAt: new Date()
        }
      })
    } else {
      // Yeni izleme kaydı oluştur
      videoView = await prisma.videoView.create({
        data: {
          userId: session.user.id,
          videoId: id,
          progress,
          points: 50 // İlk izleme için 50 puan
        }
      })
      points = 50
    }

    // Eğer video tamamen izlendiyse ek puan ver
    if (progress >= 90 && !existingView?.points) {
      await prisma.videoView.update({
        where: {
          userId_videoId: {
            userId: session.user.id,
            videoId: id
          }
        },
        data: {
          points: 100 // Tam izleme için 100 puan
        }
      })
      points = 100
    }

    // Kullanıcının toplam puanını güncelle
    if (points > 0) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          points: {
            increment: points
          }
        }
      })
    }

    return NextResponse.json({
      message: 'Video izleme kaydedildi',
      points,
      progress
    })
  } catch (error) {
    console.error('Video watch error:', error)
    return NextResponse.json(
      { error: 'Video izleme kaydedilirken hata oluştu' },
      { status: 500 }
    )
  }
} 