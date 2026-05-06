import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { adminDb } from "@/lib/firebase/admin";
import { comparePassword } from "@/lib/utils/hash";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember Me", type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const snapshot = await adminDb
            .collection("users")
            .where("email", "==", credentials.email)
            .limit(1)
            .get();

          if (snapshot.empty) return null;

          const userData = snapshot.docs[0].data();
          const isValid = await comparePassword(
            credentials.password,
            userData.password,
          );

          if (!isValid) return null;
          if (userData.role !== "admin" && userData.role !== "super admin")
            return null;

          return {
            id: snapshot.docs[0].id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            rememberMe: credentials.rememberMe === "true",
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.rememberMe = user.rememberMe;
        const now = Math.floor(Date.now() / 1000);
        token.exp = token.rememberMe
          ? now + 30 * 24 * 60 * 60
          : now + 24 * 60 * 60;
        token.loginTime = now;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role;
      }
      session.rememberMe = token.rememberMe;
      if (token.exp) {
        session.expires = new Date((token.exp as number) * 1000).toISOString();
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};
