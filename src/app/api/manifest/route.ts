import { NextRequest, NextResponse } from 'next/server';
import { findVideoConfig } from '@/utils/streamConfigs';
import { verifyStreamToken } from '@/utils/crypto';

// Force the route to run on the Edge Runtime (Cloudflare Workers)
export const runtime = 'edge';

// FIX Bug #4: Handler OPTIONS untuk CORS preflight request
// Browser modern (Chrome, Firefox) mengirim preflight sebelum GET yang sesungguhnya
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Authorization, Content-Type',
      'Access-Control-Max-Age': '86400',
    }
  });
}

// FIX Bug #2: Rewrite <BaseURL> di dalam DASH manifest agar segment juga diarahkan
// melalui proxy. Player (Shaka/Bitmovin) akan me-resolve URL segmen relatif terhadap
// BaseURL baru ini. Request filter di sisi client akan menangani URL yang dimulai dengan
// window.location.origin/api/ dan merewrite-nya ke CDN yang sesungguhnya.
function rewriteDashManifest(
  text: string,
  fileUrl: string,
  proxyOrigin: string,
  token: string,
  id: string,
  queryOrigin: string,
  queryReferer: string
): string {
  const baseManifestDir = fileUrl.substring(0, fileUrl.lastIndexOf('/') + 1);

  const makeProxyUrl = (targetUrl: string): string => {
    let absoluteUrl = targetUrl.trim();
    // Resolve relative URLs ke absolute menggunakan base manifest URL
    if (!absoluteUrl.startsWith('http://') && !absoluteUrl.startsWith('https://')) {
      try {
        absoluteUrl = absoluteUrl.startsWith('/')
          ? new URL(absoluteUrl, fileUrl).href
          : baseManifestDir + absoluteUrl;
      } catch {
        absoluteUrl = baseManifestDir + absoluteUrl;
      }
    }
    let proxyUrl = `${proxyOrigin}/api/manifest?file=${encodeURIComponent(absoluteUrl)}&token=${token}`;
    if (id) proxyUrl += `&id=${id}`;
    if (queryOrigin) proxyUrl += `&origin=${encodeURIComponent(queryOrigin)}`;
    if (queryReferer) proxyUrl += `&referer=${encodeURIComponent(queryReferer)}`;
    return proxyUrl;
  };

  // Rewrite elemen <BaseURL>...</BaseURL> yang berisi URL absolut maupun relatif
  // Segmen relatif (SegmentTemplate, SegmentList) akan di-resolve oleh player
  // terhadap BaseURL baru ini, dan request filter client akan meng-intercept-nya.
  const result = text.replace(
    /(<BaseURL[^>]*>)([^<]+)(<\/BaseURL>)/gi,
    (match, openTag, url, closeTag) => {
      const trimmedUrl = url.trim();
      if (!trimmedUrl) return match;
      return `${openTag}${makeProxyUrl(trimmedUrl)}${closeTag}`;
    }
  );

  return result;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token') || '';
  const id = searchParams.get('id') || '';
  const queryOrigin = searchParams.get('origin') || '';
  const queryReferer = searchParams.get('referer') || '';

  // CORS headers yang ditambahkan ke SEMUA response (termasuk error)
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Range, Authorization, Content-Type',
  };

  // 1. Enforce token validation
  if (!token) {
    return new NextResponse('Access Denied: Missing token', { status: 403, headers: corsHeaders });
  }

  // Get client's actual public IP
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                   request.headers.get('x-real-ip') || 
                   '127.0.0.1';

  // Verify the JWT token
  const payload = await verifyStreamToken(token, clientIp);
  if (!payload) {
    return new NextResponse('Access Denied: Invalid or expired token', { status: 403, headers: corsHeaders });
  }

  // Determine the target URL
  let fileUrl = searchParams.get('file') || searchParams.get('file_override') || '';
  if (!fileUrl) {
    // Default to the original manifest URL stored inside the token payload
    fileUrl = payload.file;
  } else {
    // Security check: ensure the requested file URL is on the same host as the token's original stream URL
    try {
      const tokenUrlObj = new URL(payload.file);
      const requestUrlObj = new URL(fileUrl);
      if (tokenUrlObj.hostname !== requestUrlObj.hostname) {
        return new NextResponse('Access Denied: Stream domain mismatch', { status: 403, headers: corsHeaders });
      }
    } catch (e) {
      return new NextResponse('Access Denied: Invalid file URL', { status: 403, headers: corsHeaders });
    }
  }

  try {
    const headers = new Headers();
    // Default User-Agent
    headers.set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Dapatkan header dari konfigurasi lokal jika ID tersedia
    if (id) {
      const config = findVideoConfig(id);
      if (config) {
        if (config.origin && config.origin.trim()) {
          headers.set('Origin', config.origin);
        }
        if (config.referer && config.referer.trim()) {
          headers.set('Referer', config.referer);
        }
        if (config.userAgent && config.userAgent.trim()) {
          headers.set('User-Agent', config.userAgent);
        }
        if (config.headers && typeof config.headers === 'object') {
          Object.keys(config.headers).forEach(key => {
            const val = (config.headers as any)[key];
            if (val && val.trim()) {
              headers.set(key, val);
            }
          });
        }
      }
    }

    // Override atau tambahkan header langsung dari query parameter
    if (queryOrigin) {
      headers.set('Origin', queryOrigin);
    }
    if (queryReferer) {
      headers.set('Referer', queryReferer);
    }

    // TERAMAT PENTING: Teruskan header 'Range' dari client untuk mendukung streaming segmen DASH/HLS
    const clientRange = request.headers.get('range');
    if (clientRange) {
      headers.set('Range', clientRange);
    }

    const response = await fetch(fileUrl, { headers });

    if (!response.ok) {
      return new NextResponse(`Failed to fetch stream: ${response.statusText}`, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || '';
    
    const isM3u8 = fileUrl.endsWith('.m3u8') || 
                   contentType.includes('application/x-mpegURL') || 
                   contentType.includes('vnd.apple.mpegurl');
                   
    const isMpd = fileUrl.endsWith('.mpd') || 
                  contentType.includes('dash+xml');

    if (isM3u8) {
      // 1. READ & REWRITE HLS PLAYLIST (.m3u8)
      let text = await response.text();
      const origin = new URL(request.url).origin;
      const baseUrl = fileUrl.substring(0, fileUrl.lastIndexOf('/') + 1);

      const lines = text.split('\n');
      const rewrittenLines = lines.map(line => {
        const trimmed = line.trim();
        
        // Keep empty lines and HLS tags/comments
        if (trimmed === '' || trimmed.startsWith('#')) {
          return line;
        }

        // Rewrite segment/sub-playlist URLs
        let absoluteUrl = trimmed;
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
          if (trimmed.startsWith('/')) {
            absoluteUrl = new URL(trimmed, fileUrl).href;
          } else {
            absoluteUrl = baseUrl + trimmed;
          }
        }

        // Susun URL dengan meneruskan Token dan ID agar segmen berikutnya memiliki otorisasi yang sama
        let redirectUrl = `${origin}/api/manifest?token=${token}&file=${encodeURIComponent(absoluteUrl)}`;
        if (id) redirectUrl += `&id=${id}`;
        if (queryOrigin) redirectUrl += `&origin=${encodeURIComponent(queryOrigin)}`;
        if (queryReferer) redirectUrl += `&referer=${encodeURIComponent(queryReferer)}`;
        
        return redirectUrl;
      });

      return new NextResponse(rewrittenLines.join('\n'), {
        headers: {
          ...corsHeaders,
          'Content-Type': contentType || 'application/x-mpegURL',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      });
    } else if (isMpd) {
      // 2. SERVE & REWRITE DASH MANIFEST (.mpd)
      // FIX Bug #2: Rewrite <BaseURL> agar segment diarahkan melalui proxy.
      // Player (Shaka/Bitmovin) meresolve URL segmen relatif terhadap BaseURL baru,
      // lalu request filter di sisi client meng-intercept dan memproxy segmen tersebut.
      let text = await response.text();
      const proxyOrigin = new URL(request.url).origin;
      const rewrittenText = rewriteDashManifest(text, fileUrl, proxyOrigin, token, id, queryOrigin, queryReferer);

      return new NextResponse(rewrittenText, {
        headers: {
          ...corsHeaders,
          'Content-Type': contentType || 'application/dash+xml',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        }
      });
    } else {
      // 3. STREAM VIDEO SEGMENT (.ts, .m4s, .key)
      const responseHeaders = new Headers();
      responseHeaders.set('Access-Control-Allow-Origin', '*');
      responseHeaders.set('Access-Control-Allow-Headers', '*');
      responseHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      responseHeaders.set('Content-Type', contentType || 'video/MP2T');
      responseHeaders.set('Cache-Control', 'public, max-age=10');

      // Teruskan header pencocokan byte-range dari CDN ke player
      const headersToForward = ['content-range', 'content-length', 'accept-ranges'];
      headersToForward.forEach(h => {
        const val = response.headers.get(h);
        if (val) {
          responseHeaders.set(h, val);
        }
      });

      return new NextResponse(response.body, {
        status: response.status, // Teruskan status 206 (Partial Content) atau 200 (OK)
        headers: responseHeaders
      });
    }
  } catch (error: any) {
    return new NextResponse(`Proxy error: ${error.message}`, { status: 500, headers: corsHeaders });
  }
}
