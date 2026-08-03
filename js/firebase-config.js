// firebase-config.js - Firebase Initialization & Cloud Firestore (Production Mode)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// IMPORTANT: Ganti konfigurasi di bawah dengan Kunci API Firebase Project Anda sendiri.
// Anda dapat menemukan kunci ini di Firebase Console -> Project Settings -> General -> Your apps.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "pascal-upu.firebaseapp.com",
    projectId: "pascal-upu",
    storageBucket: "pascal-upu.appspot.com",
    messagingSenderId: "1234567890",
    appId: "1:1234567890:web:abcdef1234567890"
};

// Inisialisasi Firebase App
let app;
let db;
let isFirebaseConfigured = false;

try {
    // Memeriksa apakah API Key default sudah diganti
    if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        isFirebaseConfigured = true;
        console.log("🔥 Firebase Firestore Database Mode Produksi Berhasil Terhubung!");
    } else {
        console.warn("⚠️ Firebase belum dikonfigurasi dengan API key asli. Aplikasi berjalan dalam mode fallback lokal.");
    }
} catch (error) {
    console.error("❌ Gagal menginisialisasi Firebase:", error);
}

export { db, collection, addDoc, serverTimestamp, isFirebaseConfigured };
