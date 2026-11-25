# Pustakaku - Sistem Katalog Perpustakaan SMA

Aplikasi web pencatatan dan katalog buku perpustakaan SMA berbasis Next.js (App Router), TypeScript, Tailwind CSS, Prisma ORM, dan SQLite.

## Tech Stack
- **Framework:** Next.js (App Router) & TypeScript
- **Styling:** Tailwind CSS
- **Database & ORM:** SQLite & Prisma ORM v6
- **Mutasi & Validasi Data:** Next.js Server Actions

## Fitur Utama
- **Landing Page (`/`):** Halaman informasi pengenalan aplikasi dan navigasi cepat ke katalog buku.
- **Daftar Buku (`/buku`):** Menampilkan daftar seluruh buku beserta status stok (dengan penanda warna merah jika stok tersedia `0`), serta fitur pencarian berdasarkan judul atau penulis.
- **Detail Buku (`/buku/[id]`):** Menampilkan informasi rinci setiap buku beserta penanganan halaman `loading` dan `404 Not Found` apabila ID buku tidak valid atau tidak ditemukan.
- **Tambah Buku (`/buku/baru`):** Formulir penambahan koleksi buku baru ke database dengan validasi di sisi server.

## Cara Menjalankan Proyek

1. **Clone repository dan masuk ke folder proyek:**
   ```bash
   git clone [https://github.com/ivanibrahim/uas-web-based-application-development.git](https://github.com/ivanibrahim/uas-web-based-application-development.git)
   cd uas-web-based-application-development/pustakaku
   ```

2. **Instalasi dependensi:**
   ```bash
   npm install
   ```

3. **Siapkan environment variable:**
   Pastikan terdapat file `.env` di dalam folder `pustakaku` dengan isi berikut:
   ```env
   DATABASE_URL="file:./dev.db"
   ```

4. **Jalankan migrasi database dan seed data awal:**
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Jalankan server development:**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser untuk mengakses aplikasi.