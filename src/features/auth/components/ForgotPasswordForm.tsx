"use client";

import { useState } from "react";
import Link from "next/link";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const { requestReset, loading, error, message, cooldown } =
    useForgotPassword();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setEmailError("");

    if (!email) {
      setEmailError("Email wajib diisi");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Format email tidak valid");
      return;
    }

    const success = await requestReset(email);
    if (success) {
      setEmail("");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Lupa Password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Masukkan email Anda untuk reset password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email */}
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              disabled={loading || cooldown > 0}
              className="w-full px-3 py-2 border rounded-lg"
            />

            {emailError && (
              <p className="text-xs text-red-500 mt-1">{emailError}</p>
            )}
          </div>

          {/* ERROR API */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* SUCCESS */}
          {message && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              {message}
            </div>
          )}

          {/* COOLDOWN INFO */}
          {cooldown > 0 && (
            <p className="text-xs text-gray-500 text-center">
              Coba lagi dalam {cooldown} detik
            </p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className="w-full py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading
              ? "Mengirim..."
              : cooldown > 0
                ? `Tunggu ${cooldown}s`
                : "Kirim Link Reset Password"}
          </button>

          <div className="text-center">
            <Link href="/admin/login" className="text-sm text-blue-600">
            Kembali ke Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}