FROM node:18-alpine

WORKDIR /app

# Package files kopyala
COPY package*.json ./
COPY prisma ./prisma/

# Bağımlılıkları yükle
RUN npm ci --only=production

# Prisma client oluştur
RUN npx prisma generate

# Uygulama dosyalarını kopyala
COPY .next ./.next
COPY public ./public
COPY next.config.js ./
COPY tailwind.config.ts ./
COPY tsconfig.json ./
COPY postcss.config.js ./

# Port aç
EXPOSE 3000

# Uygulamayı başlat
CMD ["npm", "start"] 