"use client";

import { useState } from "react";
import { manageAdminService } from "../service/manageAdminService";
import { toast } from "sonner";

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
      toast.success("Data admin berhasil diperbarui");
      onSukses?.();
    } catch (err) {
      setError("Gagal menyimpan perubahan.");
      toast.error("Gagal menyimpan perubahan");
    } finally {
      setLoading(false);
    }
  }

  return { editAdmin, loading, error };
}