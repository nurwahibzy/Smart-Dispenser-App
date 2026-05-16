import React from "react";

const ContactHero: React.FC = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden px-8 py-10 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 text-white shadow-lg">
      {/* Decorative blobs */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #bfdbfe, #06b6d4)" }}
      />
      <div
        className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full opacity-20 blur-2xl"
        style={{ background: "radial-gradient(circle, #93c5fd, #0ea5e9)" }}
      />

      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Hubungi Kami</h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-white/90 leading-relaxed">
          Butuh bantuan atau memiliki pertanyaan seputar Smart Dispenser? Tim kami siap membantu
          Anda.
        </p>
      </div>
    </div>
  );
};

export default ContactHero;