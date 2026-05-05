"use client";

import { useState } from "react";
import { useGantiPassword } from "../hooks/useGantiPassword";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  onTutup: () => void;
  onSukses: () => void;
}

export default function ModalGantiPassword({ onTutup, onSukses }: Props) {
  const [passwordLama, setPasswordLama] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [showPasswordLama, setShowPasswordLama] = useState(false);
  const [showPasswordBaru, setShowPasswordBaru] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const { gantiPassword, loading, error } = useGantiPassword(onSukses);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-gray-200">
        <h2 className="text-base font-medium text-gray-900 mb-4">
          Ganti Password
        </h2>

        <div className="flex flex-col gap-3 mb-4">
          {[
            {
              label: "Password Lama",
              value: passwordLama,
              set: setPasswordLama,
              show: showPasswordLama,
              toggle: () => setShowPasswordLama(!showPasswordLama),
            },
            {
              label: "Password Baru",
              value: passwordBaru,
              set: setPasswordBaru,
              show: showPasswordBaru,
              toggle: () => setShowPasswordBaru(!showPasswordBaru),
            },
            {
              label: "Konfirmasi Password Baru",
              value: konfirmasi,
              set: setKonfirmasi,
              show: showKonfirmasi,
              toggle: () => setShowKonfirmasi(!showKonfirmasi),
            },
          ].map(({ label, value, set, show, toggle }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {label}
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder="••••••••"
                  className="border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />

                <button
                  type="button"
                  onClick={toggle}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-sm text-red-700 mb-4">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={onTutup}
            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() =>
              gantiPassword(passwordLama, passwordBaru, konfirmasi)
            }
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-40"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}
