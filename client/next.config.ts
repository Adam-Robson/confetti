import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    // Only proxy in development - in production, frontend will call API directly
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*'
        },
        {
          source: '/healthz',
          destination: 'http://localhost:8080/healthz'
        }
      ];
    }
    return []; // No rewrites in production
  },

  env: {
    // Make API URL available to frontend
    NEXT_PUBLIC_API_URI: process.env.NODE_ENV === 'production'
      ? 'https://thethe.fly.dev'  // Your Fly.io backend URL
      : 'http://localhost:8080'
  },

  // Image optimization for R2
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Development-only settings
  ...(process.env.NODE_ENV === 'development' && {
    typescript: {
      ignoreBuildErrors: false
    }
  })
};

export default nextConfig;
