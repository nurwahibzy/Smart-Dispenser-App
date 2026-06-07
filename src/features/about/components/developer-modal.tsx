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
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={{
          background: visible
            ? "rgba(15, 23, 42, 0.6)"
            : "rgba(15, 23, 42, 0)",
          backdropFilter: visible ? "blur(10px)" : "blur(0px)",
        }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl
                   transition-all duration-[350ms] ease-[cubic-bezier(.22,1,.36,1)]"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? "translateY(0) scale(1)"
            : "translateY(28px) scale(0.96)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div
          className="relative px-7 pt-8 pb-6"
          style={{
            background: `linear-gradient(135deg, ${dev.gradientFrom}, ${dev.gradientTo})`,
          }}
        >
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-white/10" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/35
                       text-white transition-all duration-200"
          >
            <X size={16} strokeWidth={2.5} />
          </button>

          {/* Avatar + name */}
          <div className="relative flex items-end gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl flex-shrink-0">
              {isImage ? (
                <Image
                  src={dev.avatar}
                  alt={dev.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold text-3xl bg-white/15">
                  {dev.avatar}
                </div>
              )}
            </div>

            <div className="min-w-0 pb-1">
              <h3 className="text-xl font-extrabold text-white leading-tight">
                {dev.name}
              </h3>
              <p className="text-sm text-white/80 mt-0.5">{dev.role}</p>

              {/* Social icons in header */}
              <div className="flex gap-2 mt-3">
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
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white
                                 transition-all duration-200 hover:scale-110"
                    >
                      {socialIcons[type]}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 py-6 space-y-5">
          {/* Academic info */}
          <div className="grid grid-cols-1 gap-2.5">
            <InfoChip
              icon={<GraduationCap size={15} />}
              label="NIM"
              value={dev.nim}
              gradient={`linear-gradient(135deg, ${dev.gradientFrom}18, ${dev.gradientTo}18)`}
              accent={dev.accent}
            />
            <InfoChip
              icon={<BookOpen size={15} />}
              label="Program Studi"
              value={dev.prodi}
              gradient={`linear-gradient(135deg, ${dev.gradientFrom}18, ${dev.gradientTo}18)`}
              accent={dev.accent}
            />
            <InfoChip
              icon={<Building2 size={15} />}
              label="Universitas"
              value={dev.university}
              gradient={`linear-gradient(135deg, ${dev.gradientFrom}18, ${dev.gradientTo}18)`}
              accent={dev.accent}
            />
          </div>

          <div className="h-px bg-slate-100" />

          {/* Bio */}
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
              Tentang
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">{dev.bio}</p>
          </div>

          {/* Skills */}
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-2.5">
              Keahlian
            </p>
            <div className="flex flex-wrap gap-2">
              {dev.skills.map((skill) => (
                <span
                  key={skill}
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${dev.badge} ${dev.badgeText}`}
                >
                  {skill}
                </span>
              ))}
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
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
      style={{ background: gradient }}
    >
      <span className={`${accent} flex-shrink-0`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-none mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-slate-700 truncate">{value}</p>
      </div>
    </div>
  );
}
