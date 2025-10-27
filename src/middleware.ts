import { NextRequest, NextResponse } from "next/server"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"
const SUPPORTED_REGIONS = ["us", "de", "fr"] // <-- hardcode or fetch once at build time

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const country = request.headers.get("x-vercel-ip-country")?.toLowerCase()
  const pathCountry = url.pathname.split("/")[1]?.toLowerCase()

  // If already localized, continue
  if (SUPPORTED_REGIONS.includes(pathCountry)) return NextResponse.next()

  const redirectCountry =
    (country && SUPPORTED_REGIONS.includes(country) && country) || DEFAULT_REGION

  const redirectUrl = new URL(`/${redirectCountry}${url.pathname}${url.search}`, request.url)
  return NextResponse.redirect(redirectUrl)
}
