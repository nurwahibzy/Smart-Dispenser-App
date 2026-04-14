"use client";

import { useState } from "react";
import { useEditNama } from "../hooks/useEditNama";
import { useEditEmail } from "../hooks/useEditEmail";

interface Props {
  open: boolean;
  uid: string;
  namaSekarang: string;
  emailSekarang: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalEditProfile({
  open,
  uid,
  namaSekarang,
  emailSekarang,
  onClose,
  onSuccess,
}: Props) {
  const [nama, setNama] = useState(namaSekarang);
  const [email, setEmail] = useState(emailSekarang);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { editNama } = useEditNama();
  const { editEmail } = useEditEmail();

  if (!open) return null;

  async function handleSubmit() {
    try {
      setLoading(true);
      setError(null);

      if (nama !== namaSekarang) await editNama(nama);
      if (email !== emailSekarang) await editEmail(uid, email);

      await onSuccess();
      onClose();
    } catch (err) {
      setError("Gagal menyimpan perubahan. Coba lagi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const fields = [
    {
      label: "Nama",
      value: nama,
      set: setNama,
      type: "text",
      placeholder: "Masukkan nama",
    },
    {
      label: "Email",
      value: email,
      set: setEmail,
      type: "email",
      placeholder: "Masukkan email",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-gray-200">
        <h2 className="text-base font-medium text-gray-900 mb-4">
          Edit Profile
        </h2>

        <div className="flex flex-col gap-3 mb-4">
          {fields.map(({ label, value, set, type, placeholder }) => (
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
            className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
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