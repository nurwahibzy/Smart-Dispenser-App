"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { profileService } from "../service/ProfileService";

export function useGantiPassword(onSukses?: () => void) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sukses, setSukses] = useState(false);

  async function gantiPassword(
    passwordLama: string,
    passwordBaru: string,
    konfirmasi: string,
  ) {
    if (!session?.user?.id) return;

    if (!passwordLama || !passwordBaru || !konfirmasi) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (passwordBaru !== konfirmasi) {
      setError("Password baru dan konfirmasi tidak cocok.");
      return;
    }
    if (passwordBaru.length < 6) {
      setError("Password baru minimal 6 karakter.");
      return;
    }

    setError("");
    setSukses(false);
    setLoading(true);

    try {
      await profileService.gantiPassword(
        session.user.id,
        passwordLama,
        passwordBaru,
      );
      setSukses(true);
      onSukses?.(); // ← callback buat tutup modal
    } catch (err) {
      const error = err as Error;
      if (error.message === "Password lama salah") {
        setError("Password lama salah.");
      } else {
        setError("Gagal mengganti password.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { gantiPassword, loading, error, sukses };
}