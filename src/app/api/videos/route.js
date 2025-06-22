import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Videos API - Prisma kaldırıldı',
    videos: []
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Videos API - Prisma kaldırıldı'
  })
}