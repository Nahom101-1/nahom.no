import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // ppr: 'incremental',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'a.ltrbxd.com',
      },
    ],
  },
};

export default nextConfig;
