import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormEditStok from "@/components/FormEditStok";

async function KontenDetailBuku({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const nomor = Number(id);

  if (!Number.isInteger(nomor)) {
    notFound();
  }

  const buku = await prisma.buku.findUnique({
    where: { id: nomor },
  });

  if (!buku) {
    notFound();
  }

  const stokHabis = buku.stokTersedia === 0;

  return (
    <div className="mt-4 rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* Placeholder Sampul sesuai mockup */}
        <div className="flex h-52 w-full shrink-0 items-center justify-center rounded-lg border bg-gray-100 text-sm font-medium text-gray-500 sm:w-40">
          Sampul
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{buku.judul}</h1>
          <p className="mt-2 text-sm text-gray-700">
            <span className="font-medium">Penulis:</span> {buku.penulis}
          </p>
          <p className="mt-1 text-sm text-gray-700">
            <span className="font-medium">Kategori:</span> {buku.kategori}
            {buku.tahunTerbit ? ` • Tahun: ${buku.tahunTerbit}` : ""}
          </p>

          <div className="mt-4">
            <span
              className={`inline-block rounded-lg px-3 py-1.5 text-sm font-medium ${
                stokHabis
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-800"
              }`}
            >
              Stok: {buku.stokTersedia} dari {buku.stokTotal} tersedia
            </span>
          </div>

          <div className="mt-5 border-t pt-4">
            <p className="text-sm leading-relaxed text-gray-600">
              {buku.deskripsi || "Tidak ada deskripsi untuk buku ini."}
            </p>
          </div>
          <FormEditStok
            bukuId={buku.id}
            stokTersedia={buku.stokTersedia}
            stokTotal={buku.stokTotal}
          />
        </div>
      </div>
    </div>
  );
}

export default function DetailBukuPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <main>
      <Link
        href="/buku"
        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        &larr; Kembali ke daftar
      </Link>

      <Suspense
        fallback={<p className="mt-4 text-sm text-gray-500">Memuat detail buku...</p>}
      >
        <KontenDetailBuku params={params} />
      </Suspense>
    </main>
  );
}