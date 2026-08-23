import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const decoded = verifyToken(token);

      if (pathname.startsWith('/admin') && decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }

    return NextResponse.next();
  }

  if (isAuthRoute && token) {
    try {
      const decoded = verifyToken(token);
      if (decoded.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch {
      // Invalid/expired token - clear it and allow access to the auth page
      const response = NextResponse.next();
      response.cookies.delete('auth-token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*', '/admin/:path*'],
};
