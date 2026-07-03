import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/bit-tester.html',
        destination: '/tools/bit-tester.html',
        permanent: true,
      },
      {
        source: '/shaka-tester.html',
        destination: '/tools/shaka-tester.html',
        permanent: true,
      },
      {
        source: '/generatejadwal.html',
        destination: '/tools/generatejadwal.html',
        permanent: true,
      },
      {
        source: '/jsonapkgenerator.html',
        destination: '/tools/jsonapkgenerator.html',
        permanent: true,
      },
      {
        source: '/jsonserverapkgenerator.html',
        destination: '/tools/jsonserverapkgenerator.html',
        permanent: true,
      },
      {
        source: '/loadplayer.html',
        destination: '/tools/loadplayer.html',
        permanent: true,
      },
      {
        source: '/joker.png',
        destination: '/img/joker.png',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
