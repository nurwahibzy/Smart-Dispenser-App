"use client";

import { useState } from "react";
import { manageAdminService } from "../service/manageAdminService";

export function useEditAdmin(onSukses?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function editAdmin(uid: string, name: string) {
    if (!name.trim()) {
      setError("Nama tidak boleh kosong.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await manageAdminService.editNama(uid, { name });
      onSukses?.();
    } catch (err) {
      setError("Gagal menyimpan perubahan.");
    } finally {
      setLoading(false);
    }
  }

  return { editAdmin, loading, error };
}