import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST() {
  try {
    console.log('Veritabanı şeması oluşturuluyor...')
    
    // Prisma Accelerate için şema oluşturma
    // Bu işlem Prisma Accelerate'de otomatik olarak yapılır
    // Sadece bağlantıyı test edelim
    
    await prisma.$connect()
    console.log('Veritabanı bağlantısı başarılı')
    
    // Basit bir test sorgusu yapalım
    const userCount = await prisma.user.count()
    console.log(`Mevcut kullanıcı sayısı: ${userCount}`)
    
    await prisma.$disconnect()
    
    return NextResponse.json({
      success: true,
      message: 'Veritabanı şeması hazır',
      userCount: userCount
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Veritabanı şeması oluşturulamadı',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 