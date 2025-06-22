import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'API endpoint hazırlanıyor',
    endpoint: 'admin/questions'
  })
}

export async function POST() {
  return NextResponse.json({ 
    message: 'API endpoint hazırlanıyor',
    endpoint: 'admin/questions'
  })
}