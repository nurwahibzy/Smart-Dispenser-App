"use client";

import { useState } from "react";
import Sidebar from "@/components/layouts/sidebar";
import NavbarAdmin from "@/components/layouts/navbar/navbar-admin";
import DeviceStatusBar from "@/components/layouts/navbar/device-status-bar";
import Sidebar from "@/components/layouts/sidebar";
import Navbar from "@/components/layouts/navbar/navbarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [online] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [notifications, setNotifications] = useState(2);

  const fluctuate = () => {
    setLastUpdate(new Date());
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <NavbarAdmin
          online={online}
          lastUpdate={lastUpdate}
          fluctuate={fluctuate}
          notifications={notifications}
          setNotifications={setNotifications}
          DeviceStatusBar={DeviceStatusBar}
        />
        <Navbar />

        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}
