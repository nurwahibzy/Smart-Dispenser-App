"use client";

import { useState, useRef, useEffect } from "react";
import { AdminProfile } from "@/types/profile";
import ModalEditProfile from "./ModalEdit";
import ModalGantiPassword from "./ModalGantiPassword";
import { Pencil, User, Mail, ShieldCheck, Radio } from "lucide-react";
import { useEditFoto } from "../hooks/useEditFoto";
import Image from "next/image";

interface Props {
  profile: AdminProfile;
  onRefresh: () => void;
}

export default function ProfileCard({ profile, onRefresh }: Props) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [loadingFoto, setLoadingFoto] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [foto, setFoto] = useState(profile.photoURL);

  useEffect(() => {
    setFoto(profile.photoURL);
  }, [profile.photoURL]);

  const inputFotoRef = useRef<HTMLInputElement>(null);
  const { editFoto } = useEditFoto();

  function tampilToast(pesan: string) {
    setToast(pesan);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleGantiFotoLangsung(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoadingFoto(true);
      const photoURL = await editFoto(profile.id, file);
      if (!photoURL) {
        tampilToast("Gagal upload foto");
        return;
      }
      setFoto(photoURL);
      await onRefresh();
      tampilToast("Foto profil berhasil diperbarui");
    } catch {
      tampilToast("Gagal upload foto.");
    } finally {
      setLoadingFoto(false);
    }
  }

  const infoRows = [
    { icon: <User size={15} />, label: "Nama lengkap", value: profile.name },
    { icon: <Mail size={15} />, label: "Email", value: profile.email },
    {
      icon: <ShieldCheck size={15} />,
      label: "Role",
      value: profile.role ?? "Super Admin",
    },
    {
      icon: <Radio size={15} />,
      label: "Status",
      value: profile.status ? "Aktif" : "Nonaktif",
      valueClass: profile.status ? "text-green-600" : "text-red-500",
    },
  ];

  return (
    <div className="w-full max-w-sm mx-auto bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-md">
          {toast}
        </div>
      )}

      {/* HEADER BANNER */}
      <div className="h-24 bg-blue-600 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* AVATAR */}
      <div className="flex flex-col items-center -mt-10 px-6 pb-6">
        <div className="relative mb-3">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 border-[3px] border-white flex items-center justify-center text-white text-2xl font-medium overflow-hidden shadow-sm">
            {foto ? (
              <Image
                src={foto}
                alt="Foto profil"
                width={80}
                height={80}
                unoptimized
                className="w-full h-full object-cover"
              />
            ) : profile.name ? (
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xl font-semibold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-white">
                <User size={24} />
              </div>
            )}
          </div>

          <button
            onClick={() => inputFotoRef.current?.click()}
            disabled={loadingFoto}
            className="absolute -bottom-1 -right-1 bg-white border border-gray-200 p-1 rounded-full shadow-sm disabled:opacity-50 hover:bg-gray-50 transition"
          >
            <Pencil size={12} className="text-gray-500" />
          </button>

          <input
            ref={inputFotoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleGantiFotoLangsung}
          />
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-gray-100 mb-4" />

        {/* INFO ROWS */}
        <div className="w-full space-y-1 mb-5">
          {infoRows.map(({ icon, label, value, valueClass }) => (
            <div
              key={label}
              className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                {icon}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-gray-400 leading-none mb-0.5">
                  {label}
                </p>
                <p
                  className={`text-sm font-medium truncate ${valueClass ?? "text-gray-800"}`}
                >
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            onClick={() => setModalEdit(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl transition"
          >
            Edit Profil
          </button>
          <button
            onClick={() => setModalPassword(true)}
            className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2.5 rounded-xl transition"
          >
            Ganti Password
          </button>
        </div>
      </div>

      {/* MODALS */}
      <ModalEditProfile
        open={modalEdit}
        uid={profile.id}
        namaSekarang={profile.name}
        emailSekarang={profile.email}
        onClose={() => setModalEdit(false)}
        onSuccess={async () => {
          setModalEdit(false);
          tampilToast("Profil berhasil diperbarui");
          setTimeout(() => {
            onRefresh();
          }, 500);
        }}
      />

      {modalPassword && (
        <ModalGantiPassword
          onTutup={() => setModalPassword(false)}
          onSukses={() => {
            setModalPassword(false);
            tampilToast("Password berhasil diganti");
          }}
        />
      )}
    </div>
  );
}