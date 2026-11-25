import Link from "next/link";

export default function HomePage() {
  return (
    <main className="py-12">
      <div className="rounded-2xl border bg-white p-8 shadow-sm">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
          Perpustakaan Digital SMA
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Selamat Datang di Pustakaku
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-600">
          Pustakaku adalah aplikasi web sederhana untuk menggantikan pencatatan buku
          perpustakaan manual. Siswa dan petugas dapat mencari koleksi buku, memeriksa
          ketersediaan stok secara langsung, melihat informasi detail buku, serta menambahkan
          koleksi buku baru ke dalam katalog perpustakaan.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/buku"
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Lihat Daftar Buku &rarr;
          </Link>
          <Link
            href="/buku/baru"
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Tambah Buku Baru
          </Link>
        </div>
      </div>
    </main>
  );
}