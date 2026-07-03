// Backup System V2.0 - Clean Fetch Intercept & Manual Fallback
// Script ini digunakan di postingan Blogger sebagai perlindungan (fallback)
// jika Cloudflare Pages atau API mati/diblokir.
(function() {
    console.log('🔧 FALLBACK SYSTEM V2.0 LOADING...');
    
    // =========================================================
    // 1. AMANKAN CUSTOM_CONFIG GLOBAL
    // =========================================================
    if (typeof CUSTOM_CONFIG !== 'undefined' && !window.CUSTOM_CONFIG) {
        window.CUSTOM_CONFIG = CUSTOM_CONFIG;
        console.log('✅ CUSTOM_CONFIG ditemukan:', CUSTOM_CONFIG.defaultPath);
    }
    
    // =========================================================
    // 2. INTERCEPT FETCH API (SMART OVERRIDE)
    // =========================================================
    // Kita mencegat request fetch yang dilakukan oleh server.js
    // sehingga jika server.js meminta file JSON, kita langsung kembalikan CUSTOM_CONFIG
    // tanpa perlu melakukan request sungguhan ke jaringan.
    const originalFetch = window.fetch;
    
    window.fetch = async function(url, options) {
        if (typeof url === 'string' && url.includes('noneserv.pages.dev')) {
            
            // Hanya intercept request untuk konfigurasi JSON
            if (url.includes('.json') && window.CUSTOM_CONFIG) {
                console.log('✅ Fallback: Intercepted config request ->', url);
                
                // Jika server.js meminta server.json global (fallback ke-2 dari server.js)
                if (url.includes('server.json')) {
                    // Coba deteksi postId dari URL saat ini
                    let postId = 'backup';
                    const patterns = [
                        /\/(\d{4})\/(\d{2})\/([^\.]+)\.html/,
                        /\/([^\/]+)\.html/, 
                        /\/p\/([^\/\?]+)/
                    ];
                    for (const pattern of patterns) {
                        const match = window.location.href.match(pattern);
                        if (match) {
                            postId = match[3] || match[1];
                            break;
                        }
                    }
                    
                    const mockServerJson = { posts: {} };
                    mockServerJson.posts[postId] = window.CUSTOM_CONFIG;
                    
                    return Promise.resolve(new Response(JSON.stringify(mockServerJson), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    }));
                } 
                
                // Jika server.js meminta individual config (misal: /serv/xxx.json)
                return Promise.resolve(new Response(JSON.stringify(window.CUSTOM_CONFIG), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }));
            }
        }
        
        // Biarkan request lain (misal API jadwal) lewat secara normal
        return originalFetch.call(this, url, options);
    };
    
    // =========================================================
    // 3. MANUAL FALLBACK (Jika server.js gagal total)
    // =========================================================
    // Jika karena alasan tertentu server.js gagal dimuat sama sekali (404),
    // skrip ini akan mengambil alih render player secara manual.
    function applyManualFallback() {
        if (!window.CUSTOM_CONFIG) return;
        
        const SECRET_BASE_URL = "https://noneserv.pages.dev";
        const buildFullUrl = (path) => path.startsWith('http') ? path : SECRET_BASE_URL + path;
        
        // Jika buttonsData belum diisi oleh server.js setelah 3 detik
        if (!window.buttonsData) {
            console.log('⚠️ Fallback: Menerapkan config secara manual karena server.js gagal mengeksekusi');
            
            // A. Update Iframe
            const iframe = document.getElementById('iframe');
            if (iframe && window.CUSTOM_CONFIG.defaultPath) {
                const defaultUrl = buildFullUrl(window.CUSTOM_CONFIG.defaultPath);
                // Hanya update jika iframe belum memuat konten lain
                if (!iframe.src || iframe.src === 'about:blank' || iframe.src === window.location.href) {
                    iframe.src = defaultUrl;
                    iframe.setAttribute('data-original-src', defaultUrl);
                }
            }
            
            // B. Inject Buttons Data
            if (window.CUSTOM_CONFIG.buttonsData) {
                const processed = {};
                Object.keys(window.CUSTOM_CONFIG.buttonsData).forEach(cat => {
                    processed[cat] = window.CUSTOM_CONFIG.buttonsData[cat].map(btn => ({
                        ...btn,
                        url: buildFullUrl(btn.path)
                    }));
                });
                
                window.buttonsData = processed;
                
                // Panggil logo.js untuk merender tombol jika sudah dimuat
                if (window.refreshButtonsFromServer) {
                    window.refreshButtonsFromServer();
                }
                
                // Sinkronisasi tombol aktif
                if (window.updateDefaultUrl && window.CUSTOM_CONFIG.defaultPath) {
                    window.updateDefaultUrl(buildFullUrl(window.CUSTOM_CONFIG.defaultPath));
                } else if (window.setActiveButtonByUrl && window.CUSTOM_CONFIG.defaultPath) {
                    window.setActiveButtonByUrl(buildFullUrl(window.CUSTOM_CONFIG.defaultPath));
                }
            }
        } else {
            console.log('✅ Fallback: server.js telah berjalan dengan normal, intervensi manual dibatalkan.');
        }
    }
    
    // Jadwalkan pengecekan manual fallback setelah 3 detik
    // Waktu ini cukup bagi server.js untuk memuat dan menerapkan CUSTOM_CONFIG via intercept fetch
    setTimeout(applyManualFallback, 3000);

})();
