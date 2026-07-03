// @ts-nocheck
import React, { useRef, useEffect, useState, forwardRef } from 'react';
import { ErrorOverlay, VolumeHint } from './Overlays';
import { useShakaPlayer } from '../hooks/usePlayer';

const VideoPlayer = forwardRef(({ config, videoId, mode = 'default', onRetry }, ref) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [showVolumeHint, setShowVolumeHint] = useState(false);
  
  // Expose videoRef ke parent component melalui ref
  React.useImperativeHandle(ref, () => ({
    destroy: () => {
      // Cleanup logic if needed
    },
    load: (manifest) => {
      if (player && player.load) {
        player.load(manifest);
      }
    }
  }));
  
  // FIX Bug #6: Pindahkan hook ke atas conditional return agar tidak melanggar
  // React Rules of Hooks. Hook WAJIB dipanggil dalam urutan yang sama setiap render.
  // useShakaPlayer sudah menangani config === null secara internal (early return di initPlayer).
  const {
    error,
    player
  } = useShakaPlayer(videoRef, config, mode);

  if (!config || !videoId) {
    return (
      <ErrorOverlay 
        error="Invalid video configuration"
        onRetry={onRetry}
      />
    );
  }

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && videoRef.current?.paused && player) {
        videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [player]);

  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current?.muted) {
        videoRef.current.muted = false;
        if (videoRef.current.paused) videoRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (!error) {
      setShowVolumeHint(true);
      const timer = setTimeout(() => setShowVolumeHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-black">
      <video
        ref={videoRef}
        id="video"
        className="w-full h-full object-contain"
        poster="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi4Mb0O5o5z_YNLfcbNjILSw-kRR-uIXD31L9sMFhswqnSqj3Ho3XRWWbOLLe9ROvS5JSWHM1VKymuxBo-BwbzcpTQ03SjLuP6HuwIokQrCay1aZlT6h4wu84Q2qDlPxSdUp1MFCc5wdUN358jBx5tInVtteCRWEWrkCYn8HkgJt6Kk8e8hDKXDVPenpzGi/s1600/bgtv2.jpg"
        autoPlay
        playsInline
        muted
      />
      
      <ErrorOverlay 
        error={error}
        onRetry={onRetry}
      />
      
      {showVolumeHint && !error && <VolumeHint />}
    </div>
  );
});

export default VideoPlayer;
