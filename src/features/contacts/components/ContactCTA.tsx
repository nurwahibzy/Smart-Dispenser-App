import Link from "next/link";
import React from "react";

const ContactCTA: React.FC = () => {
  return (
    <div className="rounded-2xl p-5 bg-white/60 backdrop-blur-sm border border-blue-100 shadow-sm h-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-slate-800 leading-snug">
          Mengalami kendala teknis atau ingin melaporkan bug?
        </h4>
        <p className="text-sm text-slate-500 mt-1">
          Tiket helpdesk dapat dipantau secara real-time oleh admin.
        </p>
      </div>
      <div className="flex-shrink-0">
        <Link
          href="/helpdesk"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-sm shadow-blue-200"
        >
          Buka Helpdesk
        </Link>
      </div>
    </div>
  );
};

export default ContactCTA;