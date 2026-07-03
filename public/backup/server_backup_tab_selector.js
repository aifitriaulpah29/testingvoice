// =============================================
// 🎯 VARIABLES & CONFIGURATION
// =============================================

let currentPostId = null;
let configCheckInterval = null;
let currentConfig = null;
let isOn404Page = false;
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let previousConfig = null;
let newButtonsTracker = new Set();
let activeModal = null;
let userSelectedChannel = false;
let userSelectedUrl = null;
let preventAutoLoadForScheduleUpdate = false;
let scheduleUpdateInProgress = false;
let currentPlayer = null;
let previousPlayerUrl = null;
let lastAutoLoadUrl = null;
let lastAutoLoadTime = 0;
let isFirstLoad = true;
const AUTO_LOAD_COOLDOWN = 30000;

// Auto-fallback variables
let autoSwitchTimer = null;
let hasPlayedSuccessfully = false;
let autoSwitchAttemptCount = 0;
let currentLoadRetryCount = 0;
const MAX_LOAD_RETRIES = 1;
let triedPlayersInCurrentChannel = new Set();

const PLAYER_PATTERNS = [
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/watch\?id=([^&]+)/, type: 'shaka', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/bits\?id=([^&]+)/, type: 'bitmovin', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/play\?id=([^&]+)/, type: 'shaka', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/bit\?id=([^&]+)/, type: 'bitmovin', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/player1\?id=([^&]+)/, type: 'bitmovin', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/jw\?id=([^&]+)/, type: 'jw', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/jwplayer\?id=([^&]+)/, type: 'jw', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/watch\?matchId=([^&]+&idx=\d+)/, type: 'shaka', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/bits\?matchId=([^&]+&idx=\d+)/, type: 'bitmovin', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/play\?matchId=([^&]+&idx=\d+)/, type: 'shaka', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/bit\?matchId=([^&]+&idx=\d+)/, type: 'bitmovin', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/jw\?matchId=([^&]+&idx=\d+)/, type: 'jw', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/jwplayer\?matchId=([^&]+&idx=\d+)/, type: 'jw', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/clappr\?matchId=([^&]+&idx=\d+)/, type: 'clappr', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/clappr\?id=([^&]+)/, type: 'clappr', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/watch\?servid=([^&]+&id=\d+)/, type: 'shaka', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/bits\?servid=([^&]+&id=\d+)/, type: 'bitmovin', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/play\?servid=([^&]+&id=\d+)/, type: 'shaka', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/bit\?servid=([^&]+&id=\d+)/, type: 'bitmovin', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/jw\?servid=([^&]+&id=\d+)/, type: 'jw', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/jwplayer\?servid=([^&]+&id=\d+)/, type: 'jw', baseDomain: 'noneserv.pages.dev' },
    { pattern: /(?:https?:\/\/noneserv\.pages\.dev)?\/clappr\?servid=([^&]+&id=\d+)/, type: 'clappr', baseDomain: 'noneserv.pages.dev' }
];

const changeTracker = {
    addedButtons: new Set(),
    updatedButtons: new Set(), 
    removedButtons: new Set(),
    configChanges: new Set()
};

// =============================================
// 🎬 VIDEO PLAYBACK FUNCTIONS
// =============================================

function startVideoPlayback() {
    // ✅ FIX: Hanya set src sekali, tanpa multi-set & tanpa cloneNode
    // Ini menghilangkan kedip 2x akibat reload iframe berulang
    if (window._videoPlaybackStarted) return;
    window._videoPlaybackStarted = true;

    const iframe = document.getElementById('iframe');
    if (!iframe) {
        window._videoPlaybackStarted = false;
        return;
    }

    try {
        const originalSrc = iframe.getAttribute('data-original-src') || iframe.src;

        if (originalSrc && originalSrc !== 'about:blank') {
            // Hanya set jika src berbeda — hindari reload yang tidak perlu
            if (iframe.src !== originalSrc) {
                iframe.src = originalSrc;
            }
            // Reset flag setelah cukup waktu
            setTimeout(() => {
                window._videoPlaybackStarted = false;
            }, 2000);
        } else {
            window._videoPlaybackStarted = false;
        }
    } catch (error) {
        window._videoPlaybackStarted = false;
    }
}

function stopVideoPlayback() {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;

    try {
        const originalState = {
            src: iframe.src,
            'data-original-src': iframe.getAttribute('data-original-src') || iframe.src,
            attributes: {}
        };

        const attrs = iframe.attributes;
        for (let i = 0; i < attrs.length; i++) {
            originalState.attributes[attrs[i].name] = attrs[i].value;
        }

        iframe.src = 'about:blank';
        
        if (isMobile) {
            setTimeout(() => {
                iframe.src = 'about:blank';
                try {
                    if (iframe.contentWindow) {
                        iframe.contentWindow.location.href = 'about:blank';
                    }
                } catch (e) {}
            }, 50);
        }
        
        setTimeout(() => {
            if (!iframe.getAttribute('data-original-src')) {
                iframe.setAttribute('data-original-src', originalState.src);
            }
        }, 100);

    } catch (error) {}
}

function showVideoPlayer() {
    console.log('[Server] Showing video player with smooth transition...');
    const videoContainer = document.getElementById('container');
    const countdownSection = document.querySelector('.countdown-section');
    
    if (videoContainer) {
        if (countdownSection && countdownSection.classList.contains('active')) {
            countdownSection.classList.add('transition-out');
            setTimeout(() => {
                countdownSection.classList.remove('active', 'transition-out');
                countdownSection.style.display = 'none';
                
                videoContainer.style.display = 'block';
                // Trigger reflow
                void videoContainer.offsetWidth;
                videoContainer.classList.add('video-active');
            }, 600);
        } else {
            videoContainer.style.display = 'block';
            void videoContainer.offsetWidth;
            videoContainer.classList.add('video-active');
            if (countdownSection) {
                countdownSection.classList.remove('active');
                countdownSection.style.display = 'none';
            }
        }
        
        if (detectAndroidTV()) {
            createUniversalFullscreenButton();
        }
        
        optimizeMobileVideo();
    } else {
        console.error('[Server] Video container not found!');
    }
}

function showVideoImmediately() {
    console.log('[Server] Showing video immediately...');
    const videoContainer = document.getElementById('container');
    const countdownSection = document.querySelector('.countdown-section');
    
    if (videoContainer) {
        if (countdownSection) {
            countdownSection.classList.remove('active');
            countdownSection.style.display = 'none';
        }
        
        videoContainer.style.display = 'block';
        void videoContainer.offsetWidth;
        videoContainer.classList.add('video-active');
        
        if (detectAndroidTV()) {
            createUniversalFullscreenButton();
        }
        
        const iframe = document.getElementById('iframe');
        if (iframe) {
            if (!iframe.getAttribute('data-original-src')) {
                const currentSrc = iframe.src;
                if (currentSrc && currentSrc !== 'about:blank') {
                    iframe.setAttribute('data-original-src', currentSrc);
                }
            }
            startVideoPlayback();
        }
        
        optimizeMobileVideo();
    } else {
        console.error('[Server] Video container not found for immediate show!');
    }
}

function optimizeMobileVideo() {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;

    const universalAttributes = {
        'allow': 'encrypted-media; autoplay; fullscreen; accelerometer; gyroscope',
        'allowfullscreen': 'true',
        'webkitallowfullscreen': 'true',
        'mozallowfullscreen': 'true',
        'playsinline': 'true',
        'webkit-playsinline': 'true',
        'x5-playsinline': 'true',
        'x5-video-player-type': 'h5',
        'x5-video-player-fullscreen': 'true',
        'x5-video-orientation': 'landscape',
        'scrolling': 'no',
        'frameborder': '0',
        'gesture': 'media',
        'loading': 'eager',
        'importance': 'high'
    };

    Object.keys(universalAttributes).forEach(attr => {
        iframe.setAttribute(attr, universalAttributes[attr]);
    });

    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframe.style.transform = 'translateZ(0)';
    iframe.style.webkitTransform = 'translateZ(0)';
    iframe.style.backfaceVisibility = 'hidden';
    iframe.style.perspective = '1000px';

    setupAndroidTVFullscreen();
    setupAndroidTVFullscreenFix();

    if (isMobile) {
        iframe.setAttribute('preload', 'auto');
        iframe.setAttribute('autoplay', 'true');
    } else {
        iframe.setAttribute('preload', 'metadata');
    }

    setTimeout(() => {
        startVideoPlayback();
    }, 200);
}

// =============================================
// 🔄 SCHEDULE UPDATE HANDLERS
// =============================================

function handleScheduleUpdateFromCountJS() {
    if (typeof autoSwitchTimer !== 'undefined' && autoSwitchTimer) {
        clearTimeout(autoSwitchTimer);
        autoSwitchTimer = null;
    }
    scheduleUpdateInProgress = true;
    preventAutoLoadForScheduleUpdate = true;
    
    const videoContainer = document.getElementById('container');
    const countdownSection = document.querySelector('.countdown-section');
    const iframe = document.getElementById('iframe');
    
    if (videoContainer && videoContainer.classList.contains('video-active')) {
        const currentVideoSrc = iframe.src;
        if (currentVideoSrc && currentVideoSrc !== 'about:blank') {
            iframe.setAttribute('data-pre-schedule-src', currentVideoSrc);
        }
        
        videoContainer.classList.remove('video-active');
        
        setTimeout(() => {
            stopVideoPlayback();
            
            if (iframe) {
                iframe.src = 'about:blank';
                iframe.setAttribute('data-original-src', 'about:blank');
            }
            
            videoContainer.style.display = 'none';
            
            if (countdownSection) {
                countdownSection.style.display = 'block';
                void countdownSection.offsetWidth;
                countdownSection.classList.add('active');
            }
        }, 600);
    } else {
        stopVideoPlayback();
        
        if (iframe) {
            iframe.src = 'about:blank';
            iframe.setAttribute('data-original-src', 'about:blank');
        }
    }
    
    setTimeout(() => {
        scheduleUpdateInProgress = false;
        preventAutoLoadForScheduleUpdate = false;
    }, 3000);
}

