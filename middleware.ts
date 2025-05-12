import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname;
  
  // Check if the path is an admin path but not the login page
  const isAdminRoute = path.startsWith('/admin');
  const isLoginPage = path.startsWith('/admin/login');
  
  // Check if the user is logged in
  const isAuthenticated = request.cookies.has('adminAuth');
  
  // Redirect to login if trying to access admin routes without authentication
  if (isAdminRoute && !isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // Redirect to admin panel if already authenticated and trying to access login
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  return NextResponse.next();
}

// Configure the paths that the middleware should run on
export const config = {
  matcher: ['/admin/:path*'],
}; 