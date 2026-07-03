import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "../contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Joker",
  description: "StarballTV Player Dashboard",
  referrer: "no-referrer",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Player CSS styles */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.16.3/controls.min.css"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bitmovin-player-ui@3/dist/css/bitmovinplayer-ui.css"
        />

        {/* Frame validation to prevent direct viewing / enforce embeds */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && window.self === window.top && !window.location.hostname.includes("localhost") && !window.location.pathname.includes("/tools") && !window.location.pathname.includes("/channel-generator")) {
                window.location.replace("https://starballtv.pages.dev/");
              }
            `
          }}
        />

        {/* Prevent Turbopack HMR client from crashing due to Bitmovin/third-party postMessages */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('message', (event) => {
                  const data = event.data;
                  if (!data) return;
                  
                  // Check if the message is a Next.js HMR/Webpack/Turbopack message
                  const isNextHMR = typeof data === 'object' && (
                    data.action || 
                    (data.type && (
                      data.type.startsWith('turbopack-') || 
                      data.type.startsWith('next-') || 
                      data.type.startsWith('webpack')
                    ))
                  );
                  
                  if (!isNextHMR) {
                    // Stop event from propagating to the Next.js HMR listener
                    event.stopImmediatePropagation();
                  }
                }, true); // Run in capture phase to intercept early
              }
            `
          }}
        />

        {/* Global Security Blocker Scripts */}
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>

        {/* Player Engine CDN Scripts — Di-load via next/script agar urutan eksekusi
            terjamin di Next.js App Router dan tidak konflik dengan hydration React */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.16.3/shaka-player.compiled.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.16.3/shaka-player.ui.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* Bitmovin Player HARUS dimuat dalam urutan: core dulu, baru UI */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bitmovin-player@8/bitmovinplayer.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/bitmovin-player-ui@3/dist/js/bitmovinplayer-ui.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/level-selector@latest/dist/level-selector.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/dash-shaka-playback@latest/dist/dash-shaka-playback.min.js"
          strategy="afterInteractive"
        />

      </body>
    </html>
  );
}
