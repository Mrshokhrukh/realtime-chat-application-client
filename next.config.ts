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
