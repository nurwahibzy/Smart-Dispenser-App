"use client";

import type { NavbarAdminProps } from "@/types/navbar";
import { Droplets, User } from "lucide-react";
import NotificationBell from "@/components/layouts/navbar/notification-bell";

export default function NavbarAdmin({
  online,
  lastUpdate,
  fluctuate,
  DeviceStatusBar,
}: NavbarAdminProps) {
  return (
    <header className="bg-white border-b border-blue-100 sticky top-0 z-30 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
            <Droplets size={18} className="text-white" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Device Status */}
          <DeviceStatusBar
            online={online}
            lastUpdate={lastUpdate}
            onRefresh={fluctuate}
          />

          {/* Notification */}
          <div className="flex items-center gap-3">
            <NotificationBell />
          </div>

          {/* 👤 PROFILE */}
          <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-xl transition">
            {/* Avatar */}
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
              <User size={16} />
            </div>

            {/* Text */}
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-700">Admin</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
