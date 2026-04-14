"use client";

import { useState } from "react";
import { profileService } from "@/features/profile/service/ProfileService";

export function useEditEmail(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function editEmail(uid: string, email: string) {
    if (!email.trim()) {
      setError("Email tidak boleh kosong");
      return;
    }

    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Format email tidak valid");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await profileService.editEmail(uid, email);
      setSuccess(true);
      onSuccess?.();
    } catch {
      setError("Gagal update email");
    } finally {
      setLoading(false);
    }
  }

  return { editEmail, loading, error, success };
}