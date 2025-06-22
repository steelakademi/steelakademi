# Steel Akademi - Şirket İçi Eğitim Platformu

Modern ve kapsamlı bir şirket içi eğitim platformu. Video eğitimler, blog yazıları, soru-cevap sistemi ve daha fazlası.

## 🚀 Özellikler

### 👥 Kullanıcı Yönetimi
- **Üye Kaydı**: Şube ve satış kaynakları için özel kayıt sistemi
- **Rol Yönetimi**: Admin, Moderator, Member rolleri
- **Profil Yönetimi**: Kullanıcı profilleri ve ayarları

### 📹 Video Eğitimler
- **Video Streaming**: Yüksek kaliteli video oynatma
- **Puan Sistemi**: Video izleme ile puan kazanma
- **İlerleme Takibi**: Video izleme ilerlemesi
- **Kategoriler**: Eğitim kategorileri

### 📝 Blog Sistemi
- **Makale Yönetimi**: Zengin içerik editörü
- **Kategoriler**: Blog kategorileri
- **Yorum Sistemi**: Kullanıcı yorumları

### 💬 Soru-Cevap Platformu
- **Soru Sorma**: Kullanıcılar soru sorabilir
- **Cevap Verme**: Diğer kullanıcılar cevap verebilir
- **Kabul Etme**: En iyi cevabı kabul etme
- **Arama**: Soru arama ve filtreleme

### 📢 Duyurular
- **Öncelik Seviyeleri**: Düşük, Normal, Yüksek, Acil
- **Yönetim Paneli**: Admin duyuru yönetimi
- **Bildirimler**: Kullanıcı bildirimleri

### 📊 Raporlama
- **Puan Takibi**: Kullanıcı puanları
- **Video Performansı**: İzleme istatistikleri
- **Katılım Raporları**: Platform kullanım analizi

### 🔧 Admin Panel
- **Türkçe Arayüz**: Tam Türkçe yönetim paneli
- **Kullanıcı Yönetimi**: Kullanıcı işlemleri
- **İçerik Yönetimi**: Video, blog, duyuru yönetimi
- **Raporlar**: Detaylı analiz raporları

## 🛠️ Teknoloji Stack

### Frontend
- **Next.js 14**: React framework
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Styling
- **Lucide React**: İkonlar

### Backend
- **Node.js**: Runtime
- **Express.js**: Web framework
- **Prisma**: ORM
- **PostgreSQL**: Veritabanı

### Authentication
- **NextAuth.js**: Kimlik doğrulama
- **JWT**: Token yönetimi

### Deployment
- **Vercel**: Frontend hosting
- **Railway**: Backend hosting

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- PostgreSQL
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/your-username/steel-akademi.git
cd steel-akademi
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Environment değişkenlerini ayarlayın**
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/steel_akademi"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Veritabanını hazırlayın**
```bash
npx prisma generate
npx prisma db push
```

5. **Geliştirme sunucusunu başlatın**
```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışacak.

## 🗂️ Proje Yapısı

```
steel-akademi/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── auth/           # Kimlik doğrulama sayfaları
│   │   ├── videos/         # Video eğitim sayfaları
│   │   ├── blog/           # Blog sayfaları
│   │   ├── questions/      # Soru-cevap sayfaları
│   │   ├── announcements/  # Duyuru sayfaları
│   │   ├── reports/        # Rapor sayfaları
│   │   └── admin/          # Admin panel sayfaları
│   ├── components/         # React bileşenleri
│   │   ├── ui/            # UI bileşenleri
│   │   ├── layout/        # Layout bileşenleri
│   │   └── forms/         # Form bileşenleri
│   ├── lib/               # Utility fonksiyonları
│   ├── hooks/             # Custom React hooks
│   └── types/             # TypeScript tip tanımları
├── prisma/                # Veritabanı şeması
├── public/                # Statik dosyalar
└── docs/                  # Dokümantasyon
```

## 🔐 Environment Değişkenleri

| Değişken | Açıklama | Örnek |
|----------|----------|-------|
| `DATABASE_URL` | PostgreSQL veritabanı URL'i | `postgresql://user:pass@localhost:5432/db` |
| `NEXTAUTH_SECRET` | NextAuth gizli anahtarı | `your-secret-key` |
| `NEXTAUTH_URL` | Uygulama URL'i | `http://localhost:3000` |
| `CLOUDINARY_URL` | Cloudinary URL (video hosting) | `cloudinary://key:secret@cloud` |

## 🚀 Deployment

### Vercel (Frontend)
1. Vercel hesabınızda yeni proje oluşturun
2. GitHub repository'nizi bağlayın
3. Environment değişkenlerini ayarlayın
4. Deploy edin

### Railway (Backend)
1. Railway hesabınızda yeni proje oluşturun
2. PostgreSQL veritabanı ekleyin
3. Environment değişkenlerini ayarlayın
4. Deploy edin

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/logout` - Çıkış

### Videos
- `GET /api/videos` - Video listesi
- `GET /api/videos/[id]` - Video detayı
- `POST /api/videos/[id]/watch` - Video izleme kaydı

### Blog
- `GET /api/blog` - Blog yazıları
- `GET /api/blog/[id]` - Blog detayı
- `POST /api/blog` - Yeni blog yazısı (Admin)

### Questions
- `GET /api/questions` - Soru listesi
- `POST /api/questions` - Yeni soru
- `POST /api/questions/[id]/answers` - Cevap ekleme

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Email**: info@steelakademi.com
- **Telefon**: +90 (212) 555 0123
- **Adres**: İstanbul, Türkiye

## 🙏 Teşekkürler

Bu proje aşağıdaki açık kaynak projeleri kullanmaktadır:
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Lucide React](https://lucide.dev/) 