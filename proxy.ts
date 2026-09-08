import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Route protection middleware.
//
// Only ADMIN/staff accounts are live today. The CUSTOMER portal (/account)
// and its role redirects below are left in place but unused — customer
// accounts are a FUTURE IMPROVEMENT. When they ship, remove the
// "// FUTURE" comments and the sign-up route stays disabled until
// customer self-registration is switched back on.
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthPage = pathname.startsWith("/signin") || pathname.startsWith("/signup");
  const isAdminRoute = pathname.startsWith("/admin");
  const isAccountRoute = pathname.startsWith("/account");

  // Already signed in → redirect away from auth pages based on role
  if (isAuthPage && token) {
    const url = req.nextUrl.clone();
    // FUTURE: token.role === "CUSTOMER" → "/account" when the customer portal ships.
    url.pathname = token.role === "ADMIN" ? "/admin" : "/account";
    return NextResponse.redirect(url);
  }

  // Protect /admin — ADMIN role only
  if (isAdminRoute) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
    if (token.role !== "ADMIN") {
      const url = req.nextUrl.clone();
      // FUTURE: customer role route. Admins always get /admin.
      url.pathname = "/account";
      return NextResponse.redirect(url);
    }
  }

  // Protect /account — CUSTOMER role only (FUTURE improvement)
  if (isAccountRoute) {
    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
    if (token.role !== "CUSTOMER") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin/:path*", "/signup/:path*", "/admin/:path*", "/account/:path*"],
};
