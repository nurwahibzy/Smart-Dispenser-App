import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false;

      const pathname = req.nextUrl.pathname;

      if (pathname.startsWith("/admin/manage-admins")) {
        return token.role === "super admin";
      }

      return token.role === "admin" || token.role === "super admin";
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};