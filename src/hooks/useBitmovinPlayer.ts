// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from 'react';

function override(url) {
  if (url && typeof url === 'string') {
    if (url.indexOf("licensing.bitmovin.com/licensing") > -1) return "data:text/plain;charset=utf-8;base64,eyJzdGF0dXMiOiJncmFudGVkIiwibWVzc2FnZSI6IlRoZXJlIHlvdSBnby4ifQ==";
    if (url.indexOf("licensing.bitmovin.com/impression") > -1) return "data:text/plain;charset=utf-8;base64,eyJzdGF0dXMiOiJncmFudGVkIiwibWVzc2FnZSI6IlRoZXJlIHlvdSBnby4ifQ==";
  }
  return url;
}

// Override XMLHttpRequest open method (SSR safe)
if (typeof window !== 'undefined') {
  var opens = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function() {
    if (arguments[1] && typeof arguments[1] === 'string') {
      arguments[1] = override(arguments[1]);
    }
    return opens.apply(this, arguments);
  };
}

// ============ MOBILE & FULLSCREEN HANDLING ============
const playVideoInLandscape = () => {
  if (typeof window !== 'undefined' && window.screen) {
    const screen = window.screen;
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(function(error) {});
    }
    else if (screen.lockOrientation) {
      screen.lockOrientation('landscape');
    } 
    else if (screen.mozLockOrientation) {
      screen.mozLockOrientation('landscape');
    } 
    else if (screen.msLockOrientation) {
      screen.msLockOrientation('landscape');
    }
  }
};

const unlockScreenOrientation = () => {
  if (typeof window !== 'undefined' && window.screen) {
    const screen = window.screen;
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
    else if (screen.unlockOrientation) {
      screen.unlockOrientation();
    } 
    else if (screen.mozUnlockOrientation) {
      screen.mozUnlockOrientation();
    } 
    else if (screen.msUnlockOrientation) {
      screen.msUnlockOrientation();
    }
  }
};

const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return (typeof window.orientation !== "undefined") || 
         (navigator.userAgent.indexOf('IEMobile') !== -1) ||
         (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};

