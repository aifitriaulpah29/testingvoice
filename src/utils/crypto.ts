// ⚠️  KEAMANAN: Pastikan variabel lingkungan STREAM_PROXY_SECRET selalu di-set
// di file .env.local / environment variables produksi Anda. Nilai fallback di bawah
// ini ada di source code dan TIDAK AMAN untuk lingkungan produksi.
const SECRET_KEY = process.env.STREAM_PROXY_SECRET || 'antigravity-streaming-proxy-super-secure-secret-key-2026';

function stringToBuffer(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// FIX Bug #5: Normalisasi IPv6 loopback (::1) ke IPv4 loopback (127.0.0.1)
// agar token tidak di-reject di localhost karena mismatch ::1 vs 127.0.0.1
function normalizeIp(ip: string): string {
  if (!ip) return '';
  if (ip === '::1') return '127.0.0.1';
  // Strip IPv6-mapped IPv4 prefix (::ffff:x.x.x.x → x.x.x.x)
  if (ip.startsWith('::ffff:')) return ip.slice(7);
  return ip;
}

async function getCryptoKey() {
  return await crypto.subtle.importKey(
    'raw',
    stringToBuffer(SECRET_KEY) as any,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// Convert normal Base64 to URL-safe Base64 (base64url)
function toBase64Url(base64: string): string {
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Convert URL-safe Base64 back to normal Base64
function fromBase64Url(base64url: string): string {
  let str = base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return str;
}

export async function generateStreamToken(payload: { file: string; ip: string; exp: number }) {
  // Normalisasi IP sebelum disimpan ke dalam token agar konsisten saat verifikasi
  const normalizedPayload = { ...payload, ip: normalizeIp(payload.ip) };
  const header = toBase64Url(btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const payloadStr = toBase64Url(btoa(JSON.stringify(normalizedPayload)));
  const dataToSign = `${header}.${payloadStr}`;
  
  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, stringToBuffer(dataToSign) as any);
  
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signatureStr = toBase64Url(btoa(String.fromCharCode(...signatureArray)));
    
  return `${header}.${payloadStr}.${signatureStr}`;
}

export async function verifyStreamToken(token: string, clientIp: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [header, payloadStr, signature] = parts;
    const dataToSign = `${header}.${payloadStr}`;
    
    const key = await getCryptoKey();
    
    // Decode base64url signature
    const binarySign = atob(fromBase64Url(signature));
    const signBuffer = new Uint8Array(binarySign.length);
    for (let i = 0; i < binarySign.length; i++) {
      signBuffer[i] = binarySign.charCodeAt(i);
    }
    
    const isValid = await crypto.subtle.verify('HMAC', key, signBuffer as any, stringToBuffer(dataToSign) as any);
    if (!isValid) return null;
    
    const payload = JSON.parse(atob(fromBase64Url(payloadStr)));
    
    // 1. Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      return null;
    }
    
    // 2. Check IP matching — FIX Bug #5: normalisasi dulu sebelum compare
    //    agar ::1 (IPv6 loopback) dianggap sama dengan 127.0.0.1 (IPv4 loopback)
    if (payload.ip && clientIp) {
      const normalizedPayloadIp = normalizeIp(payload.ip);
      const normalizedClientIp = normalizeIp(clientIp);

      if (normalizedPayloadIp !== normalizedClientIp) {
        // Subnet match sebagai fallback (untuk IP mobile yang bergeser)
        const getSubnet = (ip: string) => {
          if (ip.includes('.')) return ip.split('.').slice(0, 3).join('.');
          if (ip.includes(':')) return ip.split(':').slice(0, 4).join(':');
          return ip;
        };
        
        if (getSubnet(normalizedPayloadIp) !== getSubnet(normalizedClientIp)) {
          return null;
        }
      }
    }
    
    return payload;
  } catch (e) {
    return null;
  }
}
