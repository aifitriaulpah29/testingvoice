// @ts-nocheck
import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { ErrorOverlay } from './Overlays';
import { useBitmovinPlayer } from '../hooks/useBitmovinPlayer';

const BitmovinPlayer = forwardRef(({ config, videoId, mode = 'default', onRetry }, ref) => {
  const containerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const [showVolumeHint, setShowVolumeHint] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  
  // Expose methods ke parent component melalui ref
  React.useImperativeHandle(ref, () => ({
    destroy: () => {
      // Cleanup logic if needed
      if (player && player.destroy) {
        player.destroy();
      }
    },
    load: (source) => {
      if (player && player.load) {
        player.load(source);
      }
    }
  }));
  
  // FIX: Pindahkan hook ke atas conditional return agar tidak melanggar
  // React Rules of Hooks. Hook WAJIB dipanggil dalam urutan yang sama setiap render.
  // useBitmovinPlayer sudah menangani config === null secara internal (early return di initPlayer).
  const {
    error,
    slowNetworkMessage,
    player,
    isLoading
  } = useBitmovinPlayer(playerContainerRef, config, mode);

  if (!config || !videoId) {
    return (
      <ErrorOverlay 
        error="Invalid video configuration"
        onRetry={onRetry}
      />
    );
  }

  useEffect(() => {
    if (player && !error && !isLoading) {
      setPlayerVisible(true);
    } else {
      setPlayerVisible(false);
    }
  }, [player, error, isLoading]);

  useEffect(() => {
    if (!error && player) {
      setShowVolumeHint(true);
      const timer = setTimeout(() => setShowVolumeHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, player]);

  useEffect(() => {
    if (!error && window.bitmovin) {
      if (!document.getElementById('bitmovin-hide-watermark')) {
        const style = document.createElement('style');
        style.id = 'bitmovin-hide-watermark';
        style.innerHTML = '.bmpui-ui-watermark { display: none !important; }';
        document.head.appendChild(style);
      }
      
      return () => {
        const existingStyle = document.getElementById('bitmovin-hide-watermark');
        if (existingStyle) existingStyle.remove();
      };
    }
  }, [error]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-screen bg-black"
      style={{ overflow: 'hidden' }}
    >
      <div 
        ref={playerContainerRef}
        id="bitmovin-player-container" 
        className="w-full h-full"
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0,
          zIndex: 20,
          opacity: 1,
          visibility: 'visible',
          backgroundColor: '#000',
          pointerEvents: 'auto'
        }}
      ></div>
      
      {slowNetworkMessage && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-600/90 text-white px-6 py-3 rounded-lg text-sm z-[2500] animate-fade-in-out shadow-lg backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{slowNetworkMessage}</span>
          </div>
        </div>
      )}
      
      <ErrorOverlay 
        error={error}
        onRetry={onRetry}
      />
      
      {showVolumeHint && !error && player && (
        <div className="absolute bottom-20 right-5 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-[2500] animate-fade-in-out pointer-events-none">
          🔊 Click to unmute
        </div>
      )}
    </div>
  );
});

export default BitmovinPlayer;
