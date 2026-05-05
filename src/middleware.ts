import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const SESSION_ONLY_DURATION = 24 * 60 * 60; // 1 hari

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const now = Math.floor(Date.now() / 1000);

    // Jika tidak remember me, cek expiry berdasarkan loginTime
    if (token?.rememberMe === false) {
      const loginTime = (token.loginTime as number) || (token.iat as number);
      const elapsed = now - loginTime;

      // console.log(
      //   `[Middleware] Elapsed: ${elapsed}s / ${SESSION_ONLY_DURATION}s`,
      // );

      if (elapsed > SESSION_ONLY_DURATION) {
        //console.log("[Middleware] Session expired, redirecting to login");
        const res = NextResponse.redirect(new URL("/admin/login", req.url));
        res.cookies.delete("next-auth.session-token");
        return res;
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
  const pathname = req.nextUrl.pathname;
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/forgot-password") ||
    pathname.startsWith("/admin/reset-password")
  ) {
    return true;
  }

  if (!token) return false;

  if (pathname.startsWith("/admin/manage-admins")) {
    return token.role === "super admin";
  }

  return token.role === "admin" || token.role === "super admin";
},
    },
  },
);

export const config = {
  matcher: ["/admin/:path*"],
};