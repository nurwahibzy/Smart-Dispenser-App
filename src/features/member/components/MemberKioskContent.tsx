"use client";

import { Droplets } from "lucide-react";
import { useMemberKiosk } from "@/features/member/hooks/useMemberKiosk";

export default function MemberKioskContent() {
  const {
    volumeOptions,
    selectedVolume,
    setSelectedVolume,
    startDispensing,
    canStart,
    isDispensing,
    finishState,
    progressPercent,
    progressText,
    statusCard,
    guardReason,
  } = useMemberKiosk();

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5 md:p-6">
        <h2 className="text-2xl md:text-3xl font-black text-blue-600 tracking-tight">Status</h2>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl border border-blue-100 p-4">
            <p className="text-xs text-blue-400">Status</p>
            <p className="mt-2 text-lg font-bold text-blue-600">
              {statusCard.online ? "Online" : "Offline"}
            </p>
          </div>
          <div className="rounded-xl border border-blue-100 p-4">
            <p className="text-xs text-blue-400">Water Level</p>
            <p className="mt-2 text-lg font-bold text-blue-600">{statusCard.waterLevel}%</p>
          </div>
          <div className="rounded-xl border border-blue-100 p-4">
            <p className="text-xs text-blue-400">Kualitas Air</p>
            <p className="mt-2 text-lg font-bold text-blue-600">{statusCard.waterQuality}</p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5 md:p-6">
        <h2 className="text-2xl md:text-3xl font-black text-blue-600 tracking-tight text-center">
          Pilih Volume
        </h2>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {volumeOptions.map((volume) => {
            const isSelected = selectedVolume === volume;
            return (
              <button
                key={volume}
                type="button"
                onClick={() => setSelectedVolume(volume)}
                className={`rounded-xl border p-4 transition text-left text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 active:bg-blue-50 select-none ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-blue-100 bg-white hover:bg-blue-50"
                }`}
              >
                <div className="h-16 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Droplets size={20} />
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 text-blue-600 font-black">
                  <span className="text-2xl leading-none">{volume}</span>
                  <span className="text-sm leading-none">ml</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5 md:p-6">
        <h2 className="text-2xl md:text-3xl font-black text-blue-600 tracking-tight text-center">
          Mulai Pengisian Air
        </h2>

        <div className="mt-6 flex flex-col items-center">
          <button
            type="button"
            onClick={startDispensing}
            disabled={!canStart}
            className="bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-10 py-3 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
          >
            MULAI PENGISIAN
          </button>

          {guardReason && !canStart && (
            <p className="mt-3 text-sm text-red-500">{guardReason}</p>
          )}
        </div>

        <div className="mt-7">
          <div className="h-3 w-full rounded-full bg-blue-100 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="mt-3 text-center text-sm font-semibold text-blue-600">
            {isDispensing
              ? progressText
              : finishState === "done"
              ? "Selesai!"
              : "Siap mengisi"}
          </p>
        </div>
      </section>
    </div>
  );
}
