"use client";

import { useState } from "react";
import { manageAdminService } from "../service/manageAdminService";
import { TambahAdmin } from "@/types/manage-admins";

export function useTambahAdmin(onSukses?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function tambahAdmin(data: TambahAdmin) {
    if (!data.name || !data.email || !data.password) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (data.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await manageAdminService.tambah(data);
      onSukses?.();
    } catch (err) {
      const error = err as Error;
      if (error.message === "Email sudah digunakan") {
        setError("Email sudah digunakan.");
      } else {
        setError("Gagal menambah admin.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { tambahAdmin, loading, error };
}