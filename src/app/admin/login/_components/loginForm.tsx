"use client";

import { useState } from "react";
import { useLogin } from "@/features/auth/hooks/useLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useLogin(); 

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@email.com"
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Tombol */}
      <button
        onClick={() => login({ email, password })}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Memproses..." : "Login"}
      </button>
    </div>
  );
}