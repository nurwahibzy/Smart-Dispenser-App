"use client";

import NavbarPublic from "@/components/layouts/navbar/navbar-public";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex-1 flex flex-col">
        <NavbarPublic />

        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}
