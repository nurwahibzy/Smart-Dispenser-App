"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authServices";
import { LoginCredentials } from "../type";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function login(credentials: LoginCredentials) {
    setError("");
    setLoading(true);

    try {
      await authService.login(credentials.email, credentials.password);
      router.push("/admin/dashboard");
    } catch (err) {
      const error = err as Error;
      if (error.message === "Akses ditolak") {
        setError("Akun ini bukan admin.");
      } else {
        setError("Email atau password salah. Coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { login, loading, error };
}