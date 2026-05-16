const usageSteps = [
  {
    number: "01",
    title: "Tempatkan Wadah",
    desc: "Letakkan wadah air yang akan digunakan pada posisi yang telah disediakan di bawah dispenser.",
    gradient: "from-blue-500 to-blue-600",
    border: "border-blue-100",
  },
  {
    number: "02",
    title: "Pilih Volume Air",
    desc: "Pilih volume air yang sesuai dengan kapasitas wadah yang digunakan.",
    gradient: "from-cyan-500 to-blue-500",
    border: "border-cyan-100",
  },
  {
    number: "03",
    title: "Tekan Tombol Mulai",
    desc: "Tekan tombol mulai pengisian, air akan keluar otomatis sesuai volume yang dipilih.",
    gradient: "from-sky-500 to-cyan-500",
    border: "border-sky-100",
  },
];

export default function UsageSection() {
  return (
    <section className="border-t border-blue-100/80 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-5xl md:text-6xl font-black text-blue-700 tracking-tight">
            Cara Pakai
          </h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Alur penggunaan dibuat cepat dan sederhana supaya pengalaman isi air terasa nyaman.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {usageSteps.map((item) => (
            <article
              key={item.number}
              className={`relative bg-white border ${item.border} rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 overflow-hidden`}
            >
              {/* Watermark number — background dekoratif */}
              {/* <span className="absolute -right-2 -top-3 text-7xl font-black text-slate-100 select-none pointer-events-none leading-none">
                {item.number}
              </span> */}

              {/* Number badge — gantikan icon */}
              <div
                className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-black text-lg shadow-md mb-5`}
              >
                {item.number}
              </div>

              <h3 className="text-lg font-bold text-slate-800 leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}