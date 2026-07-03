// @ts-nocheck
"use client";
// @ts-nocheck
import React, { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ============ UTILITY FUNCTIONS ============
const getParameterByName = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

// ============ MOBILE & FULLSCREEN HANDLING ============
const playVideoInLandscape = async () => {
  try {
    if (screen.orientation && screen.orientation.lock) {
      await screen.orientation.lock('landscape');
      return true;
    } else if (screen.lockOrientation) {
      return screen.lockOrientation('landscape');
    } else if (screen.mozLockOrientation) {
      return screen.mozLockOrientation('landscape');
    } else if (screen.msLockOrientation) {
      return screen.msLockOrientation('landscape');
    }
  } catch (e) {
    console.warn('Orientation lock failed:', e);
  }
  return false;
};

const restoreOrientation = async () => {
  try {
    if (screen.orientation && screen.orientation.lock) {
      // Force portrait-primary to ensure the UI snaps back from landscape
      await screen.orientation.lock('portrait-primary');
      // Then unlock so the user can rotate freely again
      screen.orientation.unlock();
    } else if (screen.unlockOrientation) {
      screen.unlockOrientation();
    } else if (screen.mozUnlockOrientation) {
      screen.mozUnlockOrientation();
    } else if (screen.msUnlockOrientation) {
      screen.msUnlockOrientation();
    }
  } catch (e) {
    console.warn('Restore orientation failed:', e);
    if (screen.orientation && screen.orientation.unlock) {
      screen.orientation.unlock();
    }
  }
};

const isMobileDevice = () => {
  return (typeof window.orientation !== "undefined") || 
         (navigator.userAgent.indexOf('IEMobile') !== -1) ||
         (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
};

// ============ CLAPPR PAGE COMPONENT ============

function ClapprPageContent() {
  const searchParams = useSearchParams();

  const playerContainerRef = useRef(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showUnmute, setShowUnmute] = useState(true);
  const [retryKey, setRetryKey] = useState(0);
  const playerRef = useRef(null);
  const loadingTimerRef = useRef(null);
  const playerReadyRef = useRef(false);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = async () => {
      const isFullscreen = document.fullscreenElement || 
                          document.webkitFullscreenElement || 
                          document.mozFullScreenElement || 
                          document.msFullscreenElement;

      const playerElement = document.getElementById('clappr-player');

      if (isFullscreen) {
        if (isMobileDevice()) {
          const nativeLockWorked = await playVideoInLandscape();
          
          // Apply landscape class only as fallback or for forced layout
          if (!nativeLockWorked && playerElement) {
            playerElement.classList.add('fullscreen-landscape');
          }
        }
      } else {
        if (isMobileDevice()) {
          await restoreOrientation();
          
          // Always remove landscape class
          if (playerElement) {
            playerElement.classList.remove('fullscreen-landscape');
          }
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      
      if (isMobileDevice()) {
        restoreOrientation();
      }
    };
  }, []);

  // Initialize player
  useEffect(() => {
    let mounted = true;

    const initPlayer = async () => {
      // Get stream URL from query parameter
      const encodedUrl = getParameterByName('id');
      
      if (!encodedUrl) {
        if (mounted) {
          setError('Missing stream URL parameter');
          setIsLoading(false);
        }
        return;
      }

      let streamUrl;
      try {
        streamUrl = atob(encodedUrl);
      } catch (e) {
        if (mounted) {
          setError('Invalid base64 encoding');
          setIsLoading(false);
        }
        return;
      }

      // Check if Clappr is loaded
      if (typeof window.Clappr === 'undefined') {
        if (mounted) {
          setError('Clappr Player failed to load');
          setIsLoading(false);
        }
        return;
      }

      if (!playerContainerRef.current) {
        if (mounted) {
          setError('Player container not found');
          setIsLoading(false);
        }
        return;
      }

      try {
        // Clear any existing player
        if (playerRef.current) {
          playerRef.current.destroy();
          playerRef.current = null;
        }

        // Initialize Clappr player
        const player = new window.Clappr.Player({
          source: streamUrl,
          parentId: '#clappr-player',
          autoPlay: true,
          height: '100%',
          width: '100%',
          mute: true,
          actualLiveTime: true,
          plugins: [window.LevelSelector],
          levelSelectorConfig: {
            title: 'Quality',
            labels: {},
            selectedLevelId: null,
          },
          mediacontrol: {
            seekbar: 'red',
            buttons: 'red'
          },
          playback: {
            hlsjsConfig: {
              maxBufferSize: 0,
              maxBufferLength: 7,
              liveSyncDurationCount: 7,
            },
            playInline: true,
            recycleVideo: true,
          }
        });

        playerRef.current = player;

        // Set timeout to force hide loading after 5 seconds (fallback)
        loadingTimerRef.current = setTimeout(() => {
          if (mounted && !playerReadyRef.current) {
            console.log('Force hide loading overlay');
            setIsLoading(false);
          }
        }, 5000);

        // Event: PLAYER_READY
        player.on(window.Clappr.Events.PLAYER_READY, () => {
          console.log('PLAYER_READY event fired');
          if (!mounted) return;
          playerReadyRef.current = true;
          setIsLoading(false);
        });

        // Event: PLAYER_PLAY (alternatif jika PLAYER_READY tidak terpanggil)
        player.on(window.Clappr.Events.PLAYER_PLAY, () => {
          console.log('PLAYER_PLAY event fired');
          if (!mounted) return;
          if (!playerReadyRef.current) {
            playerReadyRef.current = true;
            setIsLoading(false);
          }
        });

        // Event: PLAYER_BUFFERING (saat buffering selesai, berarti sudah playing)
        player.on(window.Clappr.Events.PLAYER_BUFFERING, (state) => {
          console.log('PLAYER_BUFFERING event:', state);
          if (!mounted) return;
          if (state === false && !playerReadyRef.current) {
            // Buffering selesai, berarti player sudah playing
            playerReadyRef.current = true;
            setIsLoading(false);
          }
        });

        // Event: PLAYER_STOP (untuk debug)
        player.on(window.Clappr.Events.PLAYER_STOP, () => {
          console.log('PLAYER_STOP event fired');
        });

        player.on(window.Clappr.Events.PLAYER_VOLUMECHANGE, (volume) => {
  console.log('Volume change event:', volume);
  if (!mounted) return;
  // volume 0 = mute, volume > 0 = unmute
  setShowUnmute(volume === 0);
});

player.on(window.Clappr.Events.PLAYER_MUTE, () => {
  console.log('Mute event');
  if (!mounted) return;
  setShowUnmute(true);
});

player.on(window.Clappr.Events.PLAYER_UNMUTE, () => {
  console.log('Unmute event');
  if (!mounted) return;
  setShowUnmute(false);
});

// Juga cek volume awal setelah player siap
setTimeout(() => {
  if (mounted && playerRef.current) {
    try {
      const currentVolume = playerRef.current.getVolume();
      console.log('Initial volume:', currentVolume);
      setShowUnmute(currentVolume === 0);
    } catch (e) {
      console.log('Error getting volume:', e);
    }
  }
}, 1000);

        player.on('levelSelector:availableLevels', (levels) => {
          if (!mounted || !playerRef.current) return;
          
          let labels = {};
          levels.forEach((level, index) => {
            let label = 'Quality ' + (index + 1);
            if (level.height > 1080) {
              label = 'Ultra HD';
            } else if (level.height === 1080) {
              label = 'Full HD';
            } else if (level.height === 720) {
              label = 'HD';
            } else if (level.height === 480) {
              label = 'SD';
            }
            labels[index] = label;
          });

          if (playerRef.current.config) {
            playerRef.current.config.levelSelectorConfig.labels = labels;
          }
        });

        // Cek langsung apakah player sudah playing setelah 2 detik
        setTimeout(() => {
          if (mounted && playerRef.current) {
            try {
              const isPlaying = !playerRef.current.isPlaying();
              console.log('Check playing status:', isPlaying);
              if (isPlaying && !playerReadyRef.current) {
                playerReadyRef.current = true;
                setIsLoading(false);
              }
            } catch (e) {
              console.log('Error checking playing status:', e);
            }
          }
        }, 2000);

      } catch (err) {
        console.error('Player initialization error:', err);
        if (mounted) {
          setError('Failed to initialize player: ' + (err.message || 'Unknown error'));
          setIsLoading(false);
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initPlayer, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [retryKey]);

// Handle unmute dengan force hide
const handleUnmute = useCallback(() => {
  if (playerRef.current) {
    playerRef.current.setVolume(100);
    // Force hide unmute button immediately
    setShowUnmute(false);
    
    // Also try to trigger any existing unmute event
    try {
      // Beberapa player mungkin perlu trigger event manual
      if (playerRef.current.core && playerRef.current.core.mediaControl) {
        // Force update media control
        playerRef.current.core.mediaControl.container.setVolume(100);
      }
    } catch (e) {
      console.log('Error forcing unmute:', e);
    }
  }
}, []);

  // Add custom styles
  useEffect(() => {
    const styleId = 'clappr-custom-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        body {
          margin: 0;
          padding: 0;
          background-color: #000;
          overflow: hidden;
          width: 100vw;
          height: 100vh;
        }
        
        #clappr-player {
          width: 100% !important;
          height: 100% !important;
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
        }

        /* Ensure Clappr container fills parent */
        .clappr-style {
          width: 100% !important;
          height: 100% !important;
        }
        
        .media-control .bar-scrubber {
          display: none;
        }
        
        /* Mobile level selector styles - Improved */
        .level_selector_menu {
          background-color: rgba(20, 20, 20, 0.9) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 8px !important;
          backdrop-filter: blur(10px) !important;
        }

        .level_selector_menu ul {
          padding: 5px 0 !important;
        }

        .level_selector_menu li {
          padding: 10px 20px !important;
          font-size: 14px !important;
          color: white !important;
          transition: all 0.2s !important;
        }

        .level_selector_menu li:hover {
          background-color: rgba(255, 0, 0, 0.2) !important;
        }

        .level_selector_menu li.active {
          color: #ff0000 !important;
          font-weight: bold !important;
        }

        @media (max-width: 768px) {
          .level_selector_menu {
            bottom: 50px !important;
            right: 10px !important;
            left: auto !important;
            width: 140px !important;
          }
          
          .level_selector_menu li {
            padding: 12px 15px !important;
            font-size: 13px !important;
          }
        }
        
        /* Fullscreen landscape for mobile - Refined */
        @media (max-width: 768px) {
          .fullscreen-landscape {
            transform: rotate(90deg);
            transform-origin: center center;
            width: 100vh !important;
            height: 100vw !important;
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            margin-top: -50vw !important;
            margin-left: -50vh !important;
            z-index: 9999 !important;
          }

          /* Ensure video fills the rotated container */
          .fullscreen-landscape video {
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
          }
        }

        /* Animasi untuk loading pulse */
        @keyframes loadingPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .loading-pulse {
          animation: loadingPulse 1.5s ease-in-out infinite;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  return (
  <div className="w-full h-full bg-black relative overflow-hidden">
    {/* Player Container - z-index lebih rendah */}
    <div 
      ref={playerContainerRef}
      id="clappr-player"
      style={{ zIndex: 1 }}
    />

    {/* Unmute Button - z-index lebih tinggi dari player tapi lebih rendah dari overlay */}
    {showUnmute && !isLoading && !error && (
      <div 
        id="UnMutePlayer" 
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
        style={{ 
          opacity: showUnmute ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      >
        <div className="pointer-events-auto transform transition-all duration-500 ease-out"
          style={{
            transform: showUnmute ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(20px)'
          }}
        >
        <button 
          onClick={handleUnmute}
          className="w-20 h-20 md:w-24 md:h-24 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl cursor-pointer border-none flex justify-center items-center flex-col text-center transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 group"
        >
          <div className="relative mb-1">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/2/21/Speaker_Icon.svg" 
              alt="Unmute"
              className="w-8 h-8 md:w-10 md:h-10 group-hover:animate-pulse"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
          <span className="text-xs md:text-sm text-black font-bold uppercase tracking-wider">Unmute</span>
        </button>
      </div>
    </div>
    )}

    {/* Loading Overlay - z-index 50 tapi dengan pointer-events none agar tidak menghalangi klik */}
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 pointer-events-none">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 loading-pulse">Loading Clappr Player...</p>
        </div>
      </div>
    )}

    {/* Error Overlay - z-index 50 dan pointer-events auto */}
    {error && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50">
        <div className="bg-red-600/20 border border-red-500 text-white p-6 rounded-lg text-center max-w-md">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mb-4">{error}</p>
          <div className="space-y-2">
            <button
              onClick={() => {
                setError('');
                setIsLoading(true);
                setRetryKey(prev => prev + 1);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors w-full"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};


export default function ClapprPage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center animate-pulse">
          <p className="text-white font-semibold tracking-wider">LOADING CLAPPR ENGINE...</p>
        </div>
      </div>
    }>
      <ClapprPageContent />
    </Suspense>
  );
}

