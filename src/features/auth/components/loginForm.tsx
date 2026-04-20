"use client";

import { useState } from "react";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Droplets } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      {/* Logo + Judul */}
      <div className="flex flex-col items-center gap-3 mb-2">
        <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center">
          <Droplets size={20} className="text-white" />
        </div>
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-1000">Login</h1>
          <p className="text-sm text-gray-500 mt-1">Smart Dispenser</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-black-500 uppercase tracking-wide">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-black-500 uppercase tracking-wide">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Tombol */}
      <div className="justify-between items-center gap-4 flex flex-col sm:flex-row ">
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
          className="text-blue-600 hover:text-blue-700 font-medium py-2.5 rounded-lg text-sm transition-colors"
        >
          Kembali
        </button>
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </div>
    </form>
  );
}
