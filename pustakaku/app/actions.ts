"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export type FormBukuState = {
  sukses: boolean;
  pesan: string;
  galat?: {
    judul?: string;
    penulis?: string;
    kategori?: string;
    tahunTerbit?: string;
    stok?: string;
  };
  values?: {
    judul: string;
    penulis: string;
    kategori: string;
    tahunTerbit: string;
    stok: string;
    deskripsi: string;
  };
};

export async function tambahBuku(
  _prev: FormBukuState,
  formData: FormData
): Promise<FormBukuState> {
  const judul = String(formData.get("judul") ?? "").trim();
  const penulis = String(formData.get("penulis") ?? "").trim();
  const kategori = String(formData.get("kategori") ?? "").trim();
  const tahunStr = String(formData.get("tahunTerbit") ?? "").trim();
  const stokStr = String(formData.get("stok") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();

  const values = {
    judul,
    penulis,
    kategori,
    tahunTerbit: tahunStr,
    stok: stokStr,
    deskripsi,
  };

  // Validasi server sesuai field wajib (*) di mockup
  const galat: NonNullable<FormBukuState["galat"]> = {};
  if (!judul) galat.judul = "Judul wajib diisi";
  if (!penulis) galat.penulis = "Penulis wajib diisi";
  if (!kategori) galat.kategori = "Kategori wajib dipilih";

  const jumlahStok = Number(stokStr);
  if (!stokStr || !Number.isInteger(jumlahStok) || jumlahStok < 0) {
    galat.stok = "Jumlah stok harus berupa angka minimal 0";
  }

  let tahunTerbit: number | null = null;
  if (tahunStr) {
    const parsedTahun = Number(tahunStr);
    if (!Number.isInteger(parsedTahun) || parsedTahun < 1000 || parsedTahun > 2100) {
      galat.tahunTerbit = "Tahun terbit tidak valid";
    } else {
      tahunTerbit = parsedTahun;
    }
  }

  if (Object.keys(galat).length > 0) {
    return {
      sukses: false,
      pesan: "Periksa kembali isian formulir Anda.",
      galat,
      values,
    };
  }

  try {
    await prisma.buku.create({
      data: {
        judul,
        penulis,
        kategori,
        tahunTerbit,
        stokTersedia: jumlahStok,
        stokTotal: jumlahStok,
        deskripsi: deskripsi || null,
      },
    });
  } catch {
    return {
      sukses: false,
      pesan: "Terjadi kesalahan saat menyimpan data ke database.",
      values,
    };
  }

  revalidatePath("/buku");
  redirect("/buku");
}