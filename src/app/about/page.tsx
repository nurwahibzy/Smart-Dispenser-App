"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/layouts/footer";
import {
  Activity,
  Clock,
  ShieldCheck,
  LayoutDashboard,
  Headphones,
  Smartphone,
  Mail,
  X,
  ExternalLink,
  Cpu,
  Wifi,
  Database,
  Globe,
  Code2,
  Server,
  Layers,
  Cloud,
} from "lucide-react";

/* ─────────────────────────── Types ─────────────────────────── */
interface Developer {
  name: string;
  role: string;
  avatar: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  accent: string;
  badge: string;
  badgeText: string;
  nim: string;
  prodi: string;
  university: string;
  bio: string;
  skills: string[];
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    twitter: string;
    email: string;
  };
}

type SocialType = "github" | "linkedin" | "instagram" | "twitter" | "email";

/* ─────────────────────────── Data ─────────────────────────── */
const developers: Developer[] = [
  {
    name: "Jokowi",
    role: "Full Stack Developer & Project Lead",
    avatar: "RA",
    color: "blue",
    gradientFrom: "#3b82f6",
    gradientTo: "#06b6d4",
    accent: "text-blue-600",
    badge: "bg-blue-100",
    badgeText: "text-blue-700",
    nim: "2241720001",
    prodi: "Teknik Informatika",
    university: "Politeknik Negeri Malang",
    bio: "Bertanggung jawab atas arsitektur sistem secara keseluruhan, integrasi Firebase, serta pengembangan fitur real-time monitoring perangkat dispenser berbasis IoT.",
    skills: ["Next.js", "Firebase", "IoT", "TypeScript"],
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
      email: "mailto:rizky@email.com",
    },
  },
  {
    name: "Megawati",
    role: "UI/UX Designer & Frontend Dev",
    avatar: "SN",
    color: "cyan",
    gradientFrom: "#06b6d4",
    gradientTo: "#14b8a6",
    accent: "text-cyan-600",
    badge: "bg-cyan-100",
    badgeText: "text-cyan-700",
    nim: "2241720042",
    prodi: "Teknik Informatika",
    university: "Politeknik Negeri Malang",
    bio: "Merancang antarmuka pengguna yang intuitif dan modern, memastikan pengalaman pengguna yang menyenangkan dari halaman landing hingga dashboard admin.",
    skills: ["Figma", "Tailwind CSS", "React", "Framer Motion"],
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
      email: "mailto:siti@email.com",
    },
  },
  {
    name: "Gibran",
    role: "Backend & IoT Engineer",
    avatar: "MF",
    color: "indigo",
    gradientFrom: "#6366f1",
    gradientTo: "#3b82f6",
    accent: "text-indigo-600",
    badge: "bg-indigo-100",
    badgeText: "text-indigo-700",
    nim: "2241720078",
    prodi: "Teknik Informatika",
    university: "Politeknik Negeri Malang",
    bio: "Mengembangkan firmware mikrokontroler ESP32, sistem komunikasi MQTT, serta integrasi sensor TDS dan level air ke platform Firebase Realtime Database.",
    skills: ["ESP32", "MQTT", "Arduino", "Firebase RTDB"],
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
      email: "mailto:fahrul@email.com",
    },
  },
  {
    name: "Wowo",
    role: "QA Engineer & Documentation",
    avatar: "AR",
    color: "sky",
    gradientFrom: "#0ea5e9",
    gradientTo: "#6366f1",
    accent: "text-sky-600",
    badge: "bg-sky-100",
    badgeText: "text-sky-700",
    nim: "2241720099",
    prodi: "Teknik Informatika",
    university: "Politeknik Negeri Malang",
    bio: "Bertanggung jawab atas pengujian fungsional dan non-fungsional sistem, penulisan dokumentasi teknis, serta pengelolaan laporan helpdesk dan analitik pengguna.",
    skills: ["Jest", "Cypress", "Postman", "Technical Writing"],
    socials: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      instagram: "https://instagram.com/",
      twitter: "https://twitter.com/",
      email: "mailto:anisa@email.com",
    },
  },
];

const features = [
  {
    Icon: Activity,
    title: "Monitoring Real-Time",
    desc: "Pantau level air dan kualitas TDS secara langsung melalui sensor IoT yang terhubung ke Firebase Realtime Database.",
    color: "blue",
  },
  {
    Icon: Clock,
    title: "Operasional 24 Jam",
    desc: "Sistem berjalan tanpa henti dengan notifikasi otomatis jika terjadi anomali pada perangkat dispenser.",
    color: "cyan",
  },
  {
    Icon: ShieldCheck,
    title: "Air Bersih & Aman",
    desc: "Dilengkapi sensor TDS dan filter kualitas air untuk memastikan standar air minum yang aman bagi pengguna.",
    color: "emerald",
  },
  {
    Icon: LayoutDashboard,
    title: "Dashboard Admin",
    desc: "Panel administrasi lengkap dengan grafik penggunaan, manajemen tiket helpdesk, dan laporan analitik harian.",
    color: "indigo",
  },
  {
    Icon: Headphones,
    title: "Sistem Helpdesk",
    desc: "Pengguna dapat melaporkan masalah secara langsung. Admin mendapat notifikasi real-time untuk tindak lanjut cepat.",
    color: "violet",
  },
  {
    Icon: Smartphone,
    title: "Responsif & Modern",
    desc: "Antarmuka yang dioptimalkan untuk semua perangkat — desktop, tablet, dan smartphone — dengan desain yang bersih dan intuitif.",
    color: "sky",
  },
];

const featureColorMap: Record<
  string,
  { bg: string; icon: string; border: string }
> = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "group-hover:border-blue-300",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "text-cyan-600",
    border: "group-hover:border-cyan-300",
  },
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    border: "group-hover:border-emerald-300",
  },
  indigo: {
    bg: "bg-indigo-50",
    icon: "text-indigo-600",
    border: "group-hover:border-indigo-300",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    border: "group-hover:border-violet-300",
  },
  sky: {
    bg: "bg-sky-50",
    icon: "text-sky-600",
    border: "group-hover:border-sky-300",
  },
};

const techStack = [
  { Icon: Globe, name: "Next.js 14", category: "Framework" },
  { Icon: Code2, name: "TypeScript", category: "Language" },
  { Icon: Server, name: "Firebase", category: "Backend" },
  { Icon: Layers, name: "Tailwind CSS", category: "Styling" },
  { Icon: Cpu, name: "ESP32", category: "Hardware" },
  { Icon: Wifi, name: "MQTT", category: "Protocol" },
  { Icon: Database, name: "Firestore", category: "Database" },
  { Icon: Cloud, name: "Vercel", category: "Deployment" },
];

const socialIcons: Record<SocialType, React.ReactNode> = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  email: <Mail size={15} />,
};

/* ─────────────────────────── Components ─────────────────────────── */
function SocialLink({ type, href }: { type: SocialType; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
      title={type}
    >
      {socialIcons[type]}
    </a>
  );
}

