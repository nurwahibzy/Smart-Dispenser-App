"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

import { subscribeDispenseHistory } from "@/features/transaction/infrastructure/transaction.firebase";
import type { Transaction } from "@/types/transaction";
import { Select } from "@/components/ui/select";

type SortKey = "date" | "time" | "amount" | "tds";
type SortDir = "asc" | "desc";

export function HistoryTable() {
  const [data, setData] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [volumeFilter, setVolumeFilter] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  // FIREBASE
  useEffect(() => {
    let isMounted = true;

    const unsubscribe = subscribeDispenseHistory((data) => {
      if (!isMounted) return;
      setData(data);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  // 🔥 TRANSFORM
  const mapped = useMemo(() => {
    return data.map((d) => {
      const dateObj = d.timestamp ?? new Date();

      return {
        id: d.id,
        date: dateObj.toISOString().split("T")[0],
        time: dateObj.toTimeString().slice(0, 5),
        event: d.type === "auto" ? "Otomatis" : "Manual",
        amount: d.actualVolume,
        tds: Math.round(d.tds ?? 0),
        status: d.status ? "Berhasil" : "Peringatan",
      };
    });
  }, [data]);

  const filtered = useMemo(() => {
    return mapped
      .filter((r) => {
        const matchSearch =
          r.date.includes(search) ||
          r.time.includes(search) ||
          r.event.toLowerCase().includes(search.toLowerCase()) ||
          r.tds.toString().includes(search) ||
          r.amount.toString().includes(search);

        const matchVolume = volumeFilter === null || r.amount === volumeFilter;

        return matchSearch && matchVolume;
      })
      .sort((a, b) => {
        let av: string | number = a[sortKey];
        let bv: string | number = b[sortKey];

        if (sortKey === "date" || sortKey === "time") {
          av = `${a.date}T${a.time}`;
          bv = `${b.date}T${b.time}`;
        }

        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
  }, [mapped, search, volumeFilter, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="inline-flex flex-col ml-1 opacity-40">
      <ChevronUp
        size={10}
        className={
          sortKey === k && sortDir === "asc" ? "opacity-100 text-blue-600" : ""
        }
      />
      <ChevronDown
        size={10}
        className={
          sortKey === k && sortDir === "desc" ? "opacity-100 text-blue-600" : ""
        }
      />
    </span>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      {/* HEADER */}
      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-slate-800">Riwayat Pengisian</h2>
            <p className="text-slate-400 text-sm mt-0.5">
              {filtered.length} data ditemukan
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* SEARCH */}
          <div className="relative flex-1">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Cari data..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300"
            />
          </div>

          {/* VOLUME FILTER */}
          <Select
            options={[
              { label: "Semua Volume", value: "" },
              { label: "100 mL", value: "100" },
              { label: "300 mL", value: "300" },
              { label: "500 mL", value: "500" },
              { label: "1000 mL", value: "1000" },
            ]}
            value={volumeFilter ? volumeFilter.toString() : ""}
            onChange={(val) => {
              setVolumeFilter(val ? Number(val) : null);
              setPage(1);
            }}
            placeholder="Semua Volume"
            className="bg-slate-50 border-slate-100 py-2 text-sm text-slate-700 font-medium"
            wrapperClassName="min-w-[140px] w-full sm:w-auto"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left">
              {[
                { label: "Tanggal", key: "date" },
                { label: "Waktu", key: "time" },
                { label: "Metode" },
                { label: "Volume", key: "amount" },
                { label: "TDS", key: "tds", className: "hidden md:table-cell" },
                { label: "Status", className: "hidden md:table-cell" },
              ].map((col) => (
                <th
                  key={col.label}
                  onClick={() => col.key && handleSort(col.key as SortKey)}
                  className={`px-4 py-3 text-xs text-slate-500 uppercase tracking-wide select-none ${
                    col.key ? "cursor-pointer hover:text-blue-600" : ""
                  } ${col.className || ""}`}
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    {col.key && <SortIcon k={col.key as SortKey} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-10 text-slate-400">
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-t border-slate-50 hover:bg-blue-50/30 transition-colors ${
                    i % 2 === 0 ? "" : "bg-slate-50/30"
                  } min-h-[56px]`}
                >
                  <td className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
                    {row.date}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                    {row.time}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                        row.event === "Otomatis"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-purple-50 text-purple-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.event === "Otomatis" ? "bg-blue-500" : "bg-purple-500"
                        }`}
                      />
                      {row.event}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-700 font-semibold">
                      {row.amount}
                      <span className="text-slate-400 text-xs ml-0.5">mL</span>
                    </span>
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`text-sm font-semibold ${
                        row.tds < 150 ? "text-blue-600" : "text-amber-600"
                      }`}
                    >
                      {row.tds}
                      <span className="text-slate-400 text-xs ml-0.5">ppm</span>
                    </span>
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                        row.status === "Berhasil"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          row.status === "Berhasil"
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }`}
                      />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-50">
          <span className="text-xs text-slate-400">
            Halaman {page} dari {totalPages}
          </span>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-md text-xs transition-all ${
                  p === page
                    ? "bg-blue-600 text-white"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
