import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isUnderConstruction =
  process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === 'fasle';
/**
 * Middleware for handling website construction mode
 * Redirects users to construction page when NEXT_PUBLIC_UNDER_CONSTRUCTION=true
 */
export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // If the site is under construction, redirect to the construction page
  if (isUnderConstruction) {
    // if the request is for the construction page allow it
    if (pathname.startsWith('/websiteUnderConstruction')) {
      return NextResponse.next();
    }

    // Redirect to construction page
    logRedirect(
      pathname,
      '/websiteUnderConstruction',
      'site under construction'
    );

    return NextResponse.redirect(
      new URL('/websiteUnderConstruction', request.url)
    );
  } else {
    // If the site is live, redirect to the home page
    return NextResponse.next();
  }
}

// Matcher ignoring `/_next/` and `/api/`...
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
};

/**
 * Logs middleware redirects with timestamp and context
 */
function logRedirect(from: string, to: string, reason: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔄 [${new Date().toISOString()}] ${from} → ${to} (${reason})`);
  }
}
