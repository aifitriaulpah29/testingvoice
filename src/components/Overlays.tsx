// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { videoConfigs } from '../utils/streamConfigs';

// ============ ERROR OVERLAY ============
export const ErrorOverlay = ({ error, onRetry, showExamples = false, autoHideDelay = 10000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (error && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);
      
      return () => clearTimeout(timer);
    }
  }, [error, autoHideDelay]);

  if (!error || !isVisible) return null;

  const validExamples = videoConfigs.slice(0, 3).map(c => c.id);

  const handleRetry = () => {
    if (typeof onRetry === 'function') {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleExampleClick = (id) => {
    window.location.href = `?id=${id}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-3 sm:p-4 bg-black/50 backdrop-blur-sm">
      {/* Overlay Container - Responsive dengan max width */}
      <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 text-white 
                    rounded-xl sm:rounded-2xl text-center w-full max-w-[90%] xs:max-w-sm sm:max-w-md 
                    p-4 sm:p-6 md:p-8 border border-red-500/30 shadow-2xl backdrop-blur-md
                    animate-fade-in-up">
        
        {/* Close Button - Responsive */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 
                   rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center 
                   transition-all hover:scale-110 group z-10"
          aria-label="Close"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 group-hover:text-white" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Error Icon - Responsive */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full 
                      bg-red-500/20 flex items-center justify-center animate-pulse">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Error Message - Responsive text */}
        <p className="mb-4 text-sm sm:text-base md:text-lg font-medium px-2 break-words">
          {error}
        </p>
        
        {/* Buttons Container */}
        <div className="space-y-2 sm:space-y-3 px-2 sm:px-4">
          <button
            onClick={handleRetry}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-500 
                     text-white rounded-lg hover:from-red-700 hover:to-red-600 
                     transition-all w-full font-semibold hover:scale-[1.02] transform duration-200
                     text-sm sm:text-base shadow-lg shadow-red-600/20"
          >
            Try Again
          </button>
          
          {showExamples && validExamples.length > 0 && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700">
              <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                Try these IDs:
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                {validExamples.map(id => (
                  <button
                    key={id}
                    onClick={() => handleExampleClick(id)}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700/80 hover:bg-gray-600 
                             text-white text-xs sm:text-sm rounded-lg transition-all 
                             hover:scale-105 transform duration-200 border border-gray-600
                             flex-1 min-w-[80px] sm:flex-initial"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Timer hint - Responsive */}
        {autoHideDelay > 0 && (
          <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4">
            Auto-closes in {autoHideDelay/1000}s • Tap ✕ to close now
          </p>
        )}
      </div>

      {/* Animasi CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.3s ease-out forwards;
          }
        `
      }} />
    </div>
  );
};

// ============ VOLUME HINT ============
export const VolumeHint = () => {
  return (
    <div className="absolute top-4 sm:top-5 md:top-6 left-3 sm:left-4 md:left-5 
                  bg-black/70 text-white px-3 sm:px-4 py-1.5 sm:py-2 
                  rounded-full text-xs sm:text-sm z-[2500] 
                  animate-fade-in-out pointer-events-none backdrop-blur-sm 
                  border border-white/20 shadow-lg">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-base sm:text-lg animate-pulse">🔊</span>
        <span className="whitespace-nowrap">Click to unmute</span>
      </div>
    </div>
  );
};

// Tambahkan style untuk animasi jika belum ada
<style dangerouslySetInnerHTML={{
  __html: `
    @keyframes fadeInOut {
      0% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
      10% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    }
    .animate-fade-in-out {
      animation: fadeInOut 3s ease-in-out forwards;
    }
  `
}} />
