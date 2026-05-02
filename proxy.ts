import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("scas_token")?.value;
  const path = request.nextUrl.pathname;

  if (path.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((path.startsWith("/login") || path.startsWith("/register")) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const response = NextResponse.next();
  return response;
}

export const config = {
  matcher: ["/", "/login", "/register/:path*", "/dashboard/:path*"],
};
