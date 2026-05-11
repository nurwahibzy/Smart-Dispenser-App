import { ExternalLink } from "lucide-react";
import type { Developer } from "@/features/about/types";
import Image from "next/image";

interface DevCardProps {
  dev: Developer;
  onOpen: () => void;
}

export default function DevCard({ dev, onOpen }: DevCardProps) {
  const isImage =
    dev.avatar.startsWith("/") || dev.avatar.startsWith("http");

  return (
    <div
      onClick={onOpen}
      className="group cursor-pointer flex flex-col items-center"
    >
      {/* Large Avatar Photo */}
      <div className="relative mb-4">
        {/* Gradient glow ring behind avatar */}
        <div
          className="absolute -inset-1.5 rounded-full opacity-0 blur-md
                     group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${dev.gradientFrom}, ${dev.gradientTo})`,
          }}
        />

        <div
          className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden
                     border-4 border-white shadow-lg ring-1 ring-black/[0.06]
                     transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
                     group-hover:scale-105 group-hover:shadow-xl"
        >
          {isImage ? (
            <Image
              src={dev.avatar}
              alt={dev.name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white font-black text-4xl"
              style={{
                background: `linear-gradient(135deg, ${dev.gradientFrom}, ${dev.gradientTo})`,
              }}
            >
              {dev.avatar}
            </div>
          )}
        </div>

        {/* Floating "view" badge on hover */}
        <div
          className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white shadow-md
                     flex items-center justify-center
                     opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100
                     transition-all duration-300 delay-100"
        >
          <ExternalLink size={14} className="text-blue-500" />
        </div>
      </div>

      {/* Name & Role — minimal */}
      <div className="text-center px-2">
        <h3 className="text-base font-bold text-slate-800 leading-tight">
          {dev.name}
        </h3>
        <p className={`text-xs font-semibold mt-1 ${dev.accent}`}>
          {dev.role}
        </p>

        {/* Subtle hint */}
        <p
          className="text-[11px] text-slate-400 mt-2
                     opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                     transition-all duration-200 delay-75"
        >
          Klik untuk lihat profil →
        </p>
      </div>
    </div>
  );
}
