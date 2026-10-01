// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    
    const data = getPengurus();
    
    // Calculate Stats
    const totalPengurus = data.length;
    const totalKadiv = data.filter(p => p.jabatan === 'Kepala Divisi').length;
    const totalAnggota = data.filter(p => p.jabatan === 'Anggota').length;
    
    // Update DOM
    document.getElementById('stat-total').textContent = totalPengurus;
    document.getElementById('stat-kadiv').textContent = totalKadiv;
    document.getElementById('stat-anggota').textContent = totalAnggota;
    
    // Divisi Distribution (Bar Chart HTML)
    const divisiGroups = {};
    data.forEach(p => {
        divisiGroups[p.divisi] = (divisiGroups[p.divisi] || 0) + 1;
    });
    
    const chartDivisi = document.getElementById('chart-divisi');
    let htmlDivisi = '';
    for(const [div, count] of Object.entries(divisiGroups)) {
        const percent = Math.round((count / totalPengurus) * 100);
        htmlDivisi += `
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-1 small">
                    <span class="fw-semibold">${div}</span>
                    <span class="text-muted">${count} orang (${percent}%)</span>
                </div>
                <div class="progress" style="height: 10px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${percent}%;"></div>
                </div>
            </div>
        `;
    }
    chartDivisi.innerHTML = htmlDivisi || '<p class="text-muted small">Belum ada data</p>';

    // Jabatan Distribution
    const jabatanGroups = {};
    data.forEach(p => {
        jabatanGroups[p.jabatan] = (jabatanGroups[p.jabatan] || 0) + 1;
    });
    
    const chartJabatan = document.getElementById('chart-jabatan');
    let htmlJabatan = '';
    for(const [jab, count] of Object.entries(jabatanGroups)) {
        const percent = Math.round((count / totalPengurus) * 100);
        htmlJabatan += `
            <div class="mb-3">
                <div class="d-flex justify-content-between mb-1 small">
                    <span class="fw-semibold">${jab}</span>
                    <span class="text-muted">${count} orang (${percent}%)</span>
                </div>
                <div class="progress" style="height: 10px;">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${percent}%;"></div>
                </div>
            </div>
        `;
    }
    chartJabatan.innerHTML = htmlJabatan || '<p class="text-muted small">Belum ada data</p>';
});
