import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    name?: string | null
    email: string
    role: string
    branch?: string | null
    salesSource?: string | null
    points: number
  }

  interface Session {
    user: {
      id: string
      name?: string | null
      email: string
      role: string
      branch?: string | null
      salesSource?: string | null
      points: number
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: string
    branch?: string | null
    salesSource?: string | null
    points: number
  }
} 