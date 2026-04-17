"use client";

import { useState, useEffect } from "react";
import { useFetchTicket } from "@/features/helpdesk/hooks/useGetHelpdesk";
import { HelpdeskTicket } from "@/types/helpdesk";
import { useUpdateHelpdesk } from "@/features/helpdesk/hooks/useUpdateHelpdesk";

export default function AdminHelpdeskList() {
  const { FetchTicket, isLoading, error } = useFetchTicket();
  const { updateStatus } = useUpdateHelpdesk();
  const [tickets, setTickets] = useState<HelpdeskTicket[]>([]);

  // state untuk menyimpan tiket yang sedang dibuka di detail view
  const [selectedTicket, setSelectedTicket] = useState<HelpdeskTicket | null>(
    null,
  );

  // state untuk menyimpan status sementara saat admin memilih opsi baru sebelum disimpan
  const [draftStatus, setDraftStatus] = useState<HelpdeskTicket["status"] | "">(
    "",
  );
  const [isSaving, setIsSaving] = useState(false);

  // Definisi tipe untuk parameter tanggal, termasuk format bawaan Firebase Timestamp
  type TimestampOrDate =
    | string
    | number
    | Date
    | { toDate: () => Date }
    | null
    | undefined;

  useEffect(() => {
    const loadTickets = async () => {
      const data = await FetchTicket();
      if (data) setTickets(data);
    };
    loadTickets();
  }, []);

  // fungsi untuk membuka detail tiket saat tombol diklik, sekaligus menyimpan status awal ke draftStatus
  const handleOpenTicket = (ticket: HelpdeskTicket) => {
    setSelectedTicket(ticket);
    setDraftStatus(ticket.status);
  };

  const handleCloseTicket = () => {
    setSelectedTicket(null);
    setDraftStatus("");
  };

  // fungsi untuk menyimpan perubahan status ke database dan memperbarui UI
  const handleSaveStatus = async () => {
    if (!selectedTicket || draftStatus === selectedTicket.status) return;

    setIsSaving(true);
    try {
      // memanggil service untuk update status di database
      await updateStatus(selectedTicket.id, draftStatus);

      // memperbarui status di state lokal agar UI langsung sinkron tanpa perlu reload
      setTickets(
        tickets.map((t) =>
          t.id === selectedTicket.id
            ? { ...t, status: draftStatus as HelpdeskTicket["status"] }
            : t,
        ),
      );
      setSelectedTicket({
        ...selectedTicket,
        status: draftStatus as HelpdeskTicket["status"],
      });
      alert("Status berhasil diperbarui.");
      handleCloseTicket();
    } catch (err) {
      alert("Gagal menyimpan perubahan status.");
    } finally {
      setIsSaving(false);
    }
  };

  // fungsi format tanggal
  const formatDate = (dateValue: TimestampOrDate) => {
    if (!dateValue) return "-";

    let dateObj: Date;

    // menangani format Firebase Timestamp yang memiliki method toDate()
    if (
      typeof dateValue === "object" &&
      "toDate" in dateValue &&
      typeof dateValue.toDate === "function"
    ) {
      dateObj = dateValue.toDate();
    } else {
      // menangani format string, number, atau Date biasa
      dateObj = new Date(dateValue as string | number | Date);
    }

    if (isNaN(dateObj.getTime())) {
      return "Format Tidak Dikenal";
    }

    // mengubah ke format Indonesia
    return dateObj.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // detail tiket
  if (selectedTicket) {
    // mengecek apakah ada perubahan status yang belum disimpan
    const hasUnsavedChanges = draftStatus !== selectedTicket.status;

    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <button
          onClick={handleCloseTicket}
          className="text-blue-600 hover:underline mb-4 inline-flex items-center text-sm font-medium"
        >
          &larr; Kembali ke Daftar
        </button>

        <div className="border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold">{selectedTicket.title}</h2>
          <p className="text-sm text-gray-500">
            ID: {selectedTicket.id} • Kategori: {selectedTicket.category}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-sm border-b pb-6">
          <div>
            <p className="text-gray-500 font-medium mb-1">
              Informasi Pengirim:
            </p>
            <p className="font-semibold text-gray-900">{selectedTicket.name}</p>
            <p className="text-gray-600">{selectedTicket.contact}</p>
          </div>

          <div>
            <p className="text-gray-500 font-medium mb-1">
              Ubah Status Laporan:
            </p>
            <div className="flex items-start gap-2 mt-1">
              <select
                value={draftStatus}
                onChange={(e) =>
                  setDraftStatus(e.target.value as HelpdeskTicket["status"])
                }
                className="block w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-gray-50"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>

              {hasUnsavedChanges && (
                <button
                  onClick={handleSaveStatus}
                  disabled={isSaving}
                  className={`px-4 py-2.5 rounded-lg font-medium text-white transition-colors whitespace-nowrap shadow-sm
                    ${isSaving ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
                  `}
                >
                  {isSaving ? "Menyimpan..." : "Simpan"}
                </button>
              )}
            </div>
            {hasUnsavedChanges && !isSaving && (
              <p className="text-xs text-amber-600 mt-2 font-medium">
                * Anda memiliki perubahan yang belum disimpan.
              </p>
            )}
          </div>
        </div>

        <div>
          <p className="text-gray-500 font-medium mb-2">Deskripsi Masalah:</p>
          <div className="bg-gray-50 p-4 rounded-lg text-gray-800 whitespace-pre-wrap border border-gray-100">
            {selectedTicket.description}
          </div>
        </div>
      </div>
    );
  }

  // list helpdesk
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          Kelola Laporan (Admin)
        </h2>
      </div>

      {isLoading ? (
        <div className="p-8 text-center text-gray-500">
          Memuat data laporan...
        </div>
      ) : error ? (
        <div className="p-8 text-center text-red-500 bg-red-50">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b">
              <tr>
                <th className="p-4 font-medium">Tanggal</th>
                <th className="p-4 font-medium">Judul Laporan</th>
                <th className="p-4 font-medium">Pengirim</th>
                <th className="p-4 font-medium">Kategori</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-gray-600">
                    {formatDate(ticket.createdAt)}
                  </td>
                  <td className="p-4 font-medium text-gray-900">
                    {ticket.title}
                  </td>
                  <td className="p-4 text-gray-600">{ticket.name}</td>
                  <td className="p-4 text-gray-600 uppercase text-xs tracking-wider">
                    {ticket.category}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={ticket.status} />
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenTicket(ticket)}
                      className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      Buka &rarr;
                    </button>
                  </td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Belum ada laporan masuk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Komponen untuk menampilkan status tiket dengan warna yang berbeda
const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    in_progress: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
  };
  const labels = {
    pending: "Menunggu",
    in_progress: "Dikerjakan",
    resolved: "Selesai",
  };

  const currentStyle =
    styles[status as keyof typeof styles] || "bg-gray-100 text-gray-800";
  const currentLabel = labels[status as keyof typeof labels] || status;

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${currentStyle}`}
    >
      {currentLabel}
    </span>
  );
};
