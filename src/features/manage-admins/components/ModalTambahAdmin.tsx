"use client";

import { useState } from "react";
import { useTambahAdmin } from "../hooks/useTambahAdmin";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalTambahAdmin({ onClose, onSuccess }: Props) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { tambahAdmin, loading, error } = useTambahAdmin(onSuccess);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-gray-200">
        <h2 className="text-base font-medium text-gray-900 mb-5">
          Tambah Admin Baru
        </h2>

        <div className="flex flex-col gap-3 mb-4">
          {[
            {
              label: "Nama",
              value: nama,
              set: setNama,
              type: "text",
              placeholder: "Nama admin",
            },
            {
              label: "Email",
              value: email,
              set: setEmail,
              type: "email",
              placeholder: "admin@email.com",
            },
            {
              label: "Password Sementara",
              value: password,
              set: setPassword,
              type: "password",
              placeholder: "••••••••",
            },
          ].map(({ label, value, set, type, placeholder }) => (
            <div key={label} className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => set(e.target.value)}
                placeholder={placeholder}
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={() => tambahAdmin({ name: nama, email, password })}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-40"
          >
            {loading ? "Menyimpan..." : "Tambah"}
          </button>
        </div>
      </div>
    </div>
  );
}