import NavbarPublic from "@/components/layouts/navbar/navbar-public";
import Footer from "@/components/layouts/footer";
import { ShieldCheck, AlertTriangle, BookOpen, Lock, RefreshCw, Mail } from "lucide-react";

export const metadata = {
  title: "Syarat & Ketentuan – Smart Dispenser",
  description:
    "Baca syarat dan ketentuan penggunaan layanan Smart Dispenser Politeknik Negeri Malang sebelum menggunakan platform kami.",
};

const sections = [
  {
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "1. Ketentuan Umum",
    content: [
      "Dengan mengakses dan menggunakan layanan Smart Dispenser, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang berlaku.",
      "Layanan Smart Dispenser dikelola oleh tim Politeknik Negeri Malang dan diperuntukkan bagi mahasiswa, dosen, dan karyawan yang telah terdaftar sebagai pengguna aktif.",
      "Kami berhak mengubah, memperbarui, atau menghentikan layanan kapan saja tanpa pemberitahuan terlebih dahulu. Perubahan syarat dan ketentuan akan diberitahukan melalui platform.",
    ],
  },
  {
    icon: ShieldCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    title: "2. Akun & Keamanan",
    content: [
      "Setiap pengguna bertanggung jawab penuh atas kerahasiaan akun dan kata sandi yang dimiliki. Jangan bagikan informasi login kepada pihak lain.",
      "Anda dilarang keras menggunakan akun milik orang lain atau mencoba mengakses data pengguna lain tanpa izin.",
      "Apabila Anda mencurigai adanya akses tidak sah pada akun Anda, segera laporkan melalui fitur Helpdesk agar kami dapat mengambil tindakan pengamanan secepatnya.",
      "Pengguna yang terbukti melanggar ketentuan keamanan akan dikenai sanksi berupa penangguhan atau pemblokiran akun secara permanen.",
    ],
  },
  {
    icon: RefreshCw,
    color: "text-violet-600",
    bg: "bg-violet-50",
    title: "3. Penggunaan Layanan",
    content: [
      "Smart Dispenser hanya boleh digunakan untuk keperluan pengisian air minum yang sah sesuai ketentuan institusi Politeknik Negeri Malang.",
      "Pengguna dilarang memanipulasi data transaksi, volume pengisian, atau informasi akun dengan cara apapun.",
      "Penyalahgunaan layanan, termasuk namun tidak terbatas pada pemalsuan data dan eksploitasi sistem, dapat dilaporkan kepada pihak berwenang kampus.",
      "Setiap transaksi pengisian yang berhasil bersifat final dan tidak dapat dibatalkan setelah diproses oleh sistem.",
    ],
  },
  {
    icon: Lock,
    color: "text-amber-600",
    bg: "bg-amber-50",
    title: "4. Privasi & Data",
    content: [
      "Data pribadi yang Anda berikan, seperti nama, email, dan riwayat transaksi, digunakan semata-mata untuk keperluan operasional layanan Smart Dispenser.",
      "Kami berkomitmen untuk tidak menjual, menyewakan, atau membagikan data Anda kepada pihak ketiga tanpa persetujuan eksplisit dari Anda.",
      "Data riwayat pengisian dapat digunakan dalam bentuk statistik yang telah dianonimkan untuk keperluan penelitian dan pengembangan layanan.",
      "Pengguna memiliki hak untuk meminta penghapusan data pribadinya dengan menghubungi tim kami melalui Helpdesk.",
    ],
  },
  {
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
    title: "5. Batasan Tanggung Jawab",
    content: [
      "Smart Dispenser tidak bertanggung jawab atas kerugian langsung maupun tidak langsung yang timbul akibat gangguan layanan, pemeliharaan sistem, atau keadaan di luar kendali kami.",
      "Kami tidak menjamin bahwa layanan akan selalu tersedia tanpa gangguan. Pemeliharaan rutin akan diumumkan terlebih dahulu jika memungkinkan.",
      "Pengguna bertanggung jawab penuh atas koneksi internet dan perangkat yang digunakan untuk mengakses platform Smart Dispenser.",
    ],
  },
  {
    icon: Mail,
    color: "text-sky-600",
    bg: "bg-sky-50",
    title: "6. Kontak & Pertanyaan",
    content: [
      "Apabila Anda memiliki pertanyaan, saran, atau keluhan terkait syarat dan ketentuan ini, silakan hubungi kami melalui halaman Helpdesk atau kunjungi halaman Hubungi Kami.",
      "Tim kami berkomitmen untuk merespons setiap pertanyaan dalam waktu 1×24 jam pada hari kerja.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
      <NavbarPublic />

      <main className="flex-1">
        {/* Hero */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 py-16 px-6">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -bottom-10 h-56 w-56 rounded-full bg-cyan-300/20 blur-2xl" />
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <ShieldCheck className="h-3.5 w-3.5" />
              Dokumen Legal
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
              Syarat &amp; Ketentuan
            </h1>
            <p className="text-blue-100 text-sm md:text-base max-w-xl mx-auto">
              Harap baca ketentuan ini dengan seksama sebelum menggunakan layanan
              Smart Dispenser. Penggunaan layanan berarti Anda menyetujui seluruh
              ketentuan di bawah ini.
            </p>
            <p className="mt-4 text-blue-200 text-xs">
              Terakhir diperbarui: Juni 2025 · Politeknik Negeri Malang
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Section header */}
                <div className={`flex items-center gap-3 px-6 py-4 border-b border-gray-100`}>
                  <div className={`flex items-center justify-center h-9 w-9 rounded-lg ${sec.bg} shrink-0`}>
                    <Icon className={`h-5 w-5 ${sec.color}`} />
                  </div>
                  <h2 className="text-base font-bold text-gray-900">{sec.title}</h2>
                </div>

                {/* Section body */}
                <ul className="px-6 py-5 space-y-3">
                  {sec.content.map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${sec.bg} ring-2 ring-offset-1 ${sec.color.replace("text-", "ring-")}`} />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Acceptance note */}
          <div className="bg-blue-600 rounded-2xl px-6 py-6 text-center">
            <p className="text-white text-sm leading-relaxed">
              Dengan terus menggunakan layanan Smart Dispenser, Anda dianggap telah
              membaca dan menyetujui seluruh syarat &amp; ketentuan di atas.
              Jika Anda tidak setuju, mohon hentikan penggunaan layanan ini.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="/helpdesk"
                className="inline-flex items-center gap-2 bg-white text-blue-600 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Hubungi via Helpdesk
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-white/30 transition-colors"
              >
                Kontak Kami
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
