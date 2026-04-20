"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { AdminData } from "@/types/manage-admins";
import { useToggleStatus } from "../hooks/useUpdateStatus";
import ModalEditAdmin from "./ModalEditAdmin";
import { Timestamp } from "firebase/firestore";
import StatusDropdown from "@/features/manage-admins/components/statusDropdown";
import { Pencil } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/tables/table";

interface Props {
  admins: AdminData[];
  onRefresh: () => void;
}

function formatTanggal(tanggal: string | Timestamp | undefined | null): string {
  if (!tanggal) return "—";
  if (tanggal instanceof Timestamp)
    return tanggal.toDate().toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  const date = new Date(tanggal);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminTable({ admins, onRefresh }: Props) {
  const { data: session } = useSession();
  const [adminDipilih, setAdminDipilih] = useState<AdminData | null>(null);
  const { toggleStatus, loadingId } = useToggleStatus(onRefresh);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Nama
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Email
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Role
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Dibuat
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Diperbarui
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {admins.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-sm text-gray-400"
                >
                  Belum ada admin.
                </TableCell>
              </TableRow>
            ) : (
              admins.map((admin) => {
                const isAkunSendiri = session?.user?.email === admin.email;
                const isSuperAdmin = admin.role === "super admin";
                const disableDropdown = isAkunSendiri || isSuperAdmin;

                return (
                  <TableRow
                    key={admin.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell className="px-4 py-3 font-medium text-gray-800">
                      {admin.name}
                      {isAkunSendiri && (
                        <span className="ml-2 text-xs text-gray-400">
                          (Saya)
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500">
                      {admin.email}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          admin.role === "super admin"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {admin.role}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      {disableDropdown ? (
                        <span
                          title="Tidak bisa mengubah status super admin atau akun sendiri"
                          className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                            admin.status
                              ? "bg-green-50 text-green-600"
                              : "bg-red-50 text-red-500"
                          }`}
                        >
                          {admin.status ? "Aktif" : "Nonaktif"}
                        </span>
                      ) : (
                        <StatusDropdown
                          status={admin.status}
                          disabled={disableDropdown}
                          loading={loadingId === admin.id}
                          onChange={(newStatus) =>
                            toggleStatus(admin.id, newStatus)
                          }
                        />
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-400 text-xs">
                      {formatTanggal(admin.createdAt)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-400 text-xs">
                      {formatTanggal(admin.updatedAt)}
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <button
                        onClick={() => setAdminDipilih(admin)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition"
                      >
                        <Pencil size={14} className="text-gray-500" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {adminDipilih && (
        <ModalEditAdmin
          admin={adminDipilih}
          onClose={() => setAdminDipilih(null)}
          onSuccess={() => {
            setAdminDipilih(null);
            onRefresh();
          }}
        />
      )}
    </>
  );
}