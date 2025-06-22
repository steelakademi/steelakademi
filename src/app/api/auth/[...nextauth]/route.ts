import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Basit kullanıcı kontrolü
        if (credentials.email === 'admin@steelakademi.com' && credentials.password === 'admin123') {
          return {
            id: '1',
            email: 'admin@steelakademi.com',
            name: 'Admin',
            role: 'ADMIN'
          } as any
        }

        return null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/login'
  }
})

export { handler as GET, handler as POST } 