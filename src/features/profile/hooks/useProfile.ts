"use client";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { profileService } from "@/features/profile/service/ProfileService";

export function useProfile() {
  const { data: session } = useSession();
  const uid = session?.user?.id;

  const { data, error, isLoading, mutate } = useSWR(
    uid ? ["profile", uid] : null,
    () => profileService.getProfile(uid!),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    },
  );

  return {
    profile: data,
    isLoading,
    error,
    mutate, // ✅ PAKAI INI
  };
}