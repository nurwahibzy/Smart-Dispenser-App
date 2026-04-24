import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

const handler = NextAuth(authOptions);

type NextAuthRequest = Parameters<typeof handler>[0];
type NextAuthContext = Parameters<typeof handler>[1];

async function authHandler(
  req: NextRequest,
  context: { params: Promise<{ nextauth: string[] }> },
) {
  const { nextauth } = await context.params;

  if (
    req.method === "POST" &&
    nextauth.includes("callback") &&
    nextauth.includes("credentials")
  ) {
    const response = (await handler(
      req as unknown as NextAuthRequest,
      context as unknown as NextAuthContext,
    )) as NextResponse;

    const setCookieHeader = response.headers.get("set-cookie");
    if (setCookieHeader) {
      const cookieValue = setCookieHeader.match(
        /next-auth\.session-token=([^;]+)/,
      )?.[1];

      if (cookieValue) {
        const decoded = await decode({
          token: cookieValue,
          secret: process.env.NEXTAUTH_SECRET!,
        });

        const rememberMe = decoded?.rememberMe === true;
        const isProduction = process.env.NODE_ENV === "production";

        let newCookie: string;

        if (rememberMe) {
          const maxAge = 30 * 24 * 60 * 60;
          newCookie = `next-auth.session-token=${cookieValue}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${
            isProduction ? "; Secure" : ""
          }`;
          // console.log(
          //   `[Auth] Remember Me: TRUE, Max-Age: ${maxAge}s (30 hari)`,
          // );
        } else {
          newCookie = `next-auth.session-token=${cookieValue}; Path=/; HttpOnly; SameSite=Lax${
            isProduction ? "; Secure" : ""
          }`;
          //console.log(
          //   "[Auth] Remember Me: FALSE, Session Cookie (hilang saat browser ditutup)",
          // );
        }

        response.headers.set("set-cookie", newCookie);
      }
    }

    return response;
  }

  return handler(
    req as unknown as NextAuthRequest,
    context as unknown as NextAuthContext,
  );
}

export { authHandler as GET, authHandler as POST };