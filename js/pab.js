// pab.js - Handling Pendaftaran Anggota Baru (PAB) & Database Integration

import { db, collection, addDoc, serverTimestamp, isFirebaseConfigured } from './firebase-config.js';

export function initPABForm() {
    const formPendaftaran = document.getElementById('formPendaftaran');
    if (!formPendaftaran) return;

    formPendaftaran.addEventListener('submit', async function (event) {
        event.preventDefault();

        const submitBtn = formPendaftaran.querySelector('.btn-submit');
        const alertBox = document.getElementById('pabAlert') || createAlertBox(formPendaftaran);

        // Mengambil nilai form
        const nama = document.getElementById('nama').value.trim();
        const nim = document.getElementById('nim').value.trim();
        const prodi = document.getElementById('prodi').value.trim();
        const semester = document.getElementById('semester').value;
        const hp = document.getElementById('hp').value.trim();
        const alasan = document.getElementById('alasan').value.trim();

        if (!nama || !nim || !prodi || !semester || !hp || !alasan) {
            showAlert(alertBox, 'Mohon lengkapi seluruh kolom formulir!', 'error');
            return;
        }

        // Tampilkan status loading pada tombol
        submitBtn.disabled = true;
        const originalText = submitBtn.innerText;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim Data...';
        showAlert(alertBox, 'Sedang memproses pendaftaran...', 'info');

        try {
            if (isFirebaseConfigured && db) {
                // Simpan data pendaftar ke Firestore Database (Koleksi: pab_registrations)
                const docRef = await addDoc(collection(db, "pab_registrations"), {
                    nama: nama,
                    nim: nim,
                    prodi: prodi,
                    semester: semester,
                    hp: hp,
                    alasan: alasan,
                    status: "Pending",
                    createdAt: serverTimestamp()
                });

                console.log("✅ Data PAB berhasil disimpan ke Firestore dengan ID:", docRef.id);
                showAlert(alertBox, `Selamat ${nama}! Pendaftaran PAB Anda berhasil disimpan ke database. Panitia akan menghubungi Anda via WhatsApp.`, 'success');
            } else {
                // Fallback jika API key belum diisi oleh user
                console.log("ℹ️ Mode Simuasi (Firestore belum dikonfigurasi API Key): Data PAB dikirim.", { nama, nim, prodi, semester, hp, alasan });
                showAlert(alertBox, `Terima kasih ${nama}, pendaftaran PAB Anda telah diterima (Mode Lokal). Mohon lengkapi Firebase API Key untuk sinkronisasi live database.`, 'success');
            }

            formPendaftaran.reset();
        } catch (error) {
            console.error("❌ Gagal menyimpan data ke Firestore:", error);
            showAlert(alertBox, `Gagal mengirim pendaftaran: ${error.message}. Silakan coba lagi nanti.`, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = originalText;
        }
    });
}

function createAlertBox(formElement) {
    const alert = document.createElement('div');
    alert.id = 'pabAlert';
    alert.className = 'form-alert';
    formElement.parentNode.insertBefore(alert, formElement);
    return alert;
}

function showAlert(element, message, type) {
    element.className = `form-alert ${type}`;
    element.innerHTML = message;
    element.style.display = 'block';
}
