import { NextAuthOptions, Account, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import {comparePassword} from "@/lib/utils/hash";

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
        if (userData.role !== "admin") return null;

        return {
          id: snapshot.docs[0].id,
          email: userData.email,
          name: userData.name,
          role: userData.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }) {
      if (account?.provider === "credentials" && user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.email && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name as string;
        session.user.role = token.role;
      }
      return session;
    },
  },

  pages: {
    signIn: "/admin/login",
  },
};