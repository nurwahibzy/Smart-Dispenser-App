"use client";

import { useState } from "react";
import Link from "next/link";
import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { XCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

interface ResetPasswordFormProps {
  token: string | null;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPassword, loading, error, success } = useResetPassword();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setValidationError("");

    // Validasi
    if (password !== confirmPassword) {
      setValidationError("Password tidak cocok");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password minimal 6 karakter");
      return;
    }

    if (!token) {
      setValidationError("Token tidak valid");
      return;
    }

    await resetPassword(token, password);
  }

  // Invalid Token State
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <XCircle className="w-14 h-14 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Token Tidak Valid
          </h2>
          <p className="text-gray-600 mb-6">
            Link reset password tidak valid atau sudah expired
          </p>
          <Link
            href="/admin/forgot-password"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Request Reset Password Lagi
          </Link>
        </div>
      </div>
    );
  }

  // Success State
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-2">
            Password Berhasil Direset!
          </h2>
          <p className="text-gray-600">
            Anda akan diarahkan ke halaman login...
          </p>
        </div>
      </div>
    );
  }

  // Form State
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Masukkan password baru Anda
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password Baru
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (validationError) setValidationError("");
                  }}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Password baru (min. 6 karakter)"
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (validationError) setValidationError("");
                  }}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Konfirmasi password"
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Validation Error */}
          {validationError && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {validationError}
            </div>
          )}

          {/* API Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Mereset..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}