# Sistem Administrasi Data Pengurus HIMATIF

## Deskripsi
Sistem ini merupakan aplikasi administrasi berbasis web sederhana yang dirancang khusus untuk membantu pengelolaan data pengurus Himpunan Mahasiswa Teknik Informatika (HIMATIF). Aplikasi ini bersifat *client-side* dan menggunakan `LocalStorage` sehingga dapat berjalan tanpa konfigurasi server atau database terpisah.

## Fitur Utama
1. **Login Admin:** Simulasi login untuk keamanan dasar aplikasi (Username: `admin`, Password: `himatif123`).
2. **Dashboard Interaktif:** Menampilkan visualisasi data statistik sederhana berupa bar/progress dan perhitungan otomatis jumlah pengurus.
3. **CRUD Data Pengurus:** Menambahkan, mengedit, melihat, dan menghapus data pengurus (NIM, Nama, Jabatan, dll).
4. **Search Realtime:** Pencarian berdasarkan NIM atau Nama.
5. **Multi-filter:** Filter bersamaan berdasarkan Jabatan, Divisi, dan Status.
6. **Rekap Data:** Menampilkan rekapitulasi jumlah pengurus per Jabatan dan per Divisi.
7. **Export CSV:** Mendukung pengeksporan data ke dalam format `.csv`.
8. **LocalStorage Database:** Data tetap tersimpan walaupun halaman web di-refresh atau browser ditutup.

## Teknologi yang Digunakan
- **HTML5 & CSS3**
- **JavaScript (Vanilla)**
- **Bootstrap 5** (via CDN untuk desain yang responsif dan modern)
- **FontAwesome** (untuk icon)
- **SweetAlert2** (untuk modal notifikasi yang interaktif)
- **LocalStorage API** (sebagai database lokal)

## Tujuan Project
Project ini dikembangkan sebagai portfolio untuk menunjukkan kompetensi dalam:
- Administrasi dan pengolahan data terstruktur.
- Web development dasar dan perancangan antarmuka responsif.
- Manipulasi DOM, validasi, dan logika JavaScript (CRUD, Filter, Search).
- Pengelolaan state lokal menggunakan `LocalStorage`.
- Perancangan UI/UX Dashboard modern dengan integrasi ekosistem Bootstrap.

## Cara Menjalankan
1. Ekstrak file ZIP ini ke dalam satu folder.
2. Buka file `index.html` menggunakan browser modern pilihan Anda (Chrome, Edge, Firefox, Safari).
3. Login menggunakan kredensial yang disediakan.
4. Anda dapat mencoba menambah data, lalu mereload halaman untuk melihat data tetap tersimpan.
