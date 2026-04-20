import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <Image
        src="/images/404.png"
        alt="404 Not Found"
        width={300}
        height={300}
        className="mb-15"
      />
      <p className="text-gray-500 mb-4">
        Halaman yang kamu cari tidak ditemukan.
      </p>

      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Kembali
      </Link>
    </div>
  );
}