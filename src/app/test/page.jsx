export default function TestPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Steel Akademi Test Sayfası</h1>
      <p>Bu sayfa çalışıyorsa Next.js düzgün çalışıyor demektir.</p>
      <div style={{ background: '#f0f0f0', padding: '10px', margin: '10px 0' }}>
        <h3>Environment Variables:</h3>
        <p>DATABASE_URL: {process.env.DATABASE_URL ? '✅ Var' : '❌ Yok'}</p>
        <p>NEXTAUTH_SECRET: {process.env.NEXTAUTH_SECRET ? '✅ Var' : '❌ Yok'}</p>
        <p>NEXTAUTH_URL: {process.env.NEXTAUTH_URL ? '✅ Var' : '❌ Yok'}</p>
        <p>NODE_ENV: {process.env.NODE_ENV}</p>
      </div>
      <a href="/" style={{ color: 'blue' }}>Ana Sayfaya Dön</a>
    </div>
  )
} 