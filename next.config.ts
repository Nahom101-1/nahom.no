import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
};

export default nextConfig;
