/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Temporarily ignore TS errors on Vercel
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
