import { proxy } from "@/proxy"

export const middleware = proxy;

export const config = {
  matcher: ["/admin/:path*"],
};