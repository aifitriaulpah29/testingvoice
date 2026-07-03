// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ============ UTILITY FUNCTIONS ============
const getParameterByName = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

const fromBase64 = (str) => {
  try {
    return atob(str);
  } catch (e) {
    return '';
  }
};

const detectStreamType = (url) => {
  if (url.includes('.mpd') || url.includes('dash') || url.includes('mpd?')) {
    return 'dash';
  }
  if (url.includes('.m3u8') || url.includes('m3u8?')) {
    return 'hls';
  }
  return 'hls';
};

// ============ MOBILE & FULLSCREEN HANDLING ============
const playVideoInLandscape = () => {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(() => {});
  } else if (screen.lockOrientation) {
    screen.lockOrientation('landscape');
  } else if (screen.mozLockOrientation) {
    screen.mozLockOrientation('landscape');
  } else if (screen.msLockOrientation) {
    screen.msLockOrientation('landscape');
  }
};

const unlockScreenOrientation = () => {
  if (screen.orientation && screen.orientation.unlock) {
    screen.orientation.unlock();
  } else if (screen.unlockOrientation) {
    screen.unlockOrientation();
  } else if (screen.mozUnlockOrientation) {
    screen.mozUnlockOrientation();
  } else if (screen.msUnlockOrientation) {
    screen.msUnlockOrientation();
  }
};

const isMobileDevice = () => {
  return (typeof window.orientation !== "undefined") || 
         (navigator.userAgent.indexOf('IEMobile') !== -1);
};

// ============ PLAYER1 PAGE COMPONENT ============

