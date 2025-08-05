// middleware.ts
import { locales, defaultLocale } from './i18n';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    locales.some((locale) => pathname.startsWith(`/${locale}`)) ||
    pathname.startsWith('/_next')
  ) {
    return;
  }

  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
