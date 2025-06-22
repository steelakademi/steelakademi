import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/auth')
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin')
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard')

    // Eğer kullanıcı giriş yapmışsa ve auth sayfalarına gitmeye çalışıyorsa dashboard'a yönlendir
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Eğer kullanıcı giriş yapmamışsa ve korumalı sayfalara gitmeye çalışıyorsa login'e yönlendir
    if (!isAuth && (isDashboardPage || isAdminPage)) {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // Admin kullanıcıları dashboard'a erişmeye çalıştığında admin paneline yönlendir
    if (isDashboardPage && token?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    // Admin sayfalarına sadece admin rolündeki kullanıcılar erişebilir
    if (isAdminPage && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/videos/:path*',
    '/blog/:path*',
    '/questions/:path*',
    '/announcements/:path*',
    '/reports/:path*'
  ]
} 