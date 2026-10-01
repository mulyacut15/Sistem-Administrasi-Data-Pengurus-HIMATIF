// data.js - Utils and State Management

const DUMMY_DATA = [
    { nim: "23010001", nama: "Ahmad Fauzan", jk: "Laki-laki", hp: "081234567890", jabatan: "KAHIM", divisi: "Pengurus Inti", periode: "2026/2027", status: "Aktif" },
    { nim: "23010002", nama: "Cut Mutia", jk: "Perempuan", hp: "081298765432", jabatan: "WAKAHIM", divisi: "Pengurus Inti", periode: "2026/2027", status: "Aktif" },
    { nim: "23010003", nama: "Budi Santoso", jk: "Laki-laki", hp: "085211223344", jabatan: "Kepala Divisi", divisi: "IPTEK", periode: "2026/2027", status: "Aktif" },
    { nim: "23010004", nama: "Dian Sastro", jk: "Perempuan", hp: "085299887766", jabatan: "Anggota", divisi: "Humas", periode: "2026/2027", status: "Tidak Aktif" },
    { nim: "23010005", nama: "Eko Prasetyo", jk: "Laki-laki", hp: "081122334455", jabatan: "Sekretaris Umum", divisi: "Pengurus Inti", periode: "2026/2027", status: "Aktif" },
    { nim: "23010006", nama: "Siti Aminah", jk: "Perempuan", hp: "089988776655", jabatan: "Kepala Divisi", divisi: "Kaderisasi", periode: "2026/2027", status: "Aktif" }
];

// Initialize LocalStorage
if (!localStorage.getItem('dataPengurus')) {
    localStorage.setItem('dataPengurus', JSON.stringify(DUMMY_DATA));
}

function getPengurus() {
    return JSON.parse(localStorage.getItem('dataPengurus')) || [];
}

function savePengurus(data) {
    localStorage.setItem('dataPengurus', JSON.stringify(data));
}

function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Global Menu Toggle functionality for all pages
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('menu-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('wrapper').classList.toggle('toggled');
        });
    }
    
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
});
