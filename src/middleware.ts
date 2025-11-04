import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This is a mock authentication token for the prototype.
// In a real application, this would be a secure, signed JWT or session token.
const MOCK_AUTH_COOKIE = 'mock-auth-token';

export function middleware(request: NextRequest) {
  // Assume the user is authenticated if they have the mock auth cookie
  const isAuthenticated = request.cookies.has(MOCK_AUTH_COOKIE);

  // For this prototype, we'll set the cookie if it doesn't exist to simulate a logged-in user.
  // In a real app, this would be set after a successful login flow.
  if (!isAuthenticated) {
    // If trying to access a protected route without being authenticated,
    // redirect to the landing page.
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  const response = NextResponse.next();

  // --- Mock Login Simulation ---
  // To allow access to the dashboard for the prototype, we set a mock cookie.
  // This simulates a user who has "logged in". A real login page would set this.
  if (!request.cookies.has(MOCK_AUTH_COOKIE)) {
    response.cookies.set(MOCK_AUTH_COOKIE, 'true', {
      httpOnly: true, // Not accessible via client-side JS
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
  }
  // --- End Mock Login Simulation ---

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - / (the landing page itself is not protected)
   */
  matcher: [
    '/dashboard/:path*',
    '/leads/:path*',
    '/scraping/:path*',
    '/settings/:path*',
    '/ai-assistant/:path*',
    '/campaign-builder/:path*',
    '/multi-channel/:path*',
    '/products/:path*',
    '/campaigns/:path*',
    '/leads-database/:path*',
    '/lead-generation/:path*',
    '/billing/:path*',
  ],
}
