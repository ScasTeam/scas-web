# SCAS Web (Portal Admin & Dosen)

Repositori ini berisi kode sumber untuk web portal Smart Campus Attendance System (SCAS). Dibangun menggunakan Next.js dan difokuskan sebagai dashboard untuk admin, dosen (termasuk verifikasi QR scan via kamera), dan portal fallback bagi mahasiswa.

## Tech Stack
- **Framework:** Next.js 16.2.2 (App Router) dengan React Compiler
- **Library UI:** React 19.2.4
- **Styling:** Tailwind CSS 4 & shadcn/ui (Radix UI)
- **Bahasa:** TypeScript 5

## Daftar Library / Dependencies
- **State Management:** Zustand (dengan *persist middleware*)
- **Data Fetching:** Axios
- **Auth:** `@react-oauth/google` (Google SSO)
- **Charts:** Recharts
- **Icons:** Lucide React
- **Animasi & Scrolling:** GSAP & Lenis
- **QR Code:** 
  - `qrcode.react` (Render QR SVG untuk batch QR)
  - `html5-qrcode` (Scanner kamera untuk dosen memindai QR mahasiswa)
- **Komponen Tanggal:** `@mui/material` & `@mui/x-date-pickers`

## Cara Menjalankan Secara Lokal

> **Catatan Penting:** Agar web portal dapat berfungsi dengan baik, pastikan backend **scas-api** sudah berjalan di latar belakang.

1. Pastikan Anda telah menginstal Node.js versi terbaru.
2. Masuk ke direktori `scas-web`:
   ```bash
   cd scas-web
   ```
3. Instal semua dependensi:
   ```bash
   npm install
   ```
4. Buat file konfigurasi environment berdasarkan template (jika ada):
   ```bash
   cp .env.example .env.local
   ```
   *Atur environment variable yang dibutuhkan seperti URL API Backend dan Google Client ID.*
5. Jalankan development server:
   ```bash
   npm run dev
   ```
6. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.
