// app/api/debug-token/route.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return NextResponse.json({
    token: token ? "ADA" : "NULL",
    nextauth_url: process.env.NEXTAUTH_URL,
    cookies: req.cookies.getAll().map((c) => c.name),
  });
}
