// @ts-nocheck
"use client";
// @ts-nocheck
import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function IframePageContent() {
  const [searchParams] = useSearchParams();
  const [iframeSrc, setIframeSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  // Daftar domain yang dikecualikan dari sandbox
  const excludedDomains = [
    'voodc.com', 
    'www.vidembed.re', 
    'streamtp3.com', 
    'topembed.pw'
  ];

  useEffect(() => {
    // Ambil parameter 'id' dari URL
    const src = searchParams.get('id');
    
    if (src) {
      setIframeSrc(src);
      setIsLoading(false);
    } else {
      setError('No URL provided. Please add ?id=your_url to the URL');
      setIsLoading(false);
    }

    // Disable context menu and dev tools
    const disableContextMenu = (e) => e.preventDefault();
    const disableKeys = (e) => {
      if (
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.shiftKey && e.key === 'i') ||
        (e.ctrlKey && e.shiftKey && e.key === 'j') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', disableContextMenu);
    document.addEventListener('keydown', disableKeys);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('keydown', disableKeys);
    };
  }, [searchParams]);

  // Fungsi untuk menentukan atribut sandbox
  const getSandboxAttribute = () => {
    if (!iframeSrc) return '';
    
    try {
      const url = new URL(iframeSrc);
      const hostname = url.hostname;
      
      // Periksa apakah URL termasuk domain yang dikecualikan
      if (excludedDomains.includes(hostname) || excludedDomains.some(domain => hostname.includes(domain))) {
        return ''; // Hapus atribut sandbox untuk domain tertentu
      } else {
        return 'allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-top-navigation';
      }
    } catch (e) {
      // Jika URL tidak valid, gunakan sandbox default
      return 'allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-top-navigation';
    }
  };

  // Loading component
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading player...</p>
        </div>
      </div>
    );
  }

  // Error component
  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 max-w-md"
        >
          <div className="w-24 h-24 mx-auto mb-6 text-red-500">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <p className="text-sm text-gray-600">
            Example: https://jokerstar.pages.dev/iframe?id=https://sportlive.plus/soccer/1.php
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      {/* Video Player Area */}
      <div className="w-full h-full">
        {iframeSrc ? (
          <div className="w-full h-full">
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              className="w-full h-full border-0"
              allowFullScreen
              sandbox={getSandboxAttribute()}
              title="Iframe Player"
              onLoad={() => setIsLoading(false)}
              onError={() => setError('Failed to load the iframe content')}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">No URL provided</p>
          </div>
        )}
      </div>

      {/* Loading Overlay - shows while iframe is loading */}
      {isLoading && iframeSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-white text-lg">Loading content...</p>
          </div>
        </div>
      )}

      {/* Optional: Add custom CSS for iframe container if needed */}
      <style jsx>{`
        /* Hide scrollbar for iframe container if needed */
        .iframe-container {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};


export default function IframePage() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading player...</p>
        </div>
      </div>
    }>
      <IframePageContent />
    </Suspense>
  );
}

