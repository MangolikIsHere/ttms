/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'lh3.googleusercontent.com'],
    unoptimized: true,
  },
  experimental: {
    outputFileTracingRoot: undefined,
  },
  // Allow the local network dev origin shown by Next.js to avoid a cross-origin
  // dev warning when accessing the site from another device on your LAN.
  allowedDevOrigins: ['http://10.109.206.135'],
}

export default nextConfig
