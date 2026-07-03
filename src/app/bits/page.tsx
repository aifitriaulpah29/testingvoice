// @ts-nocheck
"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { findVideoConfig } from '@/utils/streamConfigs';

// ============ UTILITY FUNCTIONS ============
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
  return 'hls';
};

function BitsPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const mode = 'watch'; // Mode watch untuk halaman /bits
  
  const playerContainerRef = useRef(null);
  const playerRef = useRef(null);
  const uiManagerRef = useRef(null);
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [bitmovinReady, setBitmovinReady] = useState(false);

  // Poll untuk memastikan library Bitmovin dari CDN sudah siap di window
  useEffect(() => {
    const checkReady = () => {
      const isReady = window.bitmovin && 
                      window.bitmovin.player && 
                      window.bitmovin.player.Player && 
                      window.bitmovin.playerui;
      if (isReady) {
        setBitmovinReady(true);
      }
    };
    checkReady();
    const interval = setInterval(checkReady, 100);
    return () => clearInterval(interval);
  }, []);

  // Override licensing requests (Bypass lisensi Bitmovin)
  const overrideLicensing = useCallback(() => {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
      const url = arguments[1];
      if (url && typeof url === 'string') {
        if (url.indexOf("licensing.bitmovin.com/licensing") > -1 || 
            url.indexOf("licensing.bitmovin.com/impression") > -1) {
          arguments[1] = "data:text/plain;charset=utf-8;base64,eyJzdGF0dXMiOiJncmFudGVkIiwibWVzc2FnZSI6IlRoZXJlIHlvdSBnby4ifQ==";
        }
      }
      return originalOpen.apply(this, arguments);
    };
    return () => {
      XMLHttpRequest.prototype.open = originalOpen;
    };
  }, []);

  // Build UI Container Kustom dari v3
  const buildUI = useCallback(() => {
    if (!window.bitmovin || !window.bitmovin.playerui) return null;
    const bitmovin = window.bitmovin;

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
  }, []);

  // Inisialisasi Player
  useEffect(() => {
    if (!bitmovinReady || !id || !playerContainerRef.current) return;

    let mounted = true;
    let restoreOverride = null;

    const init = async () => {
      try {
        // Resolve stream config
        let streamUrl = '';
        let clearKeys = null;
        let configObj = findVideoConfig(id);

        if (configObj) {
          streamUrl = configObj.url;
          clearKeys = configObj.clearKeys;
        } else {
          streamUrl = fromBase64(id);
        }

        if (!streamUrl) {
          if (mounted) {
            setError('Invalid stream URL or ID');
            setIsLoading(false);
          }
          return;
        }

        // Jalankan bypass lisensi
        restoreOverride = overrideLicensing();

        const streamType = detectStreamType(streamUrl);

        // Buat objek source
        const source = {
          poster: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4Mb0O5o5z_YNLfcbNjILSw-kRR-uIXD31L9sMFhswqnSqj3Ho3XRWWbOLLe9ROvS5JSWHM1VKymuxBo-BwbzcpTQ03SjLuP6HuwIokQrCay1aZlT6h4wu84Q2qDlPxSdUp1MFCc5wdUN358jBx5tInVtteCRWEWrkCYn8HkgJt6Kk8e8hDKXDVPenpzGi/s1600/bgtv2.jpg',
        };

        if (streamType === 'dash') {
          source.dash = streamUrl;
        } else {
          source.hls = streamUrl;
        }

        if (clearKeys && Object.keys(clearKeys).length > 0) {
          const clearkeyArray = [];
          for (const [kid, key] of Object.entries(clearKeys)) {
            clearkeyArray.push({ kid, key });
          }
          source.drm = { clearkey: clearkeyArray };
        }

        // Buat konfigurasi player persis v3
        const playerConfig = {
          key: "8e4990ce-4e61-42fc-aa0b-a41550d11f5c",
          playback: {
            autoplay: true,
            muted: true
          },
          streaming: {
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
          },
          ui: false,
          buffer: {
            forward: 30,
            backward: 10,
            playbackStartThreshold: 0.5
          },
          adaptation: {
            switchInterval: 2000,
            useBufferLevelForQualitySwitch: true,
            preferManagedAdaptation: true
          }
        };

        // Bersihkan kontainer sebelum merender ulang
        if (playerContainerRef.current) {
          playerContainerRef.current.innerHTML = '';
        }

        // Buat instansi player baru
        const player = new window.bitmovin.player.Player(playerContainerRef.current, playerConfig);
        playerRef.current = player;

        // Buat dan inisialisasi UI secara sinkron (langsung)
        const ui = buildUI();
        if (ui) {
          const uiManager = new window.bitmovin.playerui.UIManager(player, [{ ui }]);
          uiManagerRef.current = uiManager;
        }

        // Load source
        await player.load(source);

        if (mounted) {
          setIsLoading(false);

          // Pilih track audio ke-2 otomatis pada mode play (jika tersedia)
          if (mode === 'play') {
            setTimeout(() => {
              if (playerRef.current) {
                try {
                  const audioTracks = playerRef.current.getAvailableAudio();
                  if (audioTracks && audioTracks.length >= 2) {
                    playerRef.current.setAudio(audioTracks[1].id);
                  }
                } catch (e) {
                  // Silently ignore jika belum siap
                }
              }
            }, 1500);
          }
        }

      } catch (err) {
        console.error("Player initialization failed:", err);
        if (mounted) {
          setError('Failed to play stream: ' + (err.message || 'Unknown error'));
          setIsLoading(false);
        }
      }
    };

    init();

    return () => {
      mounted = false;
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
        playerRef.current = null;
      }
      if (uiManagerRef.current) {
        uiManagerRef.current.release();
        uiManagerRef.current = null;
      }
      if (restoreOverride) {
        restoreOverride();
      }
    };
  }, [bitmovinReady, id, buildUI, overrideLicensing]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div 
        ref={playerContainerRef} 
        id="bitmovin-player-container" 
        className="w-full h-full absolute inset-0 z-20"
        style={{ backgroundColor: '#000' }}
      ></div>

      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50 text-white">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading stream...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50 text-white p-4">
          <div className="text-center bg-gray-900 border border-red-500/30 p-8 rounded-xl max-w-md">
            <p className="text-red-500 font-bold text-xl mb-4">Error Playing Stream</p>
            <p className="text-gray-300 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BitsPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading player...</p>
        </div>
      </div>
    }>
      <BitsPageContent />
    </Suspense>
  );
}
