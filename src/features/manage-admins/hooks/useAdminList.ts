"use client";

import { useState, useEffect } from "react";
import { manageAdminService } from "../service/manageAdminService";
import { AdminData } from "@/types/manage-admins";

export function useAdminList() {
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchAdmins() {
    try {
      const data = await manageAdminService.getAll();
      setAdmins(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdmins();
  }, []);

  return { admins, loading, refresh: fetchAdmins };
}