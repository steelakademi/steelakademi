'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Building,
  Users,
  MessageSquare,
  CheckCircle
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-posta',
      value: 'info@steelakademi.com',
      description: 'Genel sorularınız için'
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+90 212 555 0123',
      description: 'Pazartesi - Cuma 09:00-18:00'
    },
    {
      icon: MapPin,
      title: 'Adres',
      value: 'İstanbul, Türkiye',
      description: 'Merkez ofis'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      value: '09:00 - 18:00',
      description: 'Pazartesi - Cuma'
    }
  ]

  const branches = [
    {
      city: 'İstanbul',
      address: 'Maslak Mah. Büyükdere Cad. No:123',
      phone: '+90 212 555 0123',
      email: 'istanbul@steelakademi.com'
    },
    {
      city: 'Ankara',
      address: 'Çankaya Mah. Atatürk Bulvarı No:456',
      phone: '+90 312 555 0456',
      email: 'ankara@steelakademi.com'
    },
    {
      city: 'İzmir',
      address: 'Alsancak Mah. Kıbrıs Şehitleri Cad. No:789',
      phone: '+90 232 555 0789',
      email: 'izmir@steelakademi.com'
    }
  ]

  return (
    <div className="min-h-screen bg-steel-900">
      {/* Header */}
      <div className="bg-steel-800 border-b border-steel-700 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">İletişim</h1>
            <p className="text-steel-300">
              Bizimle iletişime geçin, sorularınızı yanıtlayalım
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-steel-800 border-steel-700">
              <CardHeader>
                <CardTitle className="text-white">Mesaj Gönderin</CardTitle>
                <CardDescription className="text-steel-300">
                  Sorularınızı veya önerilerinizi bizimle paylaşın
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Mesajınız Gönderildi!</h3>
                    <p className="text-steel-300">
                      En kısa sürede size geri dönüş yapacağız.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white placeholder-steel-400"
                          placeholder="Adınız ve soyadınız"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white placeholder-steel-400"
                          placeholder="ornek@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                          Şirket
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white placeholder-steel-400"
                          placeholder="Şirket adınız"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                          Konu *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white"
                        >
                          <option value="">Konu seçin</option>
                          <option value="general">Genel Bilgi</option>
                          <option value="partnership">İş Ortaklığı</option>
                          <option value="support">Teknik Destek</option>
                          <option value="feedback">Geri Bildirim</option>
                          <option value="other">Diğer</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        Mesaj *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-3 py-2 border border-steel-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C1966B] focus:border-transparent bg-steel-700 text-white placeholder-steel-400 resize-none"
                        placeholder="Mesajınızı buraya yazın..."
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#C1966B] hover:bg-[#B08A5F] text-black"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Mesaj Gönder
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* General Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">İletişim Bilgileri</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="bg-steel-800 border-steel-700">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-steel-700">
                          <info.icon className="h-5 w-5 text-[#C1966B]" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{info.title}</h3>
                          <p className="text-[#C1966B] font-semibold">{info.value}</p>
                          <p className="text-steel-400 text-sm">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Branches */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Şubelerimiz</h2>
              <div className="space-y-4">
                {branches.map((branch, index) => (
                  <Card key={index} className="bg-steel-800 border-steel-700">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-steel-700">
                          <Building className="h-5 w-5 text-[#C1966B]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-2">{branch.city} Şubesi</h3>
                          <div className="space-y-1 text-sm">
                            <p className="text-steel-300 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {branch.address}
                            </p>
                            <p className="text-steel-300 flex items-center">
                              <Phone className="h-3 w-3 mr-1" />
                              {branch.phone}
                            </p>
                            <p className="text-steel-300 flex items-center">
                              <Mail className="h-3 w-3 mr-1" />
                              {branch.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Hakkımızda</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-steel-800 border-steel-700 text-center">
                  <CardContent className="p-4">
                    <Users className="h-8 w-8 text-[#C1966B] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">1,247</div>
                    <div className="text-steel-400 text-sm">Aktif Kullanıcı</div>
                  </CardContent>
                </Card>
                <Card className="bg-steel-800 border-steel-700 text-center">
                  <CardContent className="p-4">
                    <Building className="h-8 w-8 text-[#C1966B] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-steel-400 text-sm">Şube</div>
                  </CardContent>
                </Card>
                <Card className="bg-steel-800 border-steel-700 text-center">
                  <CardContent className="p-4">
                    <MessageSquare className="h-8 w-8 text-[#C1966B] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="text-steel-400 text-sm">Destek</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 