function Player1PageContent() {
  const searchParams = useSearchParams();

  const playerContainerRef = useRef(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [retryKey, setRetryKey] = useState(0);
  const playerRef = useRef(null);
  const uiManagerRef = useRef(null);
  const playAttemptRef = useRef(false);

  // Handle fullscreen change
  useEffect(() => {
    document.title = 'PlayBit Player - StarballTV';
    const handleFullscreenChange = () => {
      if (document.fullscreenElement || document.webkitFullscreenElement || 
          document.mozFullScreenElement || document.msFullscreenElement) {
        if (isMobileDevice()) {
          playVideoInLandscape();
        }
      } else {
        if (isMobileDevice()) {
          unlockScreenOrientation();
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
      
      // Unlock orientation on unmount
      if (isMobileDevice()) {
        unlockScreenOrientation();
      }
    };
  }, []);

  // Override XMLHttpRequest untuk licensing
  useEffect(() => {
    const originalOpen = XMLHttpRequest.prototype.open;
    
    const override = (url) => {
      if (url && url.indexOf) {
        if (url.indexOf("licensing.bitmovin.com/licensing") > -1) 
          return "data:text/plain;charset=utf-8;base64,eyJzdGF0dXMiOiJncmFudGVkIiwibWVzc2FnZSI6IlRoZXJlIHlvdSBnby4ifQ==";
        if (url.indexOf("licensing.bitmovin.com/impression") > -1) 
          return "data:text/plain;charset=utf-8;base64,eyJzdGF0dXMiOiJncmFudGVkIiwibWVzc2FnZSI6IlRoZXJlIHlvdSBnby4ifQ==";
      }
      return url;
    };

    XMLHttpRequest.prototype.open = function() {
      const url = override(arguments[1]);
      arguments[1] = url;
      return originalOpen.apply(this, arguments);
    };

    return () => {
      XMLHttpRequest.prototype.open = originalOpen;
    };
  }, []);

  // Build UI function
  const buildUI = useCallback(() => {
    if (!window.bitmovin || !window.bitmovin.playerui) return null;

    const bitmovin = window.bitmovin;
    
    try {
      const mainSettingsPanelPage = new bitmovin.playerui.SettingsPanelPage({
        components: [
          new bitmovin.playerui.SettingsPanelItem(
            bitmovin.playerui.i18n.getLocalizer('settings.video.quality'), 
            new bitmovin.playerui.VideoQualitySelectBox()
          ),
          new bitmovin.playerui.SettingsPanelItem(
            bitmovin.playerui.i18n.getLocalizer('speed'), 
            new bitmovin.playerui.PlaybackSpeedSelectBox()
          ),
        ],
      });

      const settingsPanel = new bitmovin.playerui.SettingsPanel({
        components: [mainSettingsPanelPage],
        hidden: true,
      });

      const controlBar = new bitmovin.playerui.ControlBar({
        components: [
          settingsPanel,
          new bitmovin.playerui.Container({
            components: [
              new bitmovin.playerui.PlaybackTimeLabel({ 
                timeLabelMode: bitmovin.playerui.PlaybackTimeLabelMode.CurrentTime, 
                hideInLivePlayback: true 
              }),
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
          new bitmovin.playerui.TitleBar(),
          new bitmovin.playerui.ErrorMessageOverlay(),
        ],
        hideDelay: 2000,
        hidePlayerStateExceptions: [
          bitmovin.playerui.PlayerUtils.PlayerState.Prepared,
          bitmovin.playerui.PlayerUtils.PlayerState.Paused,
          bitmovin.playerui.PlayerUtils.PlayerState.Finished,
        ],
      });
    } catch (err) {
      console.error('Error building UI:', err);
      return null;
    }
  }, []);

  // Initialize player
  useEffect(() => {
    let mounted = true;
    let retryCount = 0;
    const MAX_RETRIES = 3;

    const initPlayer = async () => {
      // Get and decode stream URL
      const streamUrl = searchParams.get('id') || '';
      const originalStreamUrl = fromBase64(streamUrl);

      if (!originalStreamUrl) {
        if (mounted) {
          setError('Invalid or missing stream URL');
          setIsLoading(false);
        }
        return;
      }

      // Check if Bitmovin is loaded
      if (typeof window.bitmovin === 'undefined' || typeof window.bitmovin.player === 'undefined') {
        if (mounted) {
          setError('Bitmovin Player failed to load');
          setIsLoading(false);
        }
        return;
      }

      // Fetch proxy token asynchronously
      let token = '';
      try {
        const tokenRes = await fetch(`/api/token?url=${encodeURIComponent(originalStreamUrl)}`);
        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          token = tokenData.token;
        }
      } catch (tokenErr) {
        console.error('Gagal mengambil token streaming:', tokenErr);
      }

      // Local headers/proxy config for Bitmovin Player
      const applyCustomHeadersLocal = (targetCdnUrl, tokenStr) => {
        return {
          preprocessHttpRequest: function(type, request) {
            const shouldProxy = !!tokenStr;

            if (shouldProxy) {
              let targetUrl = request.url;
              const localApiPrefix = `${window.location.origin}/api/`;
              if (targetUrl.startsWith(localApiPrefix)) {
                const relativePath = targetUrl.substring(localApiPrefix.length);
                const baseCdnUrl = targetCdnUrl.substring(0, targetCdnUrl.lastIndexOf('/') + 1);
                targetUrl = baseCdnUrl + relativePath;
              }

              const bitmovin = window.bitmovin;
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
                    if (tokenStr) proxyUrl += `&token=${tokenStr}`;
                    request.url = proxyUrl;
                  }
                }
              } else {
                if (!targetUrl.includes('/api/manifest')) {
                  let proxyUrl = `${window.location.origin}/api/manifest?file=${encodeURIComponent(targetUrl)}`;
                  if (tokenStr) proxyUrl += `&token=${tokenStr}`;
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
            'Pragma': 'no-cache',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'cross-site'
          }
        };
      };

      try {
        // Detect stream type
        const streamType = detectStreamType(originalStreamUrl);

        // Build source object
        const source = {
          poster: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4Mb0O5o5z_YNLfcbNjILSw-kRR-uIXD31L9sMFhswqnSqj3Ho3XRWWbOLLe9ROvS5JSWHM1VKymuxBo-BwbzcpTQ03SjLuP6HuwIokQrCay1aZlT6h4wu84Q2qDlPxSdUp1MFCc5wdUN358jBx5tInVtteCRWEWrkCYn8HkgJt6Kk8e8hDKXDVPenpzGi/s1600/bgtv2.jpg',
        };

        if (streamType === 'dash') {
          source.dash = originalStreamUrl;
        } else {
          source.hls = originalStreamUrl;
        }

        // Build optimized config
        const config = new window.bitmovin.player.util.PlayerConfigBuilder("8e4990ce-4e61-42fc-aa0b-a41550d11f5c")
          .optimizeForPlatform()
          .enableLowLatency()
          .build();

        // Assign local proxy network interceptor
        config.network = applyCustomHeadersLocal(originalStreamUrl, token);

        // Playback configuration untuk autoplay
        config.playback = {
          autoplay: true,
          muted: true,
          playsinline: true
        };

        // Add streaming config
        config.streaming = {
          dash: {
            fastSwitching: true,
            segmentPreload: true,
            preloadAudioRenditions: true,
            robustMpdParsing: true,
            useForcedSubtitles: false,
            retryIntervals: [0.5, 1, 1.5],
            lowLatencyMode: 'auto'
          },
          hls: {
            fastSwitching: true,
            segmentPreload: true,
            preloadAudioRenditions: true,
            robustParsing: true,
            useForcedSubtitles: false,
            retryIntervals: [0.5, 1, 1.5],
            lowLatencyMode: 'auto'
          }
        };

        // Buffer config
        config.buffer = {
          forward: 30,
          backward: 10,
          playbackStartThreshold: 0.5
        };

        // Adaptation config
        config.adaptation = {
          switchInterval: 2000,
          useBufferLevelForQualitySwitch: true,
          preferManagedAdaptation: true
        };

        config.ui = false;

        // Create player instance
        const player = new window.bitmovin.player.Player(playerContainerRef.current, config);
        playerRef.current = player;

        // Create and initialize UI
        const uiContainer = buildUI();
        if (uiContainer) {
          const uiManager = new window.bitmovin.playerui.UIManager(player, [
            { ui: uiContainer }
          ]);
          uiManagerRef.current = uiManager;
        }

        // Load source
        await player.load(source);
        
        if (mounted) {
          setIsLoading(false);
          
          // AUTO PLAY - dengan multiple attempts
          const attemptPlay = () => {
            if (!mounted || playAttemptRef.current) return;
            
            playAttemptRef.current = true;
            player.play()
              .then(() => {
                console.log('Autoplay successful');
              })
              .catch((playError) => {
                console.log('Autoplay prevented by browser policy:', playError);
                playAttemptRef.current = false;
                
                // Retry autoplay after user interaction
                const handleUserInteraction = () => {
                  if (!mounted || !playerRef.current) return;
                  
                  playerRef.current.play()
                    .then(() => {
                      console.log('Autoplay successful after user interaction');
                    })
                    .catch(() => {});
                  
                  document.removeEventListener('click', handleUserInteraction);
                  document.removeEventListener('touchstart', handleUserInteraction);
                  document.removeEventListener('keydown', handleUserInteraction);
                };
                
                document.addEventListener('click', handleUserInteraction, { once: true });
                document.addEventListener('touchstart', handleUserInteraction, { once: true });
                document.addEventListener('keydown', handleUserInteraction, { once: true });
              });
          };
          
          // Attempt play immediately
          attemptPlay();
          
          // Also try again after a short delay (for some browsers)
          setTimeout(() => {
            if (mounted && !playAttemptRef.current && playerRef.current) {
              attemptPlay();
            }
          }, 500);
        }

      } catch (err) {
        console.error('Player initialization error:', err);
        
        if (mounted) {
          // Try fallback with retry mechanism
          if (retryCount < MAX_RETRIES && originalStreamUrl) {
            retryCount++;
            console.log(`Retry attempt ${retryCount}/${MAX_RETRIES}`);
            setTimeout(initPlayer, 1000 * retryCount); // Exponential backoff
          } else {
            setError('Failed to load stream. Please try again.');
            setIsLoading(false);
          }
        }
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initPlayer, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
        playerRef.current = null;
      }
      if (uiManagerRef.current) {
        uiManagerRef.current.release();
        uiManagerRef.current = null;
      }
    };
  }, [buildUI, retryKey]);

  // Add custom styles
  useEffect(() => {
    // Add style element for Bitmovin customizations
    const styleId = 'bitmovin-playbit-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .bmpui-ui-watermark { display: none; }
        .bmpui-ui-volumeslider .bmpui-seekbar .bmpui-seekbar-playbackposition-marker,
        .bmpui-ui-seekbar .bmpui-seekbar .bmpui-seekbar-playbackposition-marker {
          background-color: #1487fa;
        }
        .bmpui-ui-seekbar .bmpui-seekbar .bmpui-seekbar-playbackposition,
        .bmpui-ui-volumeslider .bmpui-seekbar .bmpui-seekbar-playbackposition {
          background-color: #1487fa;
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
      {/* Player Container */}
      <div 
        ref={playerContainerRef}
        id="player" 
        className="w-full h-full"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-white text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Loading player...</p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50">
          <div className="bg-red-600/20 border border-red-500 text-white p-6 rounded-lg text-center max-w-md">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => {
                setError('');
                setIsLoading(true);
                setRetryKey(prev => prev + 1);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Player1Page() {
  return (
    <Suspense fallback={
      <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading player...</p>
        </div>
      </div>
    }>
      <Player1PageContent />
    </Suspense>
  );
}
