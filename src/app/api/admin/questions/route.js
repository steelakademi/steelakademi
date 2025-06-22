import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Admin Questions API - Prisma kaldırıldı',
    questions: [],
    totalPages: 1
  })
}

export async function POST() {
  return NextResponse.json({ 
    message: 'API endpoint hazırlanıyor',
    endpoint: 'admin/questions'
  })
}