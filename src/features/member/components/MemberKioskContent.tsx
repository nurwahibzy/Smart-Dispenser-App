"use client";

import { useEffect, useState } from "react";
import { Droplets } from "lucide-react";
import { useMemberKiosk } from "@/features/member/hooks/useMemberKiosk";
import WaterLevelSection from "@/features/water/components/water-level-section";
import TdsCard from "@/features/water/components/tds-card";
import DailyUsageCard from "@/features/water/components/daily-usage-card";
import { useDeviceData } from "@/lib/hooks/useDeviceData";
import { useTransactionData } from "@/lib/hooks/useTransactionData";
import { calculateDailyUsage } from "@/lib/utils/transaction";
import GlassDetectionCard from "@/features/water/components/glass-detection-card";

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
    guardReason,
  } = useMemberKiosk();

  const { data: deviceData, loading: deviceLoading } = useDeviceData();
  const { data: transactions, loading: transactionLoading } = useTransactionData();
  const { dailyUsage, totalDispenses } = calculateDailyUsage(transactions || []);
  const tds = deviceData?.sensors?.tds || 0;

  const [modalActive, setModalActive] = useState(false);
  const isGlassDetected = deviceData?.sensors?.glassDetected || false;

  useEffect(() => {
    if (finishState === "done") {
      setModalActive(false);
      const t = setTimeout(() => setModalActive(true), 20);
      return () => clearTimeout(t);
    }
    setModalActive(false);
  }, [finishState]);

  return (
    <div className="space-y-6 md:space-y-8">
      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:grid-rows-2">
        <div className="lg:row-span-2 lg:self-stretch">
          <div className="h-full lg:[&>div]:p-4 lg:[&_svg]:h-[220px] lg:[&_svg]:w-[185px]">
            <WaterLevelSection />
          </div>
        </div>

        <div>
          <TdsCard tds={tds} />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <GlassDetectionCard isGlassDetected={isGlassDetected} />
          <DailyUsageCard
            dailyUsage={dailyUsage}
            totalDispenses={totalDispenses}
          />
        </div>

        {(deviceLoading || transactionLoading) && (
          <p className="col-span-full text-sm text-slate-400 px-1">Memuat data status...</p>
        )}
      </section>

      <section className="bg-white rounded-2xl border border-blue-100 shadow-sm p-5 md:p-6">
        <h2 className="text-2xl md:text-3xl font-black text-blue-600 tracking-tight text-center">
          Pilih Volume Air
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
              : ""}
          </p>
        </div>
      </section>
      {finishState === "done" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            className={`relative w-[min(92%,640px)] md:w-[560px] bg-white/95 rounded-2xl p-10 flex flex-col items-center gap-6 shadow-xl transform transition-all duration-300 pointer-events-auto ${
              modalActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
            }`}
          >
            <style>{`
              .sd-check-circle { transform-origin: center; }
              .sd-check-path { stroke-dasharray: 100; stroke-dashoffset: 100; }
              .sd-modal-active .sd-check-path { animation: sd-draw 600ms cubic-bezier(.2,.8,.2,1) forwards 250ms; }
              @keyframes sd-draw {
                to { stroke-dashoffset: 0; }
              }
              .sd-pop { transform-origin: center; }
              .sd-modal-active .sd-pop { animation: sd-pop 350ms cubic-bezier(.2,.8,.2,1) forwards; }
              @keyframes sd-pop { from { transform: scale(.8); opacity:0 } to { transform: scale(1); opacity:1 } }
            `}</style>

            <div className={"sd-pop relative flex items-center justify-center" + (modalActive ? " sd-modal-active" : "") }>
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-green-300 to-emerald-200 blur-xl opacity-80" />
              <div className="relative rounded-full bg-white p-6 flex items-center justify-center shadow-md">
                <svg className="sd-check-circle" width="140" height="140" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="60" r="52" stroke="#10B981" strokeWidth="7" fill="rgba(16,185,129,0.06)" />
                  <path className={`sd-check-path`} d="M36 62 L52 78 L84 44" stroke="#059669" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>

            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-800">Berhasil!</h3>
            <p className="text-center text-base md:text-lg text-slate-600 max-w-[480px]">Pengisian Berhasil Dilakukan</p>
          </div>
        </div>
      )}
    </div>
  );
}
