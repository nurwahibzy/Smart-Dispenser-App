"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useProfile } from "@/features/profile/hooks/useProfile";
import ProfileCard from "@/features/profile/components/ProfileCard";
import ModalEditProfile from "@/features/profile/components/ModalEdit";

export default function ProfilePage() {
  const { data: session } = useSession();
  const { profile, isLoading, mutate } = useProfile();

  const [open, setOpen] = useState(false);

  const uid = session?.user?.id;

  if (isLoading || !profile || !uid) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Halaman Profile
        </h1>
        <p className="text-sm text-gray-500 text-center">
          Kelola informasi dan keamanan akun anda
        </p>
      </div>
      <ProfileCard
        profile={profile}
        onRefresh={() => mutate(undefined, { revalidate: true })}
      />

      <ModalEditProfile
        open={open}
        uid={uid}
        namaSekarang={profile.name}
        emailSekarang={profile.email}
        onClose={() => setOpen(false)}
        onSuccess={() => mutate(undefined, { revalidate: true })}
      />
    </div>
  );
}
