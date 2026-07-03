// @ts-nocheck
import { useState, useEffect, useRef, useCallback } from 'react';
import { findVideoConfig, createRequestFilter, detectStreamType } from '../utils/streamConfigs';

// ============ USE SCRIPT HOOK (internal) ============
const useScript = (src) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    
    if (existingScript) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.crossOrigin = 'anonymous';
    script.async = true;

    script.onload = () => {
      setLoaded(true);
    };

    script.onerror = () => {
      setError(true);
    };

    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [src]);

  return { loaded, error };
};

// ============ USE VIDEO CONFIG ============
export const useVideoConfig = () => {
  const [videoId, setVideoId] = useState('');
  const [config, setConfig] = useState(null);
  const [isValidId, setIsValidId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || '';
    setVideoId(id);

    if (id) {
      const foundConfig = findVideoConfig(id);
      setConfig(foundConfig);
      setIsValidId(!!foundConfig);
    } else {
      setIsValidId(false);
    }
    
    setIsLoading(false);
  }, []);

  return { videoId, config, isValidId, isLoading };
};

// ============ USE SHAKA PLAYER ============
export const useShakaPlayer = (videoRef, config, mode = 'default') => {
  const [error, setError] = useState('');
  const [isBuffering, setIsBuffering] = useState(false);
  
  const playerRef = useRef(null);
  const uiRef = useRef(null);
  const mountedRef = useRef(true);
  const bufferingTimerRef = useRef(null);
  const errorSuppressedRef = useRef(false); // Untuk menekan error yang sudah teratasi

  // Load Shaka scripts
  const { loaded: shakaLoaded, error: shakaError } = useScript('https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.16.3/shaka-player.compiled.js');
  const { loaded: uiLoaded, error: uiError } = useScript('https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.16.3/shaka-player.ui.min.js');

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (bufferingTimerRef.current) {
        clearTimeout(bufferingTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (shakaError || uiError) {
      setError('Gagal memuat Shaka Player dari CDN');
    }
  }, [shakaError, uiError]);

  const setupShakaUI = (player, videoContainer, video) => {
    if (!window.shaka || !window.shaka.ui) return null;

    try {
      if (uiRef.current) uiRef.current.destroy();

      const uiConfig = {
        controlPanelElements: ['time_and_duration', 'play_pause', 'mute', 'volume', 'language', 'fullscreen', 'overflow_menu'],
        overflowMenuButtons: ['quality', 'playback_rate', 'captions', 'cast'],
        seekBarColors: {
          base: '#20B2AA',
          buffered: 'rgba(255,255,255,0.3)',
          played: 'red',
        },
        addSeekBar: true,
        enableKeyboardPlaybackControls: true,
        doubleClickForFullscreen: true,
        singleClickForPlayAndPause: true
      };

      const ui = new window.shaka.ui.Overlay(player, videoContainer, video);
      ui.configure(uiConfig);
      return ui;
    } catch (error) {
      return null;
    }
  };

  const initPlayer = useCallback(async () => {
    if (!shakaLoaded || !uiLoaded || !videoRef.current || !config || !mountedRef.current) return;

    try {
      // Cleanup previous
      if (playerRef.current) {
        await playerRef.current.destroy().catch(() => {});
        playerRef.current = null;
      }
      if (uiRef.current) {
        await uiRef.current.destroy().catch(() => {});
        uiRef.current = null;
      }

      if (mountedRef.current) {
        setError('');
        setIsBuffering(false);
        errorSuppressedRef.current = false;
      }

      const shaka = window.shaka;
      shaka.polyfill.installAll();

      if (!shaka.Player.isBrowserSupported()) {
        setError('Browser tidak mendukung Shaka Player');
        return;
      }

      const player = new shaka.Player();
      await player.attach(videoRef.current);

      // Request filter
      const shouldProxy = config.proxy || 
                          config.origin || 
                          config.referer || 
                          (config.headers && Object.keys(config.headers).length > 0);
      // FIX Bug #3: Hoist token ke scope luar agar dapat digunakan di player.load()
      let token = '';
      if (shouldProxy) {
        try {
          const tokenRes = await fetch(`/api/token?id=${encodeURIComponent(config.id)}`);
          if (tokenRes.ok) {
            const tokenData = await tokenRes.json();
            token = tokenData.token;
          }
        } catch (tokenErr) {
          console.error('Gagal mengambil token streaming:', tokenErr);
        }

        player.getNetworkingEngine().registerRequestFilter(
          createRequestFilter(config, token)
        );
      }

      const streamType = config.type || detectStreamType(config.url);

      // ============ KONFIGURASI TETAP SEPERTI ASLINYA ============
      const playerConfig = {
        drm: { clearKeys: config.clearKeys || {} },
        streaming: {
          bufferingGoal: 45,
          rebufferingGoal: 5,
          lowLatencyMode: true,
          stallThreshold: 0.5,
          useNativeHlsForFairPlay: true,
          liveSync: true,
          liveSyncPlaybackRate: 1.02,
          retryParameters: {
            maxAttempts: 3,
            baseDelay: 1000,
            backoffFactor: 1.5,
            fuzzFactor: 0.5,
            timeout: 10000
          },
          segmentPrefetchLimit: 2,
          alwaysStreamText: false
        },
        abr: {
          enabled: true,
          defaultBandwidthEstimate: 3000000,
          restrictions: {
            minBandwidth: 300000,
            maxBandwidth: 35000000,
            minWidth: 320,
            maxWidth: 3840,
            minHeight: 180,
            maxHeight: 2160
          },
          switchInterval: 4,
          bandwidthUpgradeTarget: 0.85,
          bandwidthDowngradeTarget: 0.7,
          useNetworkInformation: true
        },
        manifest: {
          retryParameters: {
            baseDelay: 1000,
            backoffFactor: 1.5,
            fuzzFactor: 0.5,
            timeout: 10000,
            maxAttempts: 3
          }
        }
      };

      // Stream-specific config
      if (streamType === 'dash') {
        playerConfig.manifest.dash = {
          ignoreMinBufferTime: false,
          autoCorrectDrift: true,
          ignoreSuggestedPresentationDelay: false,
          clockSyncUri: 'https://time.akamai.com/?iso&ms',
          initialSegmentLimit: 2
        };
      } else if (streamType === 'hls') {
        playerConfig.manifest.hls = {
          ignoreTextStreamFailures: true,
          enableCharacteristics: true,
          ignoreManifestProgramDateTime: false
        };
      }

      player.configure(playerConfig);

      // ============ ERROR HANDLING YANG LEBIH BAIK ============
      player.addEventListener('error', (event) => {
        if (!mountedRef.current) return;
        
        const error = event.detail;
        
        // Cek apakah video masih playing atau sudah recovery
        if (videoRef.current && !videoRef.current.paused) {
          // Video sedang berjalan, error ini mungkin sementara atau sudah teratasi
          console.log('Non-fatal error ignored:', error);
          errorSuppressedRef.current = true;
          return; // Jangan tampilkan error
        }

        // Cek apakah ini error network yang recoverable
        if (error && error.code) {
          // Shaka error codes: https://shaka-player-demo.appspot.com/docs/api/shaka.util.Error.html
          const isNetworkError = error.code >= 1000 && error.code < 2000;
          const isManifestError = error.code >= 2000 && error.code < 3000;
          
          if (isNetworkError || isManifestError) {
            console.log('Recoverable error, attempting to continue...');
            
            // Set buffering state tapi jangan error
            setIsBuffering(true);
            
            // Clear previous timer
            if (bufferingTimerRef.current) {
              clearTimeout(bufferingTimerRef.current);
            }
            
            // Set timer untuk buffering lama
            bufferingTimerRef.current = setTimeout(() => {
              if (mountedRef.current && videoRef.current?.paused) {
                // Masih buffering setelah 15 detik, coba reload
                console.log('Long buffering detected, trying to recover...');
                try {
                  player.retryStreaming();
                } catch (e) {}
              }
            }, 15000);
            
            return; // Jangan set error
          }
        }

        // Error fatal yang benar-benar tidak bisa direcover
        // Tapi cek dulu apakah video masih jalan
        if (videoRef.current && !videoRef.current.paused) {
          console.log('Video still playing, ignoring fatal error');
          return;
        }

        setError('Failed to load stream. Please try again.');
      });

      player.addEventListener('buffering', (event) => {
        if (!mountedRef.current) return;
        
        if (event.buffering) {
          setIsBuffering(true);
          
          // Clear previous timer
          if (bufferingTimerRef.current) {
            clearTimeout(bufferingTimerRef.current);
          }
          
          // Set timer untuk buffering lama
          bufferingTimerRef.current = setTimeout(() => {
            if (mountedRef.current && videoRef.current?.paused) {
              // Masih buffering setelah 10 detik, tapi jangan error dulu
              console.log('Still buffering...');
              // Coba turunkan kualitas secara manual
              try {
                const abrManager = player.getAbrManager();
                if (abrManager) {
                  abrManager.setDefaultEstimate(1000000);
                }
              } catch (e) {}
            }
          }, 10000);
          
        } else {
          setIsBuffering(false);
          errorSuppressedRef.current = false; // Reset suppression
          if (bufferingTimerRef.current) {
            clearTimeout(bufferingTimerRef.current);
            bufferingTimerRef.current = null;
          }
        }
      });

      player.addEventListener('loaded', async () => {
        if (!mountedRef.current) return;
        setError(''); // Clear error jika ada
        setIsBuffering(false);
        errorSuppressedRef.current = false;
        
        const videoContainer = videoRef.current.parentElement;
        if (videoContainer) {
          videoContainer.classList.add('shaka-video-container');
          setTimeout(() => {
            if (mountedRef.current) {
              const ui = setupShakaUI(player, videoContainer, videoRef.current);
              uiRef.current = ui;
            }
          }, 500);
        }
        
        if (streamType === 'dash' && player.isLive()) {
          setTimeout(() => {
            try { player.seekToLiveEdge(); } catch (e) {}
          }, 2000);
        }

        // ============ FITUR KHUSUS UNTUK MODE PLAY ============
        if (mode === 'play') {
          try {
            const audioTracks = player.getAudioLanguages();
            
            if (audioTracks && audioTracks.length >= 2) {
              player.selectAudioLanguage(audioTracks[1]);
            }
          } catch (audioError) {
            // Audio track selection not available yet
          }
        }

        setTimeout(async () => {
          try { await videoRef.current?.play(); } catch (e) {}
        }, 100);
      });

      player.addEventListener('unloading', () => {
        if (!mountedRef.current) return;
        console.log('Player unloading...');
      });

      // FIX Bug #3: Jika proxy aktif dan token tersedia, load manifest melalui proxy
      // agar request pertama pun sudah melewati proxy (bukan CDN langsung).
      // Request filter tetap aktif untuk segmen-segmen berikutnya.
      const manifestUrl = (shouldProxy && token)
        ? `/api/manifest?file=${encodeURIComponent(config.url)}&token=${token}&id=${config.id || ''}`
        : config.url;

      await player.load(manifestUrl);

      setTimeout(async () => {
        if (videoRef.current?.paused && mountedRef.current) {
          try { await videoRef.current.play(); } catch (e) {}
        }
      }, 500);

      playerRef.current = player;

    } catch (err) {
      if (mountedRef.current) {
        console.error('Player initialization error:', err);
        
        // Cek apakah ini error network
        if (err.message && (
          err.message.includes('network') || 
          err.message.includes('timeout') ||
          err.message.includes('fetch') ||
          err.message.includes('xhr')
        )) {
          console.log('Network error during init, retrying...');
          // Auto retry setelah 3 detik
          setTimeout(() => {
            if (mountedRef.current && !playerRef.current) {
              initPlayer();
            }
          }, 3000);
        } else {
          setError('Failed to initialize player. Please try again.');
        }
      }
    }
  }, [videoRef, config, shakaLoaded, uiLoaded, mode]);

  useEffect(() => {
    if (shakaLoaded && uiLoaded && config) {
      initPlayer();
    }
  }, [shakaLoaded, uiLoaded, config, initPlayer]);

  useEffect(() => {
    return () => {
      if (bufferingTimerRef.current) {
        clearTimeout(bufferingTimerRef.current);
      }
      if (uiRef.current) {
        uiRef.current.destroy().catch(() => {});
      }
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
      }
    };
  }, []);

  return {
    error,
    player: playerRef.current,
    isBuffering
  };
};