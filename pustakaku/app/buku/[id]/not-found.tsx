import Link from "next/link";

export default function BukuNotFound() {
  return (
    <main className="rounded-xl border bg-white p-8 text-center">
      <h1 className="text-xl font-bold text-gray-900">Buku Tidak Ditemukan</h1>
      <p className="mt-2 text-sm text-gray-600">
        Data buku yang Anda cari tidak tersedia atau ID tidak valid.
      </p>
      <Link
        href="/buku"
        className="mt-6 inline-block rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
      >
        &larr; Kembali ke daftar
      </Link>
    </main>
  );
}