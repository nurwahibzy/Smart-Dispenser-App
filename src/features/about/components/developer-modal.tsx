import { X } from "lucide-react";
import SocialLink from "@/features/about/components/social-links";
import type { Developer, SocialType } from "@/features/about/type";

interface DevModalProps {
  dev: Developer;
  onClose: () => void;
}

const infoFields = (dev: Developer) => [
  { label: "NIM", value: dev.nim },
  { label: "Program Studi", value: dev.prodi },
  { label: "Universitas", value: dev.university },
];

export default function DevModal({ dev, onClose }: DevModalProps) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp .35s cubic-bezier(.22,1,.36,1) both" }}
      >
        {/* Header */}
        <div
          className="relative h-36 flex items-end px-6 pb-4"
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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 bg-white/20 hover:bg-white/40 rounded-full text-white transition"
          >
            <X size={16} />
          </button>
          <div className="absolute -bottom-8 left-6">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg border-4 border-white"
              style={{
                background: `linear-gradient(135deg, ${dev.gradientFrom}, ${dev.gradientTo})`,
              }}
            >
              {dev.avatar}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pt-12 pb-6 space-y-5">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{dev.name}</h3>
            <p className={`text-sm font-semibold mt-0.5 ${dev.accent}`}>
              {dev.role}
            </p>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {infoFields(dev).map(({ label, value }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {label}
                </p>
                <p className="text-slate-700 font-medium text-sm leading-snug">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Tentang
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">{dev.bio}</p>
          </div>

          {/* Skills */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Keahlian
            </p>
            <div className="flex flex-wrap gap-1.5">
              {dev.skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${dev.badge} ${dev.badgeText}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Sosial Media
            </p>
            <div className="flex gap-2">
              {(Object.entries(dev.socials) as [SocialType, string][]).map(
                ([type, href]) => (
                  <SocialLink key={type} type={type} href={href} />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
