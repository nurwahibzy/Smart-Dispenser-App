"use client";

import { useState } from "react";
import { AdminProfile } from "@/types/profile";
import ModalEditProfile from "./ModalEdit";
import ModalGantiPassword from "./ModalGantiPassword";

interface Props {
  profile: AdminProfile;
  onRefresh: () => void;
}

export default function ProfileCard({ profile, onRefresh }: Props) {
  const [modalNama, setModalNama] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-md">
      {/* Avatar & Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xl font-medium">
          {profile.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-base font-medium text-gray-900">{profile.name}</p>
          <p className="text-sm text-gray-400">{profile.email}</p>
        </div>
      </div>

      {/* Detail */}
      <div className="border-t border-gray-100 pt-4 flex flex-col gap-3 mb-6">
        {[
          { label: "Nama", value: profile.name },
          { label: "Email", value: profile.email },
          { label: "Role", value: profile.role },
          { label: "Status", value: profile.status ? "Aktif" : "Nonaktif" },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              {label}
            </span>
            <span className="text-sm text-gray-700">{value}</span>
          </div>
        ))}
      </div>

      {/* Tombol Aksi */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setModalNama(true)}
          className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          Edit Profile
        </button>
        <button
          onClick={() => setModalPassword(true)}
          className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
        >
          Ganti Password
        </button>
      </div>

      {/* Modal Edit Nama */}
      {modalNama && (
        <ModalEditProfile
          open={modalNama}
          uid={profile.id}
          namaSekarang={profile.name}
          emailSekarang={profile.email}
          onClose={() => setModalNama(false)}
          onSuccess={() => {
            setModalNama(false);
            onRefresh();
          }}
        />
      )}

      {/* Modal Ganti Password */}
      {modalPassword && (
        <ModalGantiPassword
          onTutup={() => setModalPassword(false)}
          onSukses={() => setModalPassword(false)}
        />
      )}
    </div>
  );
}