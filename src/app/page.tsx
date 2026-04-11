import NavbarPublic from "@/components/layouts/navbar/navbarPublic";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarPublic />

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
          Smart Dispenser 🚰
        </h1>

        <p className="text-gray-500 max-w-xl">
          Sistem dispenser pintar dengan monitoring kualitas air, level air, dan
          kontrol pengisian secara real-time.
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            href="/member/dashboard"
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition"
          >
            Gunakan Dispenser
          </Link>

          <Link
            href="/helpdesk"
            className="border border-blue-500 text-blue-500 px-6 py-3 rounded-xl hover:bg-blue-50 transition"
          >
            Bantuan
          </Link>
        </div>
      </section>

    </div>
  );
}
