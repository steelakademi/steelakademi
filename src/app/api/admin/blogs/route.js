import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Admin Blogs API - Prisma kaldırıldı',
    blogs: [],
    totalPages: 1
  })
}

export async function POST() {
  return NextResponse.json({ 
    message: 'API endpoint hazırlanıyor',
    endpoint: 'admin/blogs'
  })
}