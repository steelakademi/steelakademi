import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Questions API - Prisma kaldırıldı',
    questions: []
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Questions API - Prisma kaldırıldı'
  })
}