/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages. Remove `basePath` when deploying to a
  // root domain (e.g. Vercel).
  output: 'export',
  basePath: '/home-automation-platform',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
