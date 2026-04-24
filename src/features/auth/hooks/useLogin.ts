"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  async function login(email: string, password: string, rememberMe: boolean) {
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        rememberMe: rememberMe ? "true" : "false",
        redirect: false,
      });

      if (res?.error) {
        setError("Email atau password salah.");
        return;
      }

      //digunakan untuk menyimpan informasi rememberMe di sisi klien agar bisa digunakan untuk mengatur cookie di server
      if (!rememberMe) {
        sessionStorage.setItem("session-only", "true");
      } else {
        sessionStorage.removeItem("session-only");
      }

      router.push(callbackUrl);
    } catch (err) {
      setError("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}