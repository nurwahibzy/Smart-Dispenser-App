import { GlassWater } from "lucide-react";

type GlassDetectionCardProps = {
  isGlassDetected: boolean;
};

export default function GlassDetectionCard({
  isGlassDetected,
}: GlassDetectionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-50"
          aria-hidden="true"
        >
          <GlassWater size={18} className="text-blue-600" />
        </div>

        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${
            isGlassDetected
              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
              : "bg-rose-50 text-rose-700 border-rose-100"
          }`}
        >
          {isGlassDetected ? "Terdeteksi" : "Tidak Terdeteksi"}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-slate-400 text-xs uppercase tracking-wider font-medium">
          Sistem Monitor
        </p>
        <h3 className="text-slate-800 text-base font-semibold">
          Deteksi Gelas
        </h3>
      </div>
    </div>
  );
}
