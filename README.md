# 🎓 LMS EduDigital SD (SDN Sumberejo 04)
### Hosting Frontend di Vercel & Backend di Google Sheets (Google Apps Script)

Proyek ini telah dimigrasikan ke arsitektur **Modern JAMstack / SPA**:
- **Frontend**: Berjalan di **Vercel** (akses super cepat via CDN global, aset HTML/CSS/JS di-cache instan, tidak ada loading lambat lagi).
- **Backend & Database**: Tetap menggunakan **Google Sheets & Google Drive** melalui Google Apps Script Web App REST API (`doPost`).

---

## 📁 Struktur File Proyek

```text
LMS/
├── index.html          # File HTML utama (Single Page Application)
├── vercel.json         # Konfigurasi routing SPA & Cache Vercel
├── .gitignore          # File pengecualian Git
├── css/
│   └── style.css       # File stylesheet desain LMS EduDigital
├── js/
│   ├── config.js       # File konfigurasi URL Web App Google Apps Script
│   └── app.js          # Seluruh logika interaktif, auth, ujian, & materi
├── CODEGS.md           # Kode backend Apps Script (Code.gs) terbaru
├── javascript.md       # Backup referensi kode JavaScript
├── style.md            # Backup referensi kode CSS
└── README.md           # Panduan lengkap instalasi dan deployment
```

---

## 🚀 Panduan Deployment Langkah demi Langkah

### Langkah 1: Update Google Apps Script (`Code.gs`)
1. Buka Google Spreadsheet LMS Anda di Google Drive.
2. Klik menu **Ekstensi (Extensions)** > **Apps Script**.
3. Buka file `Code.gs`.
4. Hapus isi file lama, lalu salin dan tempelkan seluruh isi dari file [`CODEGS.md`](file:///c:/Users/freza/Music/LMS/CODEGS.md) ke dalam `Code.gs`.
5. Klik ikon **Simpan (Save)** 💾.
6. Klik tombol **Deploy (Terapkan)** di kanan atas > pilih **New deployment (Penerapan baru)**.
7. Pilih jenis: **Web app (Aplikasi web)**:
   - **Description**: `LMS REST API v2 (Vercel Support + Caching)`
   - **Execute as (Jalankan sebagai)**: `Me (email Anda)`
   - **Who has access (Siapa yang memiliki akses)**: **`Anyone (Siapa saja)`** *(Penting: harus Anyone agar frontend Vercel bisa mengakses data)*.
8. Klik **Deploy**. Berikan izin Google jika diminta.
9. **Salin URL Web App** yang dihasilkan (URL yang berakhiran `/exec`).
   > *Contoh format URL:* `https://script.google.com/macros/s/AKfycbx.../exec`

---

### Langkah 2: Hubungkan URL ke File Konfigurasi
Buka file [`js/config.js`](file:///c:/Users/freza/Music/LMS/js/config.js) dan masukkan URL yang tadi Anda salin:

```javascript
window.CONFIG = {
  GAS_WEBAPP_URL: 'https://script.google.com/macros/s/PASTE_URL_ANDA_DI_SINI/exec',
  IS_PREVIEW: false,
  APP_NAME: 'LMS EduDigital SD',
  SCHOOL_NAME: 'SDN Sumberejo 04'
};
```
*(Catatan: Anda juga bisa mengatur URL ini langsung lewat tampilan web di menu **Pengaturan**).*

---

### Langkah 3: Upload Proyek ke GitHub
Buka terminal / Command Prompt di folder proyek ini (`c:\Users\freza\Music\LMS`), lalu jalankan perintah berikut:

1. **Inisialisasi Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Migrasi LMS ke Vercel"
   ```

2. **Buat Repository Baru di GitHub:**
   - Buka [https://github.com/new](https://github.com/new).
   - Beri nama repository (misalnya `lms-sdn-sumberejo04`).
   - Pilih **Public** atau **Private** (bebas).
   - Klik **Create repository**.

3. **Hubungkan dan Kirim (Push) ke GitHub:**
   *(Ganti `USERNAME` dan `REPO_NAME` sesuai akun Anda)*
   ```bash
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git push -u origin main
   ```

---

### Langkah 4: Hubungkan & Deploy ke Vercel
1. Buka [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
2. Di dashboard Vercel, klik tombol **Add New...** lalu pilih **Project**.
3. Temukan repository GitHub yang baru saja Anda buat (`lms-sdn-sumberejo04`), lalu klik **Import**.
4. Pada bagian pengaturan proyek:
   - **Framework Preset**: Biarkan `Other` (karena ini HTML/JS statis).
   - **Root Directory**: `./` (default).
   - Tidak perlu mengisi Build Command atau Output Directory.
5. Klik tombol **Deploy**.
6. Tunggu sekitar 10 - 20 detik, Vercel akan memberikan domain publik gratis (misalnya `https://lms-sdn-sumberejo04.vercel.app`).
7. Buka link tersebut di browser atau HP — LMS Anda sekarang sudah live dan super responsif! 🎉

---

## ⚡ Mengapa Sekarang Jauh Lebih Cepat?
1. **Frontend Super Cepat (Vercel Edge Network)**: Semua tampilan HTML, CSS, ikon, dan script langsung terunduh dalam hitungan milidetik dari CDN terdekat, tidak lagi menunggu server Apps Script membuat halaman.
2. **Session Caching (`CacheService`)**: Login siswa dan guru disimpan di memori cache Google Script selama 6 jam. Setiap klik menu tidak perlu lagi membaca ulang sheet `Pengguna`, memotong waktu respon server secara drastis.
3. **Kompresi Gambar Otomatis**: Setiap upload materi dan tugas otomatis dikompresi di sisi browser sebelum dikirim ke Google Drive.
