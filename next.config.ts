import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
    ],
  },

  // Supaya build tetap jalan walau ada error eslint, terutama untuk file yang belum di-refactor
  //
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
