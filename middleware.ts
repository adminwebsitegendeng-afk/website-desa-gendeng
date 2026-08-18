import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Jika user mencoba mengakses rute /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Jangan redirect jika sedang berada di halaman login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }
    
    // Cek apakah ada cookie tanda masuk (admin_token)
    const authToken = request.cookies.get('admin_token')?.value
    
    // Jika tidak ada token atau token tidak valid, lempar ke halaman login
    if (!authToken || authToken !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  // Terapkan middleware ini HANYA untuk path yang berawalan /admin
  matcher: ['/admin/:path*'],
}
