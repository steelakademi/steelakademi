import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Admin Stats API - Prisma kaldırıldı',
    stats: {
      totalUsers: 0,
      totalVideos: 0,
      totalBlogs: 0,
      totalQuestions: 0,
      activeUsers: 0,
      totalPoints: 0
    }
  })
}

export async function POST() {
  return NextResponse.json({ 
    message: 'API endpoint hazırlanıyor',
    endpoint: 'admin/stats'
  })
}