"use client"; 

import UserHelpdeskForm from "@/features/helpdesk/components/HelpdeskForm";
import HelpdeskHistory from "@/features/helpdesk/components/HelpdeskHistory";

export default function UserHelpdeskPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="w-full">
          <div className="max-w-7xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Pusat Bantuan</h1>
            <p className="text-gray-600 mt-2">
              Punya masalah teknis atau saran untuk aplikasi kami? Sampaikan
              melalui form di bawah ini.
            </p>
          </div>
          <UserHelpdeskForm />
        </div>

        <div className="w-full">
          <HelpdeskHistory />
        </div>
      </div>
    </main>
  );
}
