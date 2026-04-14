"use client";

import { useState, useRef } from "react";
import { AdminProfile } from "@/types/profile";
import ModalEditProfile from "./ModalEdit";
import ModalGantiPassword from "./ModalGantiPassword";
import { Pencil } from "lucide-react";
import { useEditFoto } from "../hooks/useEditFoto";
import Image from "next/image";
import { useEffect } from "react";

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

     // console.log("NEW URL:", photoURL);
     // console.log("OLD URL:", profile.photoURL);

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

  return (
    <div className="bg-white border rounded-2xl p-8 w-full shadow-sm">
      {/* TOAST */}
      {toast && (
        <div className="fixed top-5 right-5 bg-black text-white px-4 py-2 rounded-lg">
          {toast}
        </div>
      )}

      {/* AVATAR */}
      <div className="flex flex-col items-center gap-3 mb-8">
        <div className="relative w-24 h-24">
          <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-3xl overflow-hidden">
            {foto ? (
              <Image
                src={`${foto}?t=${Date.now()}`}
                alt="Foto profil"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              profile.name?.charAt(0)?.toUpperCase()
            )}
          </div>

          {/* ICON */}
          <button
            onClick={() => inputFotoRef.current?.click()}
            disabled={loadingFoto}
            className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full disabled:opacity-50"
          >
            <Pencil size={14} />
          </button>

          <input
            ref={inputFotoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleGantiFotoLangsung}
          />
        </div>

        <p className="font-semibold">
          {loadingFoto ? "Uploading..." : profile.name}
        </p>
        <p className="text-sm text-gray-400">{profile.email}</p>
      </div>

      {/* BUTTON */}
      <div className="flex gap-2">
        <button
          onClick={() => setModalEdit(true)}
          className="flex-1 bg-blue-600 text-white py-2 rounded"
        >
          Edit Profile
        </button>

        <button
          onClick={() => setModalPassword(true)}
          className="flex-1 bg-yellow-500 text-white py-2 rounded"
        >
          Password
        </button>
      </div>

      {/* MODAL EDIT */}
      <ModalEditProfile
        open={modalEdit}
        uid={profile.id}
        namaSekarang={profile.name}
        emailSekarang={profile.email}
        onClose={() => setModalEdit(false)}
        onSuccess={async () => {
          setModalEdit(false);
          await onRefresh();
          tampilToast("Profil berhasil diperbarui");
        }}
      />

      {/* MODAL PASSWORD */}
      {modalPassword && (
        <ModalGantiPassword
          onTutup={() => setModalPassword(false)}
          onSukses={() => tampilToast("Password berhasil diganti")}
        />
      )}
    </div>
  );
}