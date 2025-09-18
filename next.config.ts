import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.tina.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
      }
    ],
  },
  async headers() {
    // these are also defined in the root layout since github pages doesn't support headers
    const headers = [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'Content-Security-Policy',
        value: "frame-ancestors 'self'",
      },
    ];
    
    const videoHeaders = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
      {
        key: 'Content-Type',
        value: 'video/mp4',
      },
    ];

    return [
      {
        source: '/(.*)',
        headers,
      },
      {
        source: '/hero-video.mov',
        headers: videoHeaders,
      },
      {
        source: '/hero-video-2.mp4',
        headers: videoHeaders,
      },
      {
        source: '/spectacle.mp4',
        headers: videoHeaders,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ];
  },
};

export default nextConfig