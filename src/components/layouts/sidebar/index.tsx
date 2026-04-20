"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, HelpCircle, LogOut, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Helpdesk", href: "/admin/helpdesk", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // AUTO RESPONSIVE STATE
  useEffect(() => {
    let isMounted = true;

    const handleResize = () => {
      if (!isMounted) return;

      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside
      className={`
        w-full md:sticky md:top-0 md:h-screen
        ${isOpen ? "md:w-64" : "md:w-20"}
        bg-white border-b md:border-b-0 md:border-r border-blue-100 
        shadow-sm flex flex-col md:justify-between p-4 

        transition-[width] duration-300 ease-in-out
        will-change-[width]
      `}
    >
      {/* TOP */}
      <div>
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div
            className={`
              transition-opacity duration-200
              ${isOpen ? "md:opacity-100 md:w-auto" : "md:opacity-0 md:w-0 md:overflow-hidden"}
            `}
          >
            <Link href="/admin/dashboard">
              <h1 className="text-lg font-bold text-blue-600 whitespace-nowrap">
                Smart Dispenser
              </h1>
            </Link>
            <p className="text-xs text-gray-400 hidden md:block">Admin Panel</p>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-blue-50 transition"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* MENU */}
        <nav
          className={`
            flex flex-col space-y-2 overflow-hidden
            transition-[max-height,opacity] duration-300 ease-in-out
            ${isOpen ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"}
            md:max-h-none md:opacity-100 md:mt-0 md:transition-none
          `}
        >
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center 
                  ${isOpen ? "justify-start" : "justify-center"}
                  gap-3 px-3 py-3 rounded-xl transition-colors duration-200
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                `}
              >
                <Icon size={20} />

                <span
                  className={`
                    inline transition-opacity duration-200
                    ${isOpen ? "md:opacity-100" : "md:opacity-0"}
                  `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className={`${!isOpen ? "hidden md:block" : ""}`}>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className={`
            w-full flex items-center 
            ${isOpen ? "justify-start" : "justify-center"}
            gap-3 px-3 py-3 rounded-xl 
            text-red-500 hover:bg-red-50 transition-colors duration-200
          `}
        >
          <LogOut size={20} />

          <span
            className={`
              inline transition-opacity duration-200
              ${isOpen ? "md:opacity-100" : "md:opacity-0"}
            `}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
