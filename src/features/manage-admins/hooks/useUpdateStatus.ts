"use client";

import { useState } from "react";
import { manageAdminService } from "../service/manageAdminService";
import { toast } from "sonner";

export function useToggleStatus(onSukses?: () => void) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

 async function toggleStatus(uid: string, newStatus: boolean) {
   setLoadingId(uid);
   try {
     await manageAdminService.updateStatus(uid, newStatus); 
      toast.success(newStatus ? "Status admin berhasil diaktifkan" : "Status admin berhasil dinonaktifkan");
     onSukses?.();
   } catch (err) {
     console.error(err);
      toast.error("Gagal mengubah status");
   } finally {
     setLoadingId(null);
   }
 }

  return { toggleStatus, loadingId };
}