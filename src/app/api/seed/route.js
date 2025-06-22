import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Seed API - Prisma kaldırıldı'
  })
}

export async function POST() {
  return NextResponse.json({
    status: 'dummy',
    message: 'Seed API - Prisma kaldırıldı'
  })
} 