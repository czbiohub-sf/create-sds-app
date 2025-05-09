import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { JWT_SECRET } from "@/app/lib/constants"
import * as jose from "jose"

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api") || 
      request.nextUrl.pathname.startsWith("/_next")) {
    return NextResponse.next()
  }
  
  const token = request.cookies.get("auth-token")?.value
  
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }
  
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    await jose.jwtVerify(token, secret)
    
    return NextResponse.next()
  } catch (error) {
    const response = NextResponse.redirect(new URL("/", request.url))
    response.cookies.delete("auth-token")
    return response
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
