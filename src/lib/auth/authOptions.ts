import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const q = query(
          collection(db, "users"),
          where("email", "==", credentials.email),
        );

        const snapshot = await getDocs(q);
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
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // console.log("USER REMEMBER:", user.rememberMe);

        token.id = user.id;
        token.role = user.role;
        token.rememberMe = user.rememberMe;

        const now = Math.floor(Date.now() / 1000);

        token.exp = token.rememberMe
          ? now + 30 * 24 * 60 * 60 // 30 hari
          : now + 24 * 60 * 60; // 1 hari

        token.loginTime = now;
      }

     // console.log("TOKEN REMEMBER:", token.rememberMe);
      return token;
    },

    async session({ session, token }) {
      // console.log("SESSION TOKEN REMEMBER:", token.rememberMe);

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

export default authOptions;