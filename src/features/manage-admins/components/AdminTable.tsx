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

  // FILTER STATE
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  // FILTER LOGIC
  const filteredAdmins = admins.filter((admin) => {
    const matchSearch =
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = filterRole === "all" || admin.role === filterRole;

    const matchStatus =
      filterStatus === "all" || admin.status === (filterStatus === "aktif");

    return matchSearch && matchRole && matchStatus;
  });

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-2xl">
        {/* FILTER */}
        <div className="flex flex-col md:flex-row gap-2 p-4 border-b">
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Cari nama / email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-full md:max-w-xs"
          />

          {/* ROLE */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="super admin">Super Admin</option>
          </select>

          {/* STATUS */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="nonaktif">Nonaktif</option>
          </select>

          {/* RESET BUTTON */}
          <button
            onClick={() => {
              setSearch("");
              setFilterRole("all");
              setFilterStatus("all");
            }}
            className="text-sm px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            Reset
          </button>
        </div>

        {/* TABLE */}
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="px-4 py-3 text-xs text-gray-500">
                Nama
              </TableHead>
              <TableHead className="px-4 py-3 text-xs text-gray-500">
                Email
              </TableHead>
              <TableHead className="px-4 py-3 text-xs text-gray-500">
                Role
              </TableHead>
              <TableHead className="px-4 py-3 text-xs text-gray-500">
                Status
              </TableHead>
              <TableHead className="px-4 py-3 text-xs text-gray-500">
                Dibuat
              </TableHead>
              <TableHead className="px-4 py-3 text-xs text-gray-500">
                Diperbarui
              </TableHead>
              <TableHead className="px-4 py-3 text-xs text-gray-500">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredAdmins.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-10 text-sm text-gray-400"
                >
                  Tidak ada data ditemukan.
                </TableCell>
              </TableRow>
            ) : (
              filteredAdmins.map((admin) => {
                const isAkunSendiri = session?.user?.email === admin.email;
                const isSuperAdmin = admin.role === "super admin";
                const disableDropdown = isAkunSendiri || isSuperAdmin;

                return (
                  <TableRow key={admin.id} className="hover:bg-gray-50">
                    <TableCell className="px-4 py-3 font-medium">
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
                        className={`text-xs px-2 py-1 rounded-full ${
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
                          className={`text-xs px-3 py-1 rounded-full ${
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

                    <TableCell className="px-4 py-3 text-xs text-gray-400">
                      {formatTanggal(admin.createdAt)}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-xs text-gray-400">
                      {formatTanggal(admin.updatedAt)}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <button
                        onClick={() => setAdminDipilih(admin)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg"
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

      {/* MODAL */}
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