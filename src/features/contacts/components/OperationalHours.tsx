import React from "react";
import { Clock } from "lucide-react";

const OperationalHours: React.FC = () => {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white/60 backdrop-blur-sm p-5 shadow-sm h-full">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
          <Clock className="text-blue-600" size={20} />
        </div>
        <div>
          <h4 className="font-bold text-slate-800">Jam Operasional Support</h4>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Senin – Jumat</span> : 08.00 – 16.00
            </p>
            <p className="text-sm text-slate-500">🟢 Monitoring dispenser berjalan 24 jam</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalHours;