"use client";

import { useState } from "react";
import { useEditAdmin } from "../hooks/useEditAdmin";
import { AdminData } from "@/types/manage-admins";

interface Props {
  admin: AdminData;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalEditAdmin({ admin, onClose, onSuccess }: Props) {
  const [nama, setNama] = useState(admin.name);
  const { editAdmin, loading, error } = useEditAdmin(onSuccess);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm border border-gray-200">
        <h2 className="text-base font-medium text-gray-900 mb-5">Edit Admin</h2>

        {/* Nama */}
        <div className="flex flex-col gap-1.5 mb-3">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Nama
          </label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Email — read only */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Email
          </label>
          <input
            value={admin.email}
            disabled
            className="border border-gray-100 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
          />
        </div>

        {/* Role — read only */}
        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Role
          </label>
          <input
            value={admin.role}
            disabled
            className="border border-gray-100 rounded-lg px-4 py-2.5 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
          />
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
            onClick={() => editAdmin(admin.id, nama)}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition disabled:opacity-40"
          >
            {loading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}