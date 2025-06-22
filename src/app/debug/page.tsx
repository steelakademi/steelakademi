import { prisma } from '@/lib/prisma'

export default async function DebugPage() {
  const envVars = {
    DATABASE_URL: process.env.DATABASE_URL ? '✅ Set' : '❌ Not Set',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Not Set',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ? '✅ Set' : '❌ Not Set',
    NODE_ENV: process.env.NODE_ENV || 'Not Set'
  }

  let dbStatus = '❌ Unknown'
  let dbError = null

  try {
    // Veritabanı bağlantısını test et
    await prisma.$connect()
    dbStatus = '✅ Connected'
  } catch (error) {
    dbStatus = '❌ Connection Failed'
    dbError = error instanceof Error ? error.message : 'Unknown error'
  } finally {
    await prisma.$disconnect()
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🔧 Debug Sayfası</h1>
          
          <div className="grid gap-6">
            {/* Environment Variables */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-blue-900 mb-3">Environment Variables</h2>
              <div className="space-y-2">
                {Object.entries(envVars).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="font-mono text-sm">{key}:</span>
                    <span className={`font-semibold ${value.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Database Status */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-green-900 mb-3">Veritabanı Durumu</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Bağlantı:</span>
                  <span className={`font-semibold ${dbStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                    {dbStatus}
                  </span>
                </div>
                {dbError && (
                  <div className="bg-red-100 p-3 rounded border border-red-300">
                    <p className="text-red-800 text-sm font-mono">{dbError}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Build Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Build Bilgileri</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Build Time:</span>
                  <span className="font-mono text-sm">{new Date().toISOString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Platform:</span>
                  <span className="font-mono text-sm">{process.platform}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Node Version:</span>
                  <span className="font-mono text-sm">{process.version}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-yellow-900 mb-3">Hızlı Testler</h2>
              <div className="space-y-3">
                <a 
                  href="/api/seed" 
                  className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Seed API Test
                </a>
                <a 
                  href="/test" 
                  className="inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors ml-2"
                >
                  Test Sayfası
                </a>
                <a 
                  href="/admin" 
                  className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors ml-2"
                >
                  Admin Panel
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 