function forceStopVideoForScheduleUpdate() {
    if (typeof autoSwitchTimer !== 'undefined' && autoSwitchTimer) {
        clearTimeout(autoSwitchTimer);
        autoSwitchTimer = null;
    }
    scheduleUpdateInProgress = true;
    preventAutoLoadForScheduleUpdate = true;
    
    const iframe = document.getElementById('iframe');
    const videoContainer = document.getElementById('container');
    
    if (iframe && videoContainer) {
        if (videoContainer.style.display !== 'none') {
            videoContainer.style.opacity = '0';
            videoContainer.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                stopVideoPlayback();
                iframe.src = 'about:blank';
                iframe.setAttribute('data-original-src', 'about:blank');
                videoContainer.style.display = 'none';
                videoContainer.style.opacity = '1';
            }, 300);
        } else {
            stopVideoPlayback();
            iframe.src = 'about:blank';
            iframe.setAttribute('data-original-src', 'about:blank');
        }
    }
    
    setTimeout(() => {
        scheduleUpdateInProgress = false;
        preventAutoLoadForScheduleUpdate = false;
    }, 2000);
}

// =============================================
// 📺 ANDROID TV FUNCTIONS
// =============================================

function detectAndroidTV() {
    const userAgent = navigator.userAgent.toLowerCase();
    
    const isAndroid = /android/.test(userAgent);
    const isTV = /tv|smart-tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast|boxee|kylo|roku|dlnadoc|ce-html|philipstv|samsungbrowser|com.google.tv|com.sony|com.apple|com.panasonic|com.lge|com.samsung|afte|aftb|aftm|aftt|androiddtv|android tv/i.test(userAgent);
    const isLargeScreen = window.innerWidth >= 1920;
    
    return isAndroid && (isTV || isLargeScreen);
}

function setupAndroidTVFullscreen() {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;

    const isAndroidTV = detectAndroidTV();
    
    if (isAndroidTV) {
        iframe.setAttribute('x5-video-player-fullscreen', 'true');
        iframe.setAttribute('x5-video-player-type', 'h5');
        iframe.setAttribute('x5-video-orientation', 'landscape');
        iframe.setAttribute('allow', 'encrypted-media; autoplay; fullscreen; accelerometer; gyroscope');
        
        addAndroidTVFullscreenHandler(iframe);
        optimizeForAndroidTV(iframe);
    }
}

function addAndroidTVFullscreenHandler(iframe) {
    iframe.addEventListener('dblclick', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const requestFullscreen = iframe.requestFullscreen || 
                                iframe.webkitRequestFullscreen || 
                                iframe.mozRequestFullScreen || 
                                iframe.msRequestFullscreen;
        
        if (requestFullscreen) {
            requestFullscreen.call(iframe).catch(err => {
                forceAndroidTVFullscreen(iframe);
            });
        } else {
            forceAndroidTVFullscreen(iframe);
        }
    });

    let pressTimer;
    iframe.addEventListener('touchstart', function(e) {
        pressTimer = setTimeout(() => {
            forceAndroidTVFullscreen(iframe);
        }, 1000);
    });

    iframe.addEventListener('touchend', function(e) {
        clearTimeout(pressTimer);
    });
}

function forceAndroidTVFullscreen(iframe) {
    const currentSrc = iframe.src;
    if (currentSrc && !currentSrc.includes('fullscreen=true')) {
        const separator = currentSrc.includes('?') ? '&' : '?';
        iframe.src = currentSrc + separator + 'fullscreen=true&autoplay=1';
    }
}

function optimizeForAndroidTV(iframe) {
    iframe.style.minHeight = '600px';
    iframe.style.minWidth = '100%';
    
    const container = document.getElementById('container');
    if (container) {
        container.style.minHeight = '600px';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
    }
    
    const tivi = document.getElementById('tivi');
    if (tivi) {
        tivi.style.flex = '1';
        tivi.style.display = 'flex';
        tivi.style.flexDirection = 'column';
    }
}

function setupAndroidTVFullscreenFix() {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;

    const isAndroidTV = detectAndroidTV();
    
    if (isAndroidTV) {
        createUniversalFullscreenButton();
        setupFullscreenListeners();
    }
}

function createUniversalFullscreenButton() {
    if (document.getElementById('universalFullscreenBtn')) {
        return;
    }
    
    if (!detectAndroidTV()) {
        return;
    }
    
    const fullscreenBtn = document.createElement('button');
    fullscreenBtn.id = 'universalFullscreenBtn';
    fullscreenBtn.innerHTML = '⛶ ENTER FULLSCREEN';
    
    fullscreenBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10001;
        background: linear-gradient(135deg, #d30202, #ff1a1a);
        color: white;
        border: none;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(211, 2, 2, 0.4);
        opacity: 0.9;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    `;
    
    fullscreenBtn.onclick = (e) => {
        e.stopPropagation();
        requestFullscreenForAndroidTV();
    };
    
    const tivi = document.getElementById('tivi');
    if (tivi) {
        tivi.style.position = 'relative';
        tivi.appendChild(fullscreenBtn);
        
        setupFullscreenListeners();
        
        tivi.addEventListener('mouseenter', () => {
            fullscreenBtn.style.opacity = '1';
        });
        tivi.addEventListener('mouseleave', () => {
            fullscreenBtn.style.opacity = '0.7';
        });
        
        tivi.addEventListener('click', (e) => {
            if (e.target === tivi) {
                requestFullscreenForAndroidTV();
            }
        });
    }
}

function requestFullscreenForAndroidTV() {
    if (isFullscreen()) {
        exitFullscreen();
    } else {
        enterFullscreen();
    }
}

function enterFullscreen() {
    const tivi = document.getElementById('tivi');
    const container = document.getElementById('container');
    
    const element = tivi || container;
    if (!element) return;
    
    const fullscreenMethods = [
        () => element.requestFullscreen?.(),
        () => element.webkitRequestFullscreen?.(),
        () => element.mozRequestFullScreen?.(),
        () => element.msRequestFullscreen?.()
    ];
    
    for (const method of fullscreenMethods) {
        try {
            const result = method();
            if (result) {
                result.catch(err => {});
                break;
            }
        } catch (e) {
            continue;
        }
    }
    
    updateFullscreenButton(true);
}

function exitFullscreen() {
    const exitMethods = [
        () => document.exitFullscreen?.(),
        () => document.webkitExitFullscreen?.(),
        () => document.mozCancelFullScreen?.(),
        () => document.msExitFullscreen?.()
    ];
    
    for (const method of exitMethods) {
        try {
            const result = method();
            if (result) {
                result.catch(err => {});
                break;
            }
        } catch (e) {
            continue;
        }
    }
    
    updateFullscreenButton(false);
}

function isFullscreen() {
    return !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    );
}

function updateFullscreenButton(isFullscreen) {
    const btn = document.getElementById('universalFullscreenBtn');
    if (btn) {
        btn.innerHTML = isFullscreen ? '⛷️ EXIT FULLSCREEN' : '⛶ ENTER FULLSCREEN';
    }
}

function setupFullscreenListeners() {
    const events = [
        'fullscreenchange',
        'webkitfullscreenchange', 
        'mozfullscreenchange',
        'MSFullscreenChange'
    ];
    
    events.forEach(event => {
        document.addEventListener(event, () => {
            updateFullscreenButton(isFullscreen());
        });
    });
}

// =============================================
// ⚙️ CONFIG LOADER & MANAGEMENT
// =============================================

function detectPostId() {
    const url = window.location.href;
    const patterns = [
        /\/(\d{4})\/(\d{2})\/([^\.]+)\.html/,
        /\/([^\/]+)\.html/, 
        /\/p\/([^\/\?]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
            const postId = match[3] || match[1];
            return postId;
        }
    }
    return null;
}

function update404Status(status, message) {
    const iframe = document.getElementById('iframe');
    if (iframe && iframe.contentWindow) {
        try {
            iframe.contentWindow.postMessage({
                type: 'CONFIG_STATUS',
                status: status,
                message: message,
                postId: currentPostId
            }, '*');
        } catch (e) {}
    }
}

async function loadIndividualPostConfig(postId) {
    try {
        const individualConfigUrl = `https://noneserv.pages.dev/serv/${postId}.json`;
        const response = await fetch(individualConfigUrl + '?' + Date.now());
        
        if (response.ok) {
            const individualConfig = await response.json();
            return individualConfig;
        }
        return null;
    } catch (error) {
        return null;
    }
}

