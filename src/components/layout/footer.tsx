import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-black text-white border-t border-steel-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.png"
                alt="Steel Akademi Logo"
                width={120}
                height={32}
                className="object-contain"
              />
            </div>
            <p className="text-steel-400 mb-2 max-w-md">
              Şirket şubelerine özel eğitim platformu. Video eğitimler, blog yazıları, 
              soru-cevap sistemi ve daha fazlası ile kendinizi geliştirin.
            </p>
            <p className="text-steel-500 text-sm mb-4">
              <strong>Steel Sigorta ve Reasürans A.Ş.</strong> tarafından sunulmaktadır.
            </p>
            <div className="flex space-x-4">
              <Link href="/contact" className="text-steel-400 hover:text-white transition-colors">
                İletişim
              </Link>
              <Link href="/about" className="text-steel-400 hover:text-white transition-colors">
                Hakkımızda
              </Link>
              <Link href="/privacy" className="text-steel-400 hover:text-white transition-colors">
                Gizlilik
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/videos" className="text-steel-400 hover:text-white transition-colors">
                  Video Eğitimler
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-steel-400 hover:text-white transition-colors">
                  Blog Yazıları
                </Link>
              </li>
              <li>
                <Link href="/questions" className="text-steel-400 hover:text-white transition-colors">
                  Soru-Cevap
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="text-steel-400 hover:text-white transition-colors">
                  Duyurular
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-steel-500" />
                <span className="text-steel-400">info@steelakademi.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-steel-500" />
                <span className="text-steel-400">+90 (212) 555 0123</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-steel-500" />
                <span className="text-steel-400">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-steel-800 mt-8 pt-8 text-center">
          <p className="text-steel-500">
            © 2024 Steel Sigorta ve Reasürans A.Ş. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  )
} 