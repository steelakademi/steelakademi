import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Notifications API - Prisma kaldırıldı',
    notifications: []
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Notifications API - Prisma kaldırıldı'
  })
}