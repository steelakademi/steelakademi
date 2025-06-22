export default function Header() {
  return (
    <header className="bg-steel-800 border-b border-steel-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-bold text-xl">Steel Akademi</div>
          <nav className="text-steel-300">
            <a href="/" className="hover:text-white px-3 py-2">Ana Sayfa</a>
            <a href="/videos" className="hover:text-white px-3 py-2">Videolar</a>
            <a href="/blog" className="hover:text-white px-3 py-2">Blog</a>
            <a href="/contact" className="hover:text-white px-3 py-2">İletişim</a>
          </nav>
        </div>
      </div>
    </header>
  )
} 