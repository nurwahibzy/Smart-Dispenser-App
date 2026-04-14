"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { profileService } from "../service/ProfileService";

export function useEditNama(onSukses?: () => void) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState(false);

  async function editNama(name: string) {
    if (!session?.user?.id) return;
    if (!name.trim()) {
      setError("Nama tidak boleh kosong.");
      return;
    }

    setError("");
    setSukses(false);
    setLoading(true);

    try {
      await profileService.editNama(session.user.id, name);
      setSukses(true);
      onSukses?.(); 
    } catch (err) {
      setError("Gagal menyimpan nama.");
    } finally {
      setLoading(false);
    }
  }

  return { editNama, loading, error, sukses };
}
