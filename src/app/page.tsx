import Footer from "@/components/layouts/footer";
import NavbarPublic from "@/components/layouts/navbar/navbar-public";
import FAQSection from "@/components/sections/homepage/faq-section";
import HeroSection from "@/components/sections/homepage/hero-section";
import UsageSection from "@/components/sections/homepage/usage-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <NavbarPublic />

      <main className="flex-1">
        <HeroSection />
        <UsageSection />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
}
