"use client";

import { useState } from "react";
import { manageAdminService } from "../service/manageAdminService";

export function useToggleStatus(onSukses?: () => void) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

 async function toggleStatus(uid: string, newStatus: boolean) {
   setLoadingId(uid);
   try {
     await manageAdminService.updateStatus(uid, newStatus); 
     onSukses?.();
   } catch (err) {
     console.error(err);
   } finally {
     setLoadingId(null);
   }
 }

  return { toggleStatus, loadingId };
}