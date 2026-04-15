/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'oilfwbelavdvlscvmpbi.supabase.co',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'www.ultra-cleangt.com', 'ultra-cleangt.vercel.app'],
    },
  },
}

module.exports = nextConfig
