import { NextRequest, NextResponse } from 'next/server';
import { findVideoConfig, getAllowedHostnames } from '@/utils/streamConfigs';
import { generateStreamToken } from '@/utils/crypto';

export const runtime = 'edge';

// Decodes a base64-encoded URL string
const fromBase64 = (str: string) => {
  try {
    return atob(str);
  } catch (e) {
    return '';
  }
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || '';
  const rawUrlBase64 = searchParams.get('url') || '';

  let fileUrl = '';

  // 1. Resolve stream URL from ID
  if (id) {
    const config = findVideoConfig(id);
    if (config && config.url) {
      fileUrl = config.url;
    }
  }

  // 2. Or fallback to decoded base64 URL
  if (!fileUrl && rawUrlBase64) {
    const decodedUrl = fromBase64(rawUrlBase64);
    if (!decodedUrl) {
      return NextResponse.json({ error: 'Invalid base64 URL encoding' }, { status: 400 });
    }

    // FIX Bug #8: Validasi domain URL agar proxy tidak disalahgunakan sebagai open proxy.
    // Hanya izinkan hostname yang sudah terdaftar di videoConfigs.
    try {
      const requestedHostname = new URL(decodedUrl).hostname;
      const allowedHostnames = getAllowedHostnames();
      if (!allowedHostnames.includes(requestedHostname)) {
        return NextResponse.json(
          { error: `Domain '${requestedHostname}' is not authorized for proxying` },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json({ error: 'Invalid URL in base64 parameter' }, { status: 400 });
    }

    fileUrl = decodedUrl;
  }

  if (!fileUrl) {
    return NextResponse.json({ error: 'Missing or invalid stream identifier' }, { status: 400 });
  }

  // Get client IP address
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                   request.headers.get('x-real-ip') || 
                   '127.0.0.1';

  // Token expires in 4 hours (14400 seconds)
  const expirationSeconds = 4 * 60 * 60;
  const exp = Math.floor(Date.now() / 1000) + expirationSeconds;

  try {
    const token = await generateStreamToken({
      file: fileUrl,
      ip: clientIp,
      exp
    });

    const origin = new URL(request.url).origin;
    const proxyUrl = `${origin}/api/manifest?token=${token}${id ? `&id=${id}` : ''}`;

    return NextResponse.json({
      token,
      proxyUrl,
      exp
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: `Token generation failed: ${err.message}` }, { status: 500 });
  }
}
