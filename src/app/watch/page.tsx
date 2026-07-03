// @ts-nocheck
"use client";

import React, { useState, Suspense } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { useVideoConfig } from '@/hooks/usePlayer';

function WatchPageContent() {
  const { videoId, config, isValidId, isLoading } = useVideoConfig();
  const [retryCount, setRetryCount] = useState(0);

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading config...</p>
        </div>
      </div>
    );
  }

  if (!isValidId || !config) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4 text-red-500 font-bold">Video ID "{videoId}" Not Found!</p>
        </div>
      </div>
    );
  }

  return (
    <VideoPlayer 
      key={videoId + retryCount} 
      config={config} 
      videoId={videoId} 
      mode="watch" 
      onRetry={() => setRetryCount(prev => prev + 1)} 
    />
  );
}

export default function WatchPage() {
  return (
    <Suspense fallback={
      <div className="w-full h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading player...</p>
        </div>
      </div>
    }>
      <WatchPageContent />
    </Suspense>
  );
}
