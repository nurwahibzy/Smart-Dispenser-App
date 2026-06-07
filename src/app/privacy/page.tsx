import NavbarPublic from '@/components/layouts/navbar/navbar-public';
import Footer from '@/components/layouts/footer';
import { Database, UserCheck, Share2, Cookie, Lock, RefreshCw, Mail } from 'lucide-react';

export const metadata = {
    title: 'Kebijakan Privasi – Smart Dispenser',
    description:
        'Pelajari bagaimana Smart Dispenser Politeknik Negeri Malang mengumpulkan, menggunakan, dan melindungi data pribadi Anda.',
};

const sections = [
    {
        icon: Database,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        title: '1. Data yang Kami Kumpulkan',
        content: [
            'Kami mengumpulkan data yang Anda berikan secara langsung saat mendaftar, seperti nama lengkap, alamat email institusi, nomor induk mahasiswa/pegawai, dan informasi akun lainnya.',
            'Data teknis dikumpulkan secara otomatis saat Anda menggunakan layanan, meliputi alamat IP, jenis perangkat, browser yang digunakan, serta waktu dan durasi akses.',
            'Riwayat transaksi pengisian air, termasuk volume, waktu, dan lokasi dispenser yang digunakan, dicatat untuk keperluan operasional dan audit sistem.',
            'Kami tidak mengumpulkan data sensitif seperti informasi keuangan, data biometrik, atau informasi kesehatan pengguna.',
        ],
    },
    {
        icon: UserCheck,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        title: '2. Penggunaan Data Pribadi',
        content: [
            'Data yang dikumpulkan digunakan untuk mengoperasikan, memelihara, dan meningkatkan kualitas layanan Smart Dispenser secara berkelanjutan.',
            'Kami menggunakan data transaksi untuk menyajikan riwayat pengisian, statistik konsumsi, dan notifikasi yang relevan kepada pengguna.',
            'Email institusi Anda digunakan untuk keperluan autentikasi, pengiriman notifikasi layanan, dan pengumuman pemeliharaan sistem.',
            'Data yang telah dianonimkan dapat digunakan untuk keperluan riset internal dan pengembangan fitur baru tanpa mengidentifikasi pengguna secara individual.',
        ],
    },
    {
        icon: Share2,
        color: 'text-violet-600',
        bg: 'bg-violet-50',
        title: '3. Berbagi & Pengungkapan Data',
        content: [
            'Kami tidak menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak ketiga manapun untuk kepentingan komersial.',
            'Data dapat dibagikan kepada pihak pengelola institusi Politeknik Negeri Malang dalam kapasitas pengawasan operasional layanan, sesuai kebijakan kampus yang berlaku.',
            'Pengungkapan data dapat dilakukan apabila diwajibkan oleh hukum, perintah pengadilan, atau otoritas yang berwenang sesuai peraturan perundang-undangan yang berlaku di Indonesia.',
            'Mitra teknis yang membantu operasional platform terikat pada perjanjian kerahasiaan dan hanya mengakses data seperlunya untuk mendukung layanan.',
        ],
    },
    {
        icon: Cookie,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        title: '4. Cookie & Teknologi Pelacakan',
        content: [
            'Platform Smart Dispenser menggunakan cookie sesi untuk menjaga status login Anda selama penggunaan. Cookie ini bersifat sementara dan akan dihapus saat sesi berakhir.',
            'Cookie preferensi digunakan untuk mengingat pengaturan tampilan dan preferensi pengguna agar pengalaman penggunaan lebih nyaman.',
            'Kami tidak menggunakan cookie pelacak pihak ketiga untuk keperluan iklan atau analitik eksternal.',
            'Anda dapat mengatur browser untuk menolak cookie, namun hal ini mungkin memengaruhi fungsi tertentu pada platform.',
        ],
    },
    {
        icon: Lock,
        color: 'text-red-600',
        bg: 'bg-red-50',
        title: '5. Keamanan Data',
        content: [
            'Kami menerapkan enkripsi SSL/TLS pada seluruh komunikasi data antara perangkat Anda dan server Smart Dispenser untuk mencegah penyadapan.',
            'Kata sandi pengguna disimpan dalam bentuk hash terenkripsi menggunakan algoritma yang aman, sehingga tidak dapat dibaca oleh siapapun, termasuk tim kami.',
            'Akses ke database produksi dibatasi secara ketat hanya kepada anggota tim teknis yang berwenang dan tercatat dalam sistem audit.',
            'Meskipun kami menerapkan langkah-langkah keamanan terbaik, tidak ada sistem yang dapat menjamin keamanan data secara mutlak. Segera laporkan jika Anda mencurigai adanya pelanggaran keamanan.',
        ],
    },
    {
        icon: UserCheck,
        color: 'text-sky-600',
        bg: 'bg-sky-50',
        title: '6. Hak-Hak Pengguna',
        content: [
            'Anda berhak mengakses data pribadi yang kami simpan tentang Anda kapan saja dengan menghubungi tim kami melalui Helpdesk.',
            'Anda dapat meminta koreksi atas data yang tidak akurat atau tidak lengkap yang berkaitan dengan akun Anda.',
            'Pengguna berhak meminta penghapusan data pribadinya dari sistem kami, kecuali data yang wajib disimpan berdasarkan ketentuan hukum yang berlaku.',
            'Anda dapat mengajukan keberatan atas pemrosesan data tertentu atau meminta pembatasan penggunaan data Anda untuk tujuan tertentu.',
        ],
    },
    {
        icon: RefreshCw,
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        title: '7. Pembaruan Kebijakan Privasi',
        content: [
            'Kebijakan privasi ini dapat diperbarui sewaktu-waktu untuk mencerminkan perubahan layanan, regulasi, atau praktik pengelolaan data yang lebih baik.',
            'Setiap pembaruan kebijakan yang bersifat material akan diberitahukan melalui notifikasi di platform atau melalui email institusi yang terdaftar.',
            'Tanggal pembaruan terakhir selalu dicantumkan di bagian atas halaman ini. Kami menyarankan Anda untuk meninjau kebijakan ini secara berkala.',
            'Melanjutkan penggunaan layanan setelah pembaruan kebijakan berlaku dianggap sebagai persetujuan Anda terhadap ketentuan yang telah diubah.',
        ],
    },
    {
        icon: Mail,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        title: '8. Kontak & Pertanyaan Privasi',
        content: [
            'Apabila Anda memiliki pertanyaan, saran, atau kekhawatiran terkait kebijakan privasi ini, silakan hubungi kami melalui halaman Helpdesk.',
            'Untuk permintaan khusus terkait data pribadi seperti akses, koreksi, atau penghapusan, sertakan identitas lengkap Anda agar proses verifikasi dapat berjalan lebih cepat.',
            'Tim kami berkomitmen untuk merespons setiap pertanyaan terkait privasi dalam waktu 1×24 jam pada hari kerja.',
        ],
    },
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#f3f3f3] flex flex-col">
            <NavbarPublic />

            <main className="flex-1">
                {/* Hero */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 py-16 px-6">
                    <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -right-10 -bottom-10 h-56 w-56 rounded-full bg-teal-300/20 blur-2xl" />
                    <div className="relative max-w-3xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            <Lock className="h-3.5 w-3.5" />
                            Dokumen Legal
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
                            Kebijakan Privasi
                        </h1>
                        <p className="text-emerald-100 text-sm md:text-base max-w-xl mx-auto">
                            Kami berkomitmen melindungi privasi dan keamanan data pribadi Anda. Halaman ini menjelaskan
                            bagaimana kami mengumpulkan, menggunakan, dan menjaga informasi Anda saat menggunakan
                            layanan Smart Dispenser.
                        </p>
                        <p className="mt-4 text-emerald-200 text-xs">
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
                                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                                    <div
                                        className={`flex items-center justify-center h-9 w-9 rounded-lg ${sec.bg} shrink-0`}
                                    >
                                        <Icon className={`h-5 w-5 ${sec.color}`} />
                                    </div>
                                    <h2 className="text-base font-bold text-gray-900">{sec.title}</h2>
                                </div>

                                {/* Section body */}
                                <ul className="px-6 py-5 space-y-3">
                                    {sec.content.map((text, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed"
                                        >
                                            <span
                                                className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${sec.bg} ring-2 ring-offset-1 ${sec.color.replace(
                                                    'text-',
                                                    'ring-',
                                                )}`}
                                            />
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
                            Dengan terus menggunakan layanan Smart Dispenser, Anda dianggap telah membaca dan menyetujui
                            seluruh kebijakan privasi di atas. Jika Anda tidak setuju, mohon hentikan penggunaan layanan
                            ini.
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
