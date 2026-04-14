"use client";

import type { NavbarAdminProps } from "@/types/navbar";
import { User } from "lucide-react";
import NotificationBell from "@/components/layouts/navbar/notification-bell";
import Link from "next/link";
import { useProfile } from "@/features/profile/hooks/useProfile";
import Image from "next/image";

export default function NavbarAdmin({
  online,
  lastUpdate,
  fluctuate,
  DeviceStatusBar,
}: NavbarAdminProps) {
  const { profile, isLoading } = useProfile();

  return (
    <header className="bg-white border-b border-blue-100 sticky top-0 z-30 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* LEFT (Mobile Only) */}
        <div className="flex items-center gap-2 sm:hidden">
          <DeviceStatusBar
            online={online}
            lastUpdate={lastUpdate}
            onRefresh={fluctuate}
          />
        </div>

        {/* RIGHT (ALL SCREEN) */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Device Status (desktop only) */}
          <div className="hidden sm:block">
            <DeviceStatusBar
              online={online}
              lastUpdate={lastUpdate}
              onRefresh={fluctuate}
            />
          </div>

          {/* Notification */}
          <NotificationBell />

          {/* PROFILE */}
          <Link href="/admin/profile">
            <div className="flex items-center gap-3 cursor-pointer hover:bg-blue-50 px-3 py-2 rounded-xl transition">
              {/* AVATAR */}
              <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full overflow-hidden text-sm font-medium">
                {profile?.photoURL ? (
                  <Image
                    src={profile.photoURL}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile?.name?.charAt(0)?.toUpperCase() || <User size={16} />
                )}
              </div>

              {/* TEXT */}
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700">
                  {isLoading ? "..." : profile?.name || "Admin"}
                </p>
                <p className="text-xs text-gray-400">
                  {profile?.role || "Super Admin"}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}