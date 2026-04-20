"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useAdminList } from "@/features/manage-admins/hooks/useAdminList";
import AdminTable from "@/features/manage-admins/components/AdminTable";
import ModalTambahAdmin from "@/features/manage-admins/components/ModalTambahAdmin";
import { Plus } from "lucide-react";

export default function ManageAdminsPage() {
  const { data: session } = useSession();
  const { admins, loading, refresh } = useAdminList();
  const [modalTambah, setModalTambah] = useState(false);

  // Cek role super admin
  if (session?.user?.role !== "super admin") {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-sm text-gray-400">
          Akses ditolak. Hanya super admin yang bisa membuka halaman ini.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-sm text-gray-400">Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium text-gray-900">Kelola Admin</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            {admins.length} admin terdaftar
          </p>
        </div>
        <button
          onClick={() => setModalTambah(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
        >
          <Plus size={16} />
          Tambah Admin
        </button>
      </div>

      {/* Tabel */}
      <AdminTable admins={admins} onRefresh={refresh} />

      {/* Modal Tambah */}
      {modalTambah && (
        <ModalTambahAdmin
          onClose={() => setModalTambah(false)}
          onSuccess={() => {
            setModalTambah(false);
            refresh();
          }}
        />
      )}
    </div>
  );
}