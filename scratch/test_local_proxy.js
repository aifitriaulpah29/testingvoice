const http = require('http');

const targetUrl = 'http://localhost:3002/api/manifest?file=' + encodeURIComponent('https://c9851ec-rbm-hilv-fsly.cdn.redbee.live/L26/6b640fa2/a765d074.isml/.mpd');

console.log('Sending request to local Next.js proxy...');
console.log('URL:', targetUrl);

http.get(targetUrl, (res) => {
  console.log('STATUS:', res.statusCode);
  console.log('HEADERS:', JSON.stringify(res.headers, null, 2));

  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    console.log('\n--- RESPONSE BODY (First 500 chars) ---');
    console.log(body.substring(0, 500));
    console.log('---------------------------------------\n');
    process.exit(0);
  });
}).on('error', (err) => {
  console.error('Request failed:', err.message);
  process.exit(1);
});
