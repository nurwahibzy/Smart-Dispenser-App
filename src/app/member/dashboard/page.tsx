import Link from "next/link";

export default function MemberDashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3f3f3] px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white border border-blue-100 rounded-2xl p-6 md:p-8 shadow-sm">
          <h1 className="text-3xl md:text-4xl font-black text-blue-600 tracking-tight">
            Dashboard Member
          </h1>
          <p className="mt-3 text-blue-600">
            Halaman ini bisa diakses tanpa login admin. Gunakan halaman ini untuk alur pengguna umum.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-sm font-semibold hover:bg-blue-700 transition"
            >
              Kembali ke Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
