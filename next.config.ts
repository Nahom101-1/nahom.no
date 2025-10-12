import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // ppr: 'incremental',
  },
  images: {
    domains: ['cdn.sanity.io', 'a.ltrbxd.com'],
  },
};

export default nextConfig;
