// pengurus.js - Handles List, Form, and Rekap logic
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();

    // --- LOGIC FOR PENGURUS LIST (pengurus.html) ---
    const tableBody = document.getElementById('table-pengurus-body');
    if (tableBody) {
        let currentData = getPengurus();
        
        const renderTable = (data) => {
            tableBody.innerHTML = '';
            if (data.length === 0) {
                document.getElementById('empty-state').classList.remove('d-none');
            } else {
                document.getElementById('empty-state').classList.add('d-none');
                data.forEach((p, index) => {
                    const badgeClass = p.status === 'Aktif' ? 'badge-aktif' : 'badge-nonaktif';
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${index + 1}</td>
                        <td class="fw-semibold">${p.nim}</td>
                        <td>${p.nama}</td>
                        <td>${p.jk === 'Laki-laki' ? 'L' : 'P'}</td>
                        <td>${p.hp}</td>
                        <td><span class="badge bg-secondary">${p.jabatan}</span></td>
                        <td>${p.divisi}</td>
                        <td>${p.periode}</td>
                        <td><span class="badge rounded-pill ${badgeClass}">${p.status}</span></td>
                        <td>
                            <a href="tambah-pengurus.html?nim=${p.nim}" class="btn btn-warning btn-action text-white"><i class="fas fa-edit"></i></a>
                            <button class="btn btn-danger btn-action" onclick="deleteData('${p.nim}')"><i class="fas fa-trash"></i></button>
                        </td>
                    `;
                    tableBody.appendChild(tr);
                });
            }
        };

        const filterData = () => {
            const search = document.getElementById('search-input').value.toLowerCase();
            const jab = document.getElementById('filter-jabatan').value;
            const div = document.getElementById('filter-divisi').value;
            const stat = document.getElementById('filter-status').value;

            let filtered = getPengurus().filter(p => {
                const matchSearch = p.nim.toLowerCase().includes(search) || p.nama.toLowerCase().includes(search);
                const matchJab = jab === 'Semua Jabatan' || p.jabatan === jab;
                const matchDiv = div === 'Semua Divisi' || p.divisi === div;
                const matchStat = stat === 'Semua Status' || p.status === stat;
                return matchSearch && matchJab && matchDiv && matchStat;
            });
            renderTable(filtered);
        };

        document.getElementById('search-input').addEventListener('input', filterData);
        document.getElementById('filter-jabatan').addEventListener('change', filterData);
        document.getElementById('filter-divisi').addEventListener('change', filterData);
        document.getElementById('filter-status').addEventListener('change', filterData);

        // Export CSV
        document.getElementById('btn-export').addEventListener('click', () => {
            const data = getPengurus();
            const headers = ["NIM", "Nama Lengkap", "Jenis Kelamin", "No. HP", "Jabatan", "Divisi", "Periode", "Status"];
            const rows = data.map(p => [p.nim, `"${p.nama}"`, p.jk, `"${p.hp}"`, p.jabatan, p.divisi, p.periode, p.status]);
            let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n" + rows.map(e => e.join(",")).join("\n");
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "data-pengurus-himatif.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
        });

        // Global Delete Function attached to window
        window.deleteData = (nim) => {
            Swal.fire({
                title: 'Hapus Data?',
                text: "Apakah Anda yakin ingin menghapus data pengurus ini?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Ya, Hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    let newData = getPengurus().filter(p => p.nim !== nim);
                    savePengurus(newData);
                    filterData(); // re-render
                    Swal.fire({ title: 'Terhapus!', text: 'Data pengurus berhasil dihapus.', icon: 'success', timer: 1500, showConfirmButton: false });
                }
            });
        };

        renderTable(currentData);
    }

    // --- LOGIC FOR FORM (tambah-pengurus.html) ---
    const formPengurus = document.getElementById('form-pengurus');
    if (formPengurus) {
        const urlParams = new URLSearchParams(window.location.search);
        const editNim = urlParams.get('nim');
        let isEdit = false;

        if (editNim) {
            isEdit = true;
            document.getElementById('form-title').textContent = 'Edit Data Pengurus';
            const data = getPengurus().find(p => p.nim === editNim);
            if (data) {
                document.getElementById('input-nim').value = data.nim;
                document.getElementById('input-nim').readOnly = true; // prevent changing NIM
                document.getElementById('input-nama').value = data.nama;
                document.getElementById('input-jk').value = data.jk;
                document.getElementById('input-hp').value = data.hp;
                document.getElementById('input-jabatan').value = data.jabatan;
                document.getElementById('input-divisi').value = data.divisi;
                document.getElementById('input-periode').value = data.periode;
                document.getElementById('input-status').value = data.status;
            }
        }

        formPengurus.addEventListener('submit', (e) => {
            e.preventDefault();
            const nim = document.getElementById('input-nim').value;
            const nama = document.getElementById('input-nama').value;
            const jk = document.getElementById('input-jk').value;
            const hp = document.getElementById('input-hp').value;
            const jabatan = document.getElementById('input-jabatan').value;
            const divisi = document.getElementById('input-divisi').value;
            const periode = document.getElementById('input-periode').value;
            const status = document.getElementById('input-status').value;
            const alertBox = document.getElementById('form-alert');

            if(!nim || !nama || !jk || !hp || !jabatan || !divisi || !periode || !status) {
                alertBox.textContent = 'Data belum lengkap. Silakan lengkapi semua field.';
                alertBox.classList.remove('d-none');
                return;
            }

            let allData = getPengurus();

            if (!isEdit && allData.find(p => p.nim === nim)) {
                alertBox.textContent = 'NIM sudah terdaftar. Silakan gunakan NIM lain.';
                alertBox.classList.remove('d-none');
                return;
            }

            const newData = { nim, nama, jk, hp, jabatan, divisi, periode, status };

            if (isEdit) {
                const index = allData.findIndex(p => p.nim === nim);
                allData[index] = newData;
            } else {
                allData.push(newData);
            }

            savePengurus(allData);
            
            Swal.fire({
                title: 'Berhasil!',
                text: isEdit ? 'Data pengurus berhasil diperbarui.' : 'Data pengurus berhasil ditambahkan.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'pengurus.html';
            });
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            if(!isEdit) formPengurus.reset();
            document.getElementById('form-alert').classList.add('d-none');
        });
    }

    // --- LOGIC FOR REKAP (rekap-pengurus.html) ---
    const rekapContainer = document.getElementById('rekap-container');
    if (rekapContainer) {
        const data = getPengurus();
        
        // Setup base categories
        const jabatans = ['KAHIM', 'WAKAHIM', 'Koordinator Eksternal', 'Koordinator Internal', 'Sekretaris Umum', 'Bendahara Umum', 'Kepala Divisi', 'Wakil Kepala Divisi', 'Anggota'];
        const divisis = ['Pengurus Inti', 'Agama', 'Administrasi dan Kesekretariatan', 'Kaderisasi', 'Humas', 'IPTEK', 'Minat dan Bakat'];
        
        let htmlJab = '';
        jabatans.forEach(jab => {
            const count = data.filter(p => p.jabatan === jab).length;
            htmlJab += `<tr><td>${jab}</td><td class="text-end fw-bold">${count}</td></tr>`;
        });
        document.getElementById('rekap-jabatan').innerHTML = htmlJab;

        let htmlDiv = '';
        divisis.forEach(div => {
            const count = data.filter(p => p.divisi === div).length;
            htmlDiv += `<tr><td>${div}</td><td class="text-end fw-bold">${count}</td></tr>`;
        });
        document.getElementById('rekap-divisi').innerHTML = htmlDiv;
    }
});
