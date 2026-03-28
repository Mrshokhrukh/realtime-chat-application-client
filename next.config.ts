import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.tubefilter.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
         protocol: 'https',
        hostname: 'images.rawpixel.com',
      },
    ],
  },
  async redirects() {

    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
