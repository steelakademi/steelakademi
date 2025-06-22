import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const results = {
      environment: {
        DATABASE_URL: process.env.DATABASE_URL ? '✅ Set' : '❌ Not Set',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Not Set',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '✅ Set' : '❌ Not Set',
        NODE_ENV: process.env.NODE_ENV || 'Not Set'
      },
      database: {
        connection: '❌ Unknown' as string,
        error: null as string | null,
        tables: [] as string[]
      },
      prisma: {
        version: null as string | null,
        clientGenerated: false
      }
    }

    // Prisma client versiyonunu kontrol et
    try {
      results.prisma.version = require('@prisma/client').PrismaClient.name
      results.prisma.clientGenerated = true
    } catch (e) {
      results.prisma.clientGenerated = false
    }

    // Veritabanı bağlantısını test et
    try {
      await prisma.$connect()
      results.database.connection = '✅ Connected'
      
      // Tabloları kontrol et
      try {
        const tables = await prisma.$queryRaw`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public'
        `
        results.database.tables = (tables as any[]).map(t => t.table_name)
      } catch (tableError) {
        results.database.error = `Table check failed: ${tableError instanceof Error ? tableError.message : 'Unknown error'}`
      }
      
    } catch (dbError) {
      results.database.connection = '❌ Connection Failed'
      results.database.error = dbError instanceof Error ? dbError.message : 'Unknown error'
    } finally {
      await prisma.$disconnect()
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      results
    })
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 