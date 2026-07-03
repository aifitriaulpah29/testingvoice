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

    // Jangan load ulang jika sudah ada URL yang valid
    const ALLOWED_DOMAINS = ['noneserv.pages.dev', 'localhost', 'starshare.pages.dev'];
    const hasValidSrc = ALLOWED_DOMAINS.some(d => currentSrc.includes(d));
    if (hasValidSrc && !currentSrc.includes('/error')) return;

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
    window._autoLoadInProgress = true;
    lastAutoLoadUrl = defaultUrl;
    lastAutoLoadTime = now;

    // ✅ Pastikan player visible SEBELUM set src agar mobile lancar
    showVideoImmediately();

    // ✅ Langsung set src tanpa delay ganda
    iframe.src = defaultUrl;
    iframe.setAttribute('data-original-src', defaultUrl);

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
    
    iframe.src = defaultUrl;
    iframe.setAttribute('data-original-src', defaultUrl);
    
    if (typeof startInitialLoadTimer === 'function') {
        startInitialLoadTimer();
    }
    
    setTimeout(() => {
        startVideoPlayback();
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
            const currentIframeSrc = iframe.src;
            
            if (currentIframeSrc !== fullDefaultUrl) {
                if (iframe.src === 'about:blank') {
                    iframe.setAttribute('data-original-src', fullDefaultUrl);
                } else {
                    iframe.src = fullDefaultUrl;
                    iframe.setAttribute('data-original-src', fullDefaultUrl);
                }
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

            // Simpan URL tombol aktif saat ini untuk memulihkan status jika pembatalan modal terjadi
            const currentActiveBtn = document.querySelector('.tomboltv.active');
            const previousActiveUrl = currentActiveBtn ? currentActiveBtn.getAttribute('data-url') : null;

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
                    // Detect player type from the new channel's URL to avoid forcing the failed player
                    let activePlayerType = null;
                    const detected = detectPlayerPattern(url);
                    if (detected) {
                        activePlayerType = detected.type;
                    }
                    if (!activePlayerType || !['shaka', 'bitmovin', 'jw', 'clappr'].includes(activePlayerType)) {
                        activePlayerType = 'shaka';
                    }
                    let selectedUrl = playerPair.shakaUrl;
                    if (activePlayerType === 'bitmovin') {
                        selectedUrl = playerPair.bitmovinUrl;
                    } else if (activePlayerType === 'jw') {
                        selectedUrl = playerPair.jwUrl;
                    } else if (activePlayerType === 'clappr') {
                        selectedUrl = playerPair.clapprUrl;
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
                    showPlayerSelectionModal(playerPair, button, url, previousActiveUrl);
                }
            } else {
                userSelectedChannel = true;
                userSelectedUrl = url;
                
                closeActiveModal();
                cleanupPreviousPlayer();
                
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

function showPlayerSelectionModal(playerPair, button, originalUrl, previousActiveUrl) {
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
    
    const restorePreviousActiveButton = () => {
        if (window.setActiveButtonByUrl && previousActiveUrl) {
            window.setActiveButtonByUrl(previousActiveUrl);
        } else if (window.setActiveButtonByUrl) {
            document.querySelectorAll('.tomboltv').forEach(btn => {
                btn.classList.remove('active');
            });
        }
    };

    modal.querySelector('.close-modal-compact').addEventListener('click', function() {
        closeActiveModal();
        restorePreviousActiveButton();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeActiveModal();
            restorePreviousActiveButton();
        }
    });
    
    const handleEscKey = (e) => {
        if (e.key === 'Escape') {
            closeActiveModal();
            restorePreviousActiveButton();
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
            if (window.isModalOpen) {
                console.log('[Server] Initial load timeout ignored because modal is open.');
                return;
            }
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
