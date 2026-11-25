# Pustakaku - Sistem Katalog Perpustakaan SMA

Aplikasi web pencatatan dan katalog buku perpustakaan berbasis Next.js (App Router), TypeScript, Tailwind CSS, Prisma ORM, dan SQLite.

## Fitur Utama
- **Landing Page (`/`)**: Informasi aplikasi dan navigasi cepat ke katalog buku.
- **Daftar Buku (`/buku`)**: Menampilkan daftar buku, indikator warna merah saat stok habis (`0`), serta fitur pencarian berdasarkan judul atau penulis.
- **Detail Buku (`/buku/[id]`)**: Menampilkan informasi lengkap buku beserta penanganan halaman 404 jika buku tidak ditemukan.
- **Tambah Buku (`/buku/baru`)**: Formulir penambahan buku baru dengan validasi server melalui Next.js Server Actions.

## Cara Menjalankan Proyek

1. **Clone repository:**
   ```bash
   git clone [https://github.com/ivanibrahim/uas-web-based-application-development.git](https://github.com/ivanibrahim/uas-web-based-application-development.git)
   cd uas-web-based-application-development