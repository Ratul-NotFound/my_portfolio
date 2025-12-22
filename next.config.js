/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // This tells Vercel to IGNORE linting errors during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This tells Vercel to IGNORE type errors during build
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig
