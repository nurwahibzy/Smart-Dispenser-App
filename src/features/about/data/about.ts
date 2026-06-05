import {
  Activity,
  Clock,
  ShieldCheck,
  LayoutDashboard,
  Headphones,
  Smartphone,
  Cpu,
  Wifi,
  Database,
  Globe,
  Code2,
  Server,
  Layers,
  Cloud,
} from "lucide-react";
import type {
  Feature,
  TechStack,
  Stat,
  FeatureColorMap,
} from "@/features/about/types";

export const features: Feature[] = [
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

export const featureColorMap: Record<string, FeatureColorMap> = {
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

export const techStack: TechStack[] = [
  { Icon: Globe, name: "Next.js 14", category: "Framework" },
  { Icon: Code2, name: "TypeScript", category: "Language" },
  { Icon: Server, name: "Firebase", category: "Backend" },
  { Icon: Layers, name: "Tailwind CSS", category: "Styling" },
  { Icon: Cpu, name: "ESP32", category: "Hardware" },
  { Icon: Wifi, name: "MQTT", category: "Protocol" },
  { Icon: Database, name: "Firestore", category: "Database" },
  { Icon: Cloud, name: "Vercel", category: "Deployment" },
];

export const stats: Stat[] = [
  { num: "4", label: "Developer" },
  { num: "6+", label: "Bulan Pengembangan" },
  { num: "10+", label: "Fitur Utama" },
  { num: "24/7", label: "Monitoring Aktif" },
];
