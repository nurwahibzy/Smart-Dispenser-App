import { Droplets } from "lucide-react";

type DailyUsageCardProps = {
  dailyUsage: number;
  totalDispenses: number;
};

export default function DailyUsageCard({
  dailyUsage,
  totalDispenses,
}: DailyUsageCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-cyan-50">
          <Droplets size={18} className="text-cyan-600" />
        </div>

        {/* trend dummy (optional nanti bisa dari API) */}
        <div className="text-emerald-500 text-xs font-semibold">+12%</div>
      </div>

      <div>
        <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
          Daily Usage
        </p>

        <div className="flex items-end gap-1">
          <span className="text-slate-800 text-2xl font-bold">
            {/* Menampilkan 3 digit angka dibelakang koma */}
            {dailyUsage.toFixed(3)}
          </span>
          <span className="text-slate-400 text-sm">L</span>
        </div>

        <p className="text-slate-400 text-xs mt-1">
          {totalDispenses} dispenses today
        </p>
      </div>
    </div>
  );
}
