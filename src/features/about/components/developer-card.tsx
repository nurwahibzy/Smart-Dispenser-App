import { ExternalLink } from "lucide-react";
import type { Developer } from "@/features/about/type";

interface DevCardProps {
  dev: Developer;
  onOpen: () => void;
}

export default function DevCard({ dev, onOpen }: DevCardProps) {
  return (
    <div
      onClick={onOpen}
      className="group cursor-pointer bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Banner */}
      <div
        className="h-24 relative"
        style={{
          background: `linear-gradient(135deg, ${dev.gradientFrom}, ${dev.gradientTo})`,
        }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Avatar */}
      <div className="flex justify-center -mt-9 relative z-10">
        <div
          className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-white font-black text-xl border-4 border-white shadow-md"
          style={{
            background: `linear-gradient(135deg, ${dev.gradientFrom}, ${dev.gradientTo})`,
          }}
        >
          {dev.avatar}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-5 pt-2 text-center">
        <h3 className="font-bold text-slate-800 text-base leading-tight">
          {dev.name}
        </h3>
        <p className={`text-xs font-semibold mt-0.5 ${dev.accent}`}>
          {dev.role}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{dev.nim}</p>

        <p className="text-slate-500 text-xs mt-3 leading-relaxed line-clamp-2 text-left">
          {dev.bio}
        </p>

        <div className="flex flex-wrap gap-1 mt-3 justify-center">
          {dev.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${dev.badge} ${dev.badgeText}`}
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400 group-hover:text-blue-500 transition-colors">
          <ExternalLink size={11} />
          <span>Lihat profil lengkap</span>
        </div>
      </div>
    </div>
  );
}
