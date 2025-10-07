import { NextRequest, NextResponse } from "next/server";
import { getLocale, pathnameHasLocale } from "./lib/locale";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    // Handle favicon requests - rewrite to root favicon
    if (pathname.endsWith('/favicon.ico') || pathname === '/favicon.ico') {
        return NextResponse.rewrite(new URL('/favicon.ico', request.url));
    }

    // Skip i18n routing for static assets
    if (
        pathname.startsWith('/images/') ||
        pathname.startsWith('/icons/') ||
        pathname.startsWith('/assets/') ||
        pathname.startsWith('/public/') ||
        pathname.includes('.') && !pathname.includes('/_next/') // Any file with extension
    ) {
        return NextResponse.next();
    }

    // Check if there is any supported locale in the pathname
    const hasLocale = pathnameHasLocale(pathname);
    if (hasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(pathname);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /fmao/get-started
    // The new URL is now /en/fmao/get-started
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next) but allow favicon and other static assets
        "/((?!_next|favicon.ico|images|icons|assets).*)",
        "/favicon.ico"
    ],
};