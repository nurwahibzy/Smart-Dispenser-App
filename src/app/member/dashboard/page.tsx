import NavbarMember from "@/components/layouts/navbar/navbar-member";
import MemberKioskContent from "@/features/member/components/MemberKioskContent";

export default function MemberDashboardPage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3]">
      <NavbarMember />

      <main className="px-4 sm:px-6 py-6 md:py-8">
        <div className="max-w-5xl mx-auto">
          <MemberKioskContent />
        </div>
      </main>

      <footer className="px-4 sm:px-6 py-8 text-center text-xs text-blue-500">
        Hak Cipta {new Date().getFullYear()} Smart Dispenser
      </footer>
    </div>
  );
}
