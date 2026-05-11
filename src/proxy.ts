import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const SESSION_ONLY_DURATION = 24 * 60 * 60;

const PUBLIC_PATHS = [
  "/admin/login",
  "/admin/forgot-password",
  "/admin/reset-password",
];

export async function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (!token) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token.rememberMe === false) {
    const now = Math.floor(Date.now() / 1000);
    const loginTime = (token.loginTime as number) || (token.iat as number);
    const elapsed = now - loginTime;

    if (elapsed > SESSION_ONLY_DURATION) {
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete("next-auth.session-token");
      res.cookies.delete("__Secure-next-auth.session-token");
      return res;
    }
  }

  if (pathname.startsWith("/admin/manage-admins")) {
    if (token.role !== "super admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  if (token.role !== "admin" && token.role !== "super admin") {
    const res = NextResponse.redirect(new URL("/admin/login", req.url));
    res.cookies.delete("next-auth.session-token");
    res.cookies.delete("__Secure-next-auth.session-token");
    return res;
  }

  return NextResponse.next();
}

 export const config = {
   matcher: ["/admin/:path*"],
 };