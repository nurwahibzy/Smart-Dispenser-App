"use client";

import { useEffect, useState } from "react";
import { X, GraduationCap, BookOpen, Building2 } from "lucide-react";
import Image from "next/image";
import { socialIcons } from "@/features/about/constants/social-icons";
import type { Developer, SocialType } from "@/features/about/types";

interface DevModalProps {
  dev: Developer;
  onClose: () => void;
}

const SOCIAL_ORDER: SocialType[] = [
  "github",
  "linkedin",
  "instagram",
  "twitter",
  "email",
];

export default function DevModal({ dev, onClose }: DevModalProps) {
  const [visible, setVisible] = useState(false);

  const isImage = dev.avatar.startsWith("/") || dev.avatar.startsWith("http");

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: visible
            ? "rgba(15, 23, 42, 0.55)"
            : "rgba(15, 23, 42, 0)",
          backdropFilter: visible ? "blur(8px)" : "blur(0px)",
        }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl
                   transition-all duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(24px) scale(0.97)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative flex items-center gap-3.5 px-4 py-4"
          style={{
            background: `linear-gradient(135deg, ${dev.gradientFrom}, ${dev.gradientTo})`,
          }}
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/30 shadow-md">
              {isImage ? (
                <Image
                  src={dev.avatar}
                  alt={dev.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl bg-white/15">
                  {dev.avatar}
                </div>
              )}
            </div>
          </div>

          {/* Name & role */}
          <div className="min-w-0">
            <h3 className="text-base font-bold text-white leading-tight truncate">
              {dev.name}
            </h3>
            <p className="text-xs text-white/75 mt-0.5 truncate">{dev.role}</p>
          </div>

          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/15 hover:bg-white/30
                       text-white transition-all duration-200"
          >
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4 space-y-4">
          {/* Academic chips */}
          <div className="flex flex-col gap-1.5">
            <InfoChip
              icon={<GraduationCap size={13} />}
              label="NIM"
              value={dev.nim}
              gradient={`linear-gradient(135deg, ${dev.gradientFrom}15, ${dev.gradientTo}15)`}
              accent={dev.accent}
            />
            <InfoChip
              icon={<BookOpen size={13} />}
              label="Program Studi"
              value={dev.prodi}
              gradient={`linear-gradient(135deg, ${dev.gradientFrom}15, ${dev.gradientTo}15)`}
              accent={dev.accent}
            />
            <InfoChip
              icon={<Building2 size={13} />}
              label="Universitas"
              value={dev.university}
              gradient={`linear-gradient(135deg, ${dev.gradientFrom}15, ${dev.gradientTo}15)`}
              accent={dev.accent}
            />
          </div>

          <div className="h-px bg-slate-100" />

          {/* Bio */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
              Tentang
            </p>
            <p className="text-[12.5px] text-slate-600 leading-relaxed">
              {dev.bio}
            </p>
          </div>

          {/* Skills */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Keahlian
            </p>
            <div className="flex flex-wrap gap-1.5">
              {dev.skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${dev.badge} ${dev.badgeText}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="h-px bg-slate-100" />

          {/* Socials */}
          <div>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Sosial Media
            </p>
            <div className="flex gap-1.5">
              {SOCIAL_ORDER.map((type) => {
                const href = dev.socials[type];
                if (!href) return null;
                return (
                  <a
                    key={type}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={type}
                    className="p-2 rounded-lg bg-slate-50 text-slate-400
                               hover:text-white hover:shadow-sm
                               transition-all duration-200 hover:scale-110"
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background =
                        `linear-gradient(135deg, ${dev.gradientFrom}, ${dev.gradientTo})`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "";
                    }}
                  >
                    {socialIcons[type]}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoChip({
  icon,
  label,
  value,
  gradient,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
  accent: string;
}) {
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
      style={{ background: gradient }}
    >
      <span className={`${accent} flex-shrink-0`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[9.5px] font-semibold text-slate-400 uppercase tracking-wider leading-none mb-0.5">
          {label}
        </p>
        <p className="text-[12px] font-medium text-slate-700 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}
