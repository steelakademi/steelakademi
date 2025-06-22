import nodemailer from 'nodemailer'

// E-posta transporter'ı oluştur
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})

// E-posta şablonları
const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Steel Akademi\'ye Hoş Geldiniz!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
          <h1 style="color: #C1966B; margin: 0;">Steel Akademi</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2>Merhaba ${name}!</h2>
          <p>Steel Akademi'ye başarıyla kayıt oldunuz. Artık tüm eğitim içeriklerine erişebilir ve kendinizi geliştirebilirsiniz.</p>
          <div style="background-color: #C1966B; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Başlamak için:</h3>
            <ul style="text-align: left;">
              <li>Video eğitimlerini izleyin</li>
              <li>Blog yazılarını okuyun</li>
              <li>Sorularınızı sorun</li>
              <li>Puanlarınızı toplayın</li>
            </ul>
          </div>
          <p>Herhangi bir sorunuz olursa bizimle iletişime geçebilirsiniz.</p>
          <p>İyi çalışmalar,<br>Steel Akademi Ekibi</p>
        </div>
      </div>
    `
  }),

  newVideo: (videoTitle: string, userName: string) => ({
    subject: 'Yeni Video Eğitimi: ' + videoTitle,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
          <h1 style="color: #C1966B; margin: 0;">Steel Akademi</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2>Merhaba ${userName}!</h2>
          <p>Yeni bir video eğitimi eklendi:</p>
          <div style="background-color: #C1966B; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>${videoTitle}</h3>
            <p>Bu eğitimi izleyerek puanlarınızı artırabilir ve bilginizi geliştirebilirsiniz.</p>
          </div>
          <p>Hemen izlemek için Steel Akademi'ye giriş yapın!</p>
          <p>İyi çalışmalar,<br>Steel Akademi Ekibi</p>
        </div>
      </div>
    `
  }),

  newBlog: (blogTitle: string, userName: string) => ({
    subject: 'Yeni Blog Yazısı: ' + blogTitle,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
          <h1 style="color: #C1966B; margin: 0;">Steel Akademi</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2>Merhaba ${userName}!</h2>
          <p>Yeni bir blog yazısı yayınlandı:</p>
          <div style="background-color: #C1966B; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>${blogTitle}</h3>
            <p>Bu yazıyı okuyarak sektördeki son gelişmeleri takip edebilirsiniz.</p>
          </div>
          <p>Hemen okumak için Steel Akademi'ye giriş yapın!</p>
          <p>İyi çalışmalar,<br>Steel Akademi Ekibi</p>
        </div>
      </div>
    `
  }),

  newAnnouncement: (announcementTitle: string, userName: string) => ({
    subject: 'Yeni Duyuru: ' + announcementTitle,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
          <h1 style="color: #C1966B; margin: 0;">Steel Akademi</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2>Merhaba ${userName}!</h2>
          <p>Yeni bir duyuru yayınlandı:</p>
          <div style="background-color: #C1966B; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>${announcementTitle}</h3>
            <p>Bu duyuruyu okumak için Steel Akademi'ye giriş yapın.</p>
          </div>
          <p>İyi çalışmalar,<br>Steel Akademi Ekibi</p>
        </div>
      </div>
    `
  }),

  questionAnswered: (questionTitle: string, userName: string) => ({
    subject: 'Sorunuza Cevap Geldi: ' + questionTitle,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1a1a; color: white; padding: 20px; text-align: center;">
          <h1 style="color: #C1966B; margin: 0;">Steel Akademi</h1>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9;">
          <h2>Merhaba ${userName}!</h2>
          <p>Sorunuza yeni bir cevap geldi:</p>
          <div style="background-color: #C1966B; color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>${questionTitle}</h3>
            <p>Cevabı okumak için Steel Akademi'ye giriş yapın.</p>
          </div>
          <p>İyi çalışmalar,<br>Steel Akademi Ekibi</p>
        </div>
      </div>
    `
  })
}

// E-posta gönderme fonksiyonu
export async function sendEmail(to: string, template: keyof typeof emailTemplates, data: any) {
  try {
    let emailTemplate
    
    switch (template) {
      case 'welcome':
        emailTemplate = emailTemplates.welcome(data.name)
        break
      case 'newVideo':
        emailTemplate = emailTemplates.newVideo(data.videoTitle, data.userName)
        break
      case 'newBlog':
        emailTemplate = emailTemplates.newBlog(data.blogTitle, data.userName)
        break
      case 'newAnnouncement':
        emailTemplate = emailTemplates.newAnnouncement(data.announcementTitle, data.userName)
        break
      case 'questionAnswered':
        emailTemplate = emailTemplates.questionAnswered(data.questionTitle, data.userName)
        break
      default:
        throw new Error(`Unknown email template: ${template}`)
    }
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@steelakademi.com',
      to: to,
      subject: emailTemplate.subject,
      html: emailTemplate.html
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error: error }
  }
}

// Toplu e-posta gönderme
export async function sendBulkEmail(emails: string[], template: keyof typeof emailTemplates, data: any) {
  const results = []
  
  for (const email of emails) {
    const result = await sendEmail(email, template, data)
    results.push({ email, result })
    
    // Rate limiting - her e-posta arasında 1 saniye bekle
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
  
  return results
} 