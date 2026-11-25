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
    stokTersedia?: string;
    stokTotal?: string;
  };
  values?: {
    judul: string;
    penulis: string;
    kategori: string;
    tahunTerbit: string;
    stokTersedia: string;
    stokTotal: string;
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
  const tersediaStr = String(formData.get("stokTersedia") ?? "").trim();
  const totalStr = String(formData.get("stokTotal") ?? "").trim();
  const deskripsi = String(formData.get("deskripsi") ?? "").trim();

  const values = {
    judul,
    penulis,
    kategori,
    tahunTerbit: tahunStr,
    stokTersedia: tersediaStr,
    stokTotal: totalStr,
    deskripsi,
  };

  const galat: NonNullable<FormBukuState["galat"]> = {};
  if (!judul) galat.judul = "Judul wajib diisi";
  if (!penulis) galat.penulis = "Penulis wajib diisi";
  if (!kategori) galat.kategori = "Kategori wajib dipilih";

  const stokTotal = Number(totalStr);
  if (!totalStr || !Number.isInteger(stokTotal) || stokTotal < 0) {
    galat.stokTotal = "Stok total harus berupa angka minimal 0";
  }

  const stokTersedia = Number(tersediaStr);
  if (!tersediaStr || !Number.isInteger(stokTersedia) || stokTersedia < 0) {
    galat.stokTersedia = "Stok saat ini harus berupa angka minimal 0";
  } else if (!galat.stokTotal && stokTersedia > stokTotal) {
    galat.stokTersedia = "Stok saat ini tidak boleh melebihi stok total";
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
        stokTersedia,
        stokTotal,
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
export async function updateStokBuku(
  _prev: FormBukuState,
  formData: FormData
): Promise<FormBukuState> {
  const id = Number(formData.get("id"));
  const tersediaStr = String(formData.get("stokTersedia") ?? "").trim();
  const totalStr = String(formData.get("stokTotal") ?? "").trim();

  if (!Number.isInteger(id)) {
    return { sukses: false, pesan: "ID buku tidak valid." };
  }

  const stokTotal = Number(totalStr);
  const stokTersedia = Number(tersediaStr);
  const galat: NonNullable<FormBukuState["galat"]> = {};

  if (!totalStr || !Number.isInteger(stokTotal) || stokTotal < 0) {
    galat.stokTotal = "Stok total harus berupa angka minimal 0";
  }

  if (!tersediaStr || !Number.isInteger(stokTersedia) || stokTersedia < 0) {
    galat.stokTersedia = "Stok saat ini harus berupa angka minimal 0";
  } else if (!galat.stokTotal && stokTersedia > stokTotal) {
    galat.stokTersedia = "Stok saat ini tidak boleh melebihi stok total";
  }

  if (Object.keys(galat).length > 0) {
    return {
      sukses: false,
      pesan: "Periksa kembali nilai stok.",
      galat,
    };
  }

  try {
    await prisma.buku.update({
      where: { id },
      data: {
        stokTersedia,
        stokTotal,
      },
    });
  } catch {
    return {
      sukses: false,
      pesan: "Gagal memperbarui stok buku.",
    };
  }

  revalidatePath("/buku");
  revalidatePath(`/buku/${id}`);

  return {
    sukses: true,
    pesan: "Stok buku berhasil diperbarui.",
  };
}