function autoLoadDefaultPlayer() {
    // ✅ FIX: Tambah flag agar tidak double-trigger
    if (window._autoLoadInProgress) return;
    if (preventAutoLoadForScheduleUpdate || scheduleUpdateInProgress) return;
    if (userSelectedChannel && userSelectedUrl) return;
    if (!currentConfig || !currentConfig.defaultPath) return;

    const iframe = document.getElementById('iframe');
    if (!iframe) return;

    const currentSrc = iframe.src || '';
    const defaultUrl = buildFullUrl(currentConfig.defaultPath);
    const playerPair = getPlayerPairFromUrl(defaultUrl);
    let activePlayerType = 'shaka';

    if (playerPair) {
        if (defaultUrl.includes('/bits?') || defaultUrl.includes('/bit?') || defaultUrl.includes('/player1?')) {
            activePlayerType = 'bitmovin';
        } else if (defaultUrl.includes('/jw?') || defaultUrl.includes('/jwplayer?')) {
            activePlayerType = 'jw';
        } else if (defaultUrl.includes('/clappr?')) {
            activePlayerType = 'clappr';
        }
    }

    // Jangan load ulang jika sudah ada URL yang valid
    const ALLOWED_DOMAINS = ['noneserv.pages.dev', 'localhost', 'starshare.pages.dev'];
    const hasValidSrc = ALLOWED_DOMAINS.some(d => currentSrc.includes(d));
    if (hasValidSrc && !currentSrc.includes('/error')) {
        // Tetap pastikan tab player ter-render
        if (playerPair) {
            renderPlayerTabs(playerPair, activePlayerType);
        }
        return;
    }

    const isTrulyBlank = (
        currentSrc === 'about:blank' ||
        currentSrc === '' ||
        currentSrc.includes('/error')
    );

    if (!isTrulyBlank) return;
    if (defaultUrl === currentSrc) return;

    const now = Date.now();
    if (defaultUrl === lastAutoLoadUrl && (now - lastAutoLoadTime) < AUTO_LOAD_COOLDOWN) return;

    console.log('[Server] Auto-loading default player:', defaultUrl);
    window.currentChannelUrl = defaultUrl;
    window._autoLoadInProgress = true;
    lastAutoLoadUrl = defaultUrl;
    lastAutoLoadTime = now;

    // ✅ Pastikan player visible SEBELUM set src agar mobile lancar
    showVideoImmediately();

    // ✅ Langsung set src tanpa delay ganda
    iframe.src = defaultUrl;
    iframe.setAttribute('data-original-src', defaultUrl);

    currentPlayer = activePlayerType;
    triedPlayersInCurrentChannel.add(activePlayerType);

    if (typeof startInitialLoadTimer === 'function') {
        startInitialLoadTimer();
    }

    setTimeout(() => {
        window._autoLoadInProgress = false;
        if (window.setActiveButtonByUrl) {
            window.setActiveButtonByUrl(defaultUrl);
        }
        if (playerPair) {
            renderPlayerTabs(playerPair, activePlayerType);
        } else if (typeof updatePlayerSelectorForUrl === 'function') {
            updatePlayerSelectorForUrl(defaultUrl);
        }
    }, 800);
}

function handleDefaultUrlForAutoLoad(defaultUrl) {
    if (!defaultUrl) return;
    
    if (scheduleUpdateInProgress || preventAutoLoadForScheduleUpdate) {
        return;
    }
    
    const iframe = document.getElementById('iframe');
    if (!iframe) return;
    
    if (iframe.src === defaultUrl) {
        return;
    }
    
    const playerPair = getPlayerPairFromUrl(defaultUrl);
    let activePlayerType = 'shaka';
    if (playerPair) {
        if (defaultUrl.includes('/bits?') || defaultUrl.includes('/bit?') || defaultUrl.includes('/player1?')) {
            activePlayerType = 'bitmovin';
        } else if (defaultUrl.includes('/jw?') || defaultUrl.includes('/jwplayer?')) {
            activePlayerType = 'jw';
        } else if (defaultUrl.includes('/clappr?')) {
            activePlayerType = 'clappr';
        }
    }
    
    window.currentChannelUrl = defaultUrl;
    iframe.src = defaultUrl;
    iframe.setAttribute('data-original-src', defaultUrl);
    
    if (typeof startInitialLoadTimer === 'function') {
        startInitialLoadTimer();
    }
    
    setTimeout(() => {
        startVideoPlayback();
        if (playerPair) {
            renderPlayerTabs(playerPair, activePlayerType);
        }
    }, 800);
}

function applyConfigToPage(config, postId) {
    const configChanged = JSON.stringify(currentConfig) !== JSON.stringify(config);
    
    const changes = currentConfig ? compareConfigs(currentConfig, config) : { 
        addedButtons: [], 
        updatedButtons: [], 
        removedButtons: [], 
        configChanges: [] 
    };
    
    if (!currentConfig || configChanged) {
        const oldConfig = currentConfig;
        currentConfig = config;
        
        const SECRET_BASE_URL = "https://noneserv.pages.dev";
        
        const buildFullUrl = (path) => {
            return path.startsWith('http') ? path : SECRET_BASE_URL + path;
        };
        
        const iframe = document.getElementById('iframe');
        if (iframe && config.defaultPath && !userSelectedChannel) {
            const fullDefaultUrl = buildFullUrl(config.defaultPath);
            window.currentChannelUrl = fullDefaultUrl;
            const currentIframeSrc = iframe.src;
            
            if (currentIframeSrc !== fullDefaultUrl) {
                if (iframe.src === 'about:blank') {
                    iframe.setAttribute('data-original-src', fullDefaultUrl);
                } else {
                    iframe.src = fullDefaultUrl;
                    iframe.setAttribute('data-original-src', fullDefaultUrl);
                }
            }
            
            // Langsung render tab player di awal landing jika channel support penyeleksi player
            const playerPair = getPlayerPairFromUrl(fullDefaultUrl);
            if (playerPair) {
                let activePlayerType = 'shaka';
                if (fullDefaultUrl.includes('/bits?') || fullDefaultUrl.includes('/bit?') || fullDefaultUrl.includes('/player1?')) {
                    activePlayerType = 'bitmovin';
                } else if (fullDefaultUrl.includes('/jw?') || fullDefaultUrl.includes('/jwplayer?')) {
                    activePlayerType = 'jw';
                } else if (fullDefaultUrl.includes('/clappr?')) {
                    activePlayerType = 'clappr';
                }
                renderPlayerTabs(playerPair, activePlayerType);
            }
        }
        
        if (typeof window.updateDefaultUrl === 'function') {
            window.updateDefaultUrl(buildFullUrl(config.defaultPath));
        }
        
        const processedButtonsData = {};
        if (config.buttonsData) {
            Object.keys(config.buttonsData).forEach(category => {
                processedButtonsData[category] = config.buttonsData[category].map(button => ({
                    ...button,
                    url: buildFullUrl(button.path)
                }));
            });
        }
        
        const buttonsChanged = !window.buttonsData || 
                            JSON.stringify(window.buttonsData) !== JSON.stringify(processedButtonsData);
        
        if (buttonsChanged) {
            window.buttonsData = processedButtonsData;
            
            if (window.refreshButtonsFromServer) {
                window.refreshButtonsFromServer();
            }
            
            if (changes.addedButtons.length > 0) {
                setTimeout(() => {
                    triggerNewBadge(changes.addedButtons);
                }, 500);
            }
            
            if (changes.updatedButtons.length > 0 || 
                changes.removedButtons.length > 0 || 
                changes.configChanges.length > 0) {
                setTimeout(() => {
                    triggerUpdatedBadges(changes);
                }, 800);
            }
        }
        
        // ✅ FIX: autoLoad hanya dari loadPostConfig (isFirstLoad),
        // bukan dari sini agar tidak double-trigger
    }
}

async function loadPostConfig() {
    const postId = detectPostId();
    if (!postId) return;
    
    currentPostId = postId;
    
    try {
        const individualConfig = await loadIndividualPostConfig(postId);
        
        if (individualConfig) {
            if (isOn404Page) {
                update404Status('success', ` Config has been updated!`);
                
                setTimeout(() => {
                    isOn404Page = false;
                    applyConfigToPage(individualConfig, postId);
                }, 3000);
            } else {
                isOn404Page = false;
                applyConfigToPage(individualConfig, postId);
                
                const countdownSection = document.querySelector('.countdown-section');
                if (!countdownSection || countdownSection.style.display === 'none') {
                    if (isFirstLoad) {
                        isFirstLoad = false;
                        // ✅ FIX: Satu kali saja, delay lebih pendek
                        setTimeout(() => {
                            autoLoadDefaultPlayer();
                        }, 800);
                    }
                }
            }
            return;
        }
        
        const response = await fetch('https://noneserv.pages.dev/server.json?' + Date.now());
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const config = await response.json();
        const postConfig = config.posts[postId];
        
        if (postConfig) {
            if (isOn404Page) {
                update404Status('success', ` Config has been updated!`);
                
                setTimeout(() => {
                    isOn404Page = false;
                    applyConfigToPage(postConfig, postId);
                }, 3000);
            } else {
                isOn404Page = false;
                applyConfigToPage(postConfig, postId);
                
                const countdownSection = document.querySelector('.countdown-section');
                if (!countdownSection || countdownSection.style.display === 'none') {
                    if (isFirstLoad) {
                        isFirstLoad = false;
                        setTimeout(() => {
                            autoLoadDefaultPlayer();
                        }, 800);
                    }
                }
            }
        } else {
            update404Status('not_found', ` Config Not Found! Please Wait. . .`);
            if (!isOn404Page) {
                show404Page(postId);
            }
        }
    } catch (error) {
        update404Status('error', `Failed to load server: ${error.message}`);
        if (!isOn404Page) {
            show404Page(currentPostId);
        }
        
        const countdownSection = document.querySelector('.countdown-section');
        if (!countdownSection || countdownSection.style.display === 'none') {
            setTimeout(() => {
                autoLoadDefaultPlayer();
            }, 3000);
        }
    }
}

function show404Page(postId) {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;
    
    isOn404Page = true;
    
    const currentSrc = iframe.src;
    const target404Url = `https://noneserv.pages.dev/error?post=${encodeURIComponent(postId)}&ref=${encodeURIComponent(window.location.href)}`;
    
    if (!currentSrc.includes('noneserv.pages.dev/error')) {
        iframe.src = target404Url;
        iframe.setAttribute('data-original-src', target404Url);
    }
    
    resetButtonsAndConfig();
}

