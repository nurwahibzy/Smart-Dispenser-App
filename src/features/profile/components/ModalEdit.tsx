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

  const { editNama } = useEditNama();
  const { editEmail } = useEditEmail();

  if (!open) return null;

  async function handleSubmit() {
    try {
      setLoading(true);

      if (nama !== namaSekarang) await editNama(nama);
      if (email !== emailSekarang) await editEmail(uid, email);

      await onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm">
        <h2 className="mb-4 font-semibold">Edit Profile</h2>

        <input
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          className="border w-full mt-3 p-2"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full mt-3 p-2"
        />

        <div className="flex gap-2 mt-4">
          <button onClick={onClose} className="flex-1 border p-2">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white p-2"
          >
            {loading ? "Saving..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}