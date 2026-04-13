"use client";

import { useState, useEffect } from "react";
import { useFetchTicket } from "../hooks/useGetHelpdesk";
import { HelpdeskTicket } from "@/types/helpdesk";

export default function HelpdeskHistory() {
  const { FetchTicket, isLoading, error } = useFetchTicket();
  const [tickets, setTickets] = useState<HelpdeskTicket[]>([]);

  useEffect(() => {
    const loadTickets = async () => {
      const data = await FetchTicket();
      if (data) setTickets(data);
    };
    loadTickets();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Riwayat Laporan</h2>

      {isLoading && (
        <p className="text-gray-500 animate-pulse">Memuat riwayat laporan...</p>
      )}
      {error && <p className="text-red-500 bg-red-50 p-3 rounded">{error}</p>}

      {!isLoading && tickets.length === 0 && (
        <div className="text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">Belum ada laporan yang diajukan.</p>
        </div>
      )}

      <div className="space-y-4 max-h-[630px] overflow-y-auto pr-2 pb-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {ticket.title}
                </h3>
                <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  Kategori : {ticket.category}
                </p>
              </div>
              <StatusBadge status={ticket.status} />
            </div>

            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
              {ticket.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Komponen untuk menampilkan status tiket dengan warna yang berbeda
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    in_progress: "bg-blue-50 text-blue-700 border-blue-200",
    resolved: "bg-green-50 text-green-700 border-green-200",
  };
  const labels = {
    pending: "Sedang Ditinjau",
    in_progress: "Sedang Ditangani",
    resolved: "Telah Diselesaikan",
  };

  const currentStyle =
    styles[status as keyof typeof styles] || "bg-gray-50 text-gray-700";
  const currentLabel = labels[status as keyof typeof labels] || status;

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${currentStyle}`}
    >
      {currentLabel}
    </span>
  );
};
