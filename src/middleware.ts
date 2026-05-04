import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/admin'];
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production-12345678';
      const decoded = jwt.verify(token, secret) as { role?: string };

      if (pathname.startsWith('/admin') && decoded.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('auth-token');
      return response;
    }
  }

  // Temporarily disabled - was causing redirect loop issues
  // if (isAuthRoute && token) {
  //   try {
  //     const secret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production-12345678';
  //     const decoded = jwt.verify(token, secret) as { role?: string };
  //     if (decoded.role === 'ADMIN') {
  //       return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  //     }
  //     return NextResponse.redirect(new URL('/dashboard', request.url));
  //   } catch {
  //     // Invalid token, allow access to login
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register'],
};
