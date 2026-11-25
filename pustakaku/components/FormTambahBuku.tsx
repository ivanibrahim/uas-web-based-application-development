"use client";

import { useActionState } from "react";
import Link from "next/link";
import { tambahBuku, type FormBukuState } from "@/app/actions";

const awal: FormBukuState = { sukses: false, pesan: "" };

export default function FormTambahBuku() {
  const [state, formAction, pending] = useActionState(tambahBuku, awal);

  return (
    <form action={formAction} className="mt-6 space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      {/* Judul * */}
      <div>
        <label htmlFor="judul" className="block text-sm font-medium text-gray-700">
          Judul <span className="text-red-600">*</span>
        </label>
        <input
          id="judul"
          name="judul"
          placeholder="Judul buku"
          defaultValue={state.values?.judul}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
        />
        {state.galat?.judul && (
          <p className="mt-1 text-xs text-red-600">{state.galat.judul}</p>
        )}
      </div>

      {/* Penulis * */}
      <div>
        <label htmlFor="penulis" className="block text-sm font-medium text-gray-700">
          Penulis <span className="text-red-600">*</span>
        </label>
        <input
          id="penulis"
          name="penulis"
          placeholder="Nama penulis"
          defaultValue={state.values?.penulis}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
        />
        {state.galat?.penulis && (
          <p className="mt-1 text-xs text-red-600">{state.galat.penulis}</p>
        )}
      </div>

      {/* Kategori * */}
      <div>
        <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">
          Kategori <span className="text-red-600">*</span>
        </label>
        <select
          id="kategori"
          name="kategori"
          defaultValue={state.values?.kategori ?? ""}
          className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
        >
          <option value="" disabled>
            Pilih kategori
          </option>
          <option value="Novel">Novel</option>
          <option value="Sains">Sains</option>
          <option value="Sejarah">Sejarah</option>
          <option value="Pelajaran">Pelajaran</option>
          <option value="Biografi">Biografi</option>
          <option value="Lainnya">Lainnya</option>
        </select>
        {state.galat?.kategori && (
          <p className="mt-1 text-xs text-red-600">{state.galat.kategori}</p>
        )}
      </div>

      {/* Tahun terbit & Jumlah stok * (2 kolom sesuai mockup) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="tahunTerbit" className="block text-sm font-medium text-gray-700">
            Tahun terbit
          </label>
          <input
            id="tahunTerbit"
            name="tahunTerbit"
            type="number"
            placeholder="2005"
            defaultValue={state.values?.tahunTerbit}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
          {state.galat?.tahunTerbit && (
            <p className="mt-1 text-xs text-red-600">{state.galat.tahunTerbit}</p>
          )}
        </div>

        <div>
          <label htmlFor="stok" className="block text-sm font-medium text-gray-700">
            Jumlah stok <span className="text-red-600">*</span>
          </label>
          <input
            id="stok"
            name="stok"
            type="number"
            min={0}
            placeholder="5"
            defaultValue={state.values?.stok}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
          />
          {state.galat?.stok && (
            <p className="mt-1 text-xs text-red-600">{state.galat.stok}</p>
          )}
        </div>
      </div>

      {/* Deskripsi */}
      <div>
        <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={3}
          placeholder="Deskripsi buku"
          defaultValue={state.values?.deskripsi}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
        />
      </div>

      {state.pesan && (
        <p className="text-sm text-red-600">{state.pesan}</p>
      )}

      {/* Tombol Batal & Simpan sesuai mockup */}
      <div className="flex items-center justify-between pt-2">
        <Link
          href="/buku"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {pending ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}