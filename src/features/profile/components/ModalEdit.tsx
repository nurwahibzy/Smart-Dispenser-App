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

  const {
    editNama,
    loading: loadingNama,
    error: errorNama,
  } = useEditNama(onSuccess);

  const {
    editEmail,
    loading: loadingEmail,
    error: errorEmail,
  } = useEditEmail(onSuccess);

  if (!open) return null;

  const loading = loadingNama || loadingEmail;

  async function handleSubmit() {
    if (nama !== namaSekarang) {
      await editNama(nama);
    }

    if (email !== emailSekarang) {
      await editEmail(uid,email);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-gray-200">
        <h2 className="text-base font-medium text-gray-900 mb-4">
          Edit Profile
        </h2>

        {/* Nama */}
        <div className="flex flex-col gap-1.5 mb-3">
          <label className="text-xs text-gray-500 uppercase">Nama</label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border rounded-lg px-4 py-2.5 text-sm"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-xs text-gray-500 uppercase">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2.5 text-sm"
          />
        </div>

        {/* Error */}
        {(errorNama || errorEmail) && (
          <div className="bg-red-50 text-red-700 text-sm p-2 rounded mb-3">
            {errorNama || errorEmail}
          </div>
        )}

        {/* Button */}
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 border py-2.5 rounded-lg text-sm"
          >
            Batal
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}