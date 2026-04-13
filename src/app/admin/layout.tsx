"use client";

import { useState } from "react";
import Sidebar from "@/components/layouts/sidebar";
import NavbarAdmin from "@/components/layouts/navbar/navbar-admin";
import DeviceStatusBar from "@/components/layouts/navbar/device-status-bar";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

const DISABLE_SIDEBAR = ["/admin/login"];
const DISABLE_NAVBAR = ["/admin/login"];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSidebar = DISABLE_SIDEBAR.includes(pathname);
  const hideNavbar = DISABLE_NAVBAR.includes(pathname);

  const [online] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [notifications, setNotifications] = useState(2);

  const fluctuate = () => {
    setLastUpdate(new Date());
  };

  return (
    <SessionProvider>
      <div className="flex flex-col md:flex-row">
        {!hideSidebar && <Sidebar />}

        <div className="flex-1 flex flex-col">
          {!hideNavbar && (
            <NavbarAdmin
              online={online}
              lastUpdate={lastUpdate}
              fluctuate={fluctuate}
              notifications={notifications}
              setNotifications={setNotifications}
              DeviceStatusBar={DeviceStatusBar}
            />
          )}

          <main className="flex-1 bg-gray-50 p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}