// ============ USE BITMOVIN PLAYER ============
export const useBitmovinPlayer = (containerRef, config, mode = 'default') => {
  const [error, setError] = useState('');
  const [slowNetworkMessage, setSlowNetworkMessage] = useState('');
  const [bitmovinReady, setBitmovinReady] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  
  const playerRef = useRef(null);
  const uiManagerRef = useRef(null);
  const mountedRef = useRef(true);
  const bufferingTimerRef = useRef(null);
  const slowNetworkTimerRef = useRef(null);
  const recoveryAttemptsRef = useRef(0);
  const fullscreenHandlerRef = useRef(null);
  const initiatingRef = useRef(false);

  // ============ HANDLE FULLSCREEN CHANGE ============
  const handleFullscreenChange = useCallback(() => {
    if (!mountedRef.current) return;
    
    // Check if we're in fullscreen mode (cross-browser)
    const isFullscreen = document.fullscreenElement || 
                         document.webkitFullscreenElement || 
                         document.mozFullScreenElement || 
                         document.msFullscreenElement;
    
    if (isFullscreen) {
      if (isMobileDevice()) {
        playVideoInLandscape();
      }
    } else {
      if (isMobileDevice()) {
        unlockScreenOrientation();
      }
    }
  }, []);

  // ============ SETUP FULLSCREEN LISTENERS ============
  const setupFullscreenListeners = useCallback(() => {
    // Remove existing listeners if any
    if (fullscreenHandlerRef.current) {
      document.removeEventListener('fullscreenchange', fullscreenHandlerRef.current);
      document.removeEventListener('webkitfullscreenchange', fullscreenHandlerRef.current);
      document.removeEventListener('mozfullscreenchange', fullscreenHandlerRef.current);
      document.removeEventListener('MSFullscreenChange', fullscreenHandlerRef.current);
    }
    
    // Store handler reference
    fullscreenHandlerRef.current = handleFullscreenChange;
    
    // Add all fullscreen event listeners
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
  }, [handleFullscreenChange]);

  // Setup fullscreen listeners on mount
  useEffect(() => {
    setupFullscreenListeners();
    
    return () => {
      // Cleanup fullscreen listeners
      if (fullscreenHandlerRef.current) {
        document.removeEventListener('fullscreenchange', fullscreenHandlerRef.current);
        document.removeEventListener('webkitfullscreenchange', fullscreenHandlerRef.current);
        document.removeEventListener('mozfullscreenchange', fullscreenHandlerRef.current);
        document.removeEventListener('MSFullscreenChange', fullscreenHandlerRef.current);
      }
      
      // Unlock orientation when component unmounts
      if (isMobileDevice()) {
        unlockScreenOrientation();
      }
    };
  }, [setupFullscreenListeners]);

  // Cek Bitmovin sudah ready
  useEffect(() => {
    const checkBitmovinReady = () => {
      const isReady = window.bitmovin && 
                      window.bitmovin.player && 
                      window.bitmovin.player.Player && 
                      window.bitmovin.playerui;
      
      if (isReady) {
        setBitmovinReady(true);
        return true;
      }
      return false;
    };

    // Cek langsung
    if (checkBitmovinReady()) return;

    // Jika belum, tunggu dengan interval
    const interval = setInterval(() => {
      if (checkBitmovinReady()) {
        clearInterval(interval);
      }
    }, 100);

    // Timeout setelah 10 detik
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!window.bitmovin) {
        setError('Gagal memuat Bitmovin Player - Timeout');
      }
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      mountedRef.current = false;
    };
  }, []);

  // ============ SELECT AUDIO TRACK KE-2 ============
  const selectSecondAudioTrack = useCallback(() => {
    if (!playerRef.current || mode !== 'play') return;

    // Tunggu hingga tracks tersedia
    const checkTracks = setInterval(() => {
      try {
        const audioTracks = playerRef.current.getAvailableAudio();
        
        if (audioTracks && audioTracks.length >= 2) {
          playerRef.current.setAudio(audioTracks[1].id);
          clearInterval(checkTracks);
        } else if (audioTracks && audioTracks.length === 1) {
          clearInterval(checkTracks);
        }
      } catch (err) {
        // Track belum tersedia, coba lagi
      }
    }, 500);

    // Stop checking after 10 seconds
    setTimeout(() => clearInterval(checkTracks), 10000);
  }, [mode]);

  // ============ HANDLE BUFFERING / SLOW NETWORK ============
  const handleBuffering = useCallback((event) => {
    if (!mountedRef.current || !playerRef.current) return;

    // Jika sedang dalam masa recovery, jangan tampilkan pesan
    if (isRecovering) return;

    // Clear previous timers
    if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
    if (slowNetworkTimerRef.current) clearTimeout(slowNetworkTimerRef.current);

    // Jika buffering mulai
    if (event.buffering) {
      // Tunggu 3 detik, jika masih buffering, tampilkan pesan slow network
      bufferingTimerRef.current = setTimeout(() => {
        if (mountedRef.current && playerRef.current) {
          // Cek apakah masih buffering
          const isStillBuffering = playerRef.current.isBuffering && playerRef.current.isBuffering();
          
          if (isStillBuffering) {
            setSlowNetworkMessage('Your network is slow. Video is buffering...');
            
            // Turunkan kualitas secara manual untuk membantu recovery
            try {
              const availableQualities = playerRef.current.getAvailableVideoQualities();
              if (availableQualities && availableQualities.length > 1) {
                // Pilih kualitas terendah (index ke-0 biasanya terendah)
                playerRef.current.setVideoQuality(availableQualities[0].id);
                recoveryAttemptsRef.current += 1;
              }
            } catch (e) {
              // Ignore error saat set kualitas
            }
          }
        }
      }, 3000); // 3 detik buffering baru tampilkan pesan
    } 
    // Jika buffering selesai
    else {
      // Hapus pesan slow network
      setSlowNetworkMessage('');
      
      // Jika sebelumnya ada recovery attempts dan berhasil, reset counter
      if (recoveryAttemptsRef.current > 0) {
        recoveryAttemptsRef.current = 0;
      }
      
      // Jika ada timer buffering, clear
      if (bufferingTimerRef.current) {
        clearTimeout(bufferingTimerRef.current);
        bufferingTimerRef.current = null;
      }
    }
  }, [isRecovering]);

  // ============ HANDLE ERROR ============
  const handlePlayerError = useCallback((errorEvent) => {
    if (!mountedRef.current) return;

    const error = errorEvent.error || errorEvent;
    const errorCode = error.code || errorEvent.code;
    const errorMessage = error.message || errorEvent.message || '';

    // Filter error yang disebabkan oleh network/buffering
    const isNetworkError = 
      errorMessage.toLowerCase().includes('network') ||
      errorMessage.toLowerCase().includes('timeout') ||
      errorMessage.toLowerCase().includes('buffer') ||
      errorCode === 1000 || // Network error umum
      errorCode === 1001;    // Timeout error

    if (isNetworkError) {
      // Ini bukan error fatal, hanya masalah jaringan
      setSlowNetworkMessage('Network issue detected. Trying to recover...');
      
      // Coba recovery
      if (!isRecovering) {
        setIsRecovering(true);
        
        // Tunggu 2 detik, reload source jika masih bermasalah
        setTimeout(() => {
          if (mountedRef.current && playerRef.current) {
            try {
              // Coba pause sebentar dan play lagi
              playerRef.current.pause();
              setTimeout(() => {
                if (mountedRef.current && playerRef.current) {
                  playerRef.current.play().catch(() => {});
                  setIsRecovering(false);
                  setSlowNetworkMessage('');
                }
              }, 2000);
            } catch (e) {
              setIsRecovering(false);
            }
          }
        }, 2000);
      }
      
      return; // Jangan set error fatal
    }

    // Error lain yang benar-benar fatal
    setError('Failed to load stream. Please try again.');
  }, [isRecovering]);

  // ============ BUILD UI ============
  const buildUI = useCallback(() => {
    if (!window.bitmovin || !window.bitmovin.playerui) {
      return null;
    }

    const bitmovin = window.bitmovin;
    
    try {
      const customLocalizer = {
        getLocalizedString: function(key, params) {
          const customLabels = {
            'settings.audio.quality': 'Audio Track',
            'settings.video.quality': 'Video Quality',
            'speed': 'Speed',
            'subtitles': 'Subtitles'
          };
          return customLabels[key] || bitmovin.playerui.i18n.getLocalizer(key, params);
        }
      };

      let mainSettingsPanelPage = new bitmovin.playerui.SettingsPanelPage({
        components: [
          new bitmovin.playerui.SettingsPanelItem(
            customLocalizer.getLocalizedString('settings.video.quality'), 
            new bitmovin.playerui.VideoQualitySelectBox()
          ),
          new bitmovin.playerui.SettingsPanelItem(
            customLocalizer.getLocalizedString('settings.audio.quality'), 
            new bitmovin.playerui.AudioTrackSelectBox()
          ),
          new bitmovin.playerui.SettingsPanelItem(
            customLocalizer.getLocalizedString('speed'), 
            new bitmovin.playerui.PlaybackSpeedSelectBox()
          ),
          new bitmovin.playerui.SettingsPanelItem(
            customLocalizer.getLocalizedString('subtitles'), 
            new bitmovin.playerui.SubtitleSelectBox()
          ),
        ],
      });

      let settingsPanel = new bitmovin.playerui.SettingsPanel({
        components: [mainSettingsPanelPage],
        hidden: true,
      });

      let controlBar = new bitmovin.playerui.ControlBar({
        components: [
          settingsPanel,
          new bitmovin.playerui.Container({
            components: [
              new bitmovin.playerui.SeekBar({ label: new bitmovin.playerui.SeekBarLabel() }),
              new bitmovin.playerui.PlaybackTimeLabel({ 
                timeLabelMode: bitmovin.playerui.PlaybackTimeLabelMode.TotalTime, 
                cssClasses: ['text-right'] 
              }),
            ],
            cssClasses: ['controlbar-top'],
          }),
          new bitmovin.playerui.Container({
            components: [
              new bitmovin.playerui.VolumeToggleButton(),
              new bitmovin.playerui.VolumeSlider(),
              new bitmovin.playerui.Spacer(),
              new bitmovin.playerui.QuickSeekButton({ seekSeconds: -10 }),
              new bitmovin.playerui.PlaybackToggleButton(),
              new bitmovin.playerui.QuickSeekButton({ seekSeconds: 10 }),
              new bitmovin.playerui.Spacer(),
              new bitmovin.playerui.SettingsToggleButton({ settingsPanel: settingsPanel }),
              new bitmovin.playerui.FullscreenToggleButton(),
            ],
            cssClasses: ['controlbar-bottom'],
          }),
        ],
      });

      return new bitmovin.playerui.UIContainer({
        components: [
          new bitmovin.playerui.BufferingOverlay(),
          new bitmovin.playerui.PlaybackToggleOverlay(),
          controlBar,
          new bitmovin.playerui.ErrorMessageOverlay(),
          new bitmovin.playerui.SubtitleOverlay()
        ],
        hideDelay: 2000,
        // FIX: Hapus 'Prepared' dari exceptions — jika player stuck di state Prepared
        // (video tidak autoplay), kontrol akan bisa auto-hide normal. 
        // Hanya Paused dan Finished yang perlu exceptions.
        hidePlayerStateExceptions: [
          bitmovin.playerui.PlayerUtils.PlayerState.Paused,
          bitmovin.playerui.PlayerUtils.PlayerState.Finished,
        ],
      });
    } catch (err) {
      return null;
    }
  }, []);

  // ============ APPLY CUSTOM HEADERS ============
  const applyCustomHeaders = useCallback((config, token) => {
    const customNetworkConfig = {
      preprocessHttpRequest: function(type, request) {
        // FIX: Selaraskan kondisi shouldProxy dengan createRequestFilter di streamConfigs.ts
        // Stream dengan origin/referer juga wajib diarahkan melalui proxy.
        const shouldProxy = config.proxy === true ||
                            !!(config.origin && typeof config.origin === 'string' && config.origin.trim()) ||
                            !!(config.referer && typeof config.referer === 'string' && config.referer.trim());

        if (shouldProxy) {
          let targetUrl = request.url;
          
          // Jika URL yang di-resolve oleh player mengarah ke localhost/api/ (karena base URL-nya adalah proxy)
          const localApiPrefix = `${window.location.origin}/api/`;
          if (targetUrl.startsWith(localApiPrefix)) {
            const relativePath = targetUrl.substring(localApiPrefix.length);
            const baseCdnUrl = config.url.substring(0, config.url.lastIndexOf('/') + 1);
            targetUrl = baseCdnUrl + relativePath;
          }

          const bitmovin = window.bitmovin;
          // Hanya proxy request MANIFEST dan MEDIA (Video, Audio, Subtitle, HLS Key)
          if (bitmovin && bitmovin.player) {
            const reqType = bitmovin.player.HttpRequestType;
            const typesToProxy = [
              reqType.MANIFEST,
              reqType.MEDIA_VIDEO,
              reqType.MEDIA_AUDIO,
              reqType.MEDIA_SUBTITLE,
              reqType.KEY
            ];
            if (typesToProxy.includes(type)) {
              if (!targetUrl.includes('/api/manifest')) {
                let proxyUrl = `${window.location.origin}/api/manifest?file=${encodeURIComponent(targetUrl)}`;
                if (token) proxyUrl += `&token=${token}`;
                if (config.id) proxyUrl += `&id=${config.id}`;
                request.url = proxyUrl;
              }
            }
          } else {
            // Fallback
            if (!targetUrl.includes('/api/manifest')) {
              let proxyUrl = `${window.location.origin}/api/manifest?file=${encodeURIComponent(targetUrl)}`;
              if (token) proxyUrl += `&token=${token}`;
              if (config.id) proxyUrl += `&id=${config.id}`;
              request.url = proxyUrl;
            }
          }
        }
        return request;
      },
      preprocessHttpResponse: function(type, response) {
        return response;
      },
      httpHeaders: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    };
    
    if (config.headers && Object.keys(config.headers).length > 0) {
      Object.assign(customNetworkConfig.httpHeaders, config.headers);
    }
    
    if (config.origin && config.origin.trim()) {
      customNetworkConfig.httpHeaders['Origin'] = config.origin;
    }
    
    if (config.referer && config.referer.trim()) {
      customNetworkConfig.httpHeaders['Referer'] = config.referer;
    }
    
    if (config.userAgent && config.userAgent.trim()) {
      customNetworkConfig.httpHeaders['User-Agent'] = config.userAgent;
    }
    
    customNetworkConfig.httpHeaders['Accept'] = '*/*';
    customNetworkConfig.httpHeaders['Accept-Language'] = 'en-US,en;q=0.9';
    customNetworkConfig.httpHeaders['Sec-Fetch-Mode'] = 'cors';
    customNetworkConfig.httpHeaders['Sec-Fetch-Site'] = 'cross-site';
    
    return customNetworkConfig;
  }, []);

  // ============ INIT PLAYER ============
  const initPlayer = useCallback(async () => {
    // Validasi dependencies
    if (!bitmovinReady) {
      return;
    }
    
    if (!containerRef || !containerRef.current) {
      return;
    }
    
    if (!config) {
      return;
    }

    if (initialized || initiatingRef.current) {
      return;
    }

    if (!mountedRef.current) return;

    initiatingRef.current = true;

    try {
      // FIX: Selaraskan kondisi token fetch dengan shouldProxy di applyCustomHeaders
      // agar stream dengan origin/referer juga mendapatkan token dan diarahkan ke proxy.
      let token = '';
      const needsProxy = config.proxy === true ||
                         !!(config.origin?.trim()) ||
                         !!(config.referer?.trim());
      if (needsProxy) {
        try {
          const tokenRes = await fetch(`/api/token?id=${encodeURIComponent(config.id)}`);
          if (tokenRes.ok) {
            const tokenData = await tokenRes.json();
            token = tokenData.token;
          }
        } catch (tokenErr) {
          console.error('Gagal mengambil token streaming untuk Bitmovin:', tokenErr);
        }
      }

      // Cleanup previous
      if (playerRef.current) {
        try {
          await playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
      }
      if (uiManagerRef.current) {
        try {
          uiManagerRef.current.release();
        } catch (e) {}
        uiManagerRef.current = null;
      }

      // Bersihkan DOM kontainer untuk mencegah duplikasi elemen video di latar belakang
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      if (mountedRef.current) {
        setError('');
        setSlowNetworkMessage('');
      }

      const bitmovin = window.bitmovin;
      const streamType = config.type || (config.url.includes('.mpd') ? 'dash' : 'hls');

      // Player configuration - Less aggressive buffering
      const playerConfig = {
        key: "8e4990ce-4e61-42fc-aa0b-a41550d11f5c",
        ui: false,
        playback: {
          autoplay: true,
          muted: true
        },
        adaptation: {
          switchInterval: 4000,
          useBufferLevelForQualitySwitch: true,
          preferManagedAdaptation: true,
          video: {
            minBitrate: 300000,
            maxBitrate: 35000000,
            startBitrate: 1000000,
            lowWatermark: 10,
            highWatermark: 30
          }
        },
        buffer: {
          forwardDuration: 60,
          backwardDuration: 30,
          stallTimeout: 20,
          stallThreshold: 5
        },
        network: applyCustomHeaders(config, token),
        tweaks: {
          STARTUP_THRESHOLD: 1.5,
          MAX_STARTUP_TIME: 15,
          BUFFER_MIN_BACKOFF: 2,
          BUFFER_MAX_BACKOFF: 8,
          LIVE_EDGE_OFFSET: 5,
          LOW_LATENCY_MODE: false
        }
      };

      // Create player
      const player = new bitmovin.player.Player(containerRef.current, playerConfig);
      playerRef.current = player;

      // Add event listeners
      player.on(bitmovin.player.PlayerEvent.Error, handlePlayerError);
      player.on(bitmovin.player.PlayerEvent.Buffering, handleBuffering);
      player.on(bitmovin.player.PlayerEvent.StallStarted, () => {
        handleBuffering({ buffering: true });
      });
      player.on(bitmovin.player.PlayerEvent.StallEnded, () => {
        handleBuffering({ buffering: false });
      });

      // Build source
      const source = {
        dash: streamType === 'dash' ? config.url : undefined,
        hls: streamType === 'hls' ? config.url : undefined,
        poster: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4Mb0O5o5z_YNLfcbNjILSw-kRR-uIXD31L9sMFhswqnSqj3Ho3XRWWbOLLe9ROvS5JSWHM1VKymuxBo-BwbzcpTQ03SjLuP6HuwIokQrCay1aZlT6h4wu84Q2qDlPxSdUp1MFCc5wdUN358jBx5tInVtteCRWEWrkCYn8HkgJt6Kk8e8hDKXDVPenpzGi/s1600/bgtv2.jpg'
      };
      
      if (config.clearKeys && Object.keys(config.clearKeys).length > 0) {
        const clearkeyArray = [];
        for (const [kid, key] of Object.entries(config.clearKeys)) {
          clearkeyArray.push({ kid, key });
        }
        source.drm = { clearkey: clearkeyArray };
      }

      // Load source
      player.load(source).then(async () => {
        if (mountedRef.current) {
          setInitialized(true);
          initiatingRef.current = false;
          
          // FIX: Eksplisit panggil play() setelah source berhasil dimuat.
          // Mengandalkan autoplay: true di config saja tidak cukup di beberapa browser
          // (terutama Chrome dengan autoplay policy) — ini memastikan poster menghilang
          // dan video mulai berjalan.
          try {
            await player.play();
          } catch (playErr) {
            // Autoplay mungkin diblokir browser — tidak fatal, user bisa klik play manual
            console.warn('Bitmovin autoplay diblokir, menunggu interaksi user:', playErr);
          }
          
          // Auto-select audio track ke-2 untuk mode play
          setTimeout(() => {
            selectSecondAudioTrack();
          }, 1500);
        }
      }).catch((err) => {
        if (mountedRef.current) {
          initiatingRef.current = false;
          // Cek apakah error karena network
          const isNetworkError = 
            err.message?.toLowerCase().includes('network') ||
            err.message?.toLowerCase().includes('timeout') ||
            err.code === 1000 ||
            err.code === 1001;

          if (isNetworkError) {
            setSlowNetworkMessage('Network is slow. Please check your connection.');
          } else {
            setError('Failed to load stream: ' + (err.message || 'Unknown error'));
          }
        }
      });

      // Setup UI immediately after player creation to prevent state sync issues
      if (mountedRef.current && window.bitmovin.playerui) {
        try {
          const uiManager = new bitmovin.playerui.UIManager(player, [
            { ui: buildUI() }
          ]);
          uiManagerRef.current = uiManager;
        } catch (uiErr) {
          console.error('UI initialization error:', uiErr);
        }
      }

    } catch (err) {
      if (mountedRef.current) {
        setError('Failed to initialize Bitmovin player: ' + (err.message || 'Unknown error'));
      }
    }
  }, [containerRef, config, bitmovinReady, mode, applyCustomHeaders, buildUI, selectSecondAudioTrack, initialized, handlePlayerError, handleBuffering]);

  // Effect untuk memanggil initPlayer ketika semua siap
  useEffect(() => {
    if (bitmovinReady && containerRef?.current && config && !initialized) {
      initPlayer();
    }
  }, [bitmovinReady, containerRef, config, initialized, initPlayer]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (bufferingTimerRef.current) clearTimeout(bufferingTimerRef.current);
      if (slowNetworkTimerRef.current) clearTimeout(slowNetworkTimerRef.current);
    };
  }, []);

  return {
    error,
    slowNetworkMessage,
    player: playerRef.current,
    retryCount: 0,
    // FIX: Export isLoading agar BitmovinPlayer.tsx tidak mendapat undefined
    isLoading: !initialized && !error,
  };
};