function resetButtonsAndConfig() {
    window.buttonsData = null;
    
    const buttonContainer = document.getElementById('buttonContainer');
    const refreshBtn = document.getElementById('refreshBtn');
    
    if (buttonContainer && refreshBtn) {
        const allButtons = buttonContainer.querySelectorAll('button');
        allButtons.forEach(button => {
            if (button.id !== 'refreshBtn') {
                button.remove();
            }
        });
    }
    
    currentConfig = null;
    
    if (typeof window.updateDefaultUrl === 'function') {
        window.updateDefaultUrl(null);
    }
}

// =============================================
// 🔍 CONFIG COMPARISON & BADGES
// =============================================

function compareConfigs(oldConfig, newConfig) {
    const changes = {
        addedButtons: [],
        updatedButtons: [],
        removedButtons: [],
        configChanges: []
    };

    if (!oldConfig) return changes;

    if (oldConfig.defaultPath !== newConfig.defaultPath) {
        changes.configChanges.push('defaultPath');
    }

    const oldButtons = flattenButtons(oldConfig.buttonsData);
    const newButtons = flattenButtons(newConfig.buttonsData);

    newButtons.forEach(newBtn => {
        const isNew = !oldButtons.some(oldBtn => 
            oldBtn.path === newBtn.path && 
            oldBtn.label === newBtn.label
        );
        
        if (isNew) {
            changes.addedButtons.push(newBtn);
        }
    });

    oldButtons.forEach(oldBtn => {
        const stillExists = newButtons.some(newBtn => 
            newBtn.path === oldBtn.path && 
            newBtn.label === oldBtn.label
        );
        
        if (!stillExists) {
            changes.removedButtons.push(oldBtn);
        }
    });

    oldButtons.forEach(oldBtn => {
        const matchingNewBtn = newButtons.find(newBtn => 
            (newBtn.path === oldBtn.path || newBtn.label === oldBtn.label) &&
            (newBtn.path !== oldBtn.path || newBtn.label !== oldBtn.label)
        );
        
        if (matchingNewBtn) {
            const isActuallyNew = changes.addedButtons.some(addedBtn => 
                addedBtn.path === matchingNewBtn.path && 
                addedBtn.label === matchingNewBtn.label
            );
            
            const isActuallyRemoved = changes.removedButtons.some(removedBtn => 
                removedBtn.path === oldBtn.path && 
                removedBtn.label === oldBtn.label
            );
            
            if (!isActuallyNew && !isActuallyRemoved) {
                const changeType = matchingNewBtn.path !== oldBtn.path ? 'path' : 'label';
                changes.updatedButtons.push({
                    old: oldBtn,
                    new: matchingNewBtn,
                    type: changeType
                });
            }
        }
    });

    return changes;
}

function flattenButtons(buttonsData) {
    const flattened = [];
    if (!buttonsData) return flattened;
    
    Object.keys(buttonsData).forEach(category => {
        buttonsData[category].forEach(button => {
            flattened.push({
                category,
                path: button.path,
                label: button.label,
                id: `${category}-${button.path}-${button.label}`
            });
        });
    });
    return flattened;
}

function triggerUpdatedBadges(changes) {
    const shouldShowUpdatedBadges = 
        (changes.removedButtons.length > 0) ||
        (changes.configChanges.includes('defaultPath')) ||
        (changes.updatedButtons.length > 0 && changes.addedButtons.length === 0);
    
    if (!shouldShowUpdatedBadges) {
        return;
    }
    
    if (changes.removedButtons.length > 0) {
        if (window.showUpdatedBadges) {
            window.showUpdatedBadges({ type: 'global', reason: 'removals' });
        }
    }
    else if (changes.configChanges.includes('defaultPath')) {
        if (window.showUpdatedBadges) {
            window.showUpdatedBadges({ 
                type: 'defaultPath', 
                newDefaultPath: currentConfig.defaultPath 
            });
        }
    }
    else if (changes.updatedButtons.length > 0 && changes.addedButtons.length === 0) {
        if (window.showUpdatedBadges) {
            window.showUpdatedBadges({ 
                type: 'specific', 
                updatedButtons: changes.updatedButtons 
            });
        }
    }
}

function triggerNewBadge(newButtons) {
    if (newButtons.length > 0) {
        if (window.showNewBadges) {
            window.showNewBadges(newButtons);
        }
        
        setTimeout(() => {
            newButtons.forEach(btn => {
                newButtonsTracker.delete(btn.id);
            });
        }, 60000);
    }
}

function startConfigWatcher() {
    if (configCheckInterval) {
        clearInterval(configCheckInterval);
    }
    
    configCheckInterval = setInterval(() => {
        loadPostConfig();
    }, 10000);
}

// =============================================
// 🎮 PLAYER DETECTION & SELECTION SYSTEM
// =============================================

function detectPlayerPattern(url) {
    for (const pattern of PLAYER_PATTERNS) {
        const match = url.match(pattern.pattern);
        if (match) {
            return {
                pattern: pattern,
                channelId: match[1],
                type: pattern.type,
                baseDomain: pattern.baseDomain,
                originalUrl: url
            };
        }
    }
    return null;
}

function getBitmovinUrl(channelId) {
    return `https://noneserv.pages.dev/bits?id=${channelId}`;
}

function getShakaUrl(channelId) {
    return `https://noneserv.pages.dev/watch?id=${channelId}`;
}

function getBitmovinUrlPath(channelId) {
    return buildFullUrl(`/bitwatch?id=${channelId}`);
}

function getShakaUrlPath(channelId) {
    return buildFullUrl(`/play/watch?id=${channelId}`);
}

function isSpecificPlayerUrl(url) {
    if (!url) return false;
    
    // 1. Cek apakah ini domain eksternal
    const isInternal = url.includes('noneserv.pages.dev') || 
                       url.includes('starshare.pages.dev') || 
                       url.includes('localhost') || 
                       url.includes('127.0.0.1') || 
                       url.startsWith('/') || 
                       url.startsWith('.') ||
                       (!url.includes('://') && !url.startsWith('javascript:'));
                       
    if (!isInternal) return true;
    
    // 2. Normalisasi URL untuk mengambil path
    let cleanUrl = url;
    if (url.includes('://')) {
        cleanUrl = url.split('://')[1];
        if (cleanUrl.includes('/')) {
            cleanUrl = cleanUrl.substring(cleanUrl.indexOf('/'));
        }
    }
    
    // Pastikan diawali dengan slash agar seragam saat pencocokan regex
    if (!cleanUrl.startsWith('/')) {
        cleanUrl = '/' + cleanUrl;
    }
    
    // Pola regex untuk player spesifik (/clappr, /player1, /iframe, /jw) dan sub-player aliasnya
    const specificPatterns = [
        /^\/clappr(?:\?|\/|$)/,
        /^\/clappr-player(?:\?|\/|$)/,
        /^\/player1(?:\?|\/|$)/,
        /^\/iframe(?:\?|\/|$)/,
        /^\/jw(?:\?|\/|$)/,
        /^\/jwplayer(?:\?|\/|$)/,
        /^\/jw-player(?:\?|\/|$)/
    ];
    
    return specificPatterns.some(regex => regex.test(cleanUrl));
}

