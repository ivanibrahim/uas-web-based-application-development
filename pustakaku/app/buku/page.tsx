import { Suspense } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function TabelBuku({ cari }: { cari?: string }) {
  const daftarBuku = await prisma.buku.findMany({
    where: cari
      ? {
          OR: [
            { judul: { contains: cari } },
            { penulis: { contains: cari } },
          ],
        }
      : undefined,
    orderBy: { id: "asc" },
  });

  if (daftarBuku.length === 0) {
    return (
      <div className="mt-6 rounded-xl border bg-white p-8 text-center text-gray-500">
        {cari
          ? `Tidak ditemukan buku dengan kata kunci "${cari}".`
          : "Belum ada data buku di perpustakaan."}
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b bg-gray-50 text-gray-600">
            <th className="px-4 py-3 font-medium">No</th>
            <th className="px-4 py-3 font-medium">Judul</th>
            <th className="px-4 py-3 font-medium">Penulis</th>
            <th className="px-4 py-3 font-medium">Kategori</th>
            <th className="px-4 py-3 font-medium">Stok</th>
            <th className="px-4 py-3 font-medium">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {daftarBuku.map((buku, index) => {
            const stokHabis = buku.stokTersedia === 0;
            return (
              <tr key={buku.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{buku.judul}</td>
                <td className="px-4 py-3 text-gray-600">{buku.penulis}</td>
                <td className="px-4 py-3 text-gray-600">{buku.kategori}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      stokHabis
                        ? "inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700"
                        : "text-gray-700"
                    }
                  >
                    {buku.stokTersedia}/{buku.stokTotal}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/buku/${buku.id}`}
                    className="inline-block rounded-lg border border-gray-300 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

async function PencarianDanDaftar({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  const { cari: nilaiCari } = await searchParams;
  const cari = Array.isArray(nilaiCari) ? nilaiCari[0] : nilaiCari;

  return (
    <>
      <form action="/buku" method="get" className="mt-6 flex gap-2">
        <input
          name="cari"
          defaultValue={cari}
          placeholder="Cari judul atau penulis"
          className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm focus:border-gray-900 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Cari
        </button>
      </form>

      <Suspense
        key={cari}
        fallback={<p className="mt-6 text-sm text-gray-500">Memuat daftar buku...</p>}
      >
        <TabelBuku cari={cari} />
      </Suspense>
    </>
  );
}

export default function DaftarBukuPage({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Daftar buku</h1>
        <Link
          href="/buku/baru"
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Tambah buku
        </Link>
      </div>

      <Suspense fallback={<p className="mt-6 text-sm text-gray-500">Memuat...</p>}>
        <PencarianDanDaftar searchParams={searchParams} />
      </Suspense>
    </main>
  );
}