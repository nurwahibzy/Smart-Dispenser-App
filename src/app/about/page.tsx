"use client";

import { useState } from "react";
import Footer from "@/components/layouts/footer";
import DevModal from "@/features/about/components/developer-modal";
import TeamSection from "@/features/about/components/team-section";
import {
  HeroSection,
  FeaturesSection,
  TechStackSection,
  StatsSection,
  CtaSection,
} from "@/features/about/components/sections";
import { developers } from "@/features/about/data/developer";
import type { Developer } from "@/features/about/types";

export default function AboutPage() {
  const [activeDev, setActiveDev] = useState<Developer | null>(null);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <StatsSection />
      <TeamSection developers={developers} onOpenDev={setActiveDev} />
      <CtaSection />

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
