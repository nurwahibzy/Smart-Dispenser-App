import NavbarPublic from "@/components/layouts/navbar/navbar-public";
import Footer from "@/components/layouts/footer";
import HeroSection from "@/components/sections/homepage/hero-section";
import NavbarPublic from "@/components/layouts/navbar/navbarPublic";
import Footer from "@/components/layouts/footer";
import HeroSection from "@/components/sections/hero/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* NAVBAR */}
      <NavbarPublic />

      {/* CONTENT */}
      <main className="flex-1">
        <HeroSection />
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
