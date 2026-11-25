import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pustakaku - Sistem Perpustakaan SMA",
  description: "Aplikasi pencatatan dan katalog buku perpustakaan SMA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
              Pustakaku
            </Link>
            <div className="flex items-center gap-6 text-sm font-medium">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Beranda
              </Link>
              <Link href="/buku" className="text-gray-600 hover:text-gray-900">
                Daftar Buku
              </Link>
              <Link
                href="/buku/baru"
                className="rounded-lg bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-800"
              >
                + Tambah Buku
              </Link>
            </div>
          </nav>
        </header>
        <div className="mx-auto max-w-4xl p-6">{children}</div>
      </body>
    </html>
  );
}