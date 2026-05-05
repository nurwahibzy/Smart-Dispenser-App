import { Activity } from "lucide-react";

type TdsCardProps = {
  tds: number;
};

export default function TdsCard({ tds }: TdsCardProps) {
  const tdsQuality =
    tds < 100 ? "Excellent" : tds < 300 ? "Good" : tds < 600 ? "Fair" : "Poor";

  const tdsColor =
    tds < 100
      ? "bg-emerald-50 text-emerald-600"
      : tds < 300
        ? "bg-blue-50 text-blue-600"
        : tds < 600
          ? "bg-amber-50 text-amber-600"
          : "bg-rose-50 text-rose-600";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50">
          <Activity size={18} className="text-blue-600" />
        </div>

        <span className={`text-xs px-2.5 py-1 rounded-full ${tdsColor}`}>
          {tdsQuality}
        </span>
      </div>

      <div>
        <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
          TDS Value
        </p>

        <div className="flex items-end gap-1">
          <span className="text-slate-800 text-2xl font-bold">
            {Math.round(tds)}
          </span>
          <span className="text-slate-400 text-sm">ppm</span>
        </div>

        <p className="text-slate-400 text-xs mt-1">
          Water quality: {tdsQuality}
        </p>
      </div>
    </div>
  );
}
