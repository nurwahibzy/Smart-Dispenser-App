"use client";

import NavbarPublic from "@/components/layouts/navbar/navbar-public";
import Footer from "@/components/layouts/footer";

export default function HelpdeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarPublic />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
