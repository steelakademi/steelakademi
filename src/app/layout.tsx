import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
      <head>
        <style>{`
          body {
            background-color: #0f172a;
            color: #f1f5f9;
            margin: 0;
            padding: 0;
            font-family: ${inter.style.fontFamily};
          }
          .bg-steel-800 { background-color: #1e293b; }
          .bg-steel-900 { background-color: #0f172a; }
          .border-steel-700 { border-color: #334155; }
          .text-white { color: #ffffff; }
          .text-steel-400 { color: #94a3b8; }
          .p-4 { padding: 1rem; }
          .text-xl { font-size: 1.25rem; }
          .font-bold { font-weight: 700; }
          .text-center { text-align: center; }
          .border-t { border-top-width: 1px; }
          .border-b { border-bottom-width: 1px; }
          .min-h-screen { min-height: 100vh; }
          .flex { display: flex; }
          .flex-col { flex-direction: column; }
          .flex-1 { flex: 1 1 0%; }
          .container { max-width: 1200px; margin: 0 auto; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .py-8 { padding-top: 2rem; padding-bottom: 2rem; }
          .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-8 { margin-bottom: 2rem; }
          .text-5xl { font-size: 3rem; }
          .text-3xl { font-size: 1.875rem; }
          .text-xl { font-size: 1.25rem; }
          .text-steel-300 { color: #cbd5e1; }
          .max-w-3xl { max-width: 48rem; }
          .flex-col { flex-direction: column; }
          .sm\\:flex-row { flex-direction: row; }
          .gap-4 { gap: 1rem; }
          .justify-center { justify-content: center; }
          .bg-\\[\\#C1966B\\] { background-color: #C1966B; }
          .hover\\:bg-\\[\\#B08A5F\\]:hover { background-color: #B08A5F; }
          .text-black { color: #000000; }
          .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
          .rounded-lg { border-radius: 0.5rem; }
          .font-medium { font-weight: 500; }
          .border { border-width: 1px; }
          .border-steel-600 { border-color: #475569; }
          .hover\\:bg-steel-700:hover { background-color: #334155; }
          .grid { display: grid; }
          .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .gap-8 { gap: 2rem; }
          .text-center { text-align: center; }
          .mb-2 { margin-bottom: 0.5rem; }
          .text-3xl { font-size: 1.875rem; }
          .font-bold { font-weight: 700; }
          .mb-12 { margin-bottom: 3rem; }
          .max-w-2xl { max-width: 42rem; }
          .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .bg-steel-800 { background-color: #1e293b; }
          .border { border-width: 1px; }
          .border-steel-700 { border-color: #334155; }
          .p-6 { padding: 1.5rem; }
          .rounded-lg { border-radius: 0.5rem; }
          .text-xl { font-size: 1.25rem; }
          .font-semibold { font-weight: 600; }
          .text-white { color: #ffffff; }
          .mb-3 { margin-bottom: 0.75rem; }
          .text-steel-300 { color: #cbd5e1; }
          @media (min-width: 640px) {
            .sm\\:flex-row { flex-direction: row; }
          }
          @media (min-width: 768px) {
            .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            .md\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          }
          @media (min-width: 1024px) {
            .lg\\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          }
        `}</style>
      </head>
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