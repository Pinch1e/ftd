import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

// List of supported country codes (you can fetch and hardcode them once)
const SUPPORTED_COUNTRIES = ["us", "de", "fr", "gb", "ca"]

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const pathname = url.pathname
  const countryFromHeader = request.headers.get("x-vercel-ip-country")?.toLowerCase()
  const pathCountry = pathname.split("/")[1]?.toLowerCase()

  // Skip assets and API routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp)$/)
  ) {
    return NextResponse.next()
  }

  // Already localized — continue
  if (SUPPORTED_COUNTRIES.includes(pathCountry)) {
    return NextResponse.next()
  }

  // Determine fallback region
  const targetCountry =
    (countryFromHeader && SUPPORTED_COUNTRIES.includes(countryFromHeader) && countryFromHeader) ||
    DEFAULT_REGION

  const redirectUrl = new URL(`/${targetCountry}${pathname}${url.search}`, request.url)
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
}
