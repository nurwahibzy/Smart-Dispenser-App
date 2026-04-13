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
    <div>
      <ProfileCard profile={profile} onRefresh={() => mutate()} />

      <ModalEditProfile
        open={open}
        uid={uid}
        namaSekarang={profile.name}
        emailSekarang={profile.email}
        onClose={() => setOpen(false)}
        onSuccess={() => mutate()}
      />
    </div>
  );
}
