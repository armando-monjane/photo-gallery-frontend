import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { USER_TOKEN_COOKIE_NAME } from './redux/features/auth/auth-slice';

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/profile' &&
    !request.cookies.has(USER_TOKEN_COOKIE_NAME)
  ) {
    // redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile'],
};
