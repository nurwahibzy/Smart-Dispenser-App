"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export function SessionGuard() {
  useEffect(() => {
    const checkSession = async () => {
      const res = await fetch("/api/auth/session");
      const session = await res.json();

      if (!session?.user) return;

      const flag = sessionStorage.getItem("session-only");

      const isSessionOnly = !flag;

      if (isSessionOnly && !session.rememberMe) {
        await signOut({ callbackUrl: "/admin/login" });
      }
    };

    checkSession();
  }, []);

  return null;
}
