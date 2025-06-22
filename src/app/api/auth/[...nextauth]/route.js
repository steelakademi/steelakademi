import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Prisma kaldırıldı, sadece auth endpointi.'
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Prisma kaldırıldı, sadece auth endpointi.'
  })
} 