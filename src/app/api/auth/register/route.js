import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'API endpoint hazırlanıyor',
    endpoint: 'auth/register'
  })
}

export async function POST() {
  return NextResponse.json({ 
    message: 'API endpoint hazırlanıyor',
    endpoint: 'auth/register'
  })
}