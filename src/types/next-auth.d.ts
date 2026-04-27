import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role?: string;
    rememberMe?: boolean;
  }

  interface Session {
    rememberMe?: boolean;
    user: {
      id?: string;
      email?: string | null;
      name?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    rememberMe?: boolean;
    loginTime?: number;
  }
}