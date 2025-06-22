import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Blog API - Prisma kaldırıldı',
    blogs: []
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Blog API - Prisma kaldırıldı'
  })
}