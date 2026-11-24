# Sewa Mobil Di Medan Terpercaya (Next.js + Firebase + Vercel)

Halaman publik dirender di server (SSR/ISR, update otomatis tiap 60 detik) sehingga isi, harga, dan artikel terbaca penuh oleh Google.

## 1. Siapkan Firebase
1. Buka https://console.firebase.google.com, buat project, lalu tambahkan **Web app**. Salin nilai config ke `.env.local` (lihat `.env.example`).
2. **Build > Firestore Database**: Create database (mode production, region asia-southeast2/Jakarta).
3. **Build > Authentication > Sign-in method**: aktifkan **Email/Password**. Di tab **Users** tambahkan 1 user admin (email + password kuat). Salin **User UID**-nya.
   Di **Settings > User actions** matikan "Enable create (sign-up)" agar tidak ada orang lain bisa mendaftar.
4. **Build > Storage**: Get started (untuk project baru, Firebase meminta paket Blaze; kuota gratisnya cukup untuk situs ini).
5. Buka `firestore.rules` dan `storage.rules`, ganti `GANTI_UID_ADMIN` dengan UID admin, lalu salin isinya ke tab **Rules** masing-masing dan **Publish**.

## 2. Upload ke GitHub
```
git init && git add . && git commit -m "init"
git branch -M main
git remote add origin https://github.com/USERNAME/sewa-mobil-medan.git
git push -u origin main
```
Jangan commit `.env.local` (sudah ada di `.gitignore`).

## 3. Deploy ke Vercel
1. vercel.com > Add New > Project > pilih repo GitHub tadi.
2. Isi **Environment Variables** sesuai `.env.example`. `ADMIN_PATH` adalah alamat rahasia dashboard.
3. Deploy. Tambahkan domain Anda di Settings > Domains, lalu isi `NEXT_PUBLIC_SITE_URL` dengan domain tersebut dan redeploy.
4. Tambahkan domain Vercel/domain Anda di Firebase **Authentication > Settings > Authorized domains**.

## 4. Akses admin
Buka `https://domainanda.com/<ADMIN_PATH>` lalu login. Alamat `/admin` dan alamat internal aslinya menampilkan 404. Ganti `ADMIN_PATH` kapan saja di Vercel (redeploy) jika alamat bocor. Isi pertama kali: tab **No HP, WA & Alamat** > Simpan, lalu tambah jenis mobil, mobil, dan artikel.

## 5. Langkah SEO setelah online
1. Daftarkan domain di **Google Search Console**, isi kode verifikasi di `NEXT_PUBLIC_GSC_VERIFICATION`, lalu submit `https://domainanda.com/sitemap.xml`.
2. Buat **Google Business Profile** (Google Maps) dengan nama, alamat, dan nomor yang sama persis dengan website. Ini faktor terbesar untuk pencarian "sewa mobil medan".
3. Isi foto asli tiap mobil, deskripsi unik, dan semua harga paket. Tulis artikel rutin (misal "sewa mobil ke Danau Toba", "sewa mobil bandara Kualanamu") dengan subjudul `##`.
4. Minta tautan dari direktori/Instagram/Facebook bisnis ke website.