function DevModal({ dev, onClose }: { dev: Developer; onClose: () => void }) {
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
          {/* Dot pattern */}
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
          {/* Avatar */}
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
            {[
              { label: "NIM", value: dev.nim },
              { label: "Program Studi", value: dev.prodi },
              { label: "Universitas", value: dev.university },
            ].map(({ label, value }) => (
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
              {dev.skills.map((s) => (
                <span
                  key={s}
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${dev.badge} ${dev.badgeText}`}
                >
                  {s}
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

function DevCard({ dev, onOpen }: { dev: Developer; onOpen: () => void }) {
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
          className="w-18 h-18 w-[72px] h-[72px] rounded-2xl flex items-center justify-center text-white font-black text-xl border-4 border-white shadow-md"
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
          {dev.skills.slice(0, 3).map((s) => (
            <span
              key={s}
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${dev.badge} ${dev.badgeText}`}
            >
              {s}
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

/* ─────────────────────────── Page ─────────────────────────── */
export default function AboutPage() {
  const [activeDev, setActiveDev] = useState<Developer | null>(null);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        {/* Background blobs */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-100/60 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-0 -right-24 w-80 h-80 bg-cyan-100/50 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 -left-24 w-72 h-72 bg-indigo-100/40 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur text-xs font-semibold text-blue-600 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Tentang Smart Dispenser
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-slate-800 leading-tight tracking-tight">
            Teknologi Cerdas untuk{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Air Bersih
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-slate-500 text-base md:text-lg leading-relaxed">
            Smart Dispenser adalah platform IoT berbasis web yang memungkinkan
            pemantauan dan pengelolaan dispenser air pintar secara real-time —
            dikembangkan oleh mahasiswa Politeknik Negeri Malang.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="/member/dashboard"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-200 hover:-translate-y-0.5"
            >
              Coba Sekarang
            </Link>
            <a
              href="#team"
              className="border border-slate-200 text-slate-600 px-8 py-3 rounded-xl text-sm font-semibold hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              Kenali Tim Kami
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-6 py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
              Platform
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-slate-800">
              Apa itu Smart Dispenser?
            </h2>
            <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              Sistem manajemen dispenser air pintar yang menggabungkan perangkat
              keras IoT dengan antarmuka web modern.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ Icon, title, desc, color }) => {
              const c = featureColorMap[color];
              return (
                <div
                  key={title}
                  className={`group bg-white border border-slate-100 ${c.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300`}
                >
                  <div
                    className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon size={20} className={c.icon} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm mb-2">
                    {title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
            Teknologi
          </span>
          <h2 className="mt-2 text-2xl md:text-3xl font-black text-slate-800 mb-10">
            Dibangun dengan Stack Modern
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map(({ Icon, name, category }) => (
              <div
                key={name}
                className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-2xl px-4 py-3 transition-all duration-200 group"
              >
                <Icon
                  size={16}
                  className="text-slate-400 group-hover:text-blue-500 transition-colors"
                />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 group-hover:text-blue-400 uppercase leading-none mb-0.5 transition-colors">
                    {category}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 group-hover:text-blue-700 transition-colors">
                    {name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="px-6 py-14"
        style={{ background: "linear-gradient(135deg, #1d4ed8, #0891b2)" }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { num: "4", label: "Developer" },
            { num: "6+", label: "Bulan Pengembangan" },
            { num: "10+", label: "Fitur Utama" },
            { num: "24/7", label: "Monitoring Aktif" },
          ].map(({ num, label }) => (
            <div key={label} className="space-y-1">
              <div className="text-4xl font-black">{num}</div>
              <div className="text-blue-200 text-xs font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">
              Tim Pengembang
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-black text-slate-800">
              Orang-orang di Balik Smart Dispenser
            </h2>
            <p className="mt-3 text-slate-400 text-sm max-w-lg mx-auto">
              Klik kartu untuk melihat biodata lengkap dan tautan sosial media
              masing-masing developer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {developers.map((dev) => (
              <DevCard
                key={dev.name}
                dev={dev}
                onOpen={() => setActiveDev(dev)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-20 bg-gradient-to-b from-slate-50 to-white text-center">
        <div className="max-w-xl mx-auto">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Activity size={26} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-800">
            Siap mencoba Smart Dispenser?
          </h2>
          <p className="text-slate-400 text-sm mt-2 mb-8 leading-relaxed">
            Mulai pantau dispenser air Anda secara real-time sekarang juga.
          </p>
          <Link
            href="/member/dashboard"
            className="inline-block bg-blue-600 text-white px-10 py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md shadow-blue-200 hover:-translate-y-0.5"
          >
            Gunakan Dispenser
          </Link>
        </div>
      </section>

      {/* ── Developer Modal ── */}
      {activeDev && (
        <DevModal dev={activeDev} onClose={() => setActiveDev(null)} />
      )}

      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      <Footer />
    </main>
  );
}