function getPlayerPairFromUrl(url) {
    const playerInfo = detectPlayerPattern(url);
    if (!playerInfo) return null;
    
    const { pattern, channelId, type, baseDomain } = playerInfo;
    
    if (baseDomain === 'noneserv.pages.dev') {
        if (url.includes('/watch?') || url.includes('/play?')) {
            const isPlay = url.includes('/play?');
            
            // backwards compatibility for old static id links
            if (url.includes('?id=')) {
                return {
                    shakaUrl: buildFullUrl(isPlay ? `/play?id=${channelId}` : `/watch?id=${channelId}`),
                    bitmovinUrl: buildFullUrl(isPlay ? `/bit?id=${channelId}` : `/bits?id=${channelId}`),
                    jwUrl: buildFullUrl(`/jw?id=${channelId}`),
                    clapprUrl: buildFullUrl(`/clappr?id=${channelId}`),
                    channelId: channelId,
                    baseDomain: baseDomain
                };
            }
            
            const isServId = url.includes('servid=');
            const shakaPath = isPlay 
                ? (isServId ? `/play?servid=${channelId}` : `/play?matchId=${channelId}`) 
                : (isServId ? `/watch?servid=${channelId}` : `/watch?matchId=${channelId}`);
            const bitmovinPath = isPlay 
                ? (isServId ? `/bit?servid=${channelId}` : `/bit?matchId=${channelId}`) 
                : (isServId ? `/bits?servid=${channelId}` : `/bits?matchId=${channelId}`);
            const jwPath = isServId ? `/jw?servid=${channelId}` : `/jw?matchId=${channelId}`;
            const clapprPath = isServId ? `/clappr?servid=${channelId}` : `/clappr?matchId=${channelId}`;
            
            return {
                shakaUrl: buildFullUrl(shakaPath),
                bitmovinUrl: buildFullUrl(bitmovinPath),
                jwUrl: buildFullUrl(jwPath),
                clapprUrl: buildFullUrl(clapprPath),
                channelId: channelId,
                baseDomain: baseDomain
            };
        } else if (url.includes('/bits?') || url.includes('/bit?') || url.includes('/player1?') || url.includes('/jw?') || url.includes('/jwplayer?') || url.includes('/clappr?')) {
            let shakaPath, bitmovinPath, jwPath, clapprPath;
            const isMatch = url.includes('matchId=') || url.includes('servid=');
            const isServId = url.includes('servid=');
            
            if (url.includes('/bit?')) {
                shakaPath = isMatch ? (isServId ? `/play?servid=${channelId}` : `/play?matchId=${channelId}`) : `/play?id=${channelId}`;
                bitmovinPath = isMatch ? (isServId ? `/bit?servid=${channelId}` : `/bit?matchId=${channelId}`) : `/bit?id=${channelId}`;
                jwPath = isMatch ? (isServId ? `/jw?servid=${channelId}` : `/jw?matchId=${channelId}`) : `/jw?id=${channelId}`;
                clapprPath = isMatch ? (isServId ? `/clappr?servid=${channelId}` : `/clappr?matchId=${channelId}`) : `/clappr?id=${channelId}`;
            } else if (url.includes('/player1?')) {
                shakaPath = isMatch ? (isServId ? `/watch?servid=${channelId}` : `/watch?matchId=${channelId}`) : `/watch?id=${channelId}`;
                bitmovinPath = isMatch ? (isServId ? `/player1?servid=${channelId}` : `/player1?matchId=${channelId}`) : `/player1?id=${channelId}`;
                jwPath = isMatch ? (isServId ? `/jw?servid=${channelId}` : `/jw?matchId=${channelId}`) : `/jw?id=${channelId}`;
                clapprPath = isMatch ? (isServId ? `/clappr?servid=${channelId}` : `/clappr?matchId=${channelId}`) : `/clappr?id=${channelId}`;
            } else if (url.includes('/jw?') || url.includes('/jwplayer?')) {
                shakaPath = isMatch ? (isServId ? `/watch?servid=${channelId}` : `/watch?matchId=${channelId}`) : `/watch?id=${channelId}`;
                bitmovinPath = isMatch ? (isServId ? `/bits?servid=${channelId}` : `/bits?matchId=${channelId}`) : `/bits?id=${channelId}`;
                jwPath = isMatch ? (isServId ? `/jw?servid=${channelId}` : `/jw?matchId=${channelId}`) : `/jw?id=${channelId}`;
                clapprPath = isMatch ? (isServId ? `/clappr?servid=${channelId}` : `/clappr?matchId=${channelId}`) : `/clappr?id=${channelId}`;
            } else if (url.includes('/clappr?')) {
                shakaPath = isMatch ? (isServId ? `/watch?servid=${channelId}` : `/watch?matchId=${channelId}`) : `/watch?id=${channelId}`;
                bitmovinPath = isMatch ? (isServId ? `/bits?servid=${channelId}` : `/bits?matchId=${channelId}`) : `/bits?id=${channelId}`;
                jwPath = isMatch ? (isServId ? `/jw?servid=${channelId}` : `/jw?matchId=${channelId}`) : `/jw?id=${channelId}`;
                clapprPath = isMatch ? (isServId ? `/clappr?servid=${channelId}` : `/clappr?matchId=${channelId}`) : `/clappr?id=${channelId}`;
            } else {
                shakaPath = isMatch ? (isServId ? `/watch?servid=${channelId}` : `/watch?matchId=${channelId}`) : `/watch?id=${channelId}`;
                bitmovinPath = isMatch ? (isServId ? `/bits?servid=${channelId}` : `/bits?matchId=${channelId}`) : `/bits?id=${channelId}`;
                jwPath = isMatch ? (isServId ? `/jw?servid=${channelId}` : `/jw?matchId=${channelId}`) : `/jw?id=${channelId}`;
                clapprPath = isMatch ? (isServId ? `/clappr?servid=${channelId}` : `/clappr?matchId=${channelId}`) : `/clappr?id=${channelId}`;
            }
            
            return {
                shakaUrl: buildFullUrl(shakaPath),
                bitmovinUrl: buildFullUrl(bitmovinPath),
                jwUrl: buildFullUrl(jwPath),
                clapprUrl: buildFullUrl(clapprPath),
                channelId: channelId,
                baseDomain: baseDomain
            };
        }
    }
    
    return null;
}

function initializePlayerSelection() {
    // ✅ FIX: Gunakan penundaan kecil untuk memastikan logo.js sudah mendefinisikan changeIframe
    const setupOverride = () => {
        const originalChangeIframe = window.changeIframe;
        
        window.changeIframe = function(button) {
            const url = button.getAttribute('data-url');
            if (!url) {
                return;
            }

            triedPlayersInCurrentChannel.clear();

            const previousChannelUrl = window.currentChannelUrl;

            window.currentChannelUrl = url;
            console.log('[Server] Player change requested:', url);

            // Reset auto-switch count if this is a manual user selection
            if (!window.isAutoSwitching) {
                autoSwitchAttemptCount = 0;
                currentLoadRetryCount = 0;
                if (autoSwitchTimer) {
                    clearTimeout(autoSwitchTimer);
                    autoSwitchTimer = null;
                    console.log('[Server] Manual selection detected. Cleared pending autoSwitchTimer. Reset retry counts.');
                }
            }

            // Pastikan player visible
            if (typeof showVideoImmediately === 'function') {
                showVideoImmediately();
            }

            const isBitmovinUrl = 
                url.includes('/bits?') ||
                url.includes('/bit?') ||
                url.includes('/player1?');

            const isJwUrl = 
                url.includes('/jw?') ||
                url.includes('/jwplayer?');
                
            const isClapprUrl = url.includes('/clappr?');

            if (isBitmovinUrl) {
                userSelectedChannel = true;
                userSelectedUrl = url;
                closeActiveModal();
                smoothSwitchPlayer(url, 'bitmovin');
                return;
            }

            if (isJwUrl) {
                userSelectedChannel = true;
                userSelectedUrl = url;
                closeActiveModal();
                smoothSwitchPlayer(url, 'jw');
                return;
            }

            if (isClapprUrl) {
                userSelectedChannel = true;
                userSelectedUrl = url;
                closeActiveModal();
                smoothSwitchPlayer(url, 'clappr');
                return;
            }

            const playerPair = getPlayerPairFromUrl(url);
            
            if (playerPair) {
                userSelectedChannel = true;
                userSelectedUrl = url;
                if (window.isAutoSwitching) {
                    let activePlayerType = currentPlayer;
                    if (!activePlayerType) {
                        const iframe = document.getElementById('iframe');
                        if (iframe && iframe.src) {
                            const detected = detectPlayerPattern(iframe.src);
                            if (detected) {
                                activePlayerType = detected.type;
                            }
                        }
                    }

                    // 1. Reset jika channel sebelumnya adalah player spesifik agar tidak mengunci pilihan player
                    if (!previousChannelUrl || isSpecificPlayerUrl(previousChannelUrl)) {
                        activePlayerType = 'shaka';
                        console.log('[Server] Previous channel was a specific player or unknown. Resetting auto-switch target player to shaka.');
                    }

                    if (!activePlayerType || !['shaka', 'bitmovin', 'jw', 'clappr'].includes(activePlayerType)) {
                        activePlayerType = 'shaka';
                    }

                    // 2. Cek ketersediaan URL untuk player aktif di channel tujuan
                    let selectedUrl = null;
                    if (activePlayerType === 'shaka' && playerPair.shakaUrl) {
                        selectedUrl = playerPair.shakaUrl;
                    } else if (activePlayerType === 'bitmovin' && playerPair.bitmovinUrl) {
                        selectedUrl = playerPair.bitmovinUrl;
                    } else if (activePlayerType === 'jw' && playerPair.jwUrl) {
                        selectedUrl = playerPair.jwUrl;
                    } else if (activePlayerType === 'clappr' && playerPair.clapprUrl) {
                        selectedUrl = playerPair.clapprUrl;
                    }

                    // 3. Fallback jika player aktif saat ini tidak didukung oleh channel tujuan
                    if (!selectedUrl) {
                        console.log(`[Server] Player ${activePlayerType} not supported by target channel. Falling back...`);
                        if (playerPair.shakaUrl) {
                            selectedUrl = playerPair.shakaUrl;
                            activePlayerType = 'shaka';
                        } else if (playerPair.bitmovinUrl) {
                            selectedUrl = playerPair.bitmovinUrl;
                            activePlayerType = 'bitmovin';
                        } else if (playerPair.jwUrl) {
                            selectedUrl = playerPair.jwUrl;
                            activePlayerType = 'jw';
                        } else if (playerPair.clapprUrl) {
                            selectedUrl = playerPair.clapprUrl;
                            activePlayerType = 'clappr';
                        }
                    }

                    console.log(`[Server] Auto-switching bypass: using player ${activePlayerType} with URL: ${selectedUrl}`);
                    closeActiveModal();
                    if (button) {
                        document.querySelectorAll('.tomboltv').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        button.classList.add('active');
                    }
                    smoothSwitchPlayer(selectedUrl, activePlayerType);
                } else {
                    // Always default to Shaka Player on new channel selection to ensure auto-fallback mechanics run properly
                    let activePlayerType = 'shaka';
                    
                    // Verify if this player type is supported by this channel's playerPair
                    let selectedUrl = null;
                    if (activePlayerType === 'shaka' && playerPair.shakaUrl) {
                        selectedUrl = playerPair.shakaUrl;
                    } else if (activePlayerType === 'bitmovin' && playerPair.bitmovinUrl) {
                        selectedUrl = playerPair.bitmovinUrl;
                    } else if (activePlayerType === 'jw' && playerPair.jwUrl) {
                        selectedUrl = playerPair.jwUrl;
                    } else if (activePlayerType === 'clappr' && playerPair.clapprUrl) {
                        selectedUrl = playerPair.clapprUrl;
                    }
                    
                    // If the preferred player is not supported, fallback to the first available player engine
                    if (!selectedUrl) {
                        if (playerPair.shakaUrl) {
                            selectedUrl = playerPair.shakaUrl;
                            activePlayerType = 'shaka';
                        } else if (playerPair.bitmovinUrl) {
                            selectedUrl = playerPair.bitmovinUrl;
                            activePlayerType = 'bitmovin';
                        } else if (playerPair.jwUrl) {
                            selectedUrl = playerPair.jwUrl;
                            activePlayerType = 'jw';
                        } else if (playerPair.clapprUrl) {
                            selectedUrl = playerPair.clapprUrl;
                            activePlayerType = 'clappr';
                        }
                    }
                    
                    closeActiveModal();
                    if (button) {
                        document.querySelectorAll('.tomboltv').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        button.classList.add('active');
                    }
                    smoothSwitchPlayer(selectedUrl, activePlayerType);
                    
                    // We render the player tabs dynamically!
                    renderPlayerTabs(playerPair, activePlayerType);
                }
            } else {
                userSelectedChannel = true;
                userSelectedUrl = url;
                
                closeActiveModal();
                cleanupPreviousPlayer();
                
                // Hide player tabs since this is a single direct stream/external player
                const tabBar = document.getElementById('playerTabBar');
                if (tabBar) {
                    tabBar.style.display = 'none';
                }
                
                setTimeout(() => {
                    if (originalChangeIframe) {
                        originalChangeIframe(button);
                    } else {
                        const iframe = document.getElementById('iframe');
                        if (iframe) iframe.src = url;
                    }
                    currentPlayer = 'external';
                }, 200);
            }
        };
        console.log('[Server] Player selection initialized.');
    };

    // Jika changeIframe belum ada, tunggu sebentar (maks 2 detik)
    if (!window.changeIframe) {
        let retries = 0;
        const interval = setInterval(() => {
            retries++;
            if (window.changeIframe || retries > 20) {
                clearInterval(interval);
                setupOverride();
            }
        }, 100);
    } else {
        setupOverride();
    }
}


