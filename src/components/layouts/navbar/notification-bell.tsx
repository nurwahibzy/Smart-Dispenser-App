"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { useDeviceData } from "@/lib/hooks/useDeviceData";
import { db } from "@/lib/firebase/client";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

type NotificationItem = {
  id: string;
  text: string;
  time: string;
  type: "warning" | "error" | "info";
  ticketData?: Partial<import("@/types/helpdesk").HelpdeskTicket>;
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [ticketNotifs, setTicketNotifs] = useState<NotificationItem[]>([]);
  const { data: deviceData } = useDeviceData();
  const [clearedIds, setClearedIds] = useState<string[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<NotificationItem | null>(
    null,
  );
  const router = useRouter();

  // Watch Helpdesk Tickets (Firestore)
  useEffect(() => {
    const q = query(
      collection(db, "helpdesk"),
      where("status", "==", "pending"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tickets = snapshot.docs.map((doc) => {
        const data = doc.data();

        // Try parsing date
        let timeStr = "Belum diproses";
        if (data.createdAt) {
          try {
            const date = data.createdAt?.toDate
              ? data.createdAt.toDate()
              : new Date(data.createdAt);

            timeStr = date.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            });
          } catch {
            timeStr = "Waktu tidak diketahui";
          }
        }

        return {
          id: `ticket-${doc.id}`,
          text: `Tiket Baru: ${data.title || "Butuh Bantuan"}`,
          time: timeStr,
          type: "info" as const,
          ticketData: data,
        };
      });

      setTicketNotifs(tickets);
    });

    return () => unsubscribe();
  }, []);

  // Compute Device Notifications (RTDB via useDeviceData)
  const deviceNotifs: NotificationItem[] = [];

  if (deviceData) {
    if (!deviceData.status.online) {
      deviceNotifs.push({
        id: "dev-offline",
        text: "Perangkat Dispenser Offline!",
        time: "Sekarang",
        type: "error",
      });
    } else {
      if (deviceData.sensors.waterLevel <= 20) {
        deviceNotifs.push({
          id: "dev-water",
          text: `Level Air Kritis (${deviceData.sensors.waterLevel}%)`,
          time: "Sekarang",
          type: "warning",
        });
      }

      if (deviceData.sensors.tds > 300) {
        deviceNotifs.push({
          id: "dev-tds",
          text: `Kadar TDS Tinggi (${deviceData.sensors.tds} ppm)`,
          time: "Sekarang",
          type: "warning",
        });
      }
    }
  }

  const allNotifications = [...deviceNotifs, ...ticketNotifs].filter(
    (n) => !clearedIds.includes(n.id),
  );

  const notificationsCount = allNotifications.length;

  const handleClearAll = () => {
    setClearedIds((prev) => [...prev, ...allNotifications.map((n) => n.id)]);
  };

  return (
    <div className="relative">
      {/* BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative w-9 h-9 bg-gray-50 border border-blue-100 rounded-xl flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
      >
        <Bell size={16} />

        {notificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
            {notificationsCount}
          </span>
        )}
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95">
          {/* HEADER */}
          <div className="px-4 py-3 border-b border-slate-50 flex justify-between items-center bg-white">
            <span className="text-sm font-medium text-slate-700">
              Notifikasi
            </span>

            {notificationsCount > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-blue-600 hover:underline"
              >
                Tandai Sudah Dibaca
              </button>
            )}
          </div>

          {/* LIST */}
          <div className="max-h-64 overflow-y-auto bg-white">
            {notificationsCount === 0 ? (
              <div className="p-4 text-sm text-slate-400 text-center">
                Tidak ada notifikasi baru
              </div>
            ) : (
              allNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    if (notif.ticketData) {
                      setSelectedTicket(notif);
                      setOpen(false);
                    }
                  }}
                  className={`px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition ${
                    notif.ticketData ? "cursor-pointer" : ""
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      notif.type === "error"
                        ? "text-red-600"
                        : notif.type === "warning"
                          ? "text-amber-600"
                          : "text-blue-600"
                    }`}
                  >
                    {notif.text}
                  </p>
                  <span className="text-xs text-slate-400 mt-1 block">
                    {notif.time}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TICKET DETAILS MODAL */}
      {selectedTicket && selectedTicket.ticketData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-blue-50/50 border-b border-blue-100 px-6 py-4 flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">
                Detail Laporan Helpdesk
              </h3>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                Tutup
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Judul
                </p>
                <p className="text-sm text-slate-800">
                  {selectedTicket.ticketData.title || "-"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                    Nama
                  </p>
                  <p className="text-sm text-slate-800">
                    {selectedTicket.ticketData.name || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                    Kategori
                  </p>
                  <p className="text-sm text-slate-800 capitalize">
                    {selectedTicket.ticketData.category || "-"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Kontak
                </p>
                <p className="text-sm text-slate-800">
                  {selectedTicket.ticketData.contact || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Deskripsi
                </p>
                <div className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg max-h-32 overflow-y-auto whitespace-pre-wrap">
                  {selectedTicket.ticketData.description || "-"}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                  Waktu Dilaporkan
                </p>
                <p className="text-sm text-slate-800">{selectedTicket.time}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-0 flex gap-3">
              <button
                onClick={() => setSelectedTicket(null)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  setSelectedTicket(null);
                  router.push("/admin/helpdesk");
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition shadow-sm shadow-blue-200"
              >
                Tindak Lanjuti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
