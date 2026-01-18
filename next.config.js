/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔑 REQUIRED to prevent silent build failure on Vercel (Next 15)
  output: 'standalone',

  // ===================================================================
  // PERFORMANCE OPTIMIZATIONS
  // ===================================================================
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? { exclude: ['error', 'warn'] }
        : false,
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
    optimizeCss: true,
  },

  // ===================================================================
  // IMAGE OPTIMIZATION
  // ===================================================================
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // ===================================================================
  // COMPRESSION & HEADERS
  // ===================================================================
  compress: true,
  poweredByHeader: false,

  // ===================================================================
  // PRODUCTION OPTIMIZATIONS
  // ===================================================================
  productionBrowserSourceMaps: false,
  reactStrictMode: true,

  // ===================================================================
  // SECURITY HEADERS
  // ===================================================================
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },

  async redirects() {
    return [];
  },
};

module.exports = nextConfig;