function closeActiveModal() {
    if (activeModal) {
        activeModal.remove();
        activeModal = null;
        window.isModalOpen = false;
        console.log('[Server] Modal closed. Resetting isModalOpen.');
    }
}

function updatePlayerSelectorForUrl(url) {
    const channelUrl = window.currentChannelUrl || url;
    if (isSpecificPlayerUrl(channelUrl)) {
        const tabBar = document.getElementById('playerTabBar');
        if (tabBar) {
            tabBar.style.display = 'none';
        }
        return;
    }
    
    const playerPair = getPlayerPairFromUrl(url);
    if (playerPair) {
        let activePlayerType = 'shaka';
        if (url.includes('/bits?') || url.includes('/bit?') || url.includes('/player1?')) {
            activePlayerType = 'bitmovin';
        } else if (url.includes('/jw?') || url.includes('/jwplayer?')) {
            activePlayerType = 'jw';
        } else if (url.includes('/clappr?')) {
            activePlayerType = 'clappr';
        }
        renderPlayerTabs(playerPair, activePlayerType);
    } else {
        const tabBar = document.getElementById('playerTabBar');
        if (tabBar) {
            tabBar.style.display = 'none';
        }
    }
}

function renderPlayerTabs(playerPair, activePlayerType) {
    // 1. Inject Styles once
    let styleTag = document.getElementById('playerTabStyles');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'playerTabStyles';
        styleTag.innerHTML = `
            #playerTabBar {
                position: relative;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                margin: 15px auto;
                max-width: fit-content;
                width: 90%;
                z-index: 99;
            }
            .player-tab-container {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                gap: 12px;
                padding: 6px 12px;
                background: rgba(26, 26, 42, 0.6);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 30px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
            }
            .player-tab-label {
                color: rgba(255, 255, 255, 0.6);
                font-size: 11px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-right: 6px;
            }
            .player-tab-dropdown-trigger {
                display: none;
            }
            .player-tab-list {
                display: flex;
                gap: 8px;
                margin: 0;
                padding: 0;
            }
            
            @media (max-width: 768px) {
                #playerTabBar {
                    max-width: 320px;
                    margin: 12px auto;
                }
                .player-tab-container {
                    padding: 0;
                    border-radius: 12px;
                    background: transparent;
                    border: none;
                    box-shadow: none;
                    width: 100%;
                }
                .player-tab-label {
                    display: none;
                }
                .player-tab-dropdown-trigger {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    padding: 10px 16px;
                    background: rgba(26, 26, 42, 0.85);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 12px;
                    color: white;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .player-tab-dropdown-trigger:hover {
                    background: rgba(36, 36, 56, 0.95);
                    border-color: rgba(255, 255, 255, 0.18);
                }
                .player-tab-dropdown-trigger .chevron {
                    font-size: 10px;
                    color: rgba(255, 255, 255, 0.5);
                    transition: transform 0.3s ease;
                    margin-left: 8px;
                }
                .player-tab-dropdown-trigger.open .chevron {
                    transform: rotate(180deg);
                }
                .player-tab-list {
                    display: none;
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    right: 0;
                    flex-direction: column;
                    gap: 6px;
                    background: rgba(18, 18, 30, 0.95);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 12px;
                    padding: 8px;
                    margin-bottom: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    z-index: 1000;
                    animation: slideUpIn 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .player-tab-list.open {
                    display: flex;
                }
                .player-tab-btn {
                    width: 100% !important;
                    justify-content: flex-start !important;
                    padding: 10px 14px !important;
                    border-radius: 8px !important;
                    font-size: 12px !important;
                    box-shadow: none !important;
                    transform: none !important;
                }
                .player-tab-btn.active-tab {
                    background: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                    border: 1px solid rgba(255, 255, 255, 0.15) !important;
                }
            }
            @keyframes slideUpIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styleTag);
    }

    // 2. Locate or create tab bar container
    let tabBar = document.getElementById('playerTabBar');
    if (!tabBar) {
        tabBar = document.createElement('div');
        tabBar.id = 'playerTabBar';
        
        const tivi = document.getElementById('tivi') || document.getElementById('container');
        if (tivi) {
            tivi.parentNode.insertBefore(tabBar, tivi.nextSibling);
        } else {
            document.body.appendChild(tabBar);
        }
    }
    
    tabBar.style.display = 'block'; // Make sure container is displayed
    tabBar.innerHTML = ''; // Clear previous content
    
    // 3. Define players options
    const players = [
        { key: 'shaka', name: 'Shaka Player', url: playerPair.shakaUrl, icon: '🎬', gradient: 'linear-gradient(135deg, #d30202, #ff1a1a)', shadow: 'rgba(211, 2, 2, 0.4)' },
        { key: 'bitmovin', name: 'Bitmovin Player', url: playerPair.bitmovinUrl, icon: '⚡', gradient: 'linear-gradient(135deg, #007bff, #004cb6)', shadow: 'rgba(0, 123, 255, 0.4)' },
        { key: 'jw', name: 'JW Player', url: playerPair.jwUrl, icon: '💎', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', shadow: 'rgba(245, 158, 11, 0.4)' },
        { key: 'clappr', name: 'Clappr Player', url: playerPair.clapprUrl, icon: '🟢', gradient: 'linear-gradient(135deg, #10b981, #059669)', shadow: 'rgba(16, 185, 129, 0.4)' }
    ];
    
    const activePlayer = players.find(p => p.key === activePlayerType) || players[0];
    
    // 4. Create HTML elements
    const containerDiv = document.createElement('div');
    containerDiv.className = 'player-tab-container';
    
    // Label for desktop
    const labelSpan = document.createElement('span');
    labelSpan.className = 'player-tab-label';
    labelSpan.textContent = 'Server / Player:';
    containerDiv.appendChild(labelSpan);
    
    const triggerBtn = document.createElement('button');
    triggerBtn.className = 'player-tab-dropdown-trigger';
    triggerBtn.innerHTML = `<span><strong style="color: rgba(255,255,255,0.6); font-weight: 600; margin-right: 6px;">Server Player:</strong> <span style="margin-right: 6px;">${activePlayer.icon}</span>${activePlayer.name}</span><span class="chevron">▼</span>`;
    containerDiv.appendChild(triggerBtn);
    
    // Options list (tabs on desktop, dropdown on mobile)
    const listDiv = document.createElement('div');
    listDiv.className = 'player-tab-list';
    
    // Toggle dropdown on mobile
    const toggleDropdown = (e) => {
        e.stopPropagation();
        triggerBtn.classList.toggle('open');
        listDiv.classList.toggle('open');
    };
    
    triggerBtn.addEventListener('click', toggleDropdown);
    
    // Close dropdown when clicking outside
    if (tabBar._closeDropdownHandler) {
        document.removeEventListener('click', tabBar._closeDropdownHandler);
    }
    
    const closeDropdownHandler = () => {
        triggerBtn.classList.remove('open');
        listDiv.classList.remove('open');
    };
    document.addEventListener('click', closeDropdownHandler);
    tabBar._closeDropdownHandler = closeDropdownHandler;
    
    // 5. Populate buttons
    players.forEach(p => {
        if (!p.url) return;
        
        const tabBtn = document.createElement('button');
        tabBtn.className = `player-tab-btn ${p.key}-tab-btn`;
        tabBtn.innerHTML = `<span style="margin-right: 6px;">${p.icon}</span>${p.name}`;
        
        const isActive = p.key === activePlayerType;
        if (isActive) {
            tabBtn.classList.add('active-tab');
        }
        
        tabBtn.style.cssText = `
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 11px;
            font-weight: 600;
            padding: 8px 16px;
            border-radius: 20px;
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            outline: none;
            display: inline-flex;
            align-items: center;
            ${isActive ? `
                background: ${p.gradient};
                color: white;
                box-shadow: 0 4px 12px ${p.shadow};
                transform: scale(1.05);
            ` : `
                background: rgba(255, 255, 255, 0.05);
                color: rgba(255, 255, 255, 0.7);
            `}
        `;
        
        if (!isActive) {
            tabBtn.addEventListener('mouseenter', () => {
                tabBtn.style.background = 'rgba(255, 255, 255, 0.12)';
                tabBtn.style.color = '#ffffff';
                tabBtn.style.transform = 'translateY(-1px)';
            });
            tabBtn.addEventListener('mouseleave', () => {
                tabBtn.style.background = 'rgba(255, 255, 255, 0.05)';
                tabBtn.style.color = 'rgba(255, 255, 255, 0.7)';
                tabBtn.style.transform = 'none';
            });
        }
        
        tabBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeDropdownHandler();
            
            if (isActive) return;
            
            console.log(`[Server] User selected player preference: ${p.key}`);
            localStorage.setItem('preferredPlayer', p.key);
            
            userSelectedChannel = true;
            userSelectedUrl = p.url;
            
            // Switch player
            smoothSwitchPlayer(p.url, p.key);
            // Re-render tabs
            renderPlayerTabs(playerPair, p.key);
        });
        
        listDiv.appendChild(tabBtn);
    });
    
    containerDiv.appendChild(listDiv);
    tabBar.appendChild(containerDiv);
}

function showPlayerSelectionModal(playerPair, button, originalUrl) {
    const channelUrl = originalUrl || window.currentChannelUrl;
    if (isSpecificPlayerUrl(channelUrl)) {
        const urlToPlay = originalUrl || (playerPair ? playerPair.shakaUrl || playerPair.bitmovinUrl || playerPair.jwUrl || playerPair.clapprUrl : null);
        if (urlToPlay) {
            const iframe = document.getElementById('iframe');
            if (iframe) {
                iframe.src = urlToPlay;
                iframe.setAttribute('data-original-src', urlToPlay);
                setTimeout(() => {
                    startVideoPlayback();
                }, 500);
            }
        }
        return;
    }
    
    const isAutoLoad = !button;
    
    if (isAutoLoad) {
        const iframe = document.getElementById('iframe');
        if (iframe) {
            iframe.src = originalUrl;
            iframe.setAttribute('data-original-src', originalUrl);
            
            setTimeout(() => {
                startVideoPlayback();
            }, 500);
        }
        return;
    }
    
    closeActiveModal();
    window.isModalOpen = true;
    
    const modal = document.createElement('div');
    modal.id = 'playerSelectionModal';
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.85);
        padding: 0;
        border-radius: 15px;
        z-index: 10000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
        min-width: 320px;
        max-width: 400px;
        width: 90%;
    `;
    
    modal.innerHTML = `
        <div class="player-modal-content" style="
            background: linear-gradient(135deg, #1a1a2a, #2a2a3a);
            padding: 25px 20px 20px 20px;
            border-radius: 15px;
            text-align: center;
            position: relative;
        ">
            <button class="close-modal-compact" style="
                position: absolute;
                top: 10px;
                right: 10px;
                background: transparent;
                color: #888;
                border: none;
                font-size: 18px;
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            ">×</button>
            
            <div style="margin-bottom: 20px;">
                <div style="font-size: 24px; margin-bottom: 5px;">🎮</div>
                <h3 style="color: white; margin: 0; font-size: 18px; font-weight: 600;">
                    Choose Player
                </h3>
            </div>
            
            <div class="player-options" style="display: flex; flex-direction: column; gap: 12px;">
                <button class="player-option shaka-option" data-url="${playerPair.shakaUrl}" style="
                    background: linear-gradient(135deg, #d30202, #ff1a1a);
                    color: white;
                    border: none;
                    padding: 14px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    box-shadow: 0 4px 12px rgba(211, 2, 2, 0.3);
                ">
                    <span style="font-size: 16px;">🎬</span>
                    SHAKA PLAYER
                </button>
                
                <button class="player-option bitmovin-option" data-url="${playerPair.bitmovinUrl}" style="
                    background: linear-gradient(135deg, #007bff, #004cb6);
                    color: white;
                    border: none;
                    padding: 14px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
                ">
                    <span style="font-size: 16px;">⚡</span>
                    BITMOVIN PLAYER
                </button>

                <button class="player-option jw-option" data-url="${playerPair.jwUrl}" style="
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    color: white;
                    border: none;
                    padding: 14px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
                ">
                    <span style="font-size: 16px;">💎</span>
                    JW PLAYER
                </button>

                <button class="player-option clappr-option" data-url="${playerPair.clapprUrl}" style="
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    border: none;
                    padding: 14px 20px;
                    border-radius: 10px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                ">
                    <span style="font-size: 16px;">🟢</span>
                    CLAPPR PLAYER
                </button>
            </div>
            
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #888; margin: 0; font-size: 11px;">
                    You can change player anytime
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    activeModal = modal;
    
    modal.querySelector('.shaka-option').addEventListener('click', function() {
        selectPlayer(playerPair.shakaUrl, button, modal, 'shaka');
    });
    
    modal.querySelector('.bitmovin-option').addEventListener('click', function() {
        selectPlayer(playerPair.bitmovinUrl, button, modal, 'bitmovin');
    });

    modal.querySelector('.jw-option').addEventListener('click', function() {
        selectPlayer(playerPair.jwUrl, button, modal, 'jw');
    });

    modal.querySelector('.clappr-option').addEventListener('click', function() {
        selectPlayer(playerPair.clapprUrl, button, modal, 'clappr');
    });
    
    modal.querySelector('.close-modal-compact').addEventListener('click', function() {
        closeActiveModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeActiveModal();
        }
    });
    
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            closeActiveModal();
            document.removeEventListener('keydown', handleEscKey);
        }
    };
    document.addEventListener('keydown', handleEscKey);
    
    modal.addEventListener('remove', () => {
        document.removeEventListener('keydown', handleEscKey);
        activeModal = null;
    });
}

function smoothSwitchPlayer(url, playerType) {
    // ✅ FIX: Transisi mulus tanpa blank hitam
    // Tidak perlu fade out/in — cukup ganti src langsung
    const iframe = document.getElementById('iframe');
    const container = document.getElementById('tivi');
    if (!iframe) return;

    // Reset flag agar startVideoPlayback tidak terblokir
    window._videoPlaybackStarted = false;
    currentLoadRetryCount = 0;

    // Langsung ganti src — tidak perlu opacity trick yang menyebabkan flash
    iframe.src = url;
    iframe.setAttribute('data-original-src', url);
    currentPlayer = playerType;
    triedPlayersInCurrentChannel.add(playerType);

    // Update/render the tab selector bar dynamically
    if (typeof updatePlayerSelectorForUrl === 'function') {
        updatePlayerSelectorForUrl(url);
    }

    // Start auto-fallback timer
    if (typeof startInitialLoadTimer === 'function') {
        startInitialLoadTimer();
    }

    // Pastikan container tetap visible (tidak pernah disembunyikan)
    if (container) {
        container.style.opacity = '1';
        container.style.transition = '';
    }
}


function selectPlayer(selectedUrl, button, modal, playerType) {
    userSelectedChannel = true;
    userSelectedUrl = selectedUrl;
    
    closeActiveModal();
    
    // Reset auto-switch count if this is a manual user selection
    if (!window.isAutoSwitching) {
        autoSwitchAttemptCount = 0;
    }
    
    if (button) {
        document.querySelectorAll('.tomboltv').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }
    
    smoothSwitchPlayer(selectedUrl, playerType);
}

function cleanupPreviousPlayer() {
    // ✅ FIX: Jangan set about:blank saat switch player — ini penyebab blank hitam
    // Cukup catat URL sebelumnya saja
    const iframe = document.getElementById('iframe');
    if (!iframe) return;
    previousPlayerUrl = iframe.src;
    window._videoPlaybackStarted = false;
    
    // ✅ FIX: Clear pending auto-switch timer if switching to external player
    if (typeof autoSwitchTimer !== 'undefined' && autoSwitchTimer) {
        clearTimeout(autoSwitchTimer);
        autoSwitchTimer = null;
    }
}

function switchToNewPlayer(newUrl, playerType) {
    const iframe = document.getElementById('iframe');
    if (!iframe) return;
    
    const container = document.getElementById('tivi');
    if (container) {
        container.style.opacity = '0.5';
        container.style.transition = 'opacity 0.3s ease';
    }
    
    iframe.src = newUrl;
    iframe.setAttribute('data-original-src', newUrl);
    
    currentPlayer = playerType;
    currentLoadRetryCount = 0;

    // Update/render the tab selector bar dynamically
    if (typeof updatePlayerSelectorForUrl === 'function') {
        updatePlayerSelectorForUrl(newUrl);
    }

    // Start auto-fallback timer
    if (typeof startInitialLoadTimer === 'function') {
        startInitialLoadTimer();
    }
    
    setTimeout(() => {
        if (container) {
            container.style.opacity = '1';
        }
        
        setTimeout(() => {
            startVideoPlayback();
        }, 300);
        
    }, 500);
}

function buildFullUrl(path) {
    const SECRET_BASE_URL = "https://noneserv.pages.dev";
    return path.startsWith('http') ? path : SECRET_BASE_URL + path;
}

// =============================================
// 🚀 INITIALIZATION & EXPORTS
// =============================================

// ✅ Flag koordinasi dengan logo.js — changeIframe fallback tidak akan aktif
window._serverJsLoaded = true;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePlayerSelection);
} else {
    initializePlayerSelection();
}

loadPostConfig().then(() => {
    startConfigWatcher();
});

window.refreshConfig = loadPostConfig;
window.createButtonsFromServer = function() {
    if (window.refreshButtonsFromServer) {
        window.refreshButtonsFromServer();
    }
};

window.startVideoPlayback = startVideoPlayback;
window.stopVideoPlayback = stopVideoPlayback;
window.showVideoPlayer = showVideoPlayer;
window.showVideoImmediately = showVideoImmediately;
window.optimizeMobileVideo = optimizeMobileVideo;
window.resetUserSelection = function() {
    userSelectedChannel = false;
    userSelectedUrl = null;
};

window.getPlayerInfo = function(url) {
    return getPlayerPairFromUrl(url || window.location.href);
};

window.addEventListener('beforeunload', function() {
    cleanupPreviousPlayer();
});

// =============================================
// 🔁 AUTO-FALLBACK SYSTEM
// =============================================

function showToastNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'error' ? 'rgba(220, 38, 38, 0.9)' : type === 'warning' ? 'rgba(245, 158, 11, 0.9)' : 'rgba(79, 70, 229, 0.9)'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 14px;
        font-weight: 500;
        z-index: 2147483647;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateY(100px);
        opacity: 0;
        backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    toast.innerHTML = `
        <span style="font-size: 18px;">${type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
        ${message}
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function startInitialLoadTimer() {
    if (autoSwitchTimer) clearTimeout(autoSwitchTimer);
    hasPlayedSuccessfully = false;
    
    // 25 seconds timeout for initial load
    autoSwitchTimer = setTimeout(() => {
        if (!hasPlayedSuccessfully) {
            console.log('[Server] Initial load timeout.');
            
            const iframe = document.getElementById('iframe');
            if (currentLoadRetryCount < MAX_LOAD_RETRIES && iframe && iframe.src && iframe.src !== 'about:blank') {
                currentLoadRetryCount++;
                console.log(`[Server] Traffic/network slow. Retrying same server (Attempt ${currentLoadRetryCount}/${MAX_LOAD_RETRIES})...`);
                showToastNotification('Connection slow. Retrying stream...', 'warning');
                
                // Refresh iframe yang sama
                const currentSrc = iframe.src;
                iframe.src = 'about:blank';
                setTimeout(() => {
                    iframe.src = currentSrc;
                    startInitialLoadTimer(); // Mulai timer baru setelah reload
                }, 100);
            } else {
                currentLoadRetryCount = 0;
                console.log('[Server] Max retries reached or no valid src. Running failure handler...');
                showToastNotification('Timeout loading stream. Trying alternatives...', 'warning');
                handlePlayerFailure();
            }
        }
    }, 25000);
}

function handlePlayerFailure() {
    const iframe = document.getElementById('iframe');
    if (!iframe) {
        autoSwitchToNextChannel();
        return;
    }

    const currentUrl = window.currentChannelUrl || iframe.src;
    if (!currentUrl) {
        autoSwitchToNextChannel();
        return;
    }

    const playerPair = getPlayerPairFromUrl(currentUrl);

    if (playerPair) {
        const priority = ['shaka', 'bitmovin', 'jw', 'clappr'];
        let nextPlayer = null;
        let nextUrl = null;

        for (const p of priority) {
            if (triedPlayersInCurrentChannel.has(p)) continue;

            if (p === 'shaka' && playerPair.shakaUrl) {
                nextPlayer = 'shaka';
                nextUrl = playerPair.shakaUrl;
                break;
            } else if (p === 'bitmovin' && playerPair.bitmovinUrl) {
                nextPlayer = 'bitmovin';
                nextUrl = playerPair.bitmovinUrl;
                break;
            } else if (p === 'jw' && playerPair.jwUrl) {
                nextPlayer = 'jw';
                nextUrl = playerPair.jwUrl;
                break;
            } else if (p === 'clappr' && playerPair.clapprUrl) {
                nextPlayer = 'clappr';
                nextUrl = playerPair.clapprUrl;
                break;
            }
        }

        if (nextPlayer && nextUrl) {
            console.log(`[Server] Player ${currentPlayer || 'unknown'} failed. Switching to alternative player: ${nextPlayer}`);
            showToastNotification(`Main server issue. Trying ${nextPlayer.toUpperCase()} player...`, 'warning');
            
            triedPlayersInCurrentChannel.add(nextPlayer);
            smoothSwitchPlayer(nextUrl, nextPlayer);
            
            if (playerPair) {
                renderPlayerTabs(playerPair, nextPlayer);
            }
            return;
        }
    }

    // Jika tidak ada alternatif atau semua sudah gagal
    console.log('[Server] No alternative players available. Switching to next channel...');
    triedPlayersInCurrentChannel.clear();
    autoSwitchToNextChannel();
}

function autoSwitchToNextChannel() {
    const buttons = Array.from(document.querySelectorAll('.tomboltv'));
    if (buttons.length === 0) return;

    let currentIndex = buttons.findIndex(btn => btn.classList.contains('active'));
    if (currentIndex === -1) currentIndex = 0;

    let attempts = 0;
    let nextIndex = currentIndex + 1;

    while (attempts < buttons.length) {
        if (autoSwitchAttemptCount >= buttons.length) {
            console.log('[Server] All channels tried. None are working.');
            showToastNotification('All servers are currently offline', 'error');
            autoSwitchAttemptCount = 0;
            
            if (autoSwitchTimer) {
                clearTimeout(autoSwitchTimer);
                autoSwitchTimer = null;
            }
            
            stopVideoPlayback();
            const iframe = document.getElementById('iframe');
            if (iframe) {
                iframe.src = 'about:blank';
                iframe.removeAttribute('data-original-src');
                
                setTimeout(() => {
                    try {
                        const doc = iframe.contentDocument || iframe.contentWindow.document;
                        if (doc) {
                            doc.open();
                            doc.write(`
                                <!DOCTYPE html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>All Servers Offline</title>
                                    <style>
                                        body {
                                            margin: 0;
                                            padding: 0;
                                            background: #000000;
                                            color: #ffffff;
                                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            min-height: 100vh;
                                            overflow: hidden;
                                        }
                                        .error-card {
                                            background: rgba(30, 30, 50, 0.45);
                                            backdrop-filter: blur(15px);
                                            -webkit-backdrop-filter: blur(15px);
                                            border: 1px solid rgba(239, 68, 68, 0.25);
                                            border-radius: 16px;
                                            padding: 40px 30px;
                                            text-align: center;
                                            max-width: 400px;
                                            width: 85%;
                                            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7), 0 0 30px rgba(239, 68, 68, 0.1);
                                            animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                                        }
                                        .icon {
                                            font-size: 48px;
                                            margin-bottom: 20px;
                                            animation: pulse 2s infinite;
                                            display: inline-block;
                                        }
                                        h2 {
                                            font-size: 20px;
                                            font-weight: 700;
                                            margin: 0 0 12px 0;
                                            color: #ef4444;
                                            letter-spacing: 0.5px;
                                            text-transform: uppercase;
                                        }
                                        p {
                                            font-size: 13px;
                                            color: rgba(255, 255, 255, 0.6);
                                            line-height: 1.6;
                                            margin: 0 0 28px 0;
                                        }
                                        .btn-refresh {
                                            background: linear-gradient(135deg, #d30202, #ff1a1a);
                                            color: white;
                                            border: none;
                                            border-radius: 30px;
                                            padding: 12px 30px;
                                            font-size: 11px;
                                            font-weight: 700;
                                            cursor: pointer;
                                            text-transform: uppercase;
                                            letter-spacing: 1px;
                                            transition: all 0.3s ease;
                                            box-shadow: 0 4px 15px rgba(211, 2, 2, 0.4);
                                            outline: none;
                                        }
                                        .btn-refresh:hover {
                                            transform: translateY(-2px);
                                            box-shadow: 0 6px 20px rgba(211, 2, 2, 0.6);
                                        }
                                        .btn-refresh:active {
                                            transform: translateY(0);
                                        }
                                        @keyframes fadeIn {
                                            from { opacity: 0; transform: scale(0.95) translateY(10px); }
                                            to { opacity: 1; transform: scale(1) translateY(0); }
                                        }
                                        @keyframes pulse {
                                            0%, 100% { transform: scale(1); opacity: 0.9; }
                                            50% { transform: scale(1.06); opacity: 1; }
                                        }
                                    </style>
                                </head>
                                <body>
                                    <div class="error-card">
                                        <div class="icon">⚠️</div>
                                        <h2>All Servers Offline</h2>
                                        <p>We are sorry, all streaming servers are currently offline or experiencing technical difficulties. Our technical team is working on it. Please try again later.</p>
                                        <button class="btn-refresh" onclick="window.parent.location.reload();">Reload Page</button>
                                    </div>
                                </body>
                                </html>
                            `);
                            doc.close();
                        }
                    } catch (e) {
                        console.error('[Server] Gagal menulis halaman error ke iframe:', e);
                    }
                }, 200);
            }
            return;
        }

        if (nextIndex >= buttons.length) {
            nextIndex = 0;
        }

        const nextButton = buttons[nextIndex];
        const url = nextButton.getAttribute('data-url');
        
        if (url) {
            autoSwitchAttemptCount++;
            console.log(`[Server] Auto-switching to next channel...`);
            window.isAutoSwitching = true;
            if (window.changeIframe) {
                window.changeIframe(nextButton);
                if (window.setActiveButtonByUrl) {
                    window.setActiveButtonByUrl(url);
                }
            } else {
                nextButton.click();
            }
            window.isAutoSwitching = false;
            return;
        }
        
        nextIndex++;
        attempts++;
    }
    
    console.log('[Server] No valid channels found.');
}

// Listen to player messages
window.addEventListener('message', function(event) {
    if (!event.data || typeof event.data.type !== 'string') return;
    
    // Ignore player messages if user is selecting a player
    if (window.isModalOpen) {
        console.log('[Server] Selection modal is open. Ignoring background player message:', event.data.type);
        return;
    }
    
    switch (event.data.type) {
        case 'PLAYER_PLAYING':
            hasPlayedSuccessfully = true;
            autoSwitchAttemptCount = 0; // Reset anti-loop counter because we found a working stream
            currentLoadRetryCount = 0;  // Reset load retry count on successful play
            if (autoSwitchTimer) {
                clearTimeout(autoSwitchTimer);
                autoSwitchTimer = null;
            }
            break;
            
        case 'PLAYER_ERROR':
            if (autoSwitchTimer) {
                clearTimeout(autoSwitchTimer);
                autoSwitchTimer = null;
            }
            currentLoadRetryCount = 0;  // Reset load retry count before auto-switching
            showToastNotification('Server error detected. Trying alternative...', 'warning');
            handlePlayerFailure();
            break;
    }
});
