import type { Developer } from "@/features/about/types";
import DevCard from "@/features/about/components/developer-card";

interface TeamSectionProps {
  developers: Developer[];
  onOpenDev: (dev: Developer) => void;
}

export default function TeamSection({
  developers,
  onOpenDev,
}: TeamSectionProps) {
  return (
    <section id="team" className="px-6 py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
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

        {/* Grid — photo-focused layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 items-start">
          {developers.map((dev) => (
            <DevCard
              key={dev.name}
              dev={dev}
              onOpen={() => onOpenDev(dev)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
