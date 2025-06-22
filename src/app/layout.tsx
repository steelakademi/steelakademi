import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Steel Akademi - Şirket İçi Eğitim Platformu',
  description: 'Şirket şubelerine özel eğitim platformu. Video eğitimler, blog yazıları, soru-cevap sistemi ve daha fazlası.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-steel-800 border-b border-steel-700 p-4">
            <div className="text-white font-bold text-xl">Steel Akademi</div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-black text-white border-t border-steel-800 p-4 text-center">
            <p className="text-steel-400">© 2024 Steel Akademi</p>
          </footer>
        </div>
      </body>
    </html>
  )
} 