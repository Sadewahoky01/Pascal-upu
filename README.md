# 🌲 MAPALA PASCAL UPU - Web Portal & Outdoor Gear Shop

Website resmi MAPALA PASCAL Universitas Potensi Utama dengan integrasi **Firebase Firestore Database Mode Produksi** dan penyiapan deployment **Netlify & GitHub**.

---

## 📁 Struktur Proyek (Modular)

Proyek ini telah dipisah secara modular:

```
pascal/
├── index.html              # Dokumen HTML utama
├── css/
│   └── style.css           # Seluruh stylesheet & responsive layout
├── js/
│   ├── firebase-config.js  # Konfigurasi & Inisialisasi Firestore DB
│   ├── pab.js              # Penanganan Form PAB & Firestore Integration
│   ├── shop.js             # Keranjang Sewa Alat & WhatsApp Checkout
│   └── main.js             # Entry Point Modul Utama
├── netlify.toml            # Konfigurasi Pembangun Netlify
├── .gitignore              # Pengabaian file sensitif
└── README.md               # Dokumentasi Panduan Setup & Deploy
```

---

## 🔥 1. Setup Firebase Firestore Database (Mode Produksi)

### Langkah A: Buat Firebase Project
1. Buka [Firebase Console](https://console.firebase.google.com/).
2. Klik **Add project** dan namai project Anda (misal: `pascal-upu`).
3. Pilih **Build** -> **Firestore Database** -> Klik **Create database**.
4. Pilih lokasi server (contoh: `asia-southeast1` untuk Singapura).
5. Pada pilihan Security Rules, pilih **Start in production mode** (Mode Produksi).

### Langkah B: Aturan Keamanan Firestore (Security Rules) Mode Produksi
Di tab **Rules** pada Firestore Database, masukkan aturan keamanan berikut agar publik hanya dapat menambahkan data pendaftaran tanpa bisa menghapus/mengedit data orang lain:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Koleksi Pendaftaran PAB
    match /pab_registrations/{document} {
      allow create: if request.resource.data.nama is string 
                   && request.resource.data.nim is string;
      allow read, update, delete: if false; // Hanya Admin via Firebase Console
    }
  }
}
```
Klik **Publish**.

### Langkah C: Ambil Kunci API & Perbarui `js/firebase-config.js`
1. Di Firebase Console, klik **Project Settings** (ikon roda gigi) -> **General**.
2. Scroll ke bagian **Your apps** -> Klik ikon Web (`</>`).
3. Daftarkan nama app dan salin objek `firebaseConfig`.
4. Buka file [`js/firebase-config.js`](file:///c:/Users/anand/OneDrive/Tài%20liệu/pascal/js/firebase-config.js) di proyek ini dan ganti nilai `YOUR_API_KEY` serta properti lainnya sesuai config Anda:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyX...", // Ganti dengan API Key asli Anda
    authDomain: "pascal-upu.firebaseapp.com",
    projectId: "pascal-upu",
    storageBucket: "pascal-upu.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef..."
};
```

---

## 🚀 2. Cara Push ke GitHub

Jalankan perintah berikut pada terminal di folder proyek ini:

```bash
# 1. Inisialisasi Git (jika belum)
git init

# 2. Tambahkan seluruh file
git add .

# 3. Buat commit pertama
git commit -m "feat: refactor modular structure, add firestore database & netlify config"

# 4. Hubungkan ke repositori GitHub Anda
# Ganti URL di bawah dengan URL repository GitHub Anda
git remote add origin https://github.com/USERNAME/pascal-upu.git

# 5. Ubah branch ke main dan push
git branch -M main
git push -u origin main
```

---

## 🌐 3. Cara Deploy ke Netlify

### Opsi A: Hubungkan via Netlify Console (Rekomendasi)
1. Buka [Netlify App Console](https://app.netlify.com/).
2. Klik **Add new site** -> **Import an existing project**.
3. Pilih **GitHub** dan berikan izin akses ke repositori `pascal-upu` Anda.
4. Netlify akan secara otomatis membaca file [`netlify.toml`](file:///c:/Users/anand/OneDrive/Tài%20liệu/pascal/netlify.toml).
5. Klik **Deploy site**. Site Anda akan langsung online dengan HTTPS gratis!

### Opsi B: Deploy via Netlify CLI
```bash
# Install Netlify CLI jika belum
npm install -g netlify-cli

# Login & Deploy
netlify login
netlify deploy --prod
```

---

## 🌲 Salam Lestari!
Disusun untuk **MAPALA PASCAL UPU - Universitas Potensi Utama**.
