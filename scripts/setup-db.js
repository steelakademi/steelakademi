const { PrismaClient } = require('@prisma/client')

async function setupDatabase() {
  const prisma = new PrismaClient()
  
  try {
    console.log('🔧 Veritabanı şeması oluşturuluyor...')
    
    // Prisma Accelerate'de şema otomatik olarak oluşturulur
    // Sadece bağlantıyı test edelim
    await prisma.$connect()
    console.log('✅ Veritabanı bağlantısı başarılı')
    
    // Test sorgusu
    const userCount = await prisma.user.count()
    console.log(`📊 Mevcut kullanıcı sayısı: ${userCount}`)
    
    console.log('🎉 Veritabanı hazır!')
    
  } catch (error) {
    console.error('❌ Hata:', error.message)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

setupDatabase() 