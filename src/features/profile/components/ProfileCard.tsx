"use client";

import { useState, useRef, useEffect } from "react";
import { AdminProfile } from "@/types/profile";
import ModalEditProfile from "./ModalEdit";
import ModalGantiPassword from "./ModalGantiPassword";
import { Pencil, User, Mail, ShieldCheck, Radio, Loader2 } from "lucide-react";
import { useEditFoto } from "../hooks/useEditFoto";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  profile: AdminProfile;
  onRefresh: () => void;
}

export default function ProfileCard({ profile, onRefresh }: Props) {
  const [modalEdit, setModalEdit] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [loadingFoto, setLoadingFoto] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [cacheBuster, setCacheBuster] = useState(Date.now());
  const [foto, setFoto] = useState(profile.photoURL || "");

  const inputFotoRef = useRef<HTMLInputElement>(null);
  const { editFoto } = useEditFoto();

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      setFoto(profile.photoURL || "");
      isFirstLoad.current = false;
    }
  }, [profile.photoURL]);

  useEffect(() => {
    setImgError(false);
  }, [foto]);

  async function handleGantiFotoLangsung(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading("Mengupload foto...");

    try {
      setLoadingFoto(true);

      const photoURL = await editFoto(profile.id, file);

      if (!photoURL) {
        toast.error("Gagal upload foto", { id: toastId });
        return;
      }

      setFoto(photoURL);
      setCacheBuster(Date.now());

      setTimeout(async () => {
        await onRefresh();
      }, 1500);

      toast.success("Foto profil berhasil diperbarui", { id: toastId });
    } catch {
      toast.error("Gagal upload foto.", { id: toastId });
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
      {/* HEADER */}
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
          <div className="w-20 h-20 rounded-2xl bg-blue-600 border-[3px] border-white flex items-center justify-center text-white overflow-hidden shadow-sm relative">
            {foto && !imgError ? (
              <>
                <Image
                  src={`${foto}?t=${cacheBuster}`}
                  alt="Foto profil"
                  width={80}
                  height={80}
                  unoptimized
                  onError={() => {
                    setImgError(true);
                    setFoto("");
                  }}
                  className={`w-full h-full object-cover ${
                    loadingFoto ? "opacity-40 blur-sm" : ""
                  }`}
                />

                {loadingFoto && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Loader2 className="animate-spin text-white" size={20} />
                  </div>
                )}
              </>
            ) : profile.name ? (
              <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white text-xl font-semibold">
                {profile.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <User size={24} />
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={() => inputFotoRef.current?.click()}
            disabled={loadingFoto}
            className="absolute -bottom-1 -right-1 bg-white border p-1 rounded-full shadow-sm disabled:opacity-50"
          >
            <Pencil size={12} />
          </button>

          <input
            ref={inputFotoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleGantiFotoLangsung}
          />
        </div>

        {/* INFO */}
        <div className="w-full space-y-1 mb-5">
          {infoRows.map(({ icon, label, value, valueClass }) => (
            <div key={label} className="flex gap-3 py-2 border-b">
              <div className="w-8 h-8 flex items-center justify-center">
                {icon}
              </div>
              <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className={`text-sm ${valueClass ?? "text-gray-800"}`}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            onClick={() => setModalEdit(true)}
            className="bg-blue-600 text-white py-2 rounded-xl"
          >
            Edit Profil
          </button>
          <button
            onClick={() => setModalPassword(true)}
            className="bg-amber-500 text-white py-2 rounded-xl"
          >
            Ganti Password
          </button>
        </div>
      </div>

      {/* MODAL */}
      <ModalEditProfile
        open={modalEdit}
        uid={profile.id}
        namaSekarang={profile.name}
        emailSekarang={profile.email}
        onClose={() => setModalEdit(false)}
        onSuccess={async () => {
          setModalEdit(false);
          toast.success("Profil berhasil diperbarui");

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
            toast.success("Password berhasil diganti");
          }}
        />
      )}
    </div>
  );
}