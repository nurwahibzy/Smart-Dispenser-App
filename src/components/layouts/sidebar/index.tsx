"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  HelpCircle,
  Users,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Helpdesk", href: "/admin/helpdesk", icon: HelpCircle },
  { name: "Manage Admin", href: "/admin/manage-admins", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`sticky top-0 h-screen ${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-blue-100 shadow-sm flex flex-col justify-between p-4 
        transition-[width] ${
          isOpen
            ? "duration-0 ease-out" // buka
            : "duration-0 ease-in" // tutup
        }`}
    >
      {/* TOP */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {isOpen && (
            <div className="transition-opacity duration-200">
              <h1 className="text-lg font-bold text-blue-600">
                Smart Dispenser
              </h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-blue-50 transition"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center ${
                  isOpen ? "justify-start" : "justify-center"
                } gap-3 px-3 py-3 rounded-xl transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`}
              >
                <Icon size={20} />
                {isOpen && (
                  <span className="transition-opacity duration-200">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div>
        <button
          className={`w-full flex items-center ${
            isOpen ? "justify-start" : "justify-center"
          } gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 transition`}
        >
          <LogOut size={20} />
          {isOpen && (
            <span className="transition-opacity duration-200">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}
