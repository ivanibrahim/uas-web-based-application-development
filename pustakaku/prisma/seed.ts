import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const jumlah = await prisma.buku.count();
  if (jumlah > 0) return;

  await prisma.buku.createMany({
    data: [
      {
        judul: "Laskar Pelangi",
        penulis: "A. Hirata",
        kategori: "Novel",
        tahunTerbit: 2005,
        stokTersedia: 3,
        stokTotal: 5,
        deskripsi: "Kisah perjuangan sepuluh anak Laskar Pelangi di Belitung yang penuh semangat meraih mimpi.",
      },
      {
        judul: "Bumi Manusia",
        penulis: "P. A. Toer",
        kategori: "Novel",
        tahunTerbit: 1980,
        stokTersedia: 0,
        stokTotal: 2,
        deskripsi: "Roman sejarah pergerakan nasional di masa kolonial Hindia Belanda.",
      },
      {
        judul: "Fisika Dasar",
        penulis: "Halliday",
        kategori: "Sains",
        tahunTerbit: 2010,
        stokTersedia: 2,
        stokTotal: 2,
        deskripsi: "Buku pegangan konsep dasar mekanika, termodinamika, dan elektromagnetisme.",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });