# 🚀 Steel Akademi - FTP Kurulum Rehberi

## 📋 Dosya Listesi
Bu klasörde aşağıdaki dosyalar bulunmaktadır:

- `.next/` - Next.js build çıktısı
- `public/` - Statik dosyalar (resimler, favicon vb.)
- `prisma/` - Veritabanı şeması ve migration'lar
- `package.json` - Proje bağımlılıkları
- `next.config.js` - Next.js konfigürasyonu
- `tailwind.config.ts` - Tailwind CSS konfigürasyonu
- `tsconfig.json` - TypeScript konfigürasyonu
- `postcss.config.js` - PostCSS konfigürasyonu
- `.env` - Ortam değişkenleri (production için düzenlenmeli)
- `README.md` - Proje dokümantasyonu

## 🔧 Sunucuda Kurulum Adımları

### 1. Dosyaları Sunucuya Yükleme
Tüm dosyaları FTP ile sunucunuzun web dizinine yükleyin.

### 2. Node.js ve npm Kurulumu
```bash
# Node.js 18+ ve npm kurulu olduğundan emin olun
node --version
npm --version
```

### 3. Bağımlılıkları Yükleme
```bash
npm install --production
```

### 4. Veritabanı Kurulumu
```bash
# Prisma client'ı oluştur
npx prisma generate

# Veritabanı şemasını uygula
npx prisma db push
```

### 5. Ortam Değişkenlerini Düzenleme
`.env` dosyasını production ortamınıza göre düzenleyin:

```env
# Veritabanı
DATABASE_URL="postgresql://username:password@localhost:5432/steelakademi"

# NextAuth
NEXTAUTH_URL="https://subdomain.domain.com"
NEXTAUTH_SECRET="your-secret-key"

# E-posta
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@steelakademi.com"

# Diğer
NODE_ENV="production"
```

### 6. Uygulamayı Başlatma
```bash
# Geliştirme modunda test
npm run dev

# Production modunda başlat
npm start
```

## 🌐 Domain/Subdomain Ayarları

### A Record Ayarları
- **Type:** A
- **Name:** @ (veya subdomain adı)
- **Value:** Sunucu IP adresi

### CNAME Ayarları (isteğe bağlı)
- **Type:** CNAME
- **Name:** www
- **Value:** subdomain.domain.com

## 🔒 SSL Sertifikası
Let's Encrypt ile ücretsiz SSL sertifikası alabilirsiniz:

```bash
# Certbot kurulumu
sudo apt install certbot

# SSL sertifikası alma
sudo certbot --nginx -d subdomain.domain.com
```

## 📊 Process Manager (PM2) Kurulumu

### PM2 Kurulumu
```bash
npm install -g pm2
```

### Uygulamayı PM2 ile Başlatma
```bash
pm2 start npm --name "steelakademi" -- start
```

### Otomatik Başlatma
```bash
pm2 startup
pm2 save
```

### Monitoring Komutları
```bash
# Uygulama durumu
pm2 status

# Logları görüntüleme
pm2 logs steelakademi

# Yeniden başlatma
pm2 restart steelakademi

# Durdurma
pm2 stop steelakademi
```

## 🔧 Nginx Konfigürasyonu (Önerilen)

```nginx
server {
    listen 80;
    server_name subdomain.domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🚨 Güvenlik Kontrolleri

1. **Firewall Ayarları**
   - Port 80 (HTTP)
   - Port 443 (HTTPS)
   - Port 3000 (Node.js uygulaması)

2. **Environment Variables**
   - `.env` dosyasının güvenliği
   - Hassas bilgilerin şifrelenmesi

3. **Veritabanı Güvenliği**
   - Güçlü şifreler
   - Düzenli yedekleme
   - Erişim kısıtlamaları

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Logları kontrol edin: `pm2 logs steelakademi`
2. Uygulama durumunu kontrol edin: `pm2 status`
3. Veritabanı bağlantısını test edin
4. Ortam değişkenlerini kontrol edin

## ✅ Kurulum Tamamlandı

Kurulum tamamlandıktan sonra:
- https://subdomain.domain.com adresinden erişebilirsiniz
- Admin paneline `/admin` yolundan erişebilirsiniz
- İlk kullanıcıyı kayıt olarak oluşturabilirsiniz 