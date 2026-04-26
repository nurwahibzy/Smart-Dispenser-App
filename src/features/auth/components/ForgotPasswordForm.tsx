"use client";

import { useState } from "react";
import Link from "next/link";
import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const { requestReset, loading, error, message } = useForgotPassword();
  const [emailError, setEmailError] = useState("");

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
            Masukkan email Anda dan kami akan mengirim link untuk reset password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Email address"
              disabled={loading}
            />
            {emailError && (
              <p className="mt-1 text-xs text-red-500">{emailError}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
              {message}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Mengirim..." : "Kirim Link Reset Password"}
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <Link
              href="/admin/login"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              ← Kembali ke Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}