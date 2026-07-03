const categoryColors = {
    'HD': '#007bff',    // Biru
    'EN': '#6f42c1',    // Merah
    'ES': '#28a745',    // Hijau
    'DE': '#d30202',    // Merah
    'FR': '#fd7e14',    // Oranye
    'IT': '#e83e8c',    // Pink
    'PT': '#20c997',    // Teal
    'AR': '#ffc107',    // Kuning
    'NL': '#e74c3c',    // Red-Orange
    'BA': '#8e44ad',    // Dark Purple
    'HR': '#1abc9c',    // Turquoise
    'RU': '#c0392b',    // Dark Red
    'NZ': '#3498db',    // Bright Blue
    'BE': '#f39c12',    // Orange
    'BR': '#27ae60',    // Forest Green
    'BG': '#d35400',    // Dark Orange
    'DK': '#16a085',    // Green Cyan
    'NO': '#2980b9',    // Navy Blue
    'RO': '#8e44ad',    // Deep Purple
    'PL': '#c0392b',    // Brick Red
    'CZ': '#2c3e50',    // Dark Blue Gray
    'SE': '#f1c40f',    // Yellow
    'LT': '#7f8c8d',    // Gray
    'AL': '#e67e22',    // Carrot Orange
    'SA': '#2ecc71',    // Emerald Green
    'AE': '#9b59b6',    // Amethyst Purple
    'VN': '#e74c3c',    // Alizarin Red
    'ID': '#1abc9c',    // Light Sea Green
    'MY': '#34495e',    // Wet Asphalt
    'TH': '#d35400',    // Pumpkin Orange
    'CN': '#e74c3c',    // Chinese Red
    'KR': '#3498db',    // Korean Blue
    'SG': '#2ecc71'     // Singapore Green
};

// ✅ NEW: Player patterns untuk multiple player support
const playerPatterns = [
            { pattern: /\/play\/watch\?id=([^&]+)/, type: 'shaka', newPath: '/bitwatch?id=$1' },
            { pattern: /\/play\/ssc\?id=([^&]+)/, type: 'shaka', newPath: '/bitss?id=$1' },
            { pattern: /\/play\/sky\?id=([^&]+)/, type: 'shaka', newPath: '/bitwatch?id=$1' },
            { pattern: /\/play\/usa\?id=([^&]+)/, type: 'shaka', newPath: '/bitwatch?id=$1' }
    // Tambahkan pattern lainnya sesuai kebutuhan
];

// ✅ NEW: Fungsi untuk cek apakah URL support multiple players
function supportsMultiplePlayers(url) {
    return playerPatterns.some(pattern => pattern.pattern.test(url));
}

// ✅ NEW: Fungsi untuk mendapatkan player options
function getPlayerOptions(url) {
    for (const pattern of playerPatterns) {
        const match = url.match(pattern.pattern);
        if (match) {
            const channelId = match[1];
            return {
                shaka: url,
                bitmovin: buildFullUrl(pattern.newPath.replace('$1', channelId))
            };
        }
    }
    return null;
}

// Variabel untuk menyimpan defaultUrl saat ini
let currentDefaultUrl = null;

// Fungsi untuk mencari tombol yang sesuai dengan URL
function findButtonByUrl(url) {
    const buttons = document.querySelectorAll('.tomboltv[data-url]');
    for (let button of buttons) {
        if (button.getAttribute('data-url') === url) {
            return button;
        }
    }
    return null;
}

// Fungsi untuk mengatur tombol active berdasarkan URL (hanya jika URL ada di buttons)
function setActiveButtonByUrl(url) {
    // Reset semua tombol aktif
    document.querySelectorAll('.tomboltv').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Cari tombol yang sesuai dengan URL
    const targetButton = findButtonByUrl(url);
    
    // Hanya set active jika tombol ditemukan
    if (targetButton) {
        targetButton.classList.add('active');
        window.currentPlayingUrl = url;
    }
}

// ✅ Export ke window agar bisa dipanggil dari server.js
window.setActiveButtonByUrl = setActiveButtonByUrl;

// ✅ NEW: Fungsi untuk membersihkan semua badges sebelum menambahkan yang baru
function clearAllBadges() {
    const newBadges = document.querySelectorAll('.new-badge');
    const updatedBadges = document.querySelectorAll('.updated-badge');
    
    newBadges.forEach(badge => badge.remove());
    updatedBadges.forEach(badge => badge.remove());
    
    // Juga hapus class highlight
    document.querySelectorAll('.tomboltv').forEach(button => {
        button.classList.remove('updated-highlight');
    });
}

// ✅ NEW: Fungsi untuk menampilkan badge NEW - 30 DETIK
function showNewBadges(newButtons) {
    // Clear semua badges existing terlebih dahulu
    clearAllBadges();
    
    newButtons.forEach(buttonInfo => {
        const button = findButtonByUrl(buildFullUrl(buttonInfo.path));
        
        if (button) {
            // Create NEW badge
            const newBadge = document.createElement('span');
            newBadge.className = 'new-badge';
            newBadge.textContent = 'NEW';
            newBadge.style.cssText = `
                position: absolute;
                top: -5px;
                right: -5px;
                background: linear-gradient(135deg, #ff0000, #ff6b6b);
                color: white;
                font-size: 10px;
                font-weight: bold;
                padding: 2px 6px;
                border-radius: 8px;
                animation: pulse 2s infinite;
                z-index: 10;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            `;
            
            button.style.position = 'relative';
            button.appendChild(newBadge);
            
            // ✅ DIUBAH: Auto remove badge setelah 30 detik
            setTimeout(() => {
                if (newBadge.parentNode) {
                    newBadge.remove();
                }
            }, 60000); // 60 detik
        }
    });
}

// ✅ NEW: Helper function untuk build full URL (sesuai server.js)
function buildFullUrl(path) {
    const SECRET_BASE_URL = "https://noneserv.pages.dev";
    return path.startsWith('http') ? path : SECRET_BASE_URL + path;
}

// ✅ NEW: Export fungsi untuk akses dari server.js
window.showNewBadges = showNewBadges;

// ✅ NEW: Fungsi untuk menampilkan badge UPDATED dengan logika yang tepat
function showUpdatedBadges(changeInfo) {
    // CASE 1: Global update karena ada penghapusan tombol
    if (changeInfo.type === 'global') {
        const allButtons = document.querySelectorAll('.tomboltv');
        allButtons.forEach(button => {
            addUpdatedBadge(button, 'global-update');
        });
    }
    // CASE 2: Default path berubah
    else if (changeInfo.type === 'defaultPath') {
        const defaultButton = findButtonByUrl(buildFullUrl(changeInfo.newDefaultPath));
        if (defaultButton) {
            addUpdatedBadge(defaultButton, 'default-path-update');
        }
    }
    // CASE 3: Specific buttons updated (bukan baru)
    else if (changeInfo.type === 'specific' && changeInfo.updatedButtons) {
        changeInfo.updatedButtons.forEach(change => {
            // Cari tombol berdasarkan path baru ATAU label baru
            const button = findButtonByUrl(buildFullUrl(change.new.path)) || 
                          findButtonByLabel(change.new.label);
            
            if (button) {
                // Pastikan ini bukan tombol baru
                const isNewButton = Array.from(document.querySelectorAll('.new-badge'))
                    .some(badge => badge.parentNode === button);
                
                if (!isNewButton) {
                    addUpdatedBadge(button, `updated-${change.type}`);
                }
            }
        });
    }
}

// ✅ NEW: Helper function untuk mencari tombol berdasarkan label
function findButtonByLabel(label) {
    const buttons = document.querySelectorAll('.tomboltv');
    for (let button of buttons) {
        if (button.textContent.includes(label)) {
            return button;
        }
    }
    return null;
}

// ✅ NEW: Fungsi untuk menambahkan badge UPDATED - 30 DETIK
function addUpdatedBadge(button, changeType) {
    // Hapus badge updated lama jika ada
    const existingBadge = button.querySelector('.updated-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Create UPDATED badge
    const updatedBadge = document.createElement('span');
    updatedBadge.className = 'updated-badge';
    updatedBadge.textContent = 'UPDATED';
    updatedBadge.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        background: linear-gradient(135deg, #ff8c00, #ffa500);
        color: white;
        font-size: 10px;
        font-weight: bold;
        padding: 2px 6px;
        border-radius: 8px;
        animation: pulse 2s infinite;
        z-index: 10;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    `;
    
    button.style.position = 'relative';
    button.appendChild(updatedBadge);
    
    // Tambahkan class untuk highlight effect
    button.classList.add('updated-highlight');
    
    // ✅ DIUBAH: Auto remove badge setelah 30 detik
    setTimeout(() => {
        if (updatedBadge.parentNode) {
            updatedBadge.remove();
            button.classList.remove('updated-highlight');
        }
    }, 60000); // 60 detik
}

// ✅ NEW: Export fungsi untuk akses dari server.js
window.showUpdatedBadges = showUpdatedBadges;

// 🎨 MODIFIKASI: Fungsi untuk membersihkan dan membuat ulang tombol (VERSI TEKS)
function refreshButtonsFromServer() {
    const buttonContainer = document.getElementById('buttonContainer');
    const refreshBtn = document.getElementById('refreshBtn');
    
    if (!buttonContainer) {
        return;
    }
    
    // Hapus semua tombol kecuali refresh button
    const existingButtons = buttonContainer.querySelectorAll('.tomboltv');
    existingButtons.forEach(button => button.remove());
    
    // Buat tombol baru dengan TEKS KATEGORI
    if (window.buttonsData) {
        Object.keys(window.buttonsData).forEach(code => {
            const dataArray = window.buttonsData[code];
            if (dataArray && Array.isArray(dataArray)) {
                dataArray.forEach(data => {
                    const button = document.createElement('button');
                    button.className = 'tomboltv';
                    button.setAttribute('data-url', data.url);
                    button.onclick = function() { 
                        changeIframe(this); 
                        // Set active ketika user klik manual
                        setActiveButtonByUrl(data.url);
                    };

                    // 🎨 BUAT BADGE KATEGORI (TEKS) - GANTI LOGO
                    const categoryBadge = document.createElement('span');
                    categoryBadge.className = 'category-badge';
                    categoryBadge.textContent = code;
                    categoryBadge.style.background = categoryColors[code] || '#6c757d';
                    
                    // Tambahkan badge kategori ke tombol
                    button.appendChild(categoryBadge);

                    // Buat node teks untuk label
                    const label = document.createTextNode(` ${data.label}`);
                    button.appendChild(label);

                    // Tambahkan tombol ke dalam container sebelum refresh button
                    buttonContainer.insertBefore(button, refreshBtn);
                });
            }
        });
        
        // Setel tombol active berdasarkan channel yang sedang diputar atau defaultUrl
        const activeUrl = window.currentPlayingUrl || currentDefaultUrl;
        if (activeUrl) {
            setActiveButtonByUrl(activeUrl);
        }
    }
}

// Fungsi untuk mengubah iframe berdasarkan tombol yang diklik
// CATATAN: Fungsi ini disimpan oleh server.js sebagai `originalChangeIframe`
// dan dipanggil kembali untuk URL eksternal — HARUS tetap set iframe.src
function changeIframe(button) {
    const url = button.getAttribute('data-url');
    if (!url) return;

    // ✅ Pastikan player visible (memanggil fungsi dari server.js)
    if (window.showVideoImmediately) {
        window.showVideoImmediately();
    }

    const iframe = document.getElementById('iframe');
    if (iframe) {
        // Hanya set jika src berbeda untuk menghindari blink
        if (iframe.src !== url) {
            iframe.src = url;
            iframe.setAttribute('data-original-src', url);
        }
    }

    // Update state active button
    document.querySelectorAll('.tomboltv').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

// Toggle visibility tombol
function toggleButtons() {
    const container = document.getElementById('buttonContainer');
    const toggleBtn = document.getElementById('toggleBtn');
    const isVisible = container.style.display !== 'none' && container.style.display !== '';
    container.style.display = isVisible ? 'none' : 'flex';
    toggleBtn.textContent = isVisible ? '+' : 'X';
}

// FUNGSI REFRESH - Refresh seluruh halaman
function refreshPage() {
    // Tambah efek animasi loading sebelum refresh
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.classList.add('refreshing');
    }
    
    // Beri jeda kecil untuk menampilkan animasi, lalu refresh halaman
    setTimeout(() => {
        location.reload();
    }, 300);
}

// Di bagian DOMContentLoaded logo.js, tambahkan:
document.addEventListener('DOMContentLoaded', function() {
    // Event listener untuk tombol refresh
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshPage);
    }
    
    // Setel status awal untuk tombol container - TAPI jangan tampilkan jika ada error
    const buttonContainer = document.getElementById('buttonContainer');
    const errorMessage = document.getElementById('errorMessage');
    
    if (buttonContainer && !errorMessage) {
        buttonContainer.style.display = 'flex';
    }
    
    // Coba buat tombol setelah delay jika data sudah tersedia
    setTimeout(() => {
        if (window.buttonsData) {
            refreshButtonsFromServer();
        } else {
            // Coba lagi setelah 2 detik
            setTimeout(() => {
                if (window.buttonsData) {
                    refreshButtonsFromServer();
                }
            }, 2000);
        }
    }, 1000);
});

// Fungsi untuk update defaultUrl dari server.js
function updateDefaultUrl(defaultUrl) {
    currentDefaultUrl = defaultUrl;
    
    // ✅ FIX: Langsung set tanpa delay
    if (defaultUrl) {
        setActiveButtonByUrl(defaultUrl);
    }
}

// ✅ Tandai bahwa logo.js sudah loaded (untuk koordinasi dengan server.js)
window._logoJsLoaded